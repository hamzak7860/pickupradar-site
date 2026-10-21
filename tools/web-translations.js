#!/usr/bin/env node
/**
 * Website-only translations for the live preview (words that have no key in the app's
 * dictionaries). Kept apart from i18n/, which tools/build-translations.js generates from the app.
 *
 *   English source   WEB_TEXT in preview.js (always shown when no reviewed translation exists)
 *   For translators  i18n-web/source.en.json: every key with its English and a note
 *   Translations     i18n-web/<code>.json: one file per language
 *   Published list   i18n-web/manifest.json: only languages listed here are loaded by the site
 *
 * Each translated entry stores the English it was made from ("en"). The preview uses an entry
 * only while that English still matches WEB_TEXT, so editing English never shows a stale
 * translation; the entry falls back to English until it is translated again.
 *
 * Usage (from the pickupradar-site folder):
 *   node tools/web-translations.js --check            validate everything (exit 1 on any problem)
 *   node tools/web-translations.js --write-source     rewrite i18n-web/source.en.json from WEB_TEXT
 *   node tools/web-translations.js --template <code>  start i18n-web/<code>.json (status "draft")
 *   node tools/web-translations.js --publish <code>   add a reviewed, complete file to the manifest
 *   node tools/web-translations.js --unpublish <code> remove a language from the manifest
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
function validateFile(code, webText, codes) {
  const errors = [];
  const warnings = [];
  const file = path.join(DIR, code + '.json');
  let data;
  try {
    data = readJson(file);
  } catch (error) {
    return { errors: ['not valid JSON: ' + error.message], warnings, translated: 0 };
  }
  if (!codes.includes(code) || code === 'en') errors.push('not one of the app\'s non-English language codes');
  if (data.language !== code) errors.push('"language" must be "' + code + '"');
  if (!['draft', 'reviewed'].includes(data.status)) errors.push('"status" must be "draft" or "reviewed"');
  const strings = data.strings && typeof data.strings === 'object' ? data.strings : {};
  let translated = 0;
  for (const id of Object.keys(strings)) {
    if (!(id in webText)) errors.push(id + ': unknown key');
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
    if (breaks(text) !== breaks(en)) errors.push(id + ': ' + breaks(text) + ' blank-line breaks, expected ' + breaks(en));
    if (/[<>]/.test(text)) errors.push(id + ': must not contain < or >');
    if (text !== text.trim()) errors.push(id + ': leading or trailing spaces');
    if (/PickupRadar/.test(en) && !/PickupRadar/.test(text)) errors.push(id + ': keep the name PickupRadar');
    translated += 1;
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
    .filter((name) => name.endsWith('.json') && name !== 'manifest.json' && name !== 'source.en.json')
    .map((name) => name.slice(0, -5))
    .sort();
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
      if (result.data && result.data.status !== 'reviewed') problems.push(code + ': published but status is not "reviewed"');
      if (listed.v !== hashOf(path.join(DIR, code + '.json'))) problems.push(code + ': file changed since publishing: run --publish ' + code);
    }
    rows.push(code + '  ' + (listed ? 'published' : (result.data && result.data.status) || '?') + '  ' + result.translated + '/' + Object.keys(webText).length + (result.warnings.length ? '  (' + result.warnings.length + ' notes)' : ''));
  }
  console.log('Website-only keys: ' + Object.keys(webText).length + '. Translation files: ' + files.length + '. Published: ' + Object.keys(manifest.languages).length + '.');
  rows.forEach((row) => console.log('  ' + row));
  if (problems.length) {
    problems.forEach((problem) => console.error('PROBLEM ' + problem));
    process.exit(1);
  }
  console.log('i18n-web is valid.');
}

function main() {
  const args = process.argv.slice(2);
  const command = args[0] || '--check';
  const code = args[1];
  if (command === '--check') return check();
  if (command === '--write-source') {
    writeJson(SOURCE_FILE, buildSource(readWebText()));
    if (!fs.existsSync(MANIFEST_FILE)) writeJson(MANIFEST_FILE, { languages: {} });
    console.log('Wrote i18n-web/source.en.json');
    return;
  }
  if (!code) fail('Give a language code, for example: --template pt');
  const webText = readWebText();
  const codes = appLanguageCodes();
  const file = path.join(DIR, code + '.json');
  if (command === '--template') {
    if (!codes.includes(code) || code === 'en') fail(code + ' is not one of the app\'s non-English language codes');
    if (fs.existsSync(file)) fail('i18n-web/' + code + '.json already exists');
    const strings = {};
    for (const [id, en] of Object.entries(webText)) strings[id] = { en, text: '' };
    writeJson(file, { language: code, status: 'draft', reviewedBy: '', reviewedOn: '', strings });
    console.log('Wrote i18n-web/' + code + '.json (draft; not loaded by the site until published)');
    return;
  }
  if (command === '--publish') {
    if (!fs.existsSync(file)) fail('i18n-web/' + code + '.json not found');
    const result = validateFile(code, webText, codes);
    const incomplete = result.warnings.filter((warning) => /not translated|English changed/.test(warning));
    if (result.errors.length || incomplete.length || !result.data || result.data.status !== 'reviewed') {
      result.errors.concat(incomplete).forEach((problem) => console.error('PROBLEM ' + code + ': ' + problem));
      if (result.data && result.data.status !== 'reviewed') console.error('PROBLEM ' + code + ': status must be "reviewed"');
      process.exit(1);
    }
    const manifest = readManifest();
    manifest.languages[code] = { v: hashOf(file), keys: result.translated, reviewedOn: result.data.reviewedOn };
    manifest.languages = Object.fromEntries(Object.entries(manifest.languages).sort(([a], [b]) => a.localeCompare(b)));
    writeJson(MANIFEST_FILE, manifest);
    console.log('Published ' + code + ' (' + result.translated + ' keys)');
    return;
  }
  if (command === '--unpublish') {
    const manifest = readManifest();
    delete manifest.languages[code];
    writeJson(MANIFEST_FILE, manifest);
    console.log('Removed ' + code + ' from the manifest');
    return;
  }
  fail('Unknown command: ' + command);
}

main();
