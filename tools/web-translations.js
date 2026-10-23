#!/usr/bin/env node
/**
 * Website-only translations for the live preview (words that have no key in the app's
 * dictionaries). Kept apart from i18n/, which tools/build-translations.js generates from the app.
 *
 *   English source   WEB_TEXT in preview.js (shown when no published translation exists)
 *   For translators  i18n-web/source.en.json: every key with its English and a note
 *   Translations     i18n-web/<code>.json: one file per language
 *   Published list   i18n-web/manifest.json: only languages listed here are loaded by the site
 *
 * Each translated entry stores the English it was made from ("en"). The preview uses an entry
 * only while that English still matches WEB_TEXT, so editing English never shows a stale
 * translation; the entry falls back to English until it is translated again.
 *
 * A file's "status" says how far it has got, and the manifest repeats it as "quality":
 *   draft     work in progress; never loaded by the site
 *   machine   machine-translated, not checked by a person. "machineTranslatedBy" and
 *             "machineTranslatedOn" say how it was made; "reviewedBy"/"reviewedOn" must stay empty.
 *   reviewed  checked by a named person ("reviewedBy", "reviewedOn"). Use this when a native
 *             speaker has checked the wording; it then replaces the machine translation.
 * A machine file never overwrites a reviewed one.
 *
 * Usage (from the pickupradar-site folder):
 *   node tools/web-translations.js --check             validate everything (exit 1 on any problem)
 *   node tools/web-translations.js --write-source      rewrite both English source files
 *   node tools/web-translations.js --template <code>   start i18n-web/<code>.json (status "draft")
 *   node tools/web-translations.js --import-machine <file.json> --by "<tool or model>" --on <yyyy-mm-dd>
 *        write machine files from {"<code>": {"<key>": "<text>"}} (skips reviewed languages)
 *   node tools/web-translations.js --publish <code|all> add complete machine or reviewed files to the manifest
 *   node tools/web-translations.js --unpublish <code>  remove a language from the manifest
 *
 * The same commands take --site for the public pages (homepage, support, shared chrome).
 * That catalog is separate from the phone preview:
 *   English source   SITE_TEXT in site.js
 *   For translators  i18n-web/site-source.en.json
 *   Translations     i18n-web/site/<code>.json (none are generated in the foundation pass)
 *   Published list   i18n-web/site/manifest.json
 * Keys marked "app" are supplied by the app dictionaries and are not translated again.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const crypto = require('crypto');

const SITE = path.resolve(__dirname, '..');
const DIR = path.join(SITE, 'i18n-web');
const SOURCE_FILE = path.join(DIR, 'source.en.json');
const MANIFEST_FILE = path.join(DIR, 'manifest.json');

// Context for translators. Every WEB_TEXT key needs one.
const NOTES = {
  'getApp.title': 'Pop-up title on the website when an action needs the mobile app. Matches "Get the app".',
  'getApp.body': 'Pop-up when an action needs the mobile app. Keep the blank line. The app is not in the stores yet: do not say it can be downloaded.',
  'getApp.cityAlert': 'Pop-up after tapping a city that is coming soon. {city} is the city name: keep {city} exactly as written. Keep the blank line.',
  'getApp.cityRequest': 'Pop-up after tapping "Request your city". Keep the blank line.',
  'store.iosSoon': 'Label shown instead of the App Store button until the iPhone app is released.',
  'store.androidSoon': 'Label shown instead of the Google Play button until the Android app is released.',
  'store.ios': 'App Store button (not shown yet). Use the wording Apple uses in this language if it exists.',
  'store.android': 'Google Play button (not shown yet). Use the wording Google uses in this language if it exists.',
  'saved.appOnly': 'Saved tab on the website. Saving is only in the mobile app. Use the app\'s word for "pickup point".',
  'home.noVenues.title': 'Shown only if a city has no pickup points. Use the app\'s word for "pickup point".',
  'home.noVenues.body': 'Shown under the title above.',
  'location.useButton': 'Button on Home. The browser asks for location only after this tap.',
  'location.retryButton': 'Same button after location failed.',
  'location.deniedBrowser': 'Shown when the browser blocked location. Say browser settings (not phone settings).',
  'aria.filters': 'Screen-reader label for the row Nearby / Fast / Slow / Saved. Not shown on screen.',
  'aria.tutorial': 'Screen-reader label for the tutorial screen. Not shown on screen.',
  'aria.slide': 'Screen-reader label for each tutorial dot. Keep {number} and {total}, for example "Slide 1 of 3".',
  'share.copied': 'Short confirmation after the share message and venue link were copied (when the phone cannot open its share sheet). Two or three words, like "Link copied".',
};

function fail(message) {
  console.error(message);
  process.exit(1);
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(value, null, 2) + '\n');
}

function readWebText() {
  const source = fs.readFileSync(path.join(SITE, 'preview.js'), 'utf8').replace(/\r\n/g, '\n');
  const match = source.match(/\n  const WEB_TEXT = (\{\n[\s\S]*?\n  \});\n/);
  if (!match) fail('Could not find WEB_TEXT in preview.js');
  const value = vm.runInNewContext('(' + match[1] + ')', {});
  for (const [id, text] of Object.entries(value)) {
    if (typeof text !== 'string' || !text) fail('WEB_TEXT[' + id + '] must be a non-empty string');
  }
  return value;
}

function appLanguageCodes() {
  const manifest = readJson(path.join(SITE, 'i18n', 'manifest.json'));
  return Object.keys(manifest.languages || {});
}

const placeholders = (text) => (String(text).match(/\{\w+\}/g) || []).sort().join(',');
const breaks = (text) => (String(text).match(/\n\n/g) || []).length;
// Numbers (RP amounts, 2 hours, 3 reports, 6-digit code...) must survive translation.
// Local digits such as ۳ or ৩ count as the same number. {placeholders} are ignored.
const DIGIT_ZEROS = [0x0660, 0x06f0, 0x0966, 0x09e6, 0x0a66, 0x0ae6, 0x0b66, 0x0be6, 0x0c66, 0x0ce6, 0x0d66, 0x0de6, 0x0e50, 0x0ed0, 0x1040, 0x17e0, 0xff10];
const numbers = (text) => String(text)
  .replace(/\{\w+\}/g, ' ')
  .replace(/\p{Nd}/gu, (ch) => {
    const code = ch.codePointAt(0);
    const zero = DIGIT_ZEROS.find((z) => code >= z && code <= z + 9);
    return zero === undefined ? ch : String(code - zero);
  })
  .match(/\d+/g) || [];
const numberList = (text) => numbers(text).slice().sort().join(',');
const hashOf = (file) => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex').slice(0, 12);

function buildSource(webText) {
  const strings = {};
  for (const [id, en] of Object.entries(webText)) strings[id] = { en, note: NOTES[id] || '' };
  return {
    about: 'English source for the PickupRadar website preview. Translate "en" into the language; keep {placeholders} and blank lines. Do not translate PickupRadar, RadarPoints or city names.',
    strings,
  };
}

// Problems in one translation file. Errors block publishing; warnings are shown only.
function validateFile(code, webText, codes, protectedKeys, folder) {
  const errors = [];
  const warnings = [];
  // folder: i18n-web for the phone preview, i18n-web/site for the public pages.
  const file = path.join(folder || DIR, code + '.json');
  let data;
  try {
    data = readJson(file);
  } catch (error) {
    return { errors: ['not valid JSON: ' + error.message], warnings, translated: 0 };
  }
  if (!codes.includes(code) || code === 'en') errors.push('not one of the app\'s non-English language codes');
  if (data.language !== code) errors.push('"language" must be "' + code + '"');
  if (!['draft', 'machine', 'reviewed'].includes(data.status)) errors.push('"status" must be "draft", "machine" or "reviewed"');
  const strings = data.strings && typeof data.strings === 'object' ? data.strings : {};
  let translated = 0;
  for (const id of Object.keys(strings)) {
    if (protectedKeys && protectedKeys[id]) errors.push(id + ': comes from the app dictionary and is not translated in this file');
    else if (!(id in webText)) errors.push(id + ': unknown key');
  }
  for (const [id, en] of Object.entries(webText)) {
    const entry = strings[id];
    if (!entry || typeof entry.text !== 'string' || !entry.text.trim()) {
      warnings.push(id + ': not translated');
      continue;
    }
    const text = entry.text;
    if (entry.en !== en) {
      warnings.push(id + ': English changed since translation (shows English until updated)');
      continue;
    }
    if (placeholders(text) !== placeholders(en)) errors.push(id + ': placeholders ' + (placeholders(text) || 'none') + ', expected ' + (placeholders(en) || 'none'));
    if (numberList(text) !== numberList(en)) errors.push(id + ': numbers ' + (numberList(text) || 'none') + ', expected ' + (numberList(en) || 'none'));
    if (breaks(text) !== breaks(en)) errors.push(id + ': ' + breaks(text) + ' blank-line breaks, expected ' + breaks(en));
    if (/[<>]/.test(text)) errors.push(id + ': must not contain < or >');
    if (text !== text.trim()) errors.push(id + ': leading or trailing spaces');
    if (/PickupRadar/.test(en) && !/PickupRadar/.test(text)) errors.push(id + ': keep the name PickupRadar');
    translated += 1;
  }
  if (data.status === 'machine') {
    if (!data.machineTranslatedBy || !String(data.machineTranslatedBy).trim()) errors.push('"machineTranslatedBy" is required for a machine translation');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(data.machineTranslatedOn || ''))) errors.push('"machineTranslatedOn" must be a date like 2026-10-22');
    if ((data.reviewedBy && String(data.reviewedBy).trim()) || (data.reviewedOn && String(data.reviewedOn).trim())) errors.push('a machine translation must not name a reviewer');
  }
  if (data.status === 'reviewed') {
    if (!data.reviewedBy || !String(data.reviewedBy).trim()) errors.push('"reviewedBy" is required for a reviewed file');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(data.reviewedOn || ''))) errors.push('"reviewedOn" must be a date like 2026-10-22');
  }
  return { errors, warnings, translated, data };
}

function readManifest() {
  if (!fs.existsSync(MANIFEST_FILE)) return { languages: {} };
  const manifest = readJson(MANIFEST_FILE);
  if (!manifest.languages || typeof manifest.languages !== 'object') manifest.languages = {};
  return manifest;
}

function translationFiles() {
  if (!fs.existsSync(DIR)) return [];
  return fs.readdirSync(DIR)
    .filter((name) => name.endsWith('.json') && name !== 'manifest.json' && name !== 'source.en.json' && name !== 'site-source.en.json')
    .map((name) => name.slice(0, -5))
    .sort();
}

const SITE_DIR = path.join(DIR, 'site');
const SITE_SOURCE_FILE = path.join(DIR, 'site-source.en.json');
const SITE_MANIFEST_FILE = path.join(SITE_DIR, 'manifest.json');
const SITE_PAGES = ['index.html', 'app.html', 'support.html', '404.html'];
const ENGLISH_ONLY_PAGES = ['privacy.html', 'delete-account.html'];
const SITE_ABOUT = 'English source for the PickupRadar website pages. Translate "en" into the language. Keep {placeholders}, PickupRadar, city names, brand names and email addresses. Keys with "app" come from the app dictionary and must not be translated here. "appSlots" insert those app phrases. "domSlots" are link or bold phrases that stay in the page.';
const VOID_TAGS = { area: 1, base: 1, br: 1, col: 1, embed: 1, hr: 1, img: 1, input: 1, link: 1, meta: 1, source: 1, track: 1, wbr: 1 };

function readSiteEntries() {
  const source = fs.readFileSync(path.join(SITE, 'site.js'), 'utf8').replace(/\r\n/g, '\n');
  const match = source.match(/\/\* SITE_TEXT_START \*\/\n([\s\S]*?)\n {2}\/\* SITE_TEXT_END \*\//);
  if (!match) fail('Could not find SITE_TEXT in site.js');
  const value = vm.runInNewContext(match[1], {});
  if (!value || typeof value !== 'object') fail('SITE_TEXT must be an object');
  return value;
}

function buildSiteSource(entries) {
  const strings = {};
  for (const [id, entry] of Object.entries(entries)) {
    const out = { en: entry.en };
    if (entry.app) out.app = entry.app;
    if (entry.appSlots) out.appSlots = entry.appSlots;
    if (entry.domSlots) out.domSlots = entry.domSlots;
    out.note = entry.note;
    strings[id] = out;
  }
  return { about: SITE_ABOUT, strings };
}

function siteTranslatable(entries) {
  const webText = {};
  const protectedKeys = {};
  for (const [id, entry] of Object.entries(entries)) {
    if (entry.app) protectedKeys[id] = true;
    else webText[id] = entry.en;
  }
  return { webText, protectedKeys };
}

function siteTranslationFiles() {
  if (!fs.existsSync(SITE_DIR)) return [];
  return fs.readdirSync(SITE_DIR)
    .filter((name) => name.endsWith('.json') && name !== 'manifest.json')
    .map((name) => name.slice(0, -5))
    .sort();
}

function htmlAttr(raw, name) {
  const match = String(raw).match(new RegExp('(?:^|\\s)' + name + '="([^"]*)"'));
  return match ? match[1] : null;
}

function walkHtml(html, onOpen, onClose) {
  const re = /<!--[\s\S]*?-->|<\/([A-Za-z0-9]+)>|<([A-Za-z0-9]+)([^>]*)>/g;
  let match;
  while ((match = re.exec(html))) {
    if (match[0].indexOf('<!--') === 0) continue;
    if (match[1]) onClose(match[1].toLowerCase());
    else onOpen(match[2].toLowerCase(), match[3] || '', /\/\s*$/.test(match[3] || ''));
  }
}

function checkSiteHtml(entries) {
  const problems = [];
  const occurrences = [];
  for (const page of ENGLISH_ONLY_PAGES) {
    const html = fs.readFileSync(path.join(SITE, page), 'utf8');
    if (/data-site-i18n|data-site-language-open|data-site-i18n-page/.test(html)) {
      problems.push(page + ': stays in English and must not use the website language attributes');
    }
  }
  for (const page of SITE_PAGES) {
    const html = fs.readFileSync(path.join(SITE, page), 'utf8');
    if (!html.includes('data-site-i18n-page')) problems.push(page + ': missing data-site-i18n-page');
    const stack = [];
    walkHtml(html, (tag, raw, selfClosing) => {
      const key = htmlAttr(raw, 'data-site-i18n');
      const aria = htmlAttr(raw, 'data-site-i18n-aria');
      const slot = htmlAttr(raw, 'data-site-slot');
      const parent = stack.length ? stack[stack.length - 1] : null;
      if (parent && parent.key && !slot) problems.push(page + ': <' + tag + '> inside ' + parent.key + ' needs data-site-slot');
      if (slot) {
        let owner = null;
        for (let i = stack.length - 1; i >= 0; i--) if (stack[i].key) { owner = stack[i]; break; }
        if (!owner) problems.push(page + ': data-site-slot "' + slot + '" is outside a translated element');
        else owner.slots.push(slot);
      }
      const isVoid = VOID_TAGS[tag] || selfClosing;
      if (isVoid) {
        if (key || aria) occurrences.push({ page, key, aria, slots: [] });
        return;
      }
      stack.push({ tag, key, aria, slots: [] });
    }, (tag) => {
      while (stack.length) {
        const item = stack.pop();
        if (item.key || item.aria) occurrences.push({ page, key: item.key, aria: item.aria, slots: item.slots });
        if (item.tag === tag) break;
      }
    });
    if (stack.length) problems.push(page + ': unclosed HTML while checking translations');
  }
  const seen = new Set();
  for (const item of occurrences) {
    if (item.key) {
      seen.add(item.key);
      const entry = entries[item.key];
      if (!entry) problems.push(item.page + ': unknown data-site-i18n "' + item.key + '"');
      else {
        const expected = entry.domSlots || [];
        const actual = item.slots.slice().sort();
        if (actual.join(',') !== expected.slice().sort().join(',')) {
          problems.push(item.page + ': ' + item.key + ' slots ' + (actual.join(', ') || 'none') + ', expected ' + (expected.join(', ') || 'none'));
        }
      }
    }
    if (item.aria) {
      seen.add(item.aria);
      if (!entries[item.aria]) problems.push(item.page + ': unknown data-site-i18n-aria "' + item.aria + '"');
    }
  }
  return { problems, seen };
}

function checkSiteEntries(entries) {
  const problems = [];
  const english = readJson(path.join(SITE, 'i18n', 'en.json'));
  const documented = new Set();
  for (const [id, entry] of Object.entries(entries)) {
    if (!entry || typeof entry.en !== 'string' || !entry.en.trim()) problems.push(id + ': missing English');
    if (!entry || typeof entry.note !== 'string' || !entry.note.trim()) problems.push(id + ': missing note');
    if (!entry) continue;
    if (entry.app) {
      documented.add(entry.app);
      if (english[entry.app] !== entry.en) problems.push(id + ': English does not match app key ' + entry.app);
      if (entry.appSlots || entry.domSlots) problems.push(id + ': an app label cannot also have placeholders');
      continue;
    }
    const tokens = Array.from(new Set((entry.en.match(/\{\w+\}/g) || []).map((token) => token.slice(1, -1))));
    const declared = new Set([].concat(entry.domSlots || [], Object.keys(entry.appSlots || {})));
    tokens.forEach((token) => {
      if (!declared.has(token)) problems.push(id + ': {' + token + '} is not an app slot or a page slot');
    });
    declared.forEach((token) => {
      if (!entry.en.includes('{' + token + '}')) problems.push(id + ': {' + token + '} is declared but not used');
    });
    Object.entries(entry.appSlots || {}).forEach(([token, appKey]) => {
      if (typeof english[appKey] !== 'string') problems.push(id + ': {' + token + '} app key ' + appKey + ' is missing');
    });
    if (/[<>]/.test(entry.en)) problems.push(id + ': English must not contain < or >');
  }
  for (const [id, entry] of Object.entries(entries)) {
    Object.values(entry.appSlots || {}).forEach((appKey) => {
      if (!documented.has(appKey)) problems.push(id + ': {' + appKey + '} is not listed as an app label');
    });
  }
  return problems;
}

function check() {
  const webText = readWebText();
  const codes = appLanguageCodes();
  const problems = [];
  const missingNotes = Object.keys(webText).filter((id) => !NOTES[id]);
  const extraNotes = Object.keys(NOTES).filter((id) => !(id in webText));
  if (missingNotes.length) problems.push('NOTES missing for: ' + missingNotes.join(', '));
  if (extraNotes.length) problems.push('NOTES for unknown keys: ' + extraNotes.join(', '));
  const expectedSource = JSON.stringify(buildSource(webText), null, 2) + '\n';
  if (!fs.existsSync(SOURCE_FILE) || fs.readFileSync(SOURCE_FILE, 'utf8').replace(/\r\n/g, '\n') !== expectedSource) {
    problems.push('i18n-web/source.en.json is out of date: run --write-source');
  }
  const manifest = readManifest();
  const files = translationFiles();
  for (const code of Object.keys(manifest.languages)) {
    if (!files.includes(code)) problems.push('manifest lists ' + code + ' but i18n-web/' + code + '.json is missing');
  }
  const rows = [];
  for (const code of files) {
    const result = validateFile(code, webText, codes);
    const listed = manifest.languages[code];
    result.errors.forEach((error) => problems.push(code + ': ' + error));
    if (listed) {
      if (!result.data || !['machine', 'reviewed'].includes(result.data.status)) problems.push(code + ': published but status is not "machine" or "reviewed"');
      else if (listed.quality !== result.data.status) problems.push(code + ': manifest says "' + listed.quality + '" but the file says "' + result.data.status + '": run --publish ' + code);
      if (listed.v !== hashOf(path.join(DIR, code + '.json'))) problems.push(code + ': file changed since publishing: run --publish ' + code);
    }
    rows.push(code + '  ' + ((result.data && result.data.status) || '?') + (listed ? ', published' : '') + '  ' + result.translated + '/' + Object.keys(webText).length + (result.warnings.length ? '  (' + result.warnings.length + ' notes)' : ''));
  }
  console.log('Website-only keys: ' + Object.keys(webText).length + '. Translation files: ' + files.length + '. Published: ' + Object.keys(manifest.languages).length + '.');
  rows.forEach((row) => console.log('  ' + row));
  const entries = readSiteEntries();
  problems.push.apply(problems, checkSiteEntries(entries));
  const html = checkSiteHtml(entries);
  problems.push.apply(problems, html.problems);
  const runtime = fs.readFileSync(path.join(SITE, 'site.js'), 'utf8').replace(/\/\* SITE_TEXT_START \*\/[\s\S]*?\/\* SITE_TEXT_END \*\//, '');
  const pageText = SITE_PAGES.map((page) => fs.readFileSync(path.join(SITE, page), 'utf8')).join('\n');
  const slottedAppKeys = new Set();
  Object.values(entries).forEach((entry) => {
    Object.values(entry.appSlots || {}).forEach((appKey) => slottedAppKeys.add(appKey));
  });
  Object.entries(entries).forEach(([id, entry]) => {
    if (html.seen.has(id)) return;
    if (entry.app && slottedAppKeys.has(entry.app)) return;
    if (runtime.indexOf("'" + id + "'") !== -1 || runtime.indexOf('"' + id + '"') !== -1) return;
    if (pageText.indexOf('"' + id + '"') !== -1) return;
    problems.push(id + ': unused website string');
  });
  const expectedSiteSource = JSON.stringify(buildSiteSource(entries), null, 2) + '\n';
  if (!fs.existsSync(SITE_SOURCE_FILE) || fs.readFileSync(SITE_SOURCE_FILE, 'utf8').replace(/\r\n/g, '\n') !== expectedSiteSource) {
    problems.push('i18n-web/site-source.en.json is out of date: run --write-source');
  }
  const siteManifest = fs.existsSync(SITE_MANIFEST_FILE) ? readJson(SITE_MANIFEST_FILE) : { languages: {} };
  if (!siteManifest.languages || typeof siteManifest.languages !== 'object') problems.push('i18n-web/site/manifest.json needs a languages object');
  const siteLanguages = siteManifest.languages || {};
  const siteFiles = siteTranslationFiles();
  const siteEnglish = siteTranslatable(entries);
  for (const code of Object.keys(siteLanguages)) {
    if (!siteFiles.includes(code)) problems.push('site manifest lists ' + code + ' but i18n-web/site/' + code + '.json is missing');
  }
  const siteRows = [];
  for (const code of siteFiles) {
    const result = validateFile(code, siteEnglish.webText, codes, siteEnglish.protectedKeys, SITE_DIR);
    const listed = siteLanguages[code];
    result.errors.forEach((error) => problems.push('site ' + code + ': ' + error));
    if (listed) {
      if (!result.data || !['machine', 'reviewed'].includes(result.data.status)) problems.push('site ' + code + ': published but status is not "machine" or "reviewed"');
      else if (listed.quality !== result.data.status) problems.push('site ' + code + ': manifest quality does not match the file: run --publish ' + code + ' --site');
      if (listed.v !== hashOf(path.join(SITE_DIR, code + '.json'))) problems.push('site ' + code + ': file changed since publishing: run --publish ' + code + ' --site');
    }
    siteRows.push(code + '  ' + ((result.data && result.data.status) || '?') + (listed ? ', published' : '') + '  ' + result.translated + '/' + Object.keys(siteEnglish.webText).length);
  }
  const appLabels = Object.values(entries).filter((entry) => entry.app).length;
  console.log('Site catalog: ' + Object.keys(siteEnglish.webText).length + ' page strings to translate, ' + appLabels + ' app labels. Files: ' + siteFiles.length + '. Published: ' + Object.keys(siteLanguages).length + '.');
  siteRows.forEach((row) => console.log('  ' + row));
  if (problems.length) {
    problems.forEach((problem) => console.error('PROBLEM ' + problem));
    process.exit(1);
  }
  console.log('i18n-web is valid.');
}

function main() {
  const args = process.argv.slice(2);
  const siteMode = args.indexOf('--site') !== -1;
  const positional = [];
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--site') continue;
    if (args[i] === '--by' || args[i] === '--on') { i += 1; continue; }
    positional.push(args[i]);
  }
  const command = positional[0] || '--check';
  const code = positional[1];
  if (command === '--check') return check();
  if (command === '--write-source') {
    writeJson(SOURCE_FILE, buildSource(readWebText()));
    if (!fs.existsSync(MANIFEST_FILE)) writeJson(MANIFEST_FILE, { languages: {} });
    writeJson(SITE_SOURCE_FILE, buildSiteSource(readSiteEntries()));
    if (!fs.existsSync(SITE_MANIFEST_FILE)) writeJson(SITE_MANIFEST_FILE, { languages: {} });
    console.log('Wrote i18n-web/source.en.json');
    console.log('Wrote i18n-web/site-source.en.json');
    return;
  }
  if (!code) fail('Give a language code or file, for example: --template pt');
  const codes = appLanguageCodes();
  let webText;
  let protectedKeys = null;
  let dir = DIR;
  let manifestFile = MANIFEST_FILE;
  const label = siteMode ? 'i18n-web/site' : 'i18n-web';
  if (siteMode) {
    const parts = siteTranslatable(readSiteEntries());
    webText = parts.webText;
    protectedKeys = parts.protectedKeys;
    dir = SITE_DIR;
    manifestFile = SITE_MANIFEST_FILE;
  } else {
    webText = readWebText();
  }
  const file = path.join(dir, code + '.json');
  const listFiles = siteMode ? siteTranslationFiles : translationFiles;
  function readCatManifest() {
    if (!fs.existsSync(manifestFile)) return { languages: {} };
    const manifest = readJson(manifestFile);
    if (!manifest.languages || typeof manifest.languages !== 'object') manifest.languages = {};
    return manifest;
  }
  if (command === '--template') {
    if (!codes.includes(code) || code === 'en') fail(code + ' is not one of the app\'s non-English language codes');
    if (fs.existsSync(file)) fail('i18n-web/' + code + '.json already exists');
    const strings = {};
    for (const [id, en] of Object.entries(webText)) strings[id] = { en, text: '' };
    writeJson(file, { language: code, status: 'draft', reviewedBy: '', reviewedOn: '', strings });
    console.log('Wrote ' + label + '/' + code + '.json (draft; not loaded by the site until published)');
    return;
  }
  if (command === '--publish') {
    const targets = code === 'all' ? listFiles() : [code];
    const manifest = readCatManifest();
    let failed = 0;
    for (const target of targets) {
      const targetFile = path.join(dir, target + '.json');
      if (!fs.existsSync(targetFile)) {
        console.error('PROBLEM ' + label + '/' + target + '.json not found');
        failed += 1;
        continue;
      }
      const result = validateFile(target, webText, codes, protectedKeys, dir);
      const incomplete = result.warnings.filter((warning) => /not translated|English changed/.test(warning));
      const status = result.data && result.data.status;
      if (code === 'all' && status === 'draft') continue;
      if (result.errors.length || incomplete.length || !['machine', 'reviewed'].includes(status)) {
        result.errors.concat(incomplete).forEach((problem) => console.error('PROBLEM ' + target + ': ' + problem));
        if (!['machine', 'reviewed'].includes(status)) console.error('PROBLEM ' + target + ': status must be "machine" or "reviewed"');
        failed += 1;
        continue;
      }
      manifest.languages[target] = {
        v: hashOf(targetFile),
        keys: result.translated,
        quality: status,
        date: status === 'reviewed' ? result.data.reviewedOn : result.data.machineTranslatedOn,
      };
      console.log('Published ' + target + ' (' + status + ', ' + result.translated + ' keys)');
    }
    manifest.languages = Object.fromEntries(Object.entries(manifest.languages).sort(([x], [y]) => x.localeCompare(y)));
    writeJson(manifestFile, manifest);
    if (failed) fail(failed + ' language(s) not published');
    return;
  }
  if (command === '--import-machine') {
    const input = readJson(path.resolve(code));
    const by = args[args.indexOf('--by') + 1];
    const on = args[args.indexOf('--on') + 1];
    if (args.indexOf('--by') === -1 || !by || !by.trim()) fail('Give --by "<tool or model>"');
    if (args.indexOf('--on') === -1 || !/^\d{4}-\d{2}-\d{2}$/.test(on || '')) fail('Give --on <yyyy-mm-dd>');
    let written = 0;
    for (const [lang, texts] of Object.entries(input)) {
      if (!codes.includes(lang) || lang === 'en') fail(lang + ' is not one of the app\'s non-English language codes');
      const target = path.join(dir, lang + '.json');
      if (fs.existsSync(target) && readJson(target).status === 'reviewed') {
        console.log('Skipped ' + lang + ': it has a reviewed translation');
        continue;
      }
      const strings = {};
      for (const [id, en] of Object.entries(webText)) {
        strings[id] = { en, text: typeof texts[id] === 'string' ? texts[id] : '' };
      }
      for (const id of Object.keys(texts)) {
        if (protectedKeys && protectedKeys[id]) fail(lang + ': ' + id + ' comes from the app dictionary');
        if (!(id in webText)) fail(lang + ': unknown key ' + id);
      }
      writeJson(target, { language: lang, status: 'machine', machineTranslatedBy: by.trim(), machineTranslatedOn: on, reviewedBy: '', reviewedOn: '', strings });
      written += 1;
    }
    console.log('Wrote ' + written + ' machine translation file(s). Run --check, then --publish all' + (siteMode ? ' --site' : '') + '.');
    return;
  }
  if (command === '--unpublish') {
    const manifest = readCatManifest();
    delete manifest.languages[code];
    writeJson(manifestFile, manifest);
    console.log('Removed ' + code + ' from the manifest');
    return;
  }
  fail('Unknown command: ' + command);
}

main();
