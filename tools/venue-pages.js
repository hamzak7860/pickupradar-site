#!/usr/bin/env node
'use strict';

/*
 * Venue share pages for pickupradar.co.uk (GitHub Pages, no server).
 *
 * For each active venue this writes:
 *   v/<venue-id>/index.html   small page with the venue's own link-preview tags
 *                             (title, description, image). It sends visitors
 *                             straight on to the live preview for that venue.
 *   v/<venue-id>/card.jpg     1200x630 link-preview image: venue name and area.
 *                             It never shows a wait, because WhatsApp and other
 *                             apps keep a saved copy of the preview.
 *   v/venues.json             list of generated venues (id -> name, area, city).
 *
 * The page and image only use public venue fields: name, area, brand, branch,
 * address, postcode, city, zone and venue type. Names and areas come from the
 * same rules the app and the live preview use (pickupradar-logic.js).
 *
 * Usage:
 *   node tools/venue-pages.js --fetch [--city "Milton Keynes"] [--only <id,id>] [--images] [--prune]
 *   node tools/venue-pages.js --from venues.json [--only <id,id>] [--images]
 *   node tools/venue-pages.js --check
 *
 *   --fetch    read active venues from the public Supabase API (same public key
 *              and query as the live preview). Needs network access.
 *   --from     read venues from a JSON file (an array of venue rows) instead.
 *   --only     only write pages for these venue ids (the others are still used
 *              to tell same-name venues apart, as in the app).
 *   --city     a live city (repeatable). Default: the live cities in preview.js (SITE_CITIES).
 *   --images   also draw card.jpg with Playwright (npm install playwright).
 *              Without it, existing images are kept and new venues get none.
 *   --prune    with --fetch and no --only: delete pages of venues that are no
 *              longer active in those cities (used by the GitHub workflow).
 *              Without it nothing is deleted; the venues are listed instead.
 *   --check    check v/ against v/venues.json without writing anything.
 *
 * Files are only written when their content changes, and images are only
 * redrawn when the venue name, area, city, icon or card design changes.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const crypto = require('crypto');

const SITE = path.resolve(__dirname, '..');
const OUT = path.join(SITE, 'v');
const MANIFEST = path.join(OUT, 'venues.json');
const ORIGIN = 'https://pickupradar.co.uk';
const DESIGN = 2; // Change this to redraw every image after a card design change.
const ID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const FIELDS = 'id,name,area,brand,branch,address,postcode,city,zone,venue_type,is_active';

function args() {
  const a = process.argv.slice(2);
  const out = { cities: [], only: null };
  for (let i = 0; i < a.length; i++) {
    const k = a[i];
    if (k === '--fetch') out.fetch = true;
    else if (k === '--from') out.from = a[++i];
    else if (k === '--city') out.cities.push(a[++i]);
    else if (k === '--only') out.only = new Set(String(a[++i] || '').split(',').map((s) => s.trim().toLowerCase()).filter(Boolean));
    else if (k === '--images') out.images = true;
    else if (k === '--check') out.check = true;
    else if (k === '--prune') out.prune = true;
    else throw new Error('Unknown option ' + k);
  }
  if (!out.cities.length) out.cities = liveCities();
  return out;
}

function liveCities() {
  const src = fs.readFileSync(path.join(SITE, 'preview.js'), 'utf8');
  const m = src.match(/const SITE_CITIES = (\[[^\]]*\]);/);
  if (!m) throw new Error('Could not find SITE_CITIES in preview.js');
  const list = vm.runInNewContext(m[1]);
  if (!Array.isArray(list) || !list.length) throw new Error('SITE_CITIES is empty');
  return list.map(String);
}

// Write only when the content changes, so unchanged pages are not touched.
function writeIfChanged(file, content) {
  try {
    if (fs.readFileSync(file, 'utf8') === content) return false;
  } catch (error) {
    // New file.
  }
  fs.writeFileSync(file, content);
  return true;
}

function loadLogic() {
  const sandbox = { console };
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(path.join(SITE, 'pickupradar-logic.js'), 'utf8'), sandbox, { filename: 'pickupradar-logic.js' });
  if (!sandbox.PickupRadarLogic || !sandbox.PickupRadarLogic.venueDisplay) throw new Error('pickupradar-logic.js did not load');
  return sandbox.PickupRadarLogic;
}

function publicKey() {
  const src = fs.readFileSync(path.join(SITE, 'preview.js'), 'utf8');
  const url = src.match(/const SUPABASE_URL = '([^']+)'/);
  const key = src.match(/const SUPABASE_ANON_KEY = '([^']+)'/);
  if (!url || !key) throw new Error('Could not find the public Supabase settings in preview.js');
  return { url: url[1], key: key[1] };
}

async function fetchVenues(city) {
  const { url, key } = publicKey();
  const rows = [];
  for (let offset = 0; ; offset += 1000) {
    const res = await fetch(
      url + '/rest/v1/venues?select=' + FIELDS + '&city=eq.' + encodeURIComponent(city) +
        '&is_active=eq.true&order=id.asc&limit=1000&offset=' + offset,
      { headers: { apikey: key, Authorization: 'Bearer ' + key } }
    );
    if (!res.ok) throw new Error('Venue request failed (' + res.status + ')');
    const page = await res.json();
    rows.push.apply(rows, page);
    if (page.length < 1000) break;
  }
  return rows;
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const hash = (s) => crypto.createHash('sha256').update(s).digest('hex').slice(0, 10);

function describe(logic, venue, cityVenues) {
  const VD = logic.venueDisplay;
  const city = venue.city;
  const name = String(VD.getVenueDisplayName(venue, city, cityVenues) || venue.name || '').trim();
  const area = String(VD.getVenueHomeLocationLabel(venue, cityVenues, city) || venue.area || '').trim();
  const icon = VD.getVenueTypeIconName(venue.venue_type);
  return { id: venue.id, name, area, city, icon };
}

function liveUrl(info) {
  return '/app.html?city=' + encodeURIComponent(info.city) + '&venue=' + info.id;
}

function pageHtml(info, imageVersion) {
  const place = info.area ? info.area + ', ' + info.city : info.city;
  const title = info.area ? info.name + ' · ' + info.area : info.name;
  const desc = 'Check the latest pickup wait at ' + info.name + ', ' + place + ', on PickupRadar.';
  const self = ORIGIN + '/v/' + info.id + '/';
  const image = self + 'card.jpg?v=' + imageVersion;
  const target = liveUrl(info);
  return `<!doctype html>
<html lang="en-GB">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(title)} — PickupRadar</title>
  <meta name="description" content="${esc(desc)}" />
  <meta name="robots" content="noindex, follow" />
  <link rel="canonical" href="${esc(self)}" />
  <link rel="icon" href="/assets/favicon-32.png" type="image/png" sizes="32x32" />
  <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png" sizes="180x180" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="PickupRadar" />
  <meta property="og:url" content="${esc(self)}" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(place + ' · Check the latest pickup wait.')}" />
  <meta property="og:image" content="${esc(image)}" />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="${esc('PickupRadar: ' + info.name + ', ' + place)}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(title)}" />
  <meta name="twitter:description" content="${esc(place + ' · Check the latest pickup wait.')}" />
  <meta name="twitter:image" content="${esc(image)}" />
  <meta name="theme-color" content="#071018" />
  <style>
    html { background: #071018; color: #f6faff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; }
    body { margin: 0; min-height: 100vh; display: grid; place-items: center; padding: 24px 16px; box-sizing: border-box; }
    main { width: 100%; max-width: 420px; }
    .brand { display: flex; align-items: center; gap: 10px; font-weight: 800; font-size: 22px; color: #f6faff; text-decoration: none; }
    .brand span span { color: #13db85; }
    .card { margin: 22px 0; padding: 18px 20px; background: #0e1822; border: 1px solid #182837; border-radius: 22px; }
    .card h1 { margin: 0; font-size: 24px; line-height: 1.2; overflow-wrap: anywhere; }
    .card p { margin: 6px 0 0; color: #89a0b8; font-weight: 600; overflow-wrap: anywhere; }
    .go { display: block; text-align: center; padding: 15px 18px; border-radius: 14px; background: #33c977; color: #06170e; font-weight: 800; text-decoration: none; }
  </style>
</head>
<body>
  <main>
    <a class="brand" href="/"><img src="/assets/pickupradar-mark-96.png" alt="" width="36" height="36" /><span>Pickup<span>Radar</span></span></a>
    <div class="card">
      <h1>${esc(info.name)}</h1>
      <p>${esc(place)}</p>
    </div>
    <a class="go" href="${esc(target)}">See the latest wait</a>
  </main>
  <script>location.replace(${JSON.stringify(target)});</script>
</body>
</html>
`;
}

function cardHtml(info, icons, logoDataUrl, fontUrl) {
  const iconBody = icons[info.icon] || icons['restaurant-outline'] || '';
  return `<!doctype html><html><head><meta charset="utf-8"><style>
  @font-face { font-family: 'Archivo PR'; src: url('${fontUrl}') format('woff2'); font-weight: 100 900; font-stretch: 62% 125%; }
  * { box-sizing: border-box; }
  html, body { margin: 0; width: 1200px; height: 630px; overflow: hidden; background: #071018; }
  body { font-family: 'Archivo PR', Arial, sans-serif; color: #f6faff; position: relative; }
  .rings { position: absolute; right: -230px; top: -140px; width: 900px; height: 900px; border-radius: 50%;
    background: radial-gradient(circle, transparent 0 29.6%, rgba(19,219,133,.16) 29.8% 30.2%, transparent 30.4% 46.6%, rgba(19,219,133,.12) 46.8% 47.2%, transparent 47.4% 63.6%, rgba(19,219,133,.08) 63.8% 64.2%, transparent 64.4%); }
  .brand { position: absolute; left: 72px; top: 60px; display: flex; align-items: center; gap: 18px; font-weight: 800; font-size: 46px; letter-spacing: -0.5px; }
  .brand img { width: 72px; height: 72px; }
  .brand b { color: #13db85; font-weight: 800; }
  .card { position: absolute; left: 72px; right: 72px; top: 196px; padding: 44px 48px 40px; background: #0e1822; border: 2px solid #1d3244; border-radius: 40px; box-shadow: 0 30px 80px rgba(0,0,0,.45); }
  .row { display: flex; align-items: flex-start; gap: 24px; }
  .icon { flex: none; width: 64px; height: 64px; margin-top: 10px; color: #8fb5d7; }
  .icon svg { width: 64px; height: 64px; }
  .text { min-width: 0; flex: 1; }
  .name { margin: 0; font-weight: 800; font-size: 84px; line-height: 1.05; letter-spacing: -1.5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .area { margin: 14px 0 0; color: #a8bed1; font-weight: 600; font-size: 38px; line-height: 1.2; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .foot { display: flex; align-items: center; justify-content: space-between; margin-top: 34px; padding-left: 88px; }
  .cta { display: inline-flex; align-items: center; gap: 14px; padding: 14px 26px; border-radius: 999px; background: rgba(51,201,119,.14); border: 2px solid rgba(51,201,119,.5); color: #6fe3a3; font-weight: 700; font-size: 32px; }
  .cta svg { width: 32px; height: 32px; }
  .site { color: #89a0b8; font-weight: 600; font-size: 30px; }
</style></head><body>
  <div class="rings"></div>
  <div class="brand"><img src="${logoDataUrl}" alt=""><span>Pickup<b>Radar</b></span></div>
  <div class="card">
    <div class="row">
      <div class="icon"><svg viewBox="0 0 24 24">${iconBody}</svg></div>
      <div class="text">
        <h1 class="name" id="name">${esc(info.name)}</h1>
        <p class="area" id="area">${esc(info.area ? info.area + ' · ' + info.city : info.city)}</p>
      </div>
    </div>
    <div class="foot">
      <span class="cta"><svg viewBox="0 0 24 24">${icons.stopwatch || ''}</svg>Check the latest pickup wait</span>
      <span class="site">pickupradar.co.uk</span>
    </div>
  </div>
  <script>
    // Shrink long names and areas to fit on one line.
    function fit(el, min) {
      let size = parseFloat(getComputedStyle(el).fontSize);
      while (el.scrollWidth > el.clientWidth && size > min) { size -= 2; el.style.fontSize = size + 'px'; }
    }
    document.fonts.ready.then(function () { fit(document.getElementById('name'), 46); fit(document.getElementById('area'), 26); document.body.dataset.ready = '1'; });
  </script>
</body></html>`;
}

function readIcons() {
  const src = fs.readFileSync(path.join(SITE, 'preview.js'), 'utf8');
  const m = src.match(/const PR_ICONS = (\{[\s\S]*?\n\});/);
  if (!m) throw new Error('Could not read the icons from preview.js');
  return vm.runInNewContext('(' + m[1] + ')');
}

async function drawImages(jobs) {
  let playwright;
  try {
    playwright = require('playwright');
  } catch (error) {
    console.log('Playwright is not installed, so no images were drawn. Run: npm install playwright');
    return 0;
  }
  const icons = readIcons();
  const logo = 'data:image/png;base64,' + fs.readFileSync(path.join(SITE, 'assets', 'pickupradar-mark-96.png')).toString('base64');
  const font = 'data:font/woff2;base64,' + fs.readFileSync(path.join(SITE, 'assets', 'fonts', 'archivo-latin-variable.woff2')).toString('base64');
  const browser = await playwright.chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  let drawn = 0;
  for (const info of jobs) {
    await page.setContent(cardHtml(info, icons, logo, font));
    await page.waitForSelector('body[data-ready="1"]');
    await page.screenshot({ path: path.join(OUT, info.id, 'card.jpg'), type: 'jpeg', quality: 88 });
    drawn++;
  }
  await browser.close();
  return drawn;
}

function readManifest() {
  try {
    return JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
  } catch (error) {
    return { venues: {} };
  }
}

function check() {
  const manifest = readManifest();
  const problems = [];
  const listed = Object.keys(manifest.venues || {});
  const folders = fs.existsSync(OUT) ? fs.readdirSync(OUT).filter((n) => ID_RE.test(n)) : [];
  for (const id of listed) {
    if (!fs.existsSync(path.join(OUT, id, 'index.html'))) problems.push(id + ': listed but v/' + id + '/index.html is missing');
    if (!fs.existsSync(path.join(OUT, id, 'card.jpg'))) problems.push(id + ': card.jpg is missing');
    if (fs.existsSync(path.join(OUT, id, 'card.png'))) problems.push(id + ': old card.png is still there (git rm v/' + id + '/card.png)');
  }
  for (const id of folders) if (!manifest.venues[id]) problems.push(id + ': folder is not in v/venues.json');
  problems.forEach((p) => console.log('PROBLEM ' + p));
  console.log(listed.length + ' venue pages listed. ' + (problems.length ? problems.length + ' problems.' : 'v/ is valid.'));
  process.exitCode = problems.length ? 1 : 0;
}

async function main() {
  const opt = args();
  if (opt.check) return check();
  if (!opt.fetch && !opt.from) throw new Error('Use --fetch or --from <file>');

  const logic = loadLogic();
  let venues = [];
  if (opt.from) venues = JSON.parse(fs.readFileSync(path.resolve(opt.from), 'utf8'));
  else for (const city of opt.cities) venues = venues.concat(await fetchVenues(city));
  venues = venues.filter((v) => v && v.is_active !== false && ID_RE.test(String(v.id)) && v.city);

  const byCity = {};
  venues.forEach((v) => (byCity[v.city] = byCity[v.city] || []).push(v));

  const manifest = readManifest();
  manifest.venues = manifest.venues || {};
  fs.mkdirSync(OUT, { recursive: true });

  const written = [];
  let changedPages = 0;
  const toDraw = [];
  for (const venue of venues) {
    if (opt.only && !opt.only.has(venue.id)) continue;
    const info = describe(logic, venue, byCity[venue.city]);
    if (!info.name) continue;
    const version = hash(JSON.stringify([info.name, info.area, info.city, info.icon, DESIGN]));
    const dir = path.join(OUT, info.id);
    fs.mkdirSync(dir, { recursive: true });
    if (writeIfChanged(path.join(dir, 'index.html'), pageHtml(info, version))) changedPages++;
    const old = manifest.venues[info.id];
    const hasImage = fs.existsSync(path.join(dir, 'card.jpg'));
    if (opt.images && (!hasImage || !old || old.v !== version)) toDraw.push(info);
    manifest.venues[info.id] = { name: info.name, area: info.area, city: info.city, v: version };
    written.push(info);
  }

  const drawn = toDraw.length ? await drawImages(toDraw) : 0;

  // Pages for venues that are no longer active in these cities.
  const fullRun = opt.fetch && !opt.only;
  const active = new Set(venues.map((v) => v.id));
  const stale = fullRun
    ? Object.keys(manifest.venues).filter((id) => !active.has(id) && opt.cities.includes(manifest.venues[id].city))
    : [];
  if (opt.prune && fullRun) {
    stale.forEach((id) => fs.rmSync(path.join(OUT, id), { recursive: true, force: true }));
  }
  // Old PNG images from the prototype (now JPEG).
  if (opt.prune && opt.images) {
    written.forEach((i) => fs.rmSync(path.join(OUT, i.id, 'card.png'), { force: true }));
  }

  // Forget venues whose folder was removed (for example with git rm -r v/<id>).
  Object.keys(manifest.venues).forEach((id) => {
    if (!fs.existsSync(path.join(OUT, id, 'index.html'))) delete manifest.venues[id];
  });

  const sorted = {};
  Object.keys(manifest.venues).sort().forEach((id) => (sorted[id] = manifest.venues[id]));
  writeIfChanged(MANIFEST, JSON.stringify({ about: 'Venue share pages made by tools/venue-pages.js. Do not edit by hand.', venues: sorted }, null, 2) + '\n');

  console.log('Venues: ' + venues.length + ' active in ' + opt.cities.join(', ') + '. Pages: ' + written.length + ' (' + changedPages + ' changed). Images drawn: ' + drawn + '.');
  if (written.length <= 10) written.forEach((i) => console.log('  ' + ORIGIN + '/v/' + i.id + '/  ' + i.name + (i.area ? ' · ' + i.area : '')));

  if (stale.length && !opt.prune) {
    console.log('\nNo longer active. Their pages still open the live preview, which shows the Home list:');
    stale.forEach((id) => console.log('  git rm -r v/' + id + '   # ' + sorted[id].name + ' · ' + sorted[id].area));
    console.log('Then re-run this script, or run it with --prune.');
  } else if (stale.length) {
    console.log('Removed ' + stale.length + ' pages of venues that are no longer active.');
  }
}

main().catch((error) => {
  console.error(error.message || error);
  process.exitCode = 1;
});
