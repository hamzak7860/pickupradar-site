'use strict';

const PR_ICONS = {
  location:
    '<path fill="currentColor" d="M12 2.2A6.8 6.8 0 0 0 5.2 9c0 4.9 5.3 10.7 6.3 11.6a.8.8 0 0 0 1 0C13.5 19.7 18.8 13.9 18.8 9A6.8 6.8 0 0 0 12 2.2zm0 9.2a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8z"/>',
  chevron:
    '<path fill="currentColor" d="M6.7 8.8a1 1 0 0 1 1.4 0L12 12.7l3.9-3.9a1 1 0 1 1 1.4 1.4l-4.6 4.6a1 1 0 0 1-1.4 0L6.7 10.2a1 1 0 0 1 0-1.4z"/>',
  list: '<path fill="currentColor" d="M4 6.1h16v1.8H4zm0 5h16v1.8H4zm0 5h16v1.8H4z"/>',
  flash: '<path fill="currentColor" d="M13.1 2.1 5.2 13.1h5.2L8.9 21.9l8.6-12.4h-5.3l1-7.4z"/>',
  hourglass:
    '<path fill="currentColor" d="M7 3h10v2.1c0 1.5-.7 2.9-1.8 3.8L12 11.6 9.8 8.9C8.7 8 8 6.6 8 5.1V3h-.9zm.1 16.8h9.8V18c0-1.5-.7-2.9-1.8-3.8L12 12.4l-3.1 1.8c-1.1.9-1.8 2.3-1.8 3.8v1.8z"/>',
  bookmark: '<path fill="currentColor" d="M6.4 3.1h11.2a1 1 0 0 1 1 1V21l-6.6-3.7L5.4 21V4.1a1 1 0 0 1 1-1z"/>',
  search:
    '<circle cx="11" cy="11" r="6.2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M15.6 15.6 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  stopwatch:
    '<path fill="currentColor" d="M9.1 2.2h5.8v1.7H9.1zm2 3.1a7.5 7.5 0 1 0 7.6 7.5A7.5 7.5 0 0 0 11.1 5.3zm-.8 3.3h1.7v4.2l3 1.8-.9 1.5-3.8-2.3z"/>',
  profile:
    '<path fill="currentColor" d="M12 2.3a9.7 9.7 0 1 0 0 19.4 9.7 9.7 0 0 0 0-19.4zm0 3.3a2.9 2.9 0 1 1 0 5.8 2.9 2.9 0 0 1 0-5.8zm0 13.6a7.3 7.3 0 0 1-5.6-2.6c.4-1.8 3.7-2.8 5.6-2.8s5.2 1 5.6 2.8A7.3 7.3 0 0 1 12 19.2z"/>',
  globe:
    '<circle cx="12" cy="12" r="8.2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M3.8 12h16.4M12 3.8c2.1 2.3 3.2 5.1 3.2 8.2s-1.1 5.9-3.2 8.2c-2.1-2.3-3.2-5.1-3.2-8.2s1.1-5.9 3.2-8.2z" fill="none" stroke="currentColor" stroke-width="1.7"/>',
  'restaurant-outline':
    '<path fill="currentColor" d="M8.2 2.3v7.1c0 1.1-.8 2-1.9 2.2V21H4.6v-9.4c-1.1-.2-1.9-1.1-1.9-2.2V2.3h1.6v6.1h1.2V2.3h1.5v6.1h1.2V2.3zm8.1 0c2.2 0 3.9 3.3 3.9 7.1s-1.7 7.1-3.9 7.1V21h-1.7V2.3h1.7z"/>',
  'basket-outline':
    '<path fill="currentColor" d="M7.1 8.1 5 4.4H3.2v1.6h1l2.3 8.1a2 2 0 0 0 1.9 1.4h8.7a2 2 0 0 0 1.9-1.4l1.6-6H7.1zm2.3 11.1a1.6 1.6 0 1 1 0 3.2 1.6 1.6 0 0 1 0-3.2zm7.1 0a1.6 1.6 0 1 1 0 3.2 1.6 1.6 0 0 1 0-3.2z"/>',
  arrow: '<path fill="currentColor" d="M11.1 5.2 5.4 11H21v2H5.4l5.7 5.8-1.4 1.4L2 12l7.7-8.2 1.4 1.4z"/>',
  'bookmark-outline':
    '<path fill="none" stroke="currentColor" stroke-width="1.7" d="M6.6 3.6h10.8a1 1 0 0 1 1 1V20l-6.4-3.5L5.6 20V4.6a1 1 0 0 1 1-1z"/>',
  share:
    '<path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" d="M8.2 12.2 15.6 8M8.2 12.2 15.6 16.4"/><circle cx="6.2" cy="12.2" r="2.1" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="17.6" cy="7.4" r="2.1" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="17.6" cy="17" r="2.1" fill="none" stroke="currentColor" stroke-width="1.7"/>',
  clock:
    '<circle cx="12" cy="13" r="7.2" fill="none" stroke="currentColor" stroke-width="1.7"/><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" d="M12 13V9.2M12 13l2.8 1.8M9.2 3.2h5.6"/>',
  phone:
    '<rect x="8" y="2.6" width="8" height="18.8" rx="2" fill="none" stroke="currentColor" stroke-width="1.7"/><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" d="M11 18.2h2"/>',
  warning:
    '<path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" d="M12 3.6 2.8 19.4h18.4L12 3.6z"/><path fill="currentColor" d="M11.1 9.2h1.8v5.2h-1.8zm0 6.4h1.8v1.8h-1.8z"/>',
  'chevron-up':
    '<path fill="currentColor" d="M6.7 15.2a1 1 0 0 1 0-1.4l4.6-4.6a1 1 0 0 1 1.4 0l4.6 4.6a1 1 0 1 1-1.4 1.4L12 11.3l-3.9 3.9a1 1 0 0 1-1.4 0z"/>',
  'close-circle':
    '<circle cx="12" cy="12" r="8.2" fill="none" stroke="currentColor" stroke-width="1.7"/><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" d="m9 9 6 6M15 9l-6 6"/>',
  cloud:
    '<path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" d="M7.2 17.2h9.2a3.6 3.6 0 0 0 .4-7.2 4.6 4.6 0 0 0-8.8-1.2A3.2 3.2 0 0 0 7.2 17.2zM5 19.4l14-12"/>',
};

function prIcon(name, size) {
  const body = PR_ICONS[name] || PR_ICONS['restaurant-outline'];
  return (
    '<svg class="pr-icon" width="' +
    size +
    '" height="' +
    size +
    '" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
    body +
    '</svg>'
  );
}

const PREVIEW_MARKUP = `
    <div class="phone-shell">
      <div class="phone-screen">
        <div class="phone-status" aria-hidden="true"></div>
        <div data-screen="home" class="screen">
          <div class="app-scroll">
            <div class="app-header">
              <div class="city-pill-row">
                <button type="button" data-city-pill class="city-pill-btn" aria-label="Choose city">
                  ${prIcon('location', 13)}
                  <span data-city-name>Milton Keynes</span>
                  ${prIcon('chevron', 12)}
                </button>
                <span class="city-pill-spacer"></span>
                <button type="button" class="help-btn" data-help-open aria-label="Help">?</button>
                <span class="language-static">
                  ${prIcon('globe', 14)}
                  <span>English</span>
                </span>
              </div>
              <div class="title-row">
                <button type="button" class="title-brand" data-home-brand aria-label="PickupRadar">
                  <img class="title-brand-icon" src="assets/pickupradar-app-icon.png" alt="" width="36" height="36" />
                  <span class="app-title">Pickup<span class="title-accent">Radar</span></span>
                </button>
                <button type="button" class="rp-pill" data-open-app>RP</button>
              </div>
              <div class="filter-row" role="tablist" aria-label="Filters">
                <button type="button" class="filter-chip active" data-filter="All" role="tab" aria-selected="true"><span class="first-tab-icon" data-first-tab-icon>${prIcon('location', 16)}</span><span data-first-tab-label>Nearby</span></button>
                <button type="button" class="filter-chip" data-filter="Fast" role="tab" aria-selected="false">${prIcon('flash', 16)}<span>Fast</span></button>
                <button type="button" class="filter-chip" data-filter="Slow" role="tab" aria-selected="false">${prIcon('hourglass', 16)}<span>Slow</span></button>
                <button type="button" class="filter-chip" data-filter="Saved" role="tab" aria-selected="false">${prIcon('bookmark', 16)}<span>Saved</span></button>
              </div>
              <p class="nearby-status-line hidden" data-location-line role="status"></p>
              <button type="button" class="search-row" data-open-search>
                ${prIcon('search', 17)}
                <span>Search pickup points</span>
              </button>
            </div>
            <div data-home-body></div>
          </div>
          <div class="home-dock">
            <button type="button" class="dock-report" data-report-wait-btn>${prIcon('stopwatch', 24)}<span>Report wait</span></button>
            <button type="button" class="dock-profile" data-open-app>${prIcon('profile', 24)}<span>Profile</span></button>
          </div>
          <div class="help-overlay hidden" data-help-sheet>
            <div class="help-sheet" role="dialog" aria-modal="true" aria-labelledby="helpSheetTitle">
              <p id="helpSheetTitle" class="help-sheet-title">Help</p>
              <button type="button" class="help-sheet-row" data-how-it-works>How it works</button>
              <a class="help-sheet-row" data-support href="support.html">Support</a>
              <button type="button" class="help-sheet-close" data-help-close>Close</button>
            </div>
          </div>
        </div>
        <div data-screen="city" class="screen hidden">
          <div class="city-picker-header">
            <button type="button" class="back-btn" data-city-close>${prIcon('arrow', 16)}<span>Back</span></button>
            <h2 class="city-picker-title">Browse cities</h2>
            <input data-city-search class="city-search-input" type="search" placeholder="Search cities" autocomplete="off" autocapitalize="off" spellcheck="false" data-lpignore="true" />
          </div>
          <div class="app-scroll" data-city-list></div>
        </div>
        <div data-screen="search" class="screen hidden">
          <div class="app-scroll report-search-scroll">
            <div class="report-top-bar">
              <button type="button" class="back-btn" data-search-back>${prIcon('arrow', 16)}<span>Back</span></button>
            </div>
            <div class="report-step-copy">
              <h2 class="report-screen-title">Report wait</h2>
              <p class="report-screen-subtitle">Choose a pickup point.</p>
              <div class="report-search-box">
                <label class="report-search-label">Search pickup points</label>
                <input data-search-input class="report-search-input" type="search" placeholder="Name, area or postcode" autocomplete="off" autocapitalize="off" spellcheck="false" data-lpignore="true" />
                <p class="report-search-hint hidden" data-search-empty>No pickup points found</p>
              </div>
              <div data-missing-zero></div>
              <p class="report-list-label" data-search-heading>Suggested pickup points</p>
            </div>
            <div data-search-body></div>
            <div data-missing-results></div>
          </div>
        </div>
        <div data-screen="report-wait" class="screen hidden">
          <div class="report-top-bar">
            <button type="button" class="back-btn" data-report-back>${prIcon('arrow', 16)}<span>Back</span></button>
          </div>
          <div class="app-scroll report-wait-scroll" data-report-body></div>
          <div class="report-footer" data-report-footer></div>
        </div>
      </div>
    </div>
    <div data-download-modal class="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
      <div class="modal">
        <h2 id="modalTitle">Get the app</h2>
        <p data-modal-text>Download PickupRadar to report waits and venue issues.<br><br>Reporting is only available in the mobile app.</p>
        <div class="store-row" data-store-row></div>
        <button type="button" data-modal-close class="modal-close">Close</button>
      </div>
    </div>
    <div data-info-modal class="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="infoTitle">
      <div class="modal">
        <h2 id="infoTitle">How PickupRadar works</h2>
        <ul class="info-list">
          <li>Drivers report pickup waits in real time. Recent reports help other drivers avoid wasted time.</li>
          <li>Live wait times are based on recent reports. Reports older than 2 hours do not affect the current wait.</li>
          <li>When there are no recent reports, PickupRadar may show likely fast or likely slow places.</li>
          <li>You don't need an account. The app creates an anonymous Radar profile to keep your RadarPoints, and a random device ID helps prevent spam and duplicate reports. Email sign-in is optional and helps protect and recover your points.</li>
        </ul>
        <button type="button" data-info-close class="modal-close">Close</button>
      </div>
    </div>
    <div data-support-modal class="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="supportTitle">
      <div class="modal">
        <h2 id="supportTitle">Support / About</h2>
        <div class="support-modal-body">
          <h3 class="support-section-title">PickupRadar</h3>
          <p class="support-body">PickupRadar helps delivery drivers see and report pickup wait times.</p>
          <h3 class="support-section-title">Support email</h3>
          <p class="support-body"><a class="support-link" href="mailto:support@pickupradar.co.uk">support@pickupradar.co.uk</a></p>
          <h3 class="support-section-title">Website</h3>
          <p class="support-body"><a class="support-link" href="https://pickupradar.co.uk" target="_blank" rel="noopener noreferrer">pickupradar.co.uk</a></p>
          <h3 class="support-section-title">Privacy summary</h3>
          <ul class="info-list support-privacy-list">
            <li>No login is required to use PickupRadar or earn RadarPoints</li>
            <li>PickupRadar creates an anonymous Radar profile to track RadarPoints. Creating an account is optional and helps protect and recover your points.</li>
            <li>If you choose to create an account, your email is used for sign-in and account recovery.</li>
            <li>Reports and anonymous RadarPoints are linked to a device ID to reduce spam and keep points associated with this device</li>
            <li>Wait reports may include venue, platform, wait time, whether the venue starts preparing the order on arrival, and time submitted</li>
          </ul>
        </div>
        <button type="button" data-support-close class="modal-close">Close</button>
      </div>
    </div>
`;

