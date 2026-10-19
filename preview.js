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
                <button type="button" class="filter-chip active" data-filter="All" role="tab" aria-selected="true">${prIcon('list', 16)}<span>All</span></button>
                <button type="button" class="filter-chip" data-filter="Fast" role="tab" aria-selected="false">${prIcon('flash', 16)}<span>Fast</span></button>
                <button type="button" class="filter-chip" data-filter="Slow" role="tab" aria-selected="false">${prIcon('hourglass', 16)}<span>Slow</span></button>
                <button type="button" class="filter-chip" data-filter="Saved" role="tab" aria-selected="false">${prIcon('bookmark', 16)}<span>Saved</span></button>
              </div>
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
            <button type="button" class="back-btn" data-city-close>Close</button>
            <h2 class="city-picker-title">Choose your area</h2>
            <input data-city-search class="city-search-input" type="search" placeholder="Search area" autocomplete="off" autocapitalize="off" spellcheck="false" data-lpignore="true" />
          </div>
          <div class="app-scroll" data-city-list></div>
        </div>
        <div data-screen="search" class="screen hidden">
          <div class="top-bar">
            <button type="button" class="back-btn" data-search-back>← Back</button>
          </div>
          <input data-search-input class="search-bar" type="search" placeholder="Search pickup points" autocomplete="off" autocapitalize="off" spellcheck="false" data-lpignore="true" />
          <p class="search-heading" data-search-heading>Suggested pickup points</p>
          <div class="app-scroll" data-search-body></div>
        </div>
        <div data-screen="report-wait" class="screen hidden">
          <div class="top-bar">
            <button type="button" class="back-btn" data-report-back>← Back</button>
          </div>
          <div class="app-scroll report-wait-scroll" data-report-body></div>
          <div class="report-footer" data-report-footer></div>
        </div>
      </div>
    </div>
    <div data-download-modal class="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
      <div class="modal">
        <h2 id="modalTitle">Get the app</h2>
        <p>Download PickupRadar to report waits and venue issues.<br><br>Reporting is only available in the mobile app.</p>
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
          <li>No login required. An anonymous device ID reduces spam and duplicate reports.</li>
        </ul>
        <button type="button" data-info-close class="modal-close">Close</button>
      </div>
    </div>
    <div data-support-modal class="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="supportTitle">
      <div class="modal">
        <h2 id="supportTitle">Support / About</h2>
        <div class="support-modal-body">
          <h3 class="support-section-title">PickupRadar</h3>
          <p class="support-body">PickupRadar helps UK delivery drivers see and report pickup wait times.</p>
          <h3 class="support-section-title">Support email</h3>
          <p class="support-body"><a class="support-link" href="mailto:support@pickupradar.co.uk">support@pickupradar.co.uk</a></p>
          <h3 class="support-section-title">Website</h3>
          <p class="support-body"><a class="support-link" href="https://pickupradar.co.uk" target="_blank" rel="noopener noreferrer">pickupradar.co.uk</a></p>
          <h3 class="support-section-title">Privacy summary</h3>
          <ul class="info-list support-privacy-list">
            <li>No login required</li>
            <li>Reports are linked to an anonymous device ID to reduce spam</li>
            <li>Wait reports may include venue, platform, wait time, left early status, and time submitted</li>
            <li>No personal profile is created</li>
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
  const HOME_TAB_LIMITS = options.compact
    ? { All: 3, Fast: 3, Slow: 3 }
    : { All: 12, Fast: 12, Slow: 12 };
  const BRAND_PRIORITY = ["McDonald's", 'KFC', 'Burger King', 'Subway', 'Greggs', 'Taco Bell', 'Popeyes', "Pepe's", 'Dixy', 'German Doner Kebab', 'Starbucks', 'Costa', 'Co-op', 'Tesco', "Sainsbury's", 'One Stop'];
  const SUGGESTED_LIMIT = options.compact ? 12 : 20;

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
    issueExpanded: false,
    selectedIssueType: null,
  };
  let missingVenueExpanded = false;
  let suggestionVenueName = '';
  let suggestionVenueAddress = '';
  let suggestionVenueNote = '';
  let lastMissingVenueQuery = '';

  const cityPillBtn = root.querySelector('[data-city-pill]');
  const cityListBody = root.querySelector('[data-city-list]');
  const citySearchInput = root.querySelector('[data-city-search]');
  const homeBody = root.querySelector('[data-home-body]');
  const searchBody = root.querySelector('[data-search-body]');
  const searchInput = root.querySelector('[data-search-input]');
  const searchHeading = root.querySelector('[data-search-heading]');
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


  function normalizeName(value) {
    return value.toLowerCase().replace(/['']/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
  }

  function effectiveStatus(venue) {
    return PRED.getEffectiveVenueStatus(venue, Date.now());
  }

  function getVenueSearchText(venue) {
    const parts = [venue.name, venue.brand, venue.area, venue.zone, venue.branch, venue.postcode, venue.address];
    parts.push(VD.getVenueDisplayName(venue, activeCity, venueStats));
    return parts.filter(Boolean).map((value) => String(value).toLowerCase());
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

  function getVisibleVenues(filter) {
    const venues = venueStats;

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
    const pill = waitBadgeText
      ? '<span class="wait-badge" style="background:' + waitColors.backgroundColor + ';color:' + waitColors.color + ';">' +
        escapeHtml(waitBadgeText) +
        '</span>'
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
      '</div></div>' +
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
        ? ['No likely fast pickups', 'Try All or Slow.']
        : selectedFilter === 'Slow'
          ? ['No likely slow pickups', 'Try All or Fast.']
          : ['No pickup points found', 'Try another area.'];
      homeBody.innerHTML = '<div class="state-box"><strong>' + empty[0] + '</strong><span>' + empty[1] + '</span></div>';
      return;
    }

    homeBody.innerHTML = visible.map((item, index) => renderVenueCard(item, index, 'home')).join('');
    bindVenueCards(homeBody, 'home');
  }

  function getSuggestedVenues() {
    const seen = new Set();
    const result = [];

    function addVenue(venue) {
      if (!venue || seen.has(venue.id)) return;
      seen.add(venue.id);
      result.push(venue);
    }

    venueStats
      .filter((venue) => venue.currentWaitMinutes !== null)
      .sort((a, b) => (a.lastReportMinutes ?? Infinity) - (b.lastReportMinutes ?? Infinity))
      .forEach(addVenue);

    venueStats
      .filter((venue) => venue.currentWaitMinutes === null && venue.lastReportMinutes !== null)
      .sort((a, b) => (a.lastReportMinutes ?? Infinity) - (b.lastReportMinutes ?? Infinity))
      .forEach(addVenue);

    for (const brand of BRAND_PRIORITY) {
      const brandKey = normalizeName(brand);
      const match = venueStats.find((venue) => {
        if (seen.has(venue.id)) return false;
        const name = normalizeName(venue.name);
        const venueBrand = venue.brand ? normalizeName(String(venue.brand)) : '';
        const matchesBrand = name.includes(brandKey) || venueBrand.includes(brandKey);
        if (!matchesBrand) return false;
        return (
          venue.currentWaitMinutes !== null ||
          venue.lastReportMinutes !== null ||
          effectiveStatus(venue) !== null
        );
      });
      if (match) addVenue(match);
    }

    venueStats
      .filter((venue) => effectiveStatus(venue) !== null)
      .forEach(addVenue);

    return result.slice(0, SUGGESTED_LIMIT);
  }

  function renderSearchList() {
    const queryRaw = searchInput.value.trim();
    const query = queryRaw.toLowerCase();
    let list;

    if (query) {
      list = venueStats.filter((venue) => {
        return getVenueSearchText(venue).some((part) => part.includes(query));
      });
      list = list.slice(0, 50);
    } else {
      list = getSuggestedVenues();
    }

    if (query) {
      searchHeading.textContent = 'Search results';
      searchHeading.classList.add('hidden');
    } else {
      searchHeading.textContent = 'Suggested pickup points';
      searchHeading.classList.remove('hidden');
      missingVenueExpanded = false;
      lastMissingVenueQuery = '';
      suggestionVenueName = '';
      suggestionVenueAddress = '';
      suggestionVenueNote = '';
    }

    if (list.length === 0 && query) {
      if (lastMissingVenueQuery !== queryRaw) {
        suggestionVenueName = queryRaw;
        suggestionVenueAddress = '';
        suggestionVenueNote = '';
        missingVenueExpanded = false;
        lastMissingVenueQuery = queryRaw;
      }

      searchBody.innerHTML = '<p class="search-empty-hint">No pickup points found</p>' + renderMissingVenueSectionHtml();
      bindMissingVenueSection(searchBody);
      return;
    }

    if (list.length === 0) {
      searchBody.innerHTML = '<div class="state-box"><strong>No matches</strong><span>Try another search term.</span></div>';
      return;
    }

    searchBody.innerHTML = list.map((item, index) => renderVenueCard(item, index, 'search')).join('');
    bindVenueCards(searchBody, 'search');
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

  function openReportWaitSearch() {
    searchReturnScreen = 'home';
    showScreen('search');
    renderSearchList();
    searchInput.focus();
  }

  function resetPreviewHome() {
    showScreen('home');
    previousScreen = 'home';
    searchReturnScreen = 'home';
    reportVenueId = null;
    currentReportVenue = null;
    resetReportFormState();
    missingVenueExpanded = false;
    suggestionVenueName = '';
    suggestionVenueAddress = '';
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

  function renderCityRow(city, selected) {
    return (
      '<button type="button" class="city-row' + (selected ? ' selected' : '') + '" data-city="' + escapeHtml(city) + '">' +
      '<span><span class="city-row-name">' + escapeHtml(city) + '</span>' +
      (selected ? '<span class="city-row-meta">Selected</span>' : '') +
      '</span>' +
      '<span class="city-row-status">' + (selected ? 'Active' : 'Choose') + '</span>' +
      '</button>'
    );
  }

  function bindCityRows() {
    cityListBody.querySelectorAll('.city-row').forEach((row) => {
      row.addEventListener('click', () => {
        const city = row.getAttribute('data-city');
        if (!city || city === activeCity) {
          showScreen('home');
          return;
        }
        activeCity = city;
        saveSelectedCity(activeCity);
        updateCityPill();
        citySearchInput.value = '';
        searchInput.value = '';
        showScreen('home');
        loadCityData(activeCity).catch((error) => {
          console.error(error);
          loadError = "Live data isn't available right now.";
          renderHomeList();
        });
      });
    });
  }

  function renderCityList() {
    const query = citySearchInput.value.trim().toLowerCase();
    const matchesQuery = (city) => !query || city.toLowerCase().includes(query);
    const otherCities = liveCities
      .filter((city) => city !== activeCity && matchesQuery(city))
      .sort((a, b) => a.localeCompare(b));
    const showSelected = Boolean(activeCity && matchesQuery(activeCity));

    if (!showSelected && otherCities.length === 0) {
      cityListBody.innerHTML = '<div class="state-box"><strong>No matches</strong><span>Try another area name.</span></div>';
      return;
    }

    let rowsHtml = '';
    if (showSelected) {
      rowsHtml += renderCityRow(activeCity, true);
    }
    rowsHtml += otherCities.map((city) => renderCityRow(city, false)).join('');

    cityListBody.innerHTML = '<div class="city-list">' + rowsHtml + '</div>';
    bindCityRows();
  }

  function renderMissingVenueSectionHtml() {
    const canSubmit = suggestionVenueName.trim().length >= 2;

    if (!missingVenueExpanded) {
      return (
        '<div class="missing-venue-card">' +
        '<p class="missing-venue-title">Missing a venue?</p>' +
        '<p class="missing-venue-text">Can\'t find this pickup point? Suggest it.</p>' +
        '<button type="button" class="missing-venue-btn" data-missing-open>Open form</button>' +
        '</div>'
      );
    }

    return (
      '<div class="missing-venue-card">' +
      '<p class="missing-venue-title">Missing a venue?</p>' +
      '<p class="missing-venue-text">Can\'t find this pickup point? Suggest it.</p>' +
      '<div class="missing-venue-form">' +
      '<input type="text" class="missing-venue-input" data-suggestion-name placeholder="Venue name" value="' +
      escapeHtml(suggestionVenueName) +
      '" autocomplete="off" autocapitalize="off" spellcheck="false" data-lpignore="true" />' +
      '<input type="text" class="missing-venue-input" data-suggestion-address placeholder="Address or area" value="' +
      escapeHtml(suggestionVenueAddress) +
      '" autocomplete="off" autocapitalize="off" spellcheck="false" data-lpignore="true" />' +
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
    citySearchInput.focus();
  }

  function resetReportFormState() {
    reportFormState = {
      waitBucket: null,
      platform: '',
      orderMadeWhenDriverArrives: false,
      issueExpanded: false,
      selectedIssueType: null,
    };
  }

  function renderIssuePanelHtml() {
    if (!reportFormState.issueExpanded) return '';

    return (
      '<div class="issue-compact-card">' +
      '<p class="issue-compact-title">What\'s wrong with this venue?</p>' +
      '<div class="issue-chip-wrap">' +
      ISSUE_OPTIONS.map(function (issue) {
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
      }).join('') +
      '</div></div>'
    );
  }

  function buildReportWaitHtml(venue) {
    const title = VD.getVenueDisplayName(venue, activeCity, venueStats);
    const locationHtml = renderSelectedVenueLocationHtml(venue);
    let warnings = '';

    if (venue.closedWarning) {
      warnings += '<span class="selected-venue-warning">Reported closed recently</span>';
    }
    if (venue.systemDownWarning) {
      warnings += '<span class="selected-venue-warning">Tablet/server issue reported</span>';
    }

    const currentWaitHtml =
      venue.currentWaitMinutes !== null
        ? '<div class="current-wait-card"><div class="current-wait-row"><span class="current-wait-label">Current wait</span><span class="current-wait-value">' +
          escapeHtml(venue.currentWaitLabel) +
          '</span></div></div>'
        : '';

    const waitChips = WAIT_BUCKETS.map(function (bucket) {
      const active = reportFormState.waitBucket === bucket;
      return (
        '<button type="button" class="report-chip' +
        (active ? ' active' : '') +
        '" data-wait-bucket="' +
        escapeHtml(bucket) +
        '">' +
        escapeHtml(WAIT_BUCKET_LABELS[bucket]) +
        '</button>'
      );
    }).join('');

    const platformChips = PLATFORMS.map(function (platform) {
      const active = reportFormState.platform === platform;
      return (
        '<button type="button" class="report-chip platform-chip' +
        (active ? ' active' : '') +
        '" data-platform="' +
        escapeHtml(platform) +
        '" style="' +
        getPlatformChipStyle(platform, active) +
        '">' +
        escapeHtml(platform) +
        '</button>'
      );
    }).join('');

    const problemButtons = [
      { key: 'closed', label: 'Closed' },
      { key: 'system_down', label: 'Tablet/server down' },
      { key: 'venue_issue', label: reportFormState.issueExpanded ? 'Hide issue' : 'Venue issue' },
    ]
      .map(function (item) {
        const active = item.key === 'venue_issue' && reportFormState.issueExpanded;
        return (
          '<button type="button" class="problem-compact-btn' +
          (active ? ' active' : '') +
          '" data-problem-action="' +
          item.key +
          '">' +
          escapeHtml(item.label) +
          '</button>'
        );
      })
      .join('');

    const orderMadeClass = reportFormState.orderMadeWhenDriverArrives ? 'order-made-card on' : 'order-made-card';

    return (
      '<h2 class="report-wait-title">Report wait</h2>' +
      '<div class="selected-venue-card">' +
      '<div class="selected-venue-text">' +
      '<p class="selected-venue-name">' +
      escapeHtml(title) +
      '</p>' +
      locationHtml +
      warnings +
      '</div>' +
      '<button type="button" class="change-pill" data-report-change>Change</button>' +
      '</div>' +
      '<div class="problem-compact-card">' +
      '<p class="problem-compact-title">Problem with this pickup?</p>' +
      '<p class="problem-compact-body">Report if the venue is closed or cannot take orders.</p>' +
      '<div class="problem-compact-buttons">' +
      problemButtons +
      '</div>' +
      renderIssuePanelHtml() +
      '</div>' +
      currentWaitHtml +
      '<div class="report-section">' +
      '<p class="report-section-label">Wait time (minutes)</p>' +
      '<div class="report-chip-wrap">' +
      waitChips +
      '</div>' +
      '</div>' +
      '<div class="report-section">' +
      '<p class="report-section-label">Platform (optional)</p>' +
      '<div class="report-chip-wrap">' +
      platformChips +
      '</div>' +
      '</div>' +
      '<div class="report-section">' +
      '<button type="button" class="' +
      orderMadeClass +
      '" data-order-made-toggle aria-pressed="' +
      (reportFormState.orderMadeWhenDriverArrives ? 'true' : 'false') +
      '">' +
      '<span class="order-made-text">' +
      '<span class="order-made-title">Order made when driver arrives</span>' +
      '<span class="order-made-sub">Turn this on if the venue usually starts preparing the order only after you arrive.</span>' +
      '</span>' +
      '<span class="report-toggle" aria-hidden="true"><span class="report-toggle-track"><span class="report-toggle-thumb"></span></span></span>' +
      '</button>' +
      '</div>'
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

  function renderReportFooter() {
    const canSubmit = Boolean(reportFormState.waitBucket);
    reportFooter.innerHTML =
      '<button type="button" class="report-submit-btn' +
      (canSubmit ? '' : ' disabled') +
      '" data-report-submit' +
      (canSubmit ? '' : ' disabled') +
      '>Submit report</button>' +
      (canSubmit ? '' : '<p class="report-footer-hint">Select a wait time to enable submit.</p>');

    const submitBtn = reportFooter.querySelector('[data-report-submit]');
    if (submitBtn) {
      submitBtn.addEventListener('click', function () {
        if (!reportFormState.waitBucket) return;
        openDownloadModal();
      });
    }
  }

  function bindReportWaitForm() {
    reportBody.querySelectorAll('[data-wait-bucket]').forEach(function (button) {
      button.addEventListener('click', function () {
        reportFormState.waitBucket = button.getAttribute('data-wait-bucket');
        reportBody.querySelectorAll('[data-wait-bucket]').forEach(function (chip) {
          chip.classList.toggle('active', chip === button);
        });
        renderReportFooter();
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

    reportBody.querySelectorAll('[data-problem-action]').forEach(function (button) {
      button.addEventListener('click', function () {
        const action = button.getAttribute('data-problem-action');
        if (action === 'closed' || action === 'system_down') {
          openDownloadModal();
          return;
        }
        if (action === 'venue_issue') {
          reportFormState.issueExpanded = !reportFormState.issueExpanded;
          if (!reportFormState.issueExpanded) {
            reportFormState.selectedIssueType = null;
          }
          if (currentReportVenue) {
            renderReportWaitContent(currentReportVenue, false);
          }
        }
      });
    });

    reportBody.querySelectorAll('[data-issue-type]').forEach(function (button) {
      button.addEventListener('click', function () {
        const issueType = button.getAttribute('data-issue-type');
        reportFormState.selectedIssueType = issueType;
        reportBody.querySelectorAll('[data-issue-type]').forEach(function (chip) {
          chip.classList.toggle('active', chip.getAttribute('data-issue-type') === issueType);
        });
        openDownloadModal();
      });
    });

    const toggle = reportBody.querySelector('[data-order-made-toggle]');
    if (toggle) {
      toggle.addEventListener('click', function () {
        reportFormState.orderMadeWhenDriverArrives = !reportFormState.orderMadeWhenDriverArrives;
        toggle.classList.toggle('on', reportFormState.orderMadeWhenDriverArrives);
        toggle.setAttribute('aria-pressed', reportFormState.orderMadeWhenDriverArrives ? 'true' : 'false');
      });
    }

    const changeBtn = reportBody.querySelector('[data-report-change]');
    if (changeBtn) {
      changeBtn.addEventListener('click', function () {
        reportBackScreen = previousScreen;
        searchReturnScreen = 'report-wait';
        showScreen('search');
        renderSearchList();
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

  function openDownloadModal() {
    downloadModal.classList.add('open');
  }

  function closeDownloadModal() {
    downloadModal.classList.remove('open');
  }

  function openInfoModal() {
    infoModal.classList.add('open');
  }

  function closeInfoModal() {
    infoModal.classList.remove('open');
  }

  function openSupportModal() {
    supportModal.classList.add('open');
  }

  function closeSupportModal() {
    supportModal.classList.remove('open');
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
        closeHelpSheet();
        openSupportModal();
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

  function closeHelpSheet() {
    const sheet = root.querySelector('[data-help-sheet]');
    if (sheet) sheet.classList.add('hidden');
  }

  function openHelpSheet() {
    const sheet = root.querySelector('[data-help-sheet]');
    if (sheet) sheet.classList.remove('hidden');
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
  root.querySelector('[data-city-close]').addEventListener('click', () => showScreen('home'));
  citySearchInput.addEventListener('input', renderCityList);

  root.querySelector('[data-open-search]').addEventListener('click', () => {
    searchReturnScreen = 'home';
    showScreen('search');
    renderSearchList();
    searchInput.focus();
  });

  root.querySelector('[data-report-wait-btn]').addEventListener('click', openReportWaitSearch);
  root.querySelectorAll('[data-open-app]').forEach((button) => {
    button.addEventListener('click', openDownloadModal);
  });
  root.querySelector('[data-help-open]').addEventListener('click', openHelpSheet);
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
    showScreen('home');
    const homeScroll = homeScreen.querySelector('.app-scroll');
    if (homeScroll) homeScroll.scrollTop = 0;
    renderHomeList();
  });

  root.querySelector('[data-search-back]').addEventListener('click', () => {
    searchInput.value = '';
    if (searchReturnScreen === 'report-wait' && reportVenueId) {
      openReportWait(reportVenueId);
      return;
    }
    showScreen('home');
  });

  searchInput.addEventListener('input', renderSearchList);

  root.querySelector('[data-report-back]').addEventListener('click', () => {
    showScreen(previousScreen);
  });

  const howItWorksBtn = root.querySelector('[data-how-it-works]');
  if (options.howItWorksScrollTo) {
    howItWorksBtn.addEventListener('click', () => {
      closeHelpSheet();
      const target = document.querySelector(options.howItWorksScrollTo);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  } else {
    howItWorksBtn.addEventListener('click', () => {
      closeHelpSheet();
      openInfoModal();
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
