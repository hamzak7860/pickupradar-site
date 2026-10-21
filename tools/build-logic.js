#!/usr/bin/env node
/**
 * Builds pickupradar-logic.js: a browser bundle of the PickupRadar mobile app's
 * pure display/prediction modules, so the website uses the app's own rules.
 *
 * Source files are read from a COMMITTED app revision with `git show`, never
 * from the app's working tree, so unfinished local work is never included.
 *
 * Usage (from the pickupradar-site folder):
 *   node tools/build-logic.js                 build with the defaults below
 *   node tools/build-logic.js --check         rebuild in memory; exit 1 if pickupradar-logic.js differs
 *   node tools/build-logic.js --commit <sha>  build from another app commit
 *   node tools/build-logic.js --app <path>    app repo location (default ../pickupradar-app)
 *
 * Output is deterministic: it depends only on the source files at the given
 * commit, the TypeScript version in the app's node_modules and the options below.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const DEFAULT_COMMIT = '5dcfec4';
const OUTPUT_FILE = path.resolve(__dirname, '..', 'pickupradar-logic.js');

// Bundled modules, in load order. Keys are the ids used by the app's imports.
const MODULES = [
  { id: './countryConfig', file: 'lib/countryConfig.ts', exportAs: 'countryConfig' },
  { id: './geo', file: 'lib/geo.ts', exportAs: 'geo' },
  { id: './liveCitySelection', file: 'lib/liveCitySelection.ts', exportAs: 'liveCitySelection' },
  { id: './waitColors', file: 'lib/waitColors.ts', exportAs: 'waitColors' },
  { id: './venuePrediction', file: 'lib/venuePrediction.ts', exportAs: 'venuePrediction' },
  { id: './venueDisplay', file: 'lib/venueDisplay.ts', exportAs: 'venueDisplay' },
];

const COMPILER_OPTIONS = {
  module: 'CommonJS',
  target: 'ES2019',
  esModuleInterop: true,
  removeComments: false,
  newLine: 'lf',
};

// Anything matching these in the output fails the build.
const FORBIDDEN_PATTERNS = [
  /supabase/i,
  /eyJhbGci/,               // JWT-looking keys
  /AsyncStorage/,
  /\bfetch\s*\(/,
  /require\(["'](react|expo|@react-native)/,
];

function parseArgs(argv) {
  const args = { commit: DEFAULT_COMMIT, app: path.resolve(__dirname, '..', '..', 'pickupradar-app'), check: false };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--check') args.check = true;
    else if (arg === '--commit') args.commit = argv[++i];
    else if (arg === '--app') args.app = path.resolve(argv[++i]);
    else throw new Error('Unknown argument: ' + arg);
  }
  return args;
}

function git(appDir, gitArgs) {
  return execFileSync('git', ['--no-optional-locks', '-C', appDir, ...gitArgs], {
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  });
}

function loadTypeScript(appDir) {
  const tsPath = path.join(appDir, 'node_modules', 'typescript');
  const ts = require(tsPath);
  return ts;
}

function transpile(ts, source, fileName, removeComments) {
  const options = {
    module: ts.ModuleKind[COMPILER_OPTIONS.module],
    target: ts.ScriptTarget[COMPILER_OPTIONS.target],
    esModuleInterop: COMPILER_OPTIONS.esModuleInterop,
    removeComments: removeComments === undefined ? COMPILER_OPTIONS.removeComments : removeComments,
    newLine: ts.NewLineKind.LineFeed,
  };
  const result = ts.transpileModule(source.replace(/\r\n/g, '\n'), {
    compilerOptions: options,
    fileName,
    reportDiagnostics: true,
  });
  if (result.diagnostics && result.diagnostics.length > 0) {
    const messages = result.diagnostics.map((d) => ts.flattenDiagnosticMessageText(d.messageText, '\n'));
    throw new Error('TypeScript reported problems in ' + fileName + ':\n' + messages.join('\n'));
  }
  return result.outputText.replace(/\r\n/g, '\n').replace(/\/\/# sourceMappingURL=.*\n?$/, '');
}

function findRequires(js) {
  const ids = [];
  const re = /\brequire\(\s*["']([^"']+)["']\s*\)/g;
  let match;
  while ((match = re.exec(js))) ids.push(match[1]);
  return ids;
}

function indent(text, spaces) {
  const pad = ' '.repeat(spaces);
  return text
    .split('\n')
    .map((line) => (line.length > 0 ? pad + line : line))
    .join('\n');
}

function build(args) {
  const fullCommit = git(args.app, ['rev-parse', '--verify', args.commit + '^{commit}']).trim();
  const ts = loadTypeScript(args.app);
  const knownIds = new Set(MODULES.map((m) => m.id));

  const blocks = MODULES.map((mod) => {
    const source = git(args.app, ['show', fullCommit + ':' + mod.file]);
    const js = transpile(ts, source, mod.file);
    // Scan the code without comments, so a comment that merely mentions Supabase or
    // AsyncStorage does not block the build, but real client code or keys still do.
    const codeOnly = transpile(ts, source, mod.file, true);
    for (const pattern of FORBIDDEN_PATTERNS) {
      if (pattern.test(codeOnly)) {
        throw new Error(mod.file + ' matches forbidden pattern ' + pattern + '. Refusing to bundle it.');
      }
    }
    for (const dep of findRequires(js)) {
      if (!knownIds.has(dep)) {
        throw new Error(mod.file + ' requires "' + dep + '", which is not bundled. Add it to MODULES or remove the import.');
      }
    }
    return (
      '  // ---- ' + mod.file + ' ----\n' +
      '  defs[' + JSON.stringify(mod.id) + '] = function (exports, require, module) {\n' +
      indent(js.trimEnd(), 4) + '\n' +
      '  };\n'
    );
  });

  const apiLines = MODULES.map((m) => '    ' + m.exportAs + ': req(' + JSON.stringify(m.id) + '),').join('\n');

  const output =
    '/*\n' +
    ' * pickupradar-logic.js — GENERATED FILE, DO NOT EDIT BY HAND.\n' +
    ' *\n' +
    ' * The PickupRadar mobile app\'s own venue display, prediction, wait-colour and\n' +
    ' * city/country modules, bundled for the website preview.\n' +
    ' *\n' +
    ' * Source:   pickupradar-app @ ' + fullCommit + '\n' +
    ' * Files:    ' + MODULES.map((m) => m.file).join(', ') + '\n' +
    ' * Compiler: TypeScript ' + ts.version + ' (transpileModule, ' + COMPILER_OPTIONS.module + ', ' + COMPILER_OPTIONS.target + ')\n' +
    ' * Rebuild:  node tools/build-logic.js --commit ' + fullCommit.slice(0, 7) + '\n' +
    ' * Check:    node tools/build-logic.js --check\n' +
    ' *\n' +
    ' * Exposes window.PickupRadarLogic = { commit, ' + MODULES.map((m) => m.exportAs).join(', ') + ' }.\n' +
    ' */\n' +
    '(function (global) {\n' +
    '  \'use strict\';\n' +
    '  var defs = {};\n' +
    '  var cache = {};\n' +
    '  function req(id) {\n' +
    '    if (cache[id]) return cache[id].exports;\n' +
    '    var def = defs[id];\n' +
    '    if (!def) throw new Error(\'PickupRadarLogic: unknown module \' + id);\n' +
    '    var module = { exports: {} };\n' +
    '    cache[id] = module;\n' +
    '    def(module.exports, req, module);\n' +
    '    return module.exports;\n' +
    '  }\n' +
    '\n' +
    blocks.join('\n') +
    '\n' +
    '  var api = Object.freeze({\n' +
    '    commit: ' + JSON.stringify(fullCommit) + ',\n' +
    apiLines + '\n' +
    '  });\n' +
    '  global.PickupRadarLogic = api;\n' +
    '  if (typeof module === \'object\' && module && module.exports) module.exports = api;\n' +
    '})(typeof window !== \'undefined\' ? window : globalThis);\n';

  if (/eyJhbGci/.test(output)) {
    throw new Error('Generated bundle contains a JWT-looking string. Refusing to write it.');
  }
  return { output, fullCommit, tsVersion: ts.version };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const { output, fullCommit, tsVersion } = build(args);
  if (args.check) {
    const existing = fs.existsSync(OUTPUT_FILE) ? fs.readFileSync(OUTPUT_FILE, 'utf8').replace(/\r\n/g, '\n') : null;
    if (existing === output) {
      console.log('pickupradar-logic.js is up to date (app ' + fullCommit.slice(0, 7) + ', TypeScript ' + tsVersion + ').');
      return;
    }
    console.error('pickupradar-logic.js differs from a fresh build of app ' + fullCommit.slice(0, 7) + '. Run: node tools/build-logic.js');
    process.exit(1);
  }
  fs.writeFileSync(OUTPUT_FILE, output, 'utf8');
  console.log('Wrote pickupradar-logic.js (' + Buffer.byteLength(output) + ' bytes) from app ' + fullCommit.slice(0, 7) + ', TypeScript ' + tsVersion + '.');
}

main();