function mountPickupRadarPreview(container, options) {
  if (!container) return;
  options = options || {};

  const root = document.createElement('div');
  root.className =
    'preview-root' +
    (options.compact ? ' preview-compact' : ' preview-full-page') +
    (options.large ? ' preview-large' : '');
  root.innerHTML = PREVIEW_MARKUP;
  container.appendChild(root);

  // Fit the phone on narrow screens. preview.css computes this with typed calc(), which
  // older iOS Safari, Firefox and Samsung Internet do not support; set the same scale here.
  function fitPreviewToViewport() {
    const viewportWidth = document.documentElement.clientWidth || window.innerWidth;
    const phoneWidth = root.offsetWidth || 418;
    const scale = Math.min(1, Math.max(0.5, (viewportWidth - 24) / phoneWidth));
    root.style.setProperty('--preview-fit-scale', String(scale));
  }
  fitPreviewToViewport();
  window.addEventListener('resize', fitPreviewToViewport);

  const LOGIC = window.PickupRadarLogic;
  if (!LOGIC) {
    root.querySelector('[data-home-body]').innerHTML =
      '<div class="state-box"><strong>Could not load live data</strong><span>Live data isn\'t available right now.</span><button type="button" class="retry-btn" data-retry>Try again</button></div>';
    root.querySelector('[data-retry]').addEventListener('click', () => location.reload());
    return;
  }
  const VD = LOGIC.venueDisplay;
  const PRED = LOGIC.venuePrediction;
  const WC = LOGIC.waitColors;
  // Location, distances and the city list use the app's own lib/geo.ts and
  // lib/liveCitySelection.ts. An older cached bundle without them just skips these features.
  const GEO = LOGIC.geo || null;
  const LCS = LOGIC.liveCitySelection || null;
  const CC = LOGIC.countryConfig || null;
  const HAS_LOCATION_LOGIC = Boolean(GEO && LCS && CC && navigator.geolocation);

  const APP_STORE_URL = '';
  const PLAY_STORE_URL = '';

  const SUPABASE_URL = 'https://jvsseskherxmtcuumldq.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2c3Nlc2toZXJ4bXRjdXVtbGRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1MTQwMTcsImV4cCI6MjA5NDA5MDAxN30.lsbs-umYa1a05GUi3sLZUvS609XlyPQjrcgAPp7HvOU';
  const DEFAULT_CITY = 'Milton Keynes';
  const SITE_CITIES = ['Milton Keynes'];
  const CITY_STORAGE_KEY = 'pickupradar_active_city';

  const TAG_LABELS = {
    order_already_collected: 'Order already collected',
    slow_staff: 'Slow staff',
    order_not_started: 'Order not started',
    large_order: 'Large/business order',
    parking_difficult: 'Parking difficult',
    staff_quick_today: 'Staff quick today',
    drive_thru_busy: 'Drive-thru busy',
    staff_issue: 'Staff issue',
  };

  const VENUE_ORDER = [
    "McDonald's - Winchester Circle",
    "McDonald's - Watling Street",
    'KFC - Bletchley',
    "Nando's - Xscape",
    'Co-op - Fishermead',
    'Asda - Milton Keynes',
    'Tesco - Kingston',
    'Greggs - Central Milton Keynes',
  ];

  const CURATED_FALLBACK_LIMIT = 6;
  // Same caps as the app's Home screen (HOME_TAB_LIMITS / NEARBY_WITH_LOCATION_LIMIT).
  const HOME_TAB_LIMITS = { All: 12, Fast: 12, Slow: 12 };
  const NEARBY_WITH_LOCATION_LIMIT = 30;
  const MAX_LIVE_REPORT_DISTANCE_MILES = GEO ? GEO.MAX_LIVE_REPORT_DISTANCE_MILES : 0.5;
  const NEAREST_CITY_MAX_MILES = 35;
  const BRAND_PRIORITY = ["McDonald's", 'KFC', 'Burger King', 'Subway', 'Greggs', 'Taco Bell', 'Popeyes', "Pepe's", 'Dixy', 'German Doner Kebab', 'Starbucks', 'Costa', 'Co-op', 'Tesco', "Sainsbury's", 'One Stop'];
  const NORMALIZED_BRAND_PRIORITY = BRAND_PRIORITY.map((brand) => normalise(brand));

  const WAIT_BUCKETS = ['<5 min', '5-10 min', '10-15 min', '15+ min'];
  const WAIT_BUCKET_LABELS = {
    '<5 min': '<5',
    '5-10 min': '5–10',
    '10-15 min': '10–15',
    '15+ min': '15+',
  };
  const PLATFORMS = ['Uber Eats', 'Deliveroo', 'Just Eat'];
  const PLATFORM_COLORS = {
    'Uber Eats': { selected: '#06C167', unselectedBg: 'rgba(6, 193, 103, 0.14)', border: 'rgba(6, 193, 103, 0.55)' },
    Deliveroo: { selected: '#00CCBC', unselectedBg: 'rgba(0, 204, 188, 0.14)', border: 'rgba(0, 204, 188, 0.55)' },
    'Just Eat': { selected: '#F36D00', unselectedBg: 'rgba(243, 109, 0, 0.14)', border: 'rgba(243, 109, 0, 0.55)' },
  };
  const ISSUE_OPTIONS = [
    { key: 'wrong_address', label: 'Wrong address' },
    { key: 'wrong_branch', label: 'Wrong branch/name' },
    { key: 'duplicate_venue', label: 'Duplicate venue' },
    { key: 'closed_permanently', label: 'Permanently closed' },
    { key: 'uses_own_drivers', label: 'Uses own drivers' },
    { key: 'other', label: 'Other' },
  ];

  let liveCities = [];
  // Browser location (only if the visitor allows it). Used in this browser only, to sort
  // and label pickup points by distance like the app. It is never sent anywhere.
  let userCoords = null;
  let locationStatus = 'idle';
  let activeCity = DEFAULT_CITY;
  let venueStats = [];
  let selectedFilter = 'All';
  let loadError = null;
  let previousScreen = 'home';
  let searchReturnScreen = 'home';
  let reportBackScreen = 'home';
  let reportVenueId = null;
  let currentReportVenue = null;
  let reportFormState = {
    waitBucket: null,
    platform: '',
    orderMadeWhenDriverArrives: false,
    problemExpanded: false,
    selectedProblemAction: null,
    issueExpanded: false,
    selectedIssueType: null,
    issueNote: '',
  };
  let missingVenueExpanded = false;
  let suggestionVenueName = '';
  let suggestionVenueAddress = '';
  let suggestionVenuePostcode = '';
  let suggestionVenueNote = '';
  let lastMissingVenueQuery = '';
  let applyingHistory = false;
  let activeDialog = null;
  let dialogReturnFocus = null;

  const cityPillBtn = root.querySelector('[data-city-pill]');
  const cityListBody = root.querySelector('[data-city-list]');
  const citySearchInput = root.querySelector('[data-city-search]');
  const homeBody = root.querySelector('[data-home-body]');
  const searchBody = root.querySelector('[data-search-body]');
  const searchInput = root.querySelector('[data-search-input]');
  const searchHeading = root.querySelector('[data-search-heading]');
  const searchEmpty = root.querySelector('[data-search-empty]');
  const missingZero = root.querySelector('[data-missing-zero]');
  const missingResults = root.querySelector('[data-missing-results]');
  const reportBody = root.querySelector('[data-report-body]');
  const reportFooter = root.querySelector('[data-report-footer]');
  const homeScreen = root.querySelector('[data-screen="home"]');
  const cityScreen = root.querySelector('[data-screen="city"]');
  const searchScreen = root.querySelector('[data-screen="search"]');
  const reportWaitScreen = root.querySelector('[data-screen="report-wait"]');
  const downloadModal = root.querySelector('[data-download-modal]');
  const infoModal = root.querySelector('[data-info-modal]');
  const supportModal = root.querySelector('[data-support-modal]');
  const supportMode = options.supportMode === 'modal' ? 'modal' : 'link';

  async function supabaseGet(path) {
    const response = await fetch(SUPABASE_URL + '/rest/v1' + path, {
      method: 'GET',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: 'Bearer ' + SUPABASE_ANON_KEY,
      },
    });

    if (!response.ok) {
      throw new Error('Live data request failed (' + response.status + ')');
    }

    const text = await response.text();
    return text ? JSON.parse(text) : [];
  }

  async function supabasePost(path, body) {
    const response = await fetch(SUPABASE_URL + '/rest/v1' + path, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: 'Bearer ' + SUPABASE_ANON_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Live data request failed (' + response.status + ')');
    }

    const text = await response.text();
    return text ? JSON.parse(text) : [];
  }

  async function loadLiveCities() {
    return SITE_CITIES.slice();
  }


  function normalise(value) {
    return String(value || '').toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
  }

  function compact(value) {
    return normalise(value).replace(/\s+/g, '');
  }

  function getBrandRank(venue) {
    const brandText = normalise(String(venue.brand || venue.name || ''));
    const matchedIndex = NORMALIZED_BRAND_PRIORITY.findIndex((brand) => {
      return brandText === brand || brandText.includes(brand);
    });
    return matchedIndex === -1 ? 999 : matchedIndex;
  }

  function effectiveStatus(venue) {
    return PRED.getEffectiveVenueStatus(venue, Date.now());
  }

  function getVenueSearchText(venue) {
    return [venue.name, venue.brand, venue.area, venue.zone, venue.branch, venue.postcode, venue.address]
      .filter(Boolean)
      .map((value) => String(value));
  }

  function isValidReportVenue(venue) {
    if (venue.is_active === false) return false;
    if ((venue.city || '').trim().toLowerCase() !== activeCity.trim().toLowerCase()) return false;
    const name = String(venue.name || '').toLowerCase();
    if (name.includes('domino') || name.includes('b&m') || name.includes('b & m')) return false;
    return true;
  }

  function eligibleReportVenues() {
    return venueStats.filter(isValidReportVenue);
  }

  function buildVenueStats(venueRows, statsRows) {
    const now = Date.now();
    const statsByVenueId = new Map();
    for (const row of statsRows) {
      if (row && row.venue_id) statsByVenueId.set(row.venue_id, row);
    }

    const orderIndex = new Map(VENUE_ORDER.map((name, index) => [name, index]));
    const orderedVenues = [...venueRows].sort((a, b) => {
      const aIndex = orderIndex.get(a.name) ?? Number.MAX_SAFE_INTEGER;
      const bIndex = orderIndex.get(b.name) ?? Number.MAX_SAFE_INTEGER;
      if (aIndex !== bIndex) return aIndex - bIndex;
      return a.name.localeCompare(b.name);
    });

    return orderedVenues.map((venue) => {
      const s = statsByVenueId.get(venue.id) || null;
      const reportTime = s && s.last_report_at ? new Date(s.last_report_at).getTime() : NaN;
      const lastReportAt = Number.isFinite(reportTime) ? s.last_report_at : null;
      const lastReportMinutes = Number.isFinite(reportTime)
        ? Math.max(0, Math.floor((now - reportTime) / 60000))
        : null;
      const isLive = WC.isLocallyLiveWait(
        { currentWaitMinutes: s?.current_wait_minutes ?? null, lastReportAt },
        now
      );
      const currentWaitMinutes = isLive ? s.current_wait_minutes : null;
      const recentConsensusStatus =
        s?.recent_consensus_status === 'fast' || s?.recent_consensus_status === 'slow'
          ? s.recent_consensus_status
          : null;
      const currentWaitLabel =
        currentWaitMinutes === null
          ? 'No recent data'
          : currentWaitMinutes < 5
            ? '<5 min'
            : currentWaitMinutes < 10
              ? '5–10 min'
              : currentWaitMinutes < 15
                ? '10–15 min'
                : '15+ min';
      const reports2hCount = s?.reports_2h_count ?? 0;
      const confidence =
        reports2hCount === 0 ? 'No recent data' : reports2hCount === 1 ? 'Low' : reports2hCount <= 3 ? 'Medium' : 'High';
      const rawTagCounts = Array.isArray(s?.tag_counts) ? s.tag_counts : [];
      const tagCounts = rawTagCounts
        .filter((row) => row && typeof row.tagKey === 'string')
        .map((row) => ({ tagKey: row.tagKey, label: TAG_LABELS[row.tagKey] || row.tagKey, count: row.count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 3);

      return {
        ...venue,
        currentWaitMinutes,
        currentWaitLabel,
        reportsToday: s?.reports_today ?? 0,
        reports2hCount,
        lastReportAt,
        lastReportMinutes,
        recentConsensusStatus,
        confidence,
        leftEarlyWarning: s?.left_early_warning === true,
        madeWhenDriverArrivesBadge: s?.made_when_driver_arrives_badge === true,
        closedWarning: s?.closed_warning === true,
        systemDownWarning: s?.system_down_warning === true,
        tagCounts,
      };
    });
  }

  function toCoordNumber(value) {
    if (typeof value === 'number') return Number.isFinite(value) ? value : null;
    if (typeof value === 'string' && value.trim() !== '') {
      const parsed = Number(value);
      return Number.isFinite(parsed) ? parsed : null;
    }
    return null;
  }

  function venueCoords(venue) {
    const lat = toCoordNumber(venue.lat);
    const lng = toCoordNumber(venue.lng);
    if (lat === null || lng === null) return null;
    return { lat: lat, lng: lng };
  }

  function withDistance(venue) {
    const coords = userCoords ? venueCoords(venue) : null;
    return { ...venue, distanceMiles: coords ? GEO.distanceInMiles(userCoords, coords) : null };
  }

  function distanceUnit() {
    return CC ? CC.getDistanceUnitForCity(activeCity) : 'mi';
  }

  // App: HomeScreen sortByDistance (coords first, no-coords after).
  function sortByDistance(list) {
    return list.map(withDistance).sort((a, b) => {
      const aDist = a.distanceMiles;
      const bDist = b.distanceMiles;
      if (aDist === null) return bDist === null ? 0 : 1;
      if (bDist === null) return -1;
      return aDist - bDist;
    });
  }

  // App: HomeScreen sortByFastSlowRelevance (location ON only).
  function sortByFastSlowRelevance(list) {
    const now = Date.now();
    const bucket = (dist) => (dist === null ? 3 : dist <= 2 ? 0 : dist <= 5 ? 1 : 2);
    return list.map(withDistance).sort((a, b) => {
      const bucketDiff = bucket(a.distanceMiles) - bucket(b.distanceMiles);
      if (bucketDiff !== 0) return bucketDiff;
      const aReal = WC.isLocallyLiveWait(a, now);
      const bReal = WC.isLocallyLiveWait(b, now);
      if (aReal !== bReal) return aReal ? -1 : 1;
      if (aReal && bReal) {
        const aLast = a.lastReportMinutes ?? Number.POSITIVE_INFINITY;
        const bLast = b.lastReportMinutes ?? Number.POSITIVE_INFINITY;
        if (aLast !== bLast) return aLast - bLast;
      }
      const aCloser = a.distanceMiles === null ? Number.POSITIVE_INFINITY : a.distanceMiles;
      const bCloser = b.distanceMiles === null ? Number.POSITIVE_INFINITY : b.distanceMiles;
      if (aCloser !== bCloser) return aCloser - bCloser;
      return 0;
    });
  }

  function getVisibleVenues(filter) {
    const venues = venueStats;

    if (userCoords && filter === 'All') {
      return sortByDistance(venues).slice(0, NEARBY_WITH_LOCATION_LIMIT);
    }
    if (userCoords && (filter === 'Fast' || filter === 'Slow')) {
      const wanted = filter === 'Fast' ? 'fast' : 'slow';
      const live = venues.filter((venue) => venue.currentWaitMinutes !== null && effectiveStatus(venue) === wanted);
      const predicted = venues
        .filter((venue) => venue.currentWaitMinutes === null && effectiveStatus(venue) === wanted)
        .map((venue) => ({ ...venue, isPredictedFallback: true }));
      return sortByFastSlowRelevance([...live, ...predicted]).slice(0, HOME_TAB_LIMITS[filter]);
    }

    if (filter === 'All') {
      const liveNearby = venues
        .filter((venue) => venue.lastReportMinutes !== null && venue.lastReportMinutes <= 1440)
        .sort((a, b) => (a.lastReportMinutes ?? Infinity) - (b.lastReportMinutes ?? Infinity));
      const liveNearbyIds = new Set(liveNearby.map((venue) => venue.id));
      const fallbackNearby = venues
        .filter((venue) => !liveNearbyIds.has(venue.id))
        .filter((venue) => venue.currentWaitMinutes === null && effectiveStatus(venue) !== null)
        .slice(0, Math.min(CURATED_FALLBACK_LIMIT, Math.max(0, HOME_TAB_LIMITS.All - liveNearby.length)))
        .map((venue) => ({ ...venue, isPredictedFallback: true }));
      return [...liveNearby, ...fallbackNearby].slice(0, HOME_TAB_LIMITS.All);
    }

    if (filter === 'Fast') {
      const liveFast = venues
        .filter((venue) => venue.currentWaitMinutes !== null && effectiveStatus(venue) === 'fast')
        .sort((a, b) => (a.currentWaitMinutes ?? Infinity) - (b.currentWaitMinutes ?? Infinity));
      const fallbackFast = venues
        .filter((venue) => venue.currentWaitMinutes === null && effectiveStatus(venue) === 'fast')
        .slice(0, Math.min(CURATED_FALLBACK_LIMIT, Math.max(0, HOME_TAB_LIMITS.Fast - liveFast.length)))
        .map((venue) => ({ ...venue, isPredictedFallback: true }));
      return [...liveFast, ...fallbackFast].slice(0, HOME_TAB_LIMITS.Fast);
    }

    if (filter === 'Slow') {
      const liveSlow = venues
        .filter((venue) => venue.currentWaitMinutes !== null && effectiveStatus(venue) === 'slow')
        .sort((a, b) => (b.currentWaitMinutes ?? -1) - (a.currentWaitMinutes ?? -1));
      const fallbackSlow = venues
        .filter((venue) => venue.currentWaitMinutes === null && effectiveStatus(venue) === 'slow')
        .slice(0, Math.min(CURATED_FALLBACK_LIMIT, Math.max(0, HOME_TAB_LIMITS.Slow - liveSlow.length)))
        .map((venue) => ({ ...venue, isPredictedFallback: true }));
      return [...liveSlow, ...fallbackSlow].slice(0, HOME_TAB_LIMITS.Slow);
    }

    return venues.slice(0, HOME_TAB_LIMITS.All);
  }

  function formatEvidenceTime(minutes) {
    if (minutes < 60) return Math.max(1, minutes) + 'm ago';
    return Math.floor(minutes / 60) + 'h ago';
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function renderVenueCard(item, index, mode) {
    const now = Date.now();
    const hasRealWaitData = WC.isLocallyLiveWait(item, now);
    const status = effectiveStatus(item);
    const waitColors = hasRealWaitData
      ? WC.getWaitColorsFromMinutes(item.currentWaitMinutes)
      : status === 'fast'
        ? WC.LIKELY_FAST_WAIT_PILL
        : status === 'slow'
          ? WC.LIKELY_SLOW_WAIT_PILL
          : null;
    const waitBadgeText = hasRealWaitData
      ? item.currentWaitLabel
      : status === 'fast'
        ? 'Likely fast'
        : status === 'slow'
          ? 'Likely slow'
          : '';
    const reportTimestampMs = item.lastReportAt ? new Date(item.lastReportAt).getTime() : NaN;
    const liveReportMinutes = Number.isFinite(reportTimestampMs)
      ? Math.max(0, Math.floor((now - reportTimestampMs) / 60000))
      : item.lastReportMinutes;
    const hasFreshEvidence =
      hasRealWaitData && item.reports2hCount > 0 && liveReportMinutes !== null && liveReportMinutes < 120;
    const evidenceText = hasFreshEvidence
      ? (item.reports2hCount === 1 ? '1 report · ' : item.reports2hCount + ' reports · ') + formatEvidenceTime(liveReportMinutes)
      : '';
    const title = mode === 'home'
      ? VD.cleanVenueName(item, activeCity, venueStats)
      : VD.getVenueDisplayName(item, activeCity, venueStats);
    const area = VD.getVenueHomeLocationLabel(item, venueStats, activeCity);
    const tint = WC.getHomeVenueCardWaitTint(item, now);
    const iconColor = WC.getVenueWaitIconColor(item, now, status);
    const cardStyle = tint
      ? 'background:' + tint.backgroundColor + ';border-color:' + tint.borderColor + ';'
      : '';
    let badges = '';
    if (item.madeWhenDriverArrivesBadge) {
      badges += '<span class="urgent-badge">Made when driver arrives</span>';
    }
    if (item.closedWarning) {
      badges += '<span class="urgent-badge">Reported closed recently</span>';
    }
    if (item.systemDownWarning) {
      badges += '<span class="urgent-badge">Tablet/server issue reported</span>';
    }
    const hasDistance = userCoords && typeof item.distanceMiles === 'number' && Number.isFinite(item.distanceMiles);
    const canShowReportRpPrompt = hasDistance && item.distanceMiles <= MAX_LIVE_REPORT_DISTANCE_MILES && !waitBadgeText;
    const distanceHtml = hasDistance
      ? '<span class="venue-distance" style="color:' + (GEO.getDistanceTextColor(item.distanceMiles) || '#8FB5D7') + ';">' +
        escapeHtml(GEO.formatDistance(item.distanceMiles, distanceUnit())) +
        '</span>'
      : '';
    const pill = waitBadgeText
      ? '<span class="wait-badge" style="background:' + waitColors.backgroundColor + ';color:' + waitColors.color + ';">' +
        escapeHtml(waitBadgeText) +
        '</span>'
      : canShowReportRpPrompt
        ? '<span class="report-rp-prompt">Report needed · +15 RP</span>'
        : '<span class="no-recent-wait">No recent wait</span>';

    return (
      '<article class="venue-card" style="' + cardStyle + '" data-venue-id="' + escapeHtml(item.id) + '" tabindex="0" role="button">' +
      '<div class="venue-title-row">' +
      '<span class="venue-type-icon" style="color:' + iconColor + ';">' +
      prIcon(VD.getVenueTypeIconName(item.venue_type), 18) +
      '</span>' +
      '<div class="venue-identity">' +
      '<h3 class="venue-name">' + escapeHtml(title) + '</h3>' +
      (area ? '<p class="venue-area">' + escapeHtml(area) + '</p>' : '') +
      '</div>' +
      distanceHtml +
      '</div>' +
      badges +
      '<div class="card-bottom">' +
      (evidenceText ? '<p class="evidence-line">' + escapeHtml(evidenceText) + '</p>' : '<span class="evidence-line"></span>') +
      pill +
      '</div></article>'
    );
  }

  function bindVenueCards(target, origin) {
    target.querySelectorAll('.venue-card').forEach((card) => {
      const open = () => {
        const backScreen = origin === 'search' && searchReturnScreen === 'report-wait' ? reportBackScreen : origin;
        openReportWait(card.getAttribute('data-venue-id'), backScreen);
      };
      card.addEventListener('click', open);
      card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          open();
        }
      });
    });
  }

  function renderHomeList() {
    if (loadError) {
      homeBody.innerHTML =
        '<div class="state-box"><strong>Could not load live data</strong><span>Live data isn\'t available right now.</span><button type="button" class="retry-btn" data-retry>Try again</button></div>';
      root.querySelector('[data-retry]').addEventListener('click', () => {
        loadCityData(activeCity).catch((error) => {
          console.error(error);
          loadError = "Live data isn't available right now.";
          renderHomeList();
        });
      });
      return;
    }

    if (selectedFilter === 'Saved') {
      homeBody.innerHTML =
        '<div class="state-box"><strong>No saved pickup points</strong><span>Saving pickup points is available in the mobile app.</span></div>';
      return;
    }

    if (venueStats.length === 0) {
      homeBody.innerHTML = '<div class="state-box"><strong>No venues yet</strong><span>No active pickup points found for this city.</span></div>';
      return;
    }

    const visible = getVisibleVenues(selectedFilter);
    if (visible.length === 0) {
      const empty = selectedFilter === 'Fast'
        ? ['No likely fast pickups', 'Try Nearby or Slow.']
        : selectedFilter === 'Slow'
          ? ['No likely slow pickups', 'Try Nearby or Fast.']
          : ['No pickup points found', 'Try another area.'];
      homeBody.innerHTML = '<div class="state-box"><strong>' + empty[0] + '</strong><span>' + empty[1] + '</span></div>';
      return;
    }

    homeBody.innerHTML = visible.map((item, index) => renderVenueCard(item, index, 'home')).join('');
    bindVenueCards(homeBody, 'home');
  }

  function suggestedReportVenues(eligible) {
    return eligible
      .map((venue) => ({
        venue: venue,
        brandRank: getBrandRank(venue),
        sortName: normalise(venue.name || venue.brand || ''),
      }))
      .sort((a, b) => {
        const rankDiff = a.brandRank - b.brandRank;
        if (rankDiff !== 0) return rankDiff;
        return a.sortName.localeCompare(b.sortName);
      })
      .slice(0, 20)
      .map((item) => item.venue);
  }

  function searchReportVenues(eligible, trimmedQuery) {
    const query = normalise(trimmedQuery);
    const compactQuery = compact(trimmedQuery);
    return eligible
      .filter((venue) => {
        return getVenueSearchText(venue).some((value) => {
          return normalise(value).includes(query) || compact(value).includes(compactQuery);
        });
      })
      .slice(0, 50);
  }

  function renderSearchVenueRow(venue, eligible) {
    const now = Date.now();
    const iconColor = WC.getVenueWaitIconColor(venue, now, PRED.getEffectiveVenueStatus(venue, now));
    const title = VD.getVenueDisplayName(venue, activeCity, eligible);
    const area = VD.getVenueHomeLocationLabel(venue, eligible, activeCity);
    const coords = userCoords ? venueCoords(venue) : null;
    const miles = coords ? GEO.distanceInMiles(userCoords, coords) : null;
    const distanceHtml = miles !== null
      ? '<span class="venue-result-distance" style="color:' + (GEO.getDistanceTextColor(miles) || '#8FB5D7') + ';">' +
        escapeHtml(GEO.formatDistance(miles, distanceUnit())) + '</span>'
      : '';
    return (
      '<button type="button" class="venue-result" data-venue-id="' + escapeHtml(venue.id) + '">' +
      '<span class="venue-type-icon" style="color:' + iconColor + ';">' +
      prIcon(VD.getVenueTypeIconName(venue.venue_type), 18) +
      '</span>' +
      '<span class="venue-result-text">' +
      '<span class="venue-result-name">' + escapeHtml(title) + '</span>' +
      (area ? '<span class="venue-result-area">' + escapeHtml(area) + '</span>' : '') +
      distanceHtml +
      '</span></button>'
    );
  }

  function renderSearchList() {
    const trimmedQuery = searchInput.value.trim();
    const searchActive = trimmedQuery.length >= 2;
    const eligible = eligibleReportVenues();
    const baseList = searchActive ? searchReportVenues(eligible, trimmedQuery) : suggestedReportVenues(eligible);
    // App: ReportWaitScreen sortVenuesByDistance when location is on.
    const list = userCoords ? sortByDistance(baseList) : baseList;
    const zeroResults = searchActive && list.length === 0;

    if (!searchActive) {
      missingVenueExpanded = false;
      lastMissingVenueQuery = '';
      suggestionVenueName = '';
      suggestionVenueAddress = '';
      suggestionVenuePostcode = '';
      suggestionVenueNote = '';
    } else if (lastMissingVenueQuery !== trimmedQuery) {
      suggestionVenueName = zeroResults ? trimmedQuery : '';
      suggestionVenueAddress = '';
      suggestionVenuePostcode = '';
      suggestionVenueNote = '';
      missingVenueExpanded = false;
      lastMissingVenueQuery = trimmedQuery;
    }

    searchHeading.textContent = searchActive ? 'Search results' : 'Suggested pickup points';
    searchHeading.classList.toggle('hidden', zeroResults);
    searchEmpty.classList.toggle('hidden', !zeroResults);

    const rows = list.map((venue) => renderSearchVenueRow(venue, eligible)).join('');
    searchBody.innerHTML = rows || (searchActive ? '' : '<div class="state-box"><strong>No pickup points yet</strong><span>' + escapeHtml(activeCity) + ' is just getting started. Search above to add the pickup point you\'re at — it\'ll show here for other drivers.</span></div>');
    searchBody.querySelectorAll('.venue-result').forEach((row) => {
      row.addEventListener('click', () => openReportWait(row.getAttribute('data-venue-id'), 'home'));
    });

    const missingHtml = searchActive ? renderMissingVenueSectionHtml() : '';
    missingZero.innerHTML = zeroResults ? missingHtml : '';
    missingResults.innerHTML = searchActive && !zeroResults ? missingHtml : '';
    if (zeroResults) bindMissingVenueSection(missingZero);
    if (searchActive && !zeroResults) bindMissingVenueSection(missingResults);
  }

  async function loadCityData(city) {
    loadError = null;
    homeBody.innerHTML = '<div class="state-box"><strong>Loading live data…</strong><span>Syncing venues and reports for ' + escapeHtml(city) + '.</span></div>';

    const pageSize = 1000;
    const venueRows = [];
    let offset = 0;

    while (true) {
      const page = await supabaseGet(
        '/venues?select=id,name,area,brand,branch,address,postcode,lat,lng,google_place_id,city,zone,venue_type,admin_edited_at,is_active,created_at&city=eq.' +
          encodeURIComponent(city) +
          '&is_active=eq.true&order=id.asc&limit=' +
          pageSize +
          '&offset=' +
          offset
      );
      if (!Array.isArray(page)) {
        throw new Error('Live data request failed');
      }
      venueRows.push.apply(venueRows, page);
      if (page.length < pageSize) break;
      offset += pageSize;
    }

    const statsRows = await supabasePost('/rpc/get_public_venue_stats_sparse_v2', {
      p_city: city,
      p_internal_zones: null,
      p_timezone: 'Europe/London',
    });
    if (!Array.isArray(statsRows)) {
      throw new Error('Live data request failed');
    }

    venueStats = buildVenueStats(venueRows, statsRows);

    renderHomeList();
    if (!searchScreen.classList.contains('hidden')) renderSearchList();
  }

  function showScreen(name) {
    homeScreen.classList.toggle('hidden', name !== 'home');
    cityScreen.classList.toggle('hidden', name !== 'city');
    searchScreen.classList.toggle('hidden', name !== 'search');
    reportWaitScreen.classList.toggle('hidden', name !== 'report-wait');
  }

  function previewHistoryState(screen) {
    return {
      prPreview: true,
      prScreen: screen,
      prVenueId: screen === 'report-wait' ? reportVenueId : null,
      prQuery: searchInput.value,
    };
  }

  function pushPreviewScreen(screen) {
    if (applyingHistory) return;
    history.pushState(previewHistoryState(screen), '');
  }

  function rememberSearchQuery() {
    if (applyingHistory) return;
    const state = history.state;
    if (!state || !state.prPreview || state.prScreen !== 'search') return;
    history.replaceState(previewHistoryState('search'), '');
  }

  function clearPreviewHistoryMarker() {
    if (history.state && history.state.prPreview) {
      history.replaceState(null, '');
    }
  }

  function applyPreviewHistory(state) {
    applyingHistory = true;
    try {
      const screen = state && state.prPreview ? state.prScreen : 'home';
      if (screen === 'search') {
        searchInput.value = state.prQuery || '';
        showScreen('search');
        renderSearchList();
      } else if (screen === 'report-wait' && state.prVenueId) {
        const venue = venueStats.find(function (item) {
          return item.id === state.prVenueId;
        });
        if (venue) {
          previousScreen = 'home';
          reportVenueId = venue.id;
          currentReportVenue = venue;
          resetReportFormState();
          renderReportWaitContent(venue, true);
          showScreen('report-wait');
        } else {
          showScreen('home');
        }
      } else if (screen === 'city') {
        showScreen('city');
        renderCityList();
      } else {
        searchInput.value = '';
        showScreen('home');
      }
    } finally {
      applyingHistory = false;
    }
  }

  function previewBack() {
    if (history.state && history.state.prPreview) {
      history.back();
      return;
    }
    applyPreviewHistory(null);
  }

  function openReportWaitSearch() {
    searchReturnScreen = 'home';
    searchInput.value = '';
    showScreen('search');
    renderSearchList();
    pushPreviewScreen('search');
    searchInput.focus();
  }

  function resetPreviewHome() {
    clearPreviewHistoryMarker();
    showScreen('home');
    previousScreen = 'home';
    searchReturnScreen = 'home';
    reportVenueId = null;
    currentReportVenue = null;
    resetReportFormState();
    missingVenueExpanded = false;
    suggestionVenueName = '';
    suggestionVenueAddress = '';
    suggestionVenuePostcode = '';
    suggestionVenueNote = '';
    lastMissingVenueQuery = '';
    searchInput.value = '';
    citySearchInput.value = '';
    searchHeading.textContent = 'Suggested pickup points';
    searchHeading.classList.remove('hidden');
    selectedFilter = 'All';
    root.querySelectorAll('.filter-chip').forEach((chip) => {
      const active = chip.getAttribute('data-filter') === 'All';
      chip.classList.toggle('active', active);
      chip.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    closeHelpSheet();
    closeDownloadModal();
    closeInfoModal();
    closeSupportModal();
    root.querySelectorAll('.app-scroll').forEach((el) => {
      el.scrollTop = 0;
    });
  }

  function updateCityPill() {
    const name = cityPillBtn.querySelector('[data-city-name]');
    if (name) name.textContent = activeCity;
  }

  // App: CitySelectorScreen in public mode, rows from lib/liveCitySelection.ts
  // buildPublicCityBrowseView (live city, Coming next, then Coming soon).
  function cityDisplayName(city) {
    return CC ? CC.getCityDisplayName(city) : city;
  }

  function renderCityRow(row, nearestLiveCity) {
    const city = row.city;
    const disabled = row.status !== 'live';
    const selected = !disabled && city === activeCity;
    const isPhysicalCity = Boolean(userCoords && !disabled && nearestLiveCity && city === nearestLiveCity);
    const distanceLabel = userCoords && !isPhysicalCity && GEO ? GEO.formatCityDistance(userCoords, city, venueStats) : null;
    const statusLabel = disabled
      ? (row.status === 'comingNext' ? 'Coming next' : 'Coming soon')
      : selected ? 'Viewing' : 'View';
    const statusClass = 'city-row-status' +
      (selected ? ' viewing' : '') +
      (disabled ? ' disabled' : '') +
      (row.status === 'comingNext' ? ' next' : '');
    return (
      '<button type="button" class="city-row' + (selected ? ' selected' : '') + (disabled ? ' notify' : '') + '" data-city="' + escapeHtml(city) + '" data-city-status="' + row.status + '">' +
      '<span class="city-row-main">' +
      '<span class="city-row-name">' + escapeHtml(cityDisplayName(city)) + '</span>' +
      (isPhysicalCity ? '<span class="city-row-meta">You\'re here</span>' : '') +
      (disabled ? '<span class="city-row-notify">Notify me when live</span>' : '') +
      '</span>' +
      '<span class="city-row-right">' +
      (distanceLabel ? '<span class="city-row-distance">' + escapeHtml(distanceLabel) + '</span>' : '') +
      '<span class="' + statusClass + '">' + statusLabel + '</span>' +
      '</span>' +
      '</button>'
    );
  }

  function bindCityRows() {
    cityListBody.querySelectorAll('.city-row').forEach((row) => {
      row.addEventListener('click', () => {
        const city = row.getAttribute('data-city');
        if (row.getAttribute('data-city-status') !== 'live') {
          // App: "Notify me when live" opens the launch alert sheet. On the website it points to the app.
          openDownloadModal(
            row,
            'Get a launch alert when ' + escapeHtml(cityDisplayName(city || '')) + ' goes live.<br><br>Launch alerts are set up in the mobile app.'
          );
          return;
        }
        if (!city || city === activeCity) {
          previewBack();
          return;
        }
        activeCity = city;
        saveSelectedCity(activeCity);
        updateCityPill();
        updateFirstTab();
        citySearchInput.value = '';
        searchInput.value = '';
        previewBack();
        loadCityData(activeCity).catch((error) => {
          console.error(error);
          loadError = "Live data isn't available right now.";
          renderHomeList();
        });
      });
    });
    const request = cityListBody.querySelector('[data-city-request]');
    if (request) {
      request.addEventListener('click', () => openDownloadModal(
        request,
        'Ask for PickupRadar in your city.<br><br>City requests are sent from the mobile app.'
      ));
    }
  }

  // App: nearestCity (App.tsx) - the nearest live city within NEAREST_CITY_MAX_MILES.
  function nearestLiveCityName() {
    if (!userCoords || !GEO) return null;
    const pool = liveCities.filter((city) => !CC || CC.getCountryForCity(city) === 'UK');
    const nearest = GEO.findNearestCity(userCoords, pool, venueStats);
    return nearest && nearest.distance <= NEAREST_CITY_MAX_MILES ? nearest.city : null;
  }

  function renderCityList() {
    const query = citySearchInput.value.trim();
    let rows;
    if (LCS) {
      const view = LCS.buildPublicCityBrowseView({
        liveAreas: liveCities,
        activeCity: activeCity,
        userCoords: userCoords,
        venues: venueStats,
        gpsCountryIso: 'GB',
        query: query,
      });
      rows = view.rows;
    } else {
      rows = liveCities
        .filter((city) => !query || city.toLowerCase().includes(query.toLowerCase()))
        .map((city) => ({ city: city, status: 'live' }));
    }
    const nearestLiveCity = nearestLiveCityName();
    const rowsHtml = rows.length
      ? '<div class="city-list">' + rows.map((row) => renderCityRow(row, nearestLiveCity)).join('') + '</div>'
      : '';
    cityListBody.innerHTML =
      rowsHtml +
      '<button type="button" class="city-request-row" data-city-request>Can\'t find your city? Request it</button>';
    bindCityRows();
  }

  // ---- Location (browser), like the app's Home "Nearby" ----
  const LOCATION_MESSAGES = {
    finding: 'Finding your location…',
    denied: 'Location is off. Allow it for this site in your browser settings for nearby distances, or choose a city to browse PickupRadar.',
    error: 'Location is unavailable right now. Try again later, or choose a city to browse PickupRadar.',
  };

  // App: HomeScreen firstTabLabel. "Nearby" unless location is on and the city
  // being viewed is not the one you are in, then "All".
  function updateFirstTab() {
    const label = root.querySelector('[data-first-tab-label]');
    const icon = root.querySelector('[data-first-tab-icon]');
    const showAll = Boolean(userCoords) && nearestLiveCityName() !== activeCity;
    if (label) label.textContent = showAll ? 'All' : 'Nearby';
    if (icon) icon.innerHTML = prIcon(showAll ? 'list' : 'location', 16);
    const line = root.querySelector('[data-location-line]');
    if (line) {
      const text = LOCATION_MESSAGES[locationStatus] || '';
      line.textContent = text;
      line.classList.toggle('hidden', !text);
      line.classList.toggle('warning', locationStatus === 'denied' || locationStatus === 'error');
    }
  }

  function refreshForLocation() {
    updateFirstTab();
    if (!venueStats.length) return;
    renderHomeList();
    if (!searchScreen.classList.contains('hidden')) renderSearchList();
    if (!cityScreen.classList.contains('hidden')) renderCityList();
  }

  function requestLocation() {
    if (!HAS_LOCATION_LOGIC || locationStatus === 'finding' || locationStatus === 'granted') return;
    locationStatus = 'finding';
    updateFirstTab();
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position && position.coords ? position.coords.latitude : NaN;
        const lng = position && position.coords ? position.coords.longitude : NaN;
        if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
          locationStatus = 'error';
          refreshForLocation();
          return;
        }
        userCoords = { lat: lat, lng: lng };
        locationStatus = 'granted';
        refreshForLocation();
      },
      (error) => {
        userCoords = null;
        locationStatus = error && error.code === 1 ? 'denied' : 'error';
        refreshForLocation();
      },
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 300000 }
    );
  }

  function setupLocation() {
    if (!HAS_LOCATION_LOGIC) return;
    // Already allowed earlier: use it straight away without a prompt.
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result && result.state === 'granted') requestLocation();
      }).catch(() => {});
    }
    // Otherwise ask only when the live preview is on screen.
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          requestLocation();
        }
      }, { threshold: 0.25 });
      observer.observe(root);
    }
  }

  function renderMissingVenueSectionHtml() {
    const canSubmit = suggestionVenueName.trim().length >= 2;

    if (!missingVenueExpanded) {
      return (
        '<div class="missing-venue-card">' +
        '<p class="missing-venue-title">Can\'t find it?</p>' +
        '<button type="button" class="missing-venue-btn" data-missing-open>Suggest pickup point</button>' +
        '</div>'
      );
    }

    return (
      '<div class="missing-venue-card">' +
      '<p class="missing-venue-title">Can\'t find it?</p>' +
      '<div class="missing-venue-form">' +
      '<p class="missing-venue-reward">Approved pickup point suggestions earn +20 RP.</p>' +
      '<input type="text" class="missing-venue-input" data-suggestion-name placeholder="Venue name" value="' +
      escapeHtml(suggestionVenueName) +
      '" autocomplete="off" autocapitalize="off" spellcheck="false" data-lpignore="true" />' +
      '<input type="text" class="missing-venue-input" data-suggestion-address placeholder="Address or area" value="' +
      escapeHtml(suggestionVenueAddress) +
      '" autocomplete="off" autocapitalize="off" spellcheck="false" data-lpignore="true" />' +
      '<input type="text" class="missing-venue-input" data-suggestion-postcode placeholder="Postcode" value="' +
      escapeHtml(suggestionVenuePostcode) +
      '" autocomplete="off" autocapitalize="characters" spellcheck="false" data-lpignore="true" />' +
      '<textarea class="missing-venue-input missing-venue-note" data-suggestion-note placeholder="Note (optional)" rows="3">' +
      escapeHtml(suggestionVenueNote) +
      '</textarea>' +
      '<button type="button" class="missing-venue-btn' +
      (canSubmit ? '' : ' disabled') +
      '" data-missing-submit' +
      (canSubmit ? '' : ' disabled') +
      '>Submit suggestion</button>' +
      '</div>' +
      '</div>'
    );
  }

  function updateMissingVenueSubmitState(container) {
    const submitBtn = container.querySelector('[data-missing-submit]');
    if (!submitBtn) return;
    const canSubmit = suggestionVenueName.trim().length >= 2;
    submitBtn.disabled = !canSubmit;
    submitBtn.classList.toggle('disabled', !canSubmit);
  }

  function bindMissingVenueSection(container) {
    const openBtn = container.querySelector('[data-missing-open]');
    if (openBtn) {
      openBtn.addEventListener('click', () => {
        missingVenueExpanded = true;
        renderSearchList();
      });
      return;
    }

    const nameInput = container.querySelector('[data-suggestion-name]');
    const addressInput = container.querySelector('[data-suggestion-address]');
    const postcodeInput = container.querySelector('[data-suggestion-postcode]');
    const noteInput = container.querySelector('[data-suggestion-note]');
    const submitBtn = container.querySelector('[data-missing-submit]');

    if (nameInput) {
      nameInput.addEventListener('input', () => {
        suggestionVenueName = nameInput.value;
        updateMissingVenueSubmitState(container);
      });
    }
    if (addressInput) {
      addressInput.addEventListener('input', () => {
        suggestionVenueAddress = addressInput.value;
      });
    }
    if (postcodeInput) {
      postcodeInput.addEventListener('input', () => {
        suggestionVenuePostcode = postcodeInput.value;
      });
    }
    if (noteInput) {
      noteInput.addEventListener('input', () => {
        suggestionVenueNote = noteInput.value;
      });
    }
    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        if (suggestionVenueName.trim().length < 2) return;
        openDownloadModal();
      });
    }
  }

  function openCityPicker() {
    citySearchInput.value = '';
    renderCityList();
    showScreen('city');
    pushPreviewScreen('city');
    citySearchInput.focus();
  }

  function resetReportFormState() {
    reportFormState = {
      waitBucket: null,
      platform: '',
      orderMadeWhenDriverArrives: false,
      problemExpanded: false,
      selectedProblemAction: null,
      issueExpanded: false,
      selectedIssueType: null,
      issueNote: '',
    };
  }

  function waitColorWithAlpha(hex, alphaByte) {
    const normalized = String(hex || '').trim();
    if (!/^#[0-9A-Fa-f]{6}$/.test(normalized)) return normalized;
    const alpha = Math.max(0, Math.min(255, alphaByte)).toString(16).padStart(2, '0');
    return normalized + alpha;
  }

  function clearProblemSelection() {
    reportFormState.selectedProblemAction = null;
    reportFormState.issueExpanded = false;
    reportFormState.selectedIssueType = null;
    reportFormState.issueNote = '';
  }

  function renderIssuePanelHtml() {
    if (!reportFormState.issueExpanded) return '';
    const chips = ISSUE_OPTIONS.map(function (issue) {
      const active = reportFormState.selectedIssueType === issue.key;
      return (
        '<button type="button" class="issue-chip' +
        (active ? ' active' : '') +
        '" data-issue-type="' +
        escapeHtml(issue.key) +
        '">' +
        escapeHtml(issue.label) +
        '</button>'
      );
    }).join('');
    const note = reportFormState.selectedIssueType === 'other'
      ? '<textarea class="issue-input" data-issue-note maxlength="500" placeholder="Note (optional)" rows="3">' +
        escapeHtml(reportFormState.issueNote) +
        '</textarea>'
      : '';
    return (
      '<div class="issue-compact-card">' +
      '<p class="issue-compact-title">What\'s wrong with this venue?</p>' +
      '<div class="issue-chip-wrap">' + chips + '</div>' +
      note +
      '</div>'
    );
  }

  function buildReportWaitHtml(venue) {
    const now = Date.now();
    const title = VD.getVenueDisplayName(venue, activeCity, venueStats);
    const details = VD.getVenueOpenedLocationDetails(venue, activeCity);
    const iconColor = WC.getVenueWaitIconColor(venue, now, PRED.getEffectiveVenueStatus(venue, now));
    const locationHtml = [
      { text: details.area, className: 'selected-venue-area' },
      { text: details.street, className: 'selected-venue-address' },
      { text: details.postcode, className: 'selected-venue-postcode' },
    ]
      .filter(function (line) { return line.text; })
      .map(function (line) {
        return '<p class="' + line.className + '">' + escapeHtml(line.text) + '</p>';
      })
      .join('');
    let warnings = '';
    if (venue.closedWarning) {
      warnings += '<span class="selected-venue-warning">Reported closed recently</span>';
    }
    if (venue.systemDownWarning) {
      warnings += '<span class="selected-venue-warning">Tablet/server issue reported</span>';
    }

    const live = WC.isLocallyLiveWait(venue, now);
    let currentWaitHtml = '';
    if (live) {
      const tint = WC.getHomeVenueCardWaitTint(venue, now);
      const bucket = WC.getWaitBucketFromMinutes(venue.currentWaitMinutes);
      const pill = WC.WAIT_BUCKET_COLORS[bucket];
      const count = venue.reports2hCount || 0;
      const label = count > 0
        ? 'Current wait · ' + count + (count === 1 ? ' report' : ' reports')
        : 'Current wait';
      const cardStyle = tint
        ? 'background:' + tint.backgroundColor + ';border-color:' + tint.borderColor + ';'
        : '';
      currentWaitHtml =
        '<div class="details-gap"></div>' +
        '<div class="current-wait-card" style="' + cardStyle + '">' +
        '<div class="current-wait-row"><span class="current-wait-label">' + escapeHtml(label) + '</span>' +
        '<span class="current-wait-pill" style="background:' + pill.backgroundColor + ';color:' + pill.color + ';">' +
        escapeHtml(venue.currentWaitLabel) +
        '</span></div></div>';
    }

    const waitTiles = WAIT_BUCKETS.map(function (bucket) {
      const colors = WC.WAIT_BUCKET_COLORS[bucket];
      const active = reportFormState.waitBucket === bucket;
      const style = active
        ? 'background:' + colors.backgroundColor + ';border-color:' + colors.borderColor + ';color:' + colors.color + ';'
        : 'background:' + waitColorWithAlpha(colors.backgroundColor, 0x26) + ';border-color:' + waitColorWithAlpha(colors.borderColor, 0x80) + ';color:' + waitColorWithAlpha(colors.backgroundColor, 0xd0) + ';';
      return (
        '<button type="button" class="wait-tile' + (active ? ' active' : '') + '" data-wait-bucket="' + escapeHtml(bucket) + '" style="' + style + '">' +
        escapeHtml(WAIT_BUCKET_LABELS[bucket]) +
        '</button>'
      );
    }).join('');

    const platformChips = PLATFORMS.map(function (platform) {
      const active = reportFormState.platform === platform;
      return (
        '<button type="button" class="platform-chip' + (active ? ' active' : '') + '" data-platform="' + escapeHtml(platform) + '" style="' +
        getPlatformChipStyle(platform, active) + '">' + escapeHtml(platform) + '</button>'
      );
    }).join('');

    const arrivalOn = reportFormState.orderMadeWhenDriverArrives;
    const problemOpen = reportFormState.problemExpanded;
    const closedActive = reportFormState.selectedProblemAction === 'closed';
    const downActive = reportFormState.selectedProblemAction === 'system_down';
    const otherActive = reportFormState.selectedProblemAction === 'other';

    return (
      '<div class="details-heading">' +
      '<h2 class="report-wait-title">Report wait</h2>' +
      '<div class="details-actions">' +
      '<button type="button" class="icon-action" data-save-venue aria-label="Save pickup point">' + prIcon('bookmark-outline', 20) + '</button>' +
      '<button type="button" class="icon-action" data-share-venue aria-label="Share pickup point">' + prIcon('share', 20) + '</button>' +
      '</div></div>' +
      '<div class="selected-venue-card">' +
      '<div class="selected-venue-identity">' +
      '<span class="venue-type-icon selected-venue-icon" style="color:' + iconColor + ';">' +
      prIcon(VD.getVenueTypeIconName(venue.venue_type), 18) +
      '</span>' +
      '<div class="selected-venue-text">' +
      '<p class="selected-venue-name">' + escapeHtml(title) + '</p>' +
      locationHtml +
      warnings +
      '</div></div>' +
      '<button type="button" class="change-pill" data-report-change>Change</button>' +
      '</div>' +
      currentWaitHtml +
      '<div class="details-gap"></div>' +
      '<div class="section-heading">' + prIcon('clock', 18) + '<span>Wait time (minutes)</span></div>' +
      '<div class="wait-grid" role="radiogroup" aria-label="Wait time (minutes)">' + waitTiles + '</div>' +
      '<div class="details-gap"></div>' +
      '<div class="section-heading">' + prIcon('phone', 18) + '<span>Delivery app (optional)</span></div>' +
      '<div class="platform-row">' + platformChips + '</div>' +
      '<div class="details-gap"></div>' +
      '<button type="button" class="toggle-row' + (arrivalOn ? ' on' : '') + '" data-order-made-toggle aria-pressed="' + (arrivalOn ? 'true' : 'false') + '">' +
      '<span class="toggle-copy">' +
      '<span class="toggle-title-row"><span style="color:#8FB5D7;">' + prIcon(VD.getVenueTypeIconName(venue.venue_type), 18) + '</span><span>Order starts after arrival</span></span>' +
      '<span class="toggle-subtitle">Staff start preparing the order when you arrive.</span>' +
      '</span>' +
      '<span class="switch" aria-hidden="true"><span class="switch-track"><span class="switch-thumb"></span></span></span>' +
      '</button>' +
      '<div class="details-gap"></div>' +
      '<button type="button" class="problem-toggle" data-problem-toggle>' +
      '<span class="problem-toggle-title"><span style="color:#E7A85B;">' + prIcon('warning', 18) + '</span><span>Report a problem</span></span>' +
      '<span style="color:#8FB5D7;">' + prIcon(problemOpen ? 'chevron-up' : 'chevron', 18) + '</span>' +
      '</button>' +
      (problemOpen
        ? '<div class="problem-panel">' +
          '<button type="button" class="problem-action' + (closedActive ? ' active' : '') + '" data-problem-action="closed"><span style="color:#FF8B91;">' + prIcon('close-circle', 15) + '</span><span>Closed now</span></button>' +
          '<button type="button" class="problem-action' + (downActive ? ' active' : '') + '" data-problem-action="system_down"><span style="color:#E7A85B;">' + prIcon('cloud', 15) + '</span><span>Not receiving orders</span></button>' +
          '<button type="button" class="problem-action' + (otherActive ? ' active' : '') + '" data-problem-action="other">Other issue</button>' +
          renderIssuePanelHtml() +
          '</div>'
        : '')
    );
  }

  function renderReportWaitContent(venue, resetScroll) {
    const scrollTop = reportBody.scrollTop;
    reportBody.innerHTML = buildReportWaitHtml(venue);
    bindReportWaitForm();
    renderReportFooter();
    reportBody.scrollTop = resetScroll ? 0 : scrollTop;
  }

  function renderSelectedVenueLocationHtml(venue) {
    const details = VD.getVenueOpenedLocationDetails(venue, activeCity);
    return [
      { text: details.area, className: 'selected-venue-area' },
      { text: details.street, className: 'selected-venue-address' },
      { text: details.postcode, className: 'selected-venue-address' },
    ]
      .filter(function (line) {
        return line.text;
      })
      .map(function (line) {
        return '<p class="' + line.className + '">' + escapeHtml(line.text) + '</p>';
      })
      .join('');
  }

  function getPlatformChipStyle(platform, active) {
    const brand = PLATFORM_COLORS[platform];
    if (!brand) return '';
    if (active) {
      return 'background:' + brand.selected + ';border-color:' + brand.selected + ';color:#081018;';
    }
    return 'background:' + brand.unselectedBg + ';border-color:' + brand.border + ';color:#A8BED1;';
  }

  function reportProblemMode() {
    return reportFormState.selectedProblemAction !== null;
  }

  function canSubmitProblem() {
    if (reportFormState.selectedProblemAction === 'closed' || reportFormState.selectedProblemAction === 'system_down') {
      return true;
    }
    if (reportFormState.selectedProblemAction === 'other') {
      return reportFormState.selectedIssueType !== null;
    }
    return false;
  }

  function displayedWaitReportRp(venue) {
    const now = Date.now();
    if (venue && !WC.isLocallyLiveWait(venue, now) && PRED.getEffectiveVenueStatus(venue, now) === null) {
      return 15;
    }
    return 10;
  }

  function renderReportFooter() {
    const problemMode = reportProblemMode();
    const canSubmit = problemMode ? canSubmitProblem() : Boolean(reportFormState.waitBucket);
    let label = 'Submit report · +' + displayedWaitReportRp(currentReportVenue) + ' RP';
    let hint = '';
    if (problemMode) {
      label = 'Submit problem';
      if (!canSubmit) {
        hint = reportFormState.selectedProblemAction === 'other' && reportFormState.selectedIssueType === null
          ? 'Choose an issue.'
          : 'Choose a problem.';
      }
    } else if (!canSubmit) {
      hint = 'Choose a wait time.';
    }
    reportFooter.innerHTML =
      '<button type="button" class="report-submit-btn' + (canSubmit ? '' : ' disabled') + '" data-report-submit' +
      (canSubmit ? '' : ' disabled') + '>' + escapeHtml(label) + '</button>' +
      '<div class="footer-hint-slot">' +
      (hint ? '<p class="report-footer-hint">' + escapeHtml(hint) + '</p>' : '') +
      '</div>';
    const submitBtn = reportFooter.querySelector('[data-report-submit]');
    if (submitBtn) {
      submitBtn.addEventListener('click', function () {
        if (problemMode) {
          if (!canSubmitProblem()) return;
        } else if (!reportFormState.waitBucket) {
          return;
        }
        openDownloadModal();
      });
    }
  }

  function rerenderReport(resetScroll) {
    if (!currentReportVenue) return;
    renderReportWaitContent(currentReportVenue, resetScroll);
  }

  function bindReportWaitForm() {
    reportBody.querySelectorAll('[data-wait-bucket]').forEach(function (button) {
      button.addEventListener('click', function () {
        reportFormState.waitBucket = button.getAttribute('data-wait-bucket');
        clearProblemSelection();
        rerenderReport(false);
      });
    });

    reportBody.querySelectorAll('[data-platform]').forEach(function (button) {
      button.addEventListener('click', function () {
        const platform = button.getAttribute('data-platform');
        reportFormState.platform = reportFormState.platform === platform ? '' : platform;
        reportBody.querySelectorAll('[data-platform]').forEach(function (chip) {
          const active = chip.getAttribute('data-platform') === reportFormState.platform;
          chip.classList.toggle('active', active);
          chip.setAttribute('style', getPlatformChipStyle(chip.getAttribute('data-platform'), active));
        });
      });
    });

    const problemToggle = reportBody.querySelector('[data-problem-toggle]');
    if (problemToggle) {
      problemToggle.addEventListener('click', function () {
        reportFormState.problemExpanded = !reportFormState.problemExpanded;
        if (!reportFormState.problemExpanded) clearProblemSelection();
        rerenderReport(false);
      });
    }

    reportBody.querySelectorAll('[data-problem-action]').forEach(function (button) {
      button.addEventListener('click', function () {
        const action = button.getAttribute('data-problem-action');
        reportFormState.waitBucket = null;
        reportFormState.selectedProblemAction = action;
        if (action === 'other') {
          reportFormState.issueExpanded = true;
        } else {
          reportFormState.issueExpanded = false;
          reportFormState.selectedIssueType = null;
          reportFormState.issueNote = '';
        }
        rerenderReport(false);
      });
    });

    reportBody.querySelectorAll('[data-issue-type]').forEach(function (button) {
      button.addEventListener('click', function () {
        const issueType = button.getAttribute('data-issue-type');
        reportFormState.selectedProblemAction = 'other';
        reportFormState.selectedIssueType = issueType;
        if (issueType !== 'other') reportFormState.issueNote = '';
        rerenderReport(false);
      });
    });

    const issueNote = reportBody.querySelector('[data-issue-note]');
    if (issueNote) {
      issueNote.addEventListener('input', function () {
        reportFormState.issueNote = issueNote.value.slice(0, 500);
      });
    }

    const toggle = reportBody.querySelector('[data-order-made-toggle]');
    if (toggle) {
      toggle.addEventListener('click', function () {
        reportFormState.orderMadeWhenDriverArrives = !reportFormState.orderMadeWhenDriverArrives;
        toggle.classList.toggle('on', reportFormState.orderMadeWhenDriverArrives);
        toggle.setAttribute('aria-pressed', reportFormState.orderMadeWhenDriverArrives ? 'true' : 'false');
      });
    }

    const saveBtn = reportBody.querySelector('[data-save-venue]');
    if (saveBtn) saveBtn.addEventListener('click', openDownloadModal);
    const shareBtn = reportBody.querySelector('[data-share-venue]');
    if (shareBtn) shareBtn.addEventListener('click', openDownloadModal);

    const changeBtn = reportBody.querySelector('[data-report-change]');
    if (changeBtn) {
      changeBtn.addEventListener('click', function () {
        showScreen('search');
        renderSearchList();
        pushPreviewScreen('search');
        searchInput.focus();
      });
    }
  }

  function openReportWait(venueId, backScreen) {
    const venue = venueStats.find(function (item) {
      return item.id === venueId;
    });
    if (!venue) return;

    previousScreen = backScreen || 'home';
    reportVenueId = venueId;
    currentReportVenue = venue;
    resetReportFormState();
    renderReportWaitContent(venue, true);
    showScreen('report-wait');
    rememberSearchQuery();
    pushPreviewScreen('report-wait');
  }

  function saveSelectedCity(city) {
    try {
      localStorage.setItem(CITY_STORAGE_KEY, city);
    } catch (error) {
      // Ignore storage errors in private browsing or restricted contexts.
    }
  }

  function resolveActiveCity(cities) {
    const liveList = Array.isArray(cities) ? cities : [];
    if (liveList.length === 0) return DEFAULT_CITY;

    const urlCity = new URLSearchParams(window.location.search).get('city');
    if (urlCity && liveList.includes(urlCity)) {
      return urlCity;
    }

    try {
      const savedCity = localStorage.getItem(CITY_STORAGE_KEY);
      if (savedCity && liveList.includes(savedCity)) {
        return savedCity;
      }
    } catch (error) {
      // Ignore storage errors in private browsing or restricted contexts.
    }

    if (liveList.includes(DEFAULT_CITY)) {
      return DEFAULT_CITY;
    }

    return liveList[0];
  }

  function dialogFocusables(dialog) {
    return Array.prototype.filter.call(
      dialog.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])'),
      function (el) {
        return !el.closest('.hidden') && el.offsetParent !== null;
      }
    );
  }

  function focusDialog(dialog) {
    const items = dialogFocusables(dialog);
    if (items.length) items[0].focus();
  }

  function beginDialog(dialog, trigger) {
    dialogReturnFocus = trigger && trigger.focus ? trigger : document.activeElement;
    activeDialog = dialog;
    window.setTimeout(function () {
      if (activeDialog === dialog) focusDialog(dialog);
    }, 0);
  }

  function canRestoreFocus(el) {
    if (!el || typeof el.focus !== 'function' || !document.contains(el)) return false;
    if (el.closest('.hidden')) return false;
    return el.offsetParent !== null;
  }

  function restoreDialogFocus() {
    const back = dialogReturnFocus;
    dialogReturnFocus = null;
    activeDialog = null;
    if (canRestoreFocus(back)) {
      back.focus();
      return;
    }
    const fallback = root.querySelector('[data-help-open]') || cityPillBtn;
    if (fallback) fallback.focus();
  }

  const DOWNLOAD_MODAL_TEXT = 'Download PickupRadar to report waits and venue issues.<br><br>Reporting is only available in the mobile app.';

  // messageHtml is built only from fixed text and escaped city names.
  function openDownloadModal(trigger, messageHtml) {
    const text = downloadModal.querySelector('[data-modal-text]');
    if (text) text.innerHTML = messageHtml || DOWNLOAD_MODAL_TEXT;
    downloadModal.classList.add('open');
    beginDialog(downloadModal, trigger);
  }

  function closeDownloadModal() {
    downloadModal.classList.remove('open');
    if (activeDialog === downloadModal) restoreDialogFocus();
  }

  function openInfoModal(trigger) {
    infoModal.classList.add('open');
    beginDialog(infoModal, trigger);
  }

  function closeInfoModal() {
    infoModal.classList.remove('open');
    if (activeDialog === infoModal) restoreDialogFocus();
  }

  function openSupportModal(trigger) {
    supportModal.classList.add('open');
    beginDialog(supportModal, trigger);
  }

  function closeSupportModal() {
    supportModal.classList.remove('open');
    if (activeDialog === supportModal) restoreDialogFocus();
  }

  function setupSupportControl() {
    const supportEl = root.querySelector('[data-support]');
    if (!supportEl) return;

    if (supportMode === 'modal') {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'help-sheet-row';
      btn.textContent = 'Support';
      btn.setAttribute('data-support', '');
      supportEl.replaceWith(btn);
      btn.addEventListener('click', () => {
        closeHelpSheet({ keepFocus: true });
        openSupportModal(btn);
      });
      root.querySelector('[data-support-close]').addEventListener('click', closeSupportModal);
      supportModal.addEventListener('click', (event) => {
        if (event.target === supportModal) closeSupportModal();
      });
    }
  }

  function setupStoreButtons() {
    const storeRow = root.querySelector('[data-store-row]');
    storeRow.innerHTML = '';

    if (APP_STORE_URL) {
      const link = document.createElement('a');
      link.className = 'store-btn primary';
      link.href = APP_STORE_URL;
      link.textContent = 'Download on the App Store';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      storeRow.appendChild(link);
    } else {
      const soon = document.createElement('span');
      soon.className = 'store-btn secondary';
      soon.textContent = 'iPhone app coming soon';
      storeRow.appendChild(soon);
    }

    if (PLAY_STORE_URL) {
      const link = document.createElement('a');
      link.className = 'store-btn primary';
      link.href = PLAY_STORE_URL;
      link.textContent = 'Get it on Google Play';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      storeRow.appendChild(link);
    } else {
      const soon = document.createElement('span');
      soon.className = 'store-btn secondary';
      soon.textContent = 'Android coming soon';
      storeRow.appendChild(soon);
    }
  }

  function closeHelpSheet(options) {
    const sheet = root.querySelector('[data-help-sheet]');
    if (sheet) sheet.classList.add('hidden');
    if (activeDialog === sheet && !(options && options.keepFocus)) restoreDialogFocus();
    else if (activeDialog === sheet) activeDialog = null;
  }

  function openHelpSheet(trigger) {
    const sheet = root.querySelector('[data-help-sheet]');
    if (!sheet) return;
    sheet.classList.remove('hidden');
    beginDialog(sheet, trigger);
  }

  root.querySelectorAll('.filter-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      root.querySelectorAll('.filter-chip').forEach((item) => {
        const active = item === chip;
        item.classList.toggle('active', active);
        item.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      selectedFilter = chip.getAttribute('data-filter');
      const homeScroll = homeScreen.querySelector('.app-scroll');
      if (homeScroll) homeScroll.scrollTop = 0;
      renderHomeList();
    });
  });

  cityPillBtn.addEventListener('click', openCityPicker);
  root.querySelector('[data-city-close]').addEventListener('click', previewBack);
  citySearchInput.addEventListener('input', renderCityList);

  root.querySelector('[data-open-search]').addEventListener('click', () => {
    searchReturnScreen = 'home';
    searchInput.value = '';
    showScreen('search');
    renderSearchList();
    pushPreviewScreen('search');
    searchInput.focus();
  });

  root.querySelector('[data-report-wait-btn]').addEventListener('click', openReportWaitSearch);
  root.querySelectorAll('[data-open-app]').forEach((button) => {
    button.addEventListener('click', function () {
      openDownloadModal(button);
    });
  });
  root.querySelector('[data-help-open]').addEventListener('click', function (event) {
    openHelpSheet(event.currentTarget);
  });
  root.querySelector('[data-help-close]').addEventListener('click', closeHelpSheet);
  root.querySelector('[data-help-sheet]').addEventListener('click', (event) => {
    if (event.target === root.querySelector('[data-help-sheet]')) closeHelpSheet();
  });
  root.querySelector('[data-home-brand]').addEventListener('click', () => {
    selectedFilter = 'All';
    root.querySelectorAll('.filter-chip').forEach((chip) => {
      const active = chip.getAttribute('data-filter') === 'All';
      chip.classList.toggle('active', active);
      chip.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    // Going Home from a preview screen is a new step, so on-screen Back from a later screen returns here.
    if (history.state && history.state.prPreview && history.state.prScreen !== 'home') pushPreviewScreen('home');
    showScreen('home');
    const homeScroll = homeScreen.querySelector('.app-scroll');
    if (homeScroll) homeScroll.scrollTop = 0;
    renderHomeList();
  });

  root.querySelector('[data-search-back]').addEventListener('click', previewBack);

  searchInput.addEventListener('input', function () {
    rememberSearchQuery();
    renderSearchList();
  });

  root.querySelector('[data-report-back]').addEventListener('click', previewBack);

  const howItWorksBtn = root.querySelector('[data-how-it-works]');
  if (options.howItWorksScrollTo) {
    howItWorksBtn.addEventListener('click', () => {
      closeHelpSheet();
      const target = document.querySelector(options.howItWorksScrollTo);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  } else {
    howItWorksBtn.addEventListener('click', () => {
      closeHelpSheet({ keepFocus: true });
      openInfoModal(howItWorksBtn);
    });
    root.querySelector('[data-info-close]').addEventListener('click', closeInfoModal);
    infoModal.addEventListener('click', (event) => {
      if (event.target === infoModal) closeInfoModal();
    });
  }

  root.querySelector('[data-modal-close]').addEventListener('click', closeDownloadModal);
  downloadModal.addEventListener('click', (event) => {
    if (event.target === downloadModal) closeDownloadModal();
  });

  setupStoreButtons();
  setupSupportControl();

  window.addEventListener('popstate', function (event) {
    const state = event.state;
    if (state && state.prPreview) applyPreviewHistory(state);
    else applyPreviewHistory(null);
  });

  document.addEventListener('keydown', function (event) {
    if (!activeDialog || activeDialog.classList.contains('hidden') || !root.contains(activeDialog)) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      if (activeDialog === downloadModal) closeDownloadModal();
      else if (activeDialog === infoModal) closeInfoModal();
      else if (activeDialog === supportModal) closeSupportModal();
      else closeHelpSheet();
      return;
    }
    if (event.key !== 'Tab') return;
    const items = dialogFocusables(activeDialog);
    if (!items.length) {
      event.preventDefault();
      return;
    }
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && (document.activeElement === first || !activeDialog.contains(document.activeElement))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (document.activeElement === last || !activeDialog.contains(document.activeElement))) {
      event.preventDefault();
      first.focus();
    }
  });

  if (options.resetOnLoad) {
    resetPreviewHome();
    window.addEventListener('pageshow', (event) => {
      if (event.persisted) resetPreviewHome();
    });
  }

  (async function initPreview() {
    try {
      liveCities = await loadLiveCities();
      if (liveCities.length === 0) liveCities = [DEFAULT_CITY];
      activeCity = resolveActiveCity(liveCities);
      saveSelectedCity(activeCity);
      updateCityPill();
      if (options.resetOnLoad) resetPreviewHome();
      await loadCityData(activeCity);
      if (options.resetOnLoad) resetPreviewHome();
      else if (history.state && history.state.prPreview) applyPreviewHistory(history.state);
      setupLocation();
    } catch (error) {
      console.error(error);
      loadError = "Live data isn't available right now.";
      root.querySelector('[data-home-body]').innerHTML =
        '<div class="state-box"><strong>Could not load live data</strong><span>Live data isn\'t available right now.</span><button type="button" class="retry-btn" data-retry>Try again</button></div>';
      root.querySelector('[data-retry]').addEventListener('click', () => location.reload());
    }
  })();
}

window.mountPickupRadarPreview = mountPickupRadarPreview;
