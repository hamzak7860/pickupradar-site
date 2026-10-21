#!/usr/bin/env node
/**
 * Builds i18n/<code>.json: the PickupRadar mobile app's own translation dictionaries
 * (lib/translations/*.ts), copied unchanged for the website preview's language picker.
 *
 * Like build-logic.js, sources are read from a COMMITTED app revision with `git show`,
 * so unfinished local work is never published. Nothing is translated here: the JSON
 * files hold exactly the app's strings. Missing keys fall back to English at runtime,
 * the same as the app.
 *
 * Usage (from the pickupradar-site folder):
 *   node tools/build-translations.js                 build with the default commit
 *   node tools/build-translations.js --check         exit 1 if any i18n file differs from a fresh build
 *   node tools/build-translations.js --commit <sha>  build from another app commit
 *   node tools/build-translations.js --app <path>    app repo location (default ../pickupradar-app)
 */
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { execFileSync } = require('child_process');

const DEFAULT_COMMIT = '5dcfec4';
const OUTPUT_DIR = path.resolve(__dirname, '..', 'i18n');

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

// Read the registry (lib/translations/index.ts): dictionary code -> source file.
function readRegistry(indexSource) {
  const imports = new Map();
  const importRe = /^import\s+(\w+)(?:\s*,\s*\{[^}]*\})?\s+from\s+'\.\/([\w-]+)';/gm;
  let match;
  while ((match = importRe.exec(indexSource))) imports.set(match[1], match[2]);
  const block = indexSource.match(/export const TRANSLATIONS[^=]*=\s*\{([\s\S]*?)\};/);
  if (!block) throw new Error('Could not find TRANSLATIONS in lib/translations/index.ts');
  const entries = [];
  for (const raw of block[1].split(',')) {
    const item = raw.trim();
    if (!item) continue;
    const pair = item.match(/^(?:'([\w-]+)'|(\w+))\s*(?::\s*(\w+))?$/);
    if (!pair) throw new Error('Unexpected TRANSLATIONS entry: ' + item);
    const code = pair[1] || pair[2];
    const ident = pair[3] || pair[2];
    const file = imports.get(ident);
    if (!file) throw new Error('No import found for ' + ident);
    entries.push({ code, file: 'lib/translations/' + file + '.ts' });
  }
  return entries;
}

// Each dictionary file is a plain object literal ("const xx = { ... } as const; export default xx;").
function evaluateDictionary(ts, source, fileName) {
  const js = ts.transpileModule(source.replace(/\r\n/g, '\n'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2019 },
    fileName,
  }).outputText;
  if (/\brequire\(/.test(js)) throw new Error(fileName + ' has runtime imports. Refusing to evaluate it.');
  const sandbox = { exports: {}, module: { exports: {} } };
  sandbox.module.exports = sandbox.exports;
  vm.runInNewContext(js, sandbox, { filename: fileName, timeout: 2000 });
  const dict = sandbox.module.exports.default || sandbox.exports.default;
  if (!dict || typeof dict !== 'object') throw new Error(fileName + ' has no default export object.');
  const out = {};
  for (const key of Object.keys(dict).sort()) {
    if (typeof dict[key] !== 'string') throw new Error(fileName + ': ' + key + ' is not a string.');
    out[key] = dict[key];
  }
  return out;
}

function build(args) {
  const fullCommit = git(args.app, ['rev-parse', '--verify', args.commit + '^{commit}']).trim();
  const ts = require(path.join(args.app, 'node_modules', 'typescript'));
  const registry = readRegistry(git(args.app, ['show', fullCommit + ':lib/translations/index.ts']));
  const files = {};
  const manifest = { commit: fullCommit, languages: {} };
  let enKeys = null;
  for (const entry of registry) {
    const dict = evaluateDictionary(ts, git(args.app, ['show', fullCommit + ':' + entry.file]), entry.file);
    if (entry.code === 'en') enKeys = Object.keys(dict);
    const json = JSON.stringify(dict, null, 0) + '\n';
    if (/eyJhbGci/.test(json)) throw new Error(entry.file + ' contains a JWT-looking string.');
    files[entry.code + '.json'] = json;
    manifest.languages[entry.code] = { keys: Object.keys(dict).length };
  }
  if (!enKeys) throw new Error('English dictionary missing.');
  manifest.englishKeys = enKeys.length;
  manifest.count = registry.length;
  files['manifest.json'] = JSON.stringify(manifest, null, 2) + '\n';
  return { files, fullCommit, count: registry.length };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const { files, fullCommit, count } = build(args);
  if (args.check) {
    const stale = Object.keys(files).filter((name) => {
      const file = path.join(OUTPUT_DIR, name);
      return !fs.existsSync(file) || fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n') !== files[name];
    });
    const extra = fs.existsSync(OUTPUT_DIR) ? fs.readdirSync(OUTPUT_DIR).filter((name) => !files[name]) : [];
    if (stale.length || extra.length) {
      console.error('i18n differs from a fresh build of app ' + fullCommit.slice(0, 7) + ': ' + stale.concat(extra).join(', '));
      process.exit(1);
    }
    console.log('i18n is up to date: ' + count + ' dictionaries from app ' + fullCommit.slice(0, 7) + '.');
    return;
  }
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  for (const name of Object.keys(files)) fs.writeFileSync(path.join(OUTPUT_DIR, name), files[name]);
  console.log('Wrote ' + count + ' dictionaries to i18n/ from app ' + fullCommit.slice(0, 7) + '.');
}

main();
