'use strict';

const PREVIEW_MARKUP = `
    <div class="phone-shell">
      <div class="phone-screen">
        <div class="phone-status" aria-hidden="true"></div>
        <div data-screen="home" class="screen">
          <div class="app-scroll">
            <div class="app-header">
              <button type="button" data-city-pill class="city-pill-btn" aria-label="Choose city">Manchester</button>
              <p class="app-title">PickupRadar</p>
              <p class="app-tagline">Know the pickup before you walk in.</p>
              <p class="app-supporting">Real wait times for UK delivery drivers</p>
              <div class="header-actions">
                <button type="button" class="header-pill" data-how-it-works>How it works</button>
                <a class="header-pill" href="support.html">Support</a>
              </div>
              <div class="filter-row" role="tablist" aria-label="Filters">
                <button type="button" class="filter-chip active" data-filter="Nearby">Nearby</button>
                <button type="button" class="filter-chip" data-filter="Fast">Fast</button>
                <button type="button" class="filter-chip" data-filter="Slow">Slow</button>
                <button type="button" class="filter-chip" data-filter="Recent">Recent</button>
              </div>
              <p class="home-helper">Showing top live and predicted pickup points. Search all pickup points to find any venue in your area.</p>
              <button type="button" class="search-all-card" data-open-search>
                <span class="search-all-title">Search all pickup points</span>
                <span class="search-all-sub">Find any venue in your area</span>
              </button>
            </div>
            <div data-home-body></div>
          </div>
          <div class="floating-bar">
            <button type="button" class="floating-btn write-action">Get the app to report</button>
          </div>
        </div>
        <div data-screen="city" class="screen hidden">
          <div class="city-picker-header">
            <button type="button" class="back-btn" data-city-close>Close</button>
            <h2 class="city-picker-title">Choose your area</h2>
            <input data-city-search class="city-search-input" type="search" placeholder="Search area" autocomplete="off" />
          </div>
          <div class="app-scroll" data-city-list></div>
        </div>
        <div data-screen="search" class="screen hidden">
          <div class="top-bar">
            <button type="button" class="back-btn" data-search-back>← Back</button>
          </div>
          <input data-search-input class="search-bar" type="search" placeholder="Search pickup points" autocomplete="off" />
          <p class="search-heading" data-search-heading>Suggested pickup points</p>
          <div class="app-scroll" data-search-body></div>
        </div>
        <div data-screen="detail" class="screen hidden">
          <div class="top-bar">
            <button type="button" class="back-btn" data-detail-back>← Back</button>
          </div>
          <div class="app-scroll" data-detail-body></div>
          <div class="floating-bar">
            <button type="button" class="floating-btn write-action">Get the app to report</button>
          </div>
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
          <li>When there are no recent reports, PickupRadar may show predicted fast or likely slow places.</li>
          <li>No login required. An anonymous device ID reduces spam and duplicate reports.</li>
        </ul>
        <button type="button" data-info-close class="modal-close">Close</button>
      </div>
    </div>
`;

function mountPickupRadarPreview(container, options) {
  if (!container) return;
  options = options || {};

  const root = document.createElement('div');
  root.className = 'preview-root' + (options.compact ? ' preview-compact' : '');
  root.innerHTML = PREVIEW_MARKUP;
  container.appendChild(root);

  const APP_STORE_URL = '';
  const PLAY_STORE_URL = '';

  const SUPABASE_URL = 'https://jvsseskherxmtcuumldq.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2c3Nlc2toZXJ4bXRjdXVtbGRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1MTQwMTcsImV4cCI6MjA5NDA5MDAxN30.lsbs-umYa1a05GUi3sLZUvS609XlyPQjrcgAPp7HvOU';
  const DEFAULT_CITY = 'Manchester';
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

  const FAST_FALLBACK_KEYWORDS = [
    'co-op', 'one stop', 'waitrose', 'little waitrose', 'tesco express', 'sainsbury',
    'londis', 'nisa', 'convenience', 'greggs', 'subway',
  ];

  const SLOW_FALLBACK_KEYWORDS = [
    'mcdonald', 'kfc', 'wingstop', 'five guys', 'popeyes', 'burger king', 'pizza',
    'drive-thru', 'drive thru',
  ];

  const CURATED_FALLBACK_LIMIT = 6;
  const HOME_TAB_LIMITS = options.compact
    ? { Nearby: 3, Fast: 3, Slow: 3, Recent: 4 }
    : { Nearby: 12, Fast: 12, Slow: 12, Recent: 20 };
  const BRAND_PRIORITY = ["McDonald's", 'KFC', 'Burger King', 'Subway', 'Greggs', 'Taco Bell', 'Popeyes', "Pepe's", 'Dixy', 'German Doner Kebab', 'Starbucks', 'Costa', 'Co-op', 'Tesco', "Sainsbury's", 'One Stop'];
  const SUGGESTED_LIMIT = options.compact ? 12 : 20;

  let liveCities = [];
  let activeCity = DEFAULT_CITY;
  let venueStats = [];
  let selectedFilter = 'Nearby';
  let loadError = null;
  let previousScreen = 'home';

  const cityPillBtn = root.querySelector('[data-city-pill]');
  const cityListBody = root.querySelector('[data-city-list]');
  const citySearchInput = root.querySelector('[data-city-search]');
  const homeBody = root.querySelector('[data-home-body]');
  const searchBody = root.querySelector('[data-search-body]');
  const searchInput = root.querySelector('[data-search-input]');
  const searchHeading = root.querySelector('[data-search-heading]');
  const detailBody = root.querySelector('[data-detail-body]');
  const homeScreen = root.querySelector('[data-screen="home"]');
  const cityScreen = root.querySelector('[data-screen="city"]');
  const searchScreen = root.querySelector('[data-screen="search"]');
  const detailScreen = root.querySelector('[data-screen="detail"]');
  const downloadModal = root.querySelector('[data-download-modal]');
  const infoModal = root.querySelector('[data-info-modal]');

  async function supabaseGet(path) {
    const response = await fetch(SUPABASE_URL + '/rest/v1' + path, {
      method: 'GET',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: 'Bearer ' + SUPABASE_ANON_KEY,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || 'Could not load live data (' + response.status + ')');
    }

    const text = await response.text();
    return text ? JSON.parse(text) : [];
  }

  async function loadLiveCities() {
    const pageSize = 1000;
    const cities = new Set();
    let offset = 0;

    while (true) {
      const rows = await supabaseGet(
        '/venues?select=city&is_active=eq.true&city=not.is.null&order=id.asc&limit=' + pageSize + '&offset=' + offset
      );
      if (!Array.isArray(rows) || rows.length === 0) break;
      for (const row of rows) {
        const city = typeof row.city === 'string' ? row.city.trim() : '';
        if (city) cities.add(city);
      }
      if (rows.length < pageSize) break;
      offset += pageSize;
    }

    return Array.from(cities).sort((a, b) => a.localeCompare(b));
  }

  function cleanVenueName(name, selectedCity) {
    const city = selectedCity.trim();
    if (!city) {
      return name.trim().replace(/[\s,\-]+$/g, '').replace(/[\s,\-]{2,}/g, ' ');
    }
    const escapedCity = city.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const suffixPattern = new RegExp('(?:,\\s*|\\s+|\\s-\\s|\\s–\\s|\\s—\\s)?' + escapedCity + '$', 'i');
    return name.replace(suffixPattern, '').replace(/[\s,\-]+$/g, '').replace(/[\s,\-]{2,}/g, ' ').trim();
  }

  function getVenueSubtitle(venue, selectedCity) {
    const selected = selectedCity.trim().toLowerCase();
    const candidates = [venue.branch, venue.zone, venue.area]
      .filter(Boolean)
      .map((value) => String(value).trim())
      .filter(Boolean);
    const useful = candidates.find((value) => value.toLowerCase() !== selected) || '';
    return useful || selectedCity;
  }

  function formatVenueLocation(venue) {
    const secondaryParts = [venue.address, venue.postcode].filter(Boolean);
    return secondaryParts.length > 0 ? secondaryParts.join(' • ') : '';
  }

  function normalizeName(value) {
    return value.toLowerCase().replace(/['']/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
  }

  function matchesAnyKeyword(name, keywords) {
    const normalized = normalizeName(name);
    return keywords.some((keyword) => normalized.includes(normalizeName(keyword)));
  }

  function getPredictedStatus(venue) {
    if (venue.currentWaitMinutes !== null) return null;
    if (matchesAnyKeyword(venue.name, FAST_FALLBACK_KEYWORDS)) return 'fast';
    if (matchesAnyKeyword(venue.name, SLOW_FALLBACK_KEYWORDS)) return 'slow';
    return null;
  }

  function isPredictedFastFallback(venue) {
    return getPredictedStatus(venue) === 'fast';
  }

  function isPredictedSlowFallback(venue) {
    return getPredictedStatus(venue) === 'slow';
  }

  function getWaitTone(waitMinutes) {
    if (waitMinutes < 8) return { className: 'wait-green', bg: '#113a2a', color: '#78e6a6' };
    if (waitMinutes <= 15) return { className: 'wait-amber', bg: '#3c3112', color: '#f5c56a' };
    return { className: 'wait-red', bg: '#3b1618', color: '#ff8b91' };
  }

  function getLocalMidnightTime() {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date.getTime();
  }

  function getMinutesSince(timestamp, now) {
    return Math.max(0, Math.floor((now - new Date(timestamp).getTime()) / 60000));
  }

  function getWeightForAge(minutesOld) {
    if (minutesOld < 15) return 1;
    if (minutesOld < 30) return 0.75;
    if (minutesOld < 60) return 0.5;
    if (minutesOld < 120) return 0.25;
    return 0;
  }

  function isoHoursAgo(hours) {
    return new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
  }

  function getVenueSearchText(venue) {
    return [venue.name, venue.brand, venue.area, venue.zone, venue.branch, venue.postcode, venue.address]
      .filter(Boolean)
      .map((value) => String(value).toLowerCase());
  }

  function buildVenueStats(venueRows, reportRows, statusRows, tagRows) {
    const now = Date.now();
    const midnight = getLocalMidnightTime();
    const madeWhenDriverWindowMs = 48 * 60 * 60 * 1000;
    const orderedVenues = [...venueRows].sort((a, b) => a.name.localeCompare(b.name));

    return orderedVenues.map((venue) => {
      const venueReports = reportRows.filter((report) => report.venue_id === venue.id);
      const recentReports = venueReports.filter((report) => now - new Date(report.created_at).getTime() <= 120 * 60000);
      const recentCount = recentReports.length;

      const weightedReports = recentReports.reduce(
        (acc, report) => {
          const ageMinutes = getMinutesSince(report.created_at, now);
          const weight = getWeightForAge(ageMinutes);
          if (weight === 0) return acc;
          acc.weightedTotal += report.wait_minutes * weight;
          acc.weightSum += weight;
          return acc;
        },
        { weightedTotal: 0, weightSum: 0 }
      );

      const reportsToday = venueReports.filter((report) => new Date(report.created_at).getTime() >= midnight);
      const latestReport = venueReports.reduce((latest, report) => {
        if (!latest) return report;
        return new Date(report.created_at).getTime() > new Date(latest.created_at).getTime() ? report : latest;
      }, null);

      const recentMadeWhenDriverReports = venueReports.filter(
        (report) => now - new Date(report.created_at).getTime() <= madeWhenDriverWindowMs && report.order_made_when_driver_arrives
      );
      const recentMadeWhenDriverTotalReports = venueReports.filter(
        (report) => now - new Date(report.created_at).getTime() <= madeWhenDriverWindowMs
      ).length;

      const recentStatusReports = statusRows.filter((report) => report.venue_id === venue.id);
      const recentClosedReports = recentStatusReports.filter((report) => report.status_type === 'closed');
      const recentSystemDownReports = recentStatusReports.filter((report) => report.status_type === 'system_down');

      const recentTagRows = tagRows.filter((report) => report.venue_id === venue.id);
      const tagCountMap = new Map();
      for (const row of recentTagRows) {
        tagCountMap.set(row.tag_key, (tagCountMap.get(row.tag_key) || 0) + 1);
      }
      const tagCounts = Array.from(tagCountMap.entries())
        .map(([tagKey, count]) => ({ tagKey, label: TAG_LABELS[tagKey] || tagKey, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 3);

      const currentWaitMinutes =
        weightedReports.weightSum > 0 ? Math.round(weightedReports.weightedTotal / weightedReports.weightSum) : null;
      const currentWaitLabel = currentWaitMinutes === null ? 'No recent data' : currentWaitMinutes + ' min';
      const confidence =
        recentCount === 0 ? 'No recent data' : recentCount <= 2 ? 'Low' : recentCount <= 5 ? 'Medium' : 'High';
      const waitTone =
        currentWaitMinutes === null ? 'neutral' : currentWaitMinutes < 8 ? 'green' : currentWaitMinutes <= 15 ? 'amber' : 'red';
      const leftEarlyCount = reportsToday.filter((report) => report.left_early).length;
      const leftEarlyWarning = reportsToday.length >= 3 && leftEarlyCount / reportsToday.length >= 0.3;
      const madeWhenDriverArrivesBadge =
        recentMadeWhenDriverReports.length >= 3 &&
        recentMadeWhenDriverTotalReports > 0 &&
        recentMadeWhenDriverReports.length / recentMadeWhenDriverTotalReports >= 0.6;
      const closedWarning = recentClosedReports.length >= 2;
      const systemDownWarning = recentSystemDownReports.length >= 2;

      return {
        ...venue,
        currentWaitMinutes,
        currentWaitLabel,
        waitTone,
        reportsToday: reportsToday.length,
        lastReportMinutes: latestReport ? getMinutesSince(latestReport.created_at, now) : null,
        confidence,
        leftEarlyWarning,
        madeWhenDriverArrivesBadge,
        closedWarning,
        systemDownWarning,
        tagCounts,
      };
    });
  }

  function getVisibleVenues(filter) {
    const venues = venueStats;

    if (filter === 'Nearby') {
      const liveNearby = venues
        .filter((venue) => venue.lastReportMinutes !== null && venue.lastReportMinutes <= 24 * 60)
        .sort((a, b) => (a.lastReportMinutes ?? Infinity) - (b.lastReportMinutes ?? Infinity));
      const fallbackNearby = venues
        .filter((venue) => !liveNearby.some((live) => live.id === venue.id))
        .filter((venue) => venue.currentWaitMinutes === null)
        .filter((venue) => matchesAnyKeyword(venue.name, FAST_FALLBACK_KEYWORDS) || matchesAnyKeyword(venue.name, SLOW_FALLBACK_KEYWORDS))
        .slice(0, Math.min(CURATED_FALLBACK_LIMIT, Math.max(0, HOME_TAB_LIMITS.Nearby - liveNearby.length)))
        .map((venue) => ({ ...venue, isPredictedFallback: true }));
      return [...liveNearby, ...fallbackNearby].slice(0, HOME_TAB_LIMITS.Nearby);
    }

    if (filter === 'Fast') {
      const liveFast = venues
        .filter((venue) => venue.currentWaitMinutes !== null && venue.currentWaitMinutes < 10)
        .sort((a, b) => (a.currentWaitMinutes ?? Infinity) - (b.currentWaitMinutes ?? Infinity));
      const fallbackFast = venues
        .filter(isPredictedFastFallback)
        .slice(0, Math.min(CURATED_FALLBACK_LIMIT, Math.max(0, HOME_TAB_LIMITS.Fast - liveFast.length)))
        .map((venue) => ({ ...venue, isPredictedFallback: true, isPredictedFastFallback: true }));
      return [...liveFast, ...fallbackFast].slice(0, HOME_TAB_LIMITS.Fast);
    }

    if (filter === 'Slow') {
      const liveSlow = venues
        .filter((venue) => venue.currentWaitMinutes !== null && venue.currentWaitMinutes >= 10)
        .sort((a, b) => (b.currentWaitMinutes ?? -1) - (a.currentWaitMinutes ?? -1));
      const fallbackSlow = venues
        .filter(isPredictedSlowFallback)
        .slice(0, Math.min(CURATED_FALLBACK_LIMIT, Math.max(0, HOME_TAB_LIMITS.Slow - liveSlow.length)))
        .map((venue) => ({ ...venue, isPredictedFallback: true, isPredictedSlowFallback: true }));
      return [...liveSlow, ...fallbackSlow].slice(0, HOME_TAB_LIMITS.Slow);
    }

    if (filter === 'Recent') {
      return [...venues]
        .filter((venue) => venue.lastReportMinutes !== null || venue.reportsToday > 0)
        .sort((a, b) => (a.lastReportMinutes ?? Infinity) - (b.lastReportMinutes ?? Infinity))
        .slice(0, HOME_TAB_LIMITS.Recent);
    }

    return venues.slice(0, HOME_TAB_LIMITS.Nearby);
  }

  function formatLastReport(minutes) {
    if (minutes < 60) return minutes + 'm ago';
    return Math.round(minutes / 60) + 'h ago';
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function getCardDisplay(item) {
    const predictedFallback = item.isPredictedFallback === true;
    const predictedFastFallback = item.isPredictedFastFallback === true;
    const predictedSlowFallback = item.isPredictedSlowFallback === true;
    const hasRealWaitData = item.currentWaitMinutes !== null;
    const predictedStatus = getPredictedStatus(item);

    let waitBadgeStyle = '';
    let waitBadgeText = '';

    if (hasRealWaitData) {
      const tone = getWaitTone(item.currentWaitMinutes);
      waitBadgeStyle = 'background:' + tone.bg + ';color:' + tone.color;
      waitBadgeText = item.currentWaitLabel;
    } else if (predictedFastFallback || predictedStatus === 'fast') {
      waitBadgeStyle = 'background:#12311f;color:#8be6ae';
      waitBadgeText = 'Predicted fast';
    } else if (predictedSlowFallback || predictedStatus === 'slow') {
      waitBadgeStyle = 'background:#3a2418;color:#f3b37a';
      waitBadgeText = 'Likely slow';
    } else {
      waitBadgeStyle = 'background:#12202b;color:#a9b9c9';
      waitBadgeText = 'No live data';
    }

    const lastReportText = predictedFallback
      ? 'No recent reports'
      : item.lastReportMinutes === null
        ? 'No live data'
        : formatLastReport(item.lastReportMinutes);
    const confidenceText = predictedFallback ? 'Predicted' : item.currentWaitMinutes === null ? 'No live data' : item.confidence;

    return { predictedFallback, waitBadgeStyle, waitBadgeText, lastReportText, confidenceText };
  }

  function renderVenueCard(item, index) {
    const display = getCardDisplay(item);
    const rank = index + 1;
    let badges = '';

    if (item.madeWhenDriverArrivesBadge) {
      badges += '<span class="warning-badge">Likely slow · Made when driver arrives</span>';
    }
    if (item.closedWarning) {
      badges += '<span class="warning-badge">Reported closed recently</span>';
    }
    if (item.systemDownWarning) {
      badges += '<span class="warning-badge">Tablet/server issue reported</span>';
    }
    if (display.predictedFallback) {
      badges += '<span class="predicted-badge">No recent reports — predicted</span>';
    }

    const tagsHtml =
      item.tagCounts.length > 0
        ? '<div class="tag-inline"><div class="tag-inline-title">Driver tags today</div><div class="tag-inline-text">' +
          escapeHtml(item.tagCounts.map((tag) => tag.label + ' ' + tag.count).join(' · ')) +
          '</div></div>'
        : '';

    const leftEarlyHtml = item.leftEarlyWarning
      ? '<span class="warning-badge">⚠ Drivers leaving early</span>'
      : '';

    return (
      '<article class="venue-card" data-venue-id="' + escapeHtml(item.id) + '" tabindex="0" role="button">' +
      '<div class="card-top">' +
      '<span class="rank-badge">#' + rank + '</span>' +
      '<span class="wait-badge" style="' + display.waitBadgeStyle + '">' + escapeHtml(display.waitBadgeText) + '</span>' +
      '</div>' +
      '<h3 class="venue-name">' + escapeHtml(cleanVenueName(item.name, activeCity)) + '</h3>' +
      '<p class="venue-area">' + escapeHtml(getVenueSubtitle(item, activeCity)) + '</p>' +
      badges +
      '<div class="meta-row">' +
      '<div class="meta-item"><span class="meta-label">Reports today</span><span class="meta-value">' + item.reportsToday + '</span></div>' +
      '<div class="meta-item"><span class="meta-label">Last report</span><span class="meta-value">' + escapeHtml(display.lastReportText) + '</span></div>' +
      '<div class="meta-item"><span class="meta-label">Confidence</span><span class="meta-value">' + escapeHtml(display.confidenceText) + '</span></div>' +
      '</div>' +
      leftEarlyHtml +
      tagsHtml +
      '</article>'
    );
  }

  function bindVenueCards(target) {
    target.querySelectorAll('.venue-card').forEach((card) => {
      const open = () => openVenueDetail(card.getAttribute('data-venue-id'));
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
        '<div class="state-box"><strong>Could not load live data</strong><span>' +
        escapeHtml(loadError) +
        '</span><button type="button" class="retry-btn" data-retry>Try again</button></div>';
      root.querySelector('[data-retry]').addEventListener('click', () => loadCityData(activeCity));
      return;
    }

    if (venueStats.length === 0) {
      homeBody.innerHTML = '<div class="state-box"><strong>No venues yet</strong><span>No active pickup points found for this city.</span></div>';
      return;
    }

    const visible = getVisibleVenues(selectedFilter);
    if (visible.length === 0) {
      homeBody.innerHTML = '<div class="state-box"><strong>No matches</strong><span>Try another filter to view more venues.</span></div>';
      return;
    }

    homeBody.innerHTML = visible.map(renderVenueCard).join('');
    bindVenueCards(homeBody);
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
          isPredictedFastFallback(venue) ||
          isPredictedSlowFallback(venue)
        );
      });
      if (match) addVenue(match);
    }

    venueStats
      .filter((venue) => isPredictedFastFallback(venue) || isPredictedSlowFallback(venue))
      .forEach(addVenue);

    return result.slice(0, SUGGESTED_LIMIT);
  }

  function renderSearchList() {
    const query = searchInput.value.trim().toLowerCase();
    let list;

    if (query) {
      searchHeading.textContent = 'Search results';
      list = venueStats.filter((venue) => {
        return getVenueSearchText(venue).some((part) => part.includes(query));
      });
      list = list.slice(0, 50);
    } else {
      searchHeading.textContent = 'Suggested pickup points';
      list = getSuggestedVenues();
    }

    if (list.length === 0) {
      searchBody.innerHTML = '<div class="state-box"><strong>No matches</strong><span>Try another search term.</span></div>';
      return;
    }

    searchBody.innerHTML = list.map((item, index) => renderVenueCard(item, index)).join('');
    bindVenueCards(searchBody);
  }

  async function loadCityData(city) {
    loadError = null;
    homeBody.innerHTML = '<div class="state-box"><strong>Loading live data…</strong><span>Syncing venues and reports for ' + escapeHtml(city) + '.</span></div>';

    const waitSince = encodeURIComponent(isoHoursAgo(48));
    const statusSince = encodeURIComponent(isoHoursAgo(1.5));
    const tagSince = encodeURIComponent(isoHoursAgo(24));

    const [venuesResponse, reportsResponse, statusResponse, tagResponse] = await Promise.all([
      supabaseGet(
        '/venues?select=id,name,area,brand,branch,address,postcode,lat,lng,google_place_id,city,zone,venue_type,is_active,created_at&city=eq.' +
          encodeURIComponent(city) +
          '&is_active=eq.true&order=created_at.asc'
      ),
      supabaseGet(
        '/wait_reports?select=id,venue_id,platform,wait_bucket,wait_minutes,left_early,order_made_when_driver_arrives,created_at&created_at=gte.' + waitSince
      ),
      supabaseGet(
        '/venue_status_reports?select=id,venue_id,status_type,created_at&created_at=gte.' + statusSince
      ),
      supabaseGet(
        '/venue_tag_reports?select=id,venue_id,tag_key,platform,created_at&created_at=gte.' + tagSince
      ),
    ]);

    venueStats = buildVenueStats(
      Array.isArray(venuesResponse) ? venuesResponse : [],
      Array.isArray(reportsResponse) ? reportsResponse : [],
      Array.isArray(statusResponse) ? statusResponse : [],
      Array.isArray(tagResponse) ? tagResponse : []
    );

    renderHomeList();
    if (!searchScreen.classList.contains('hidden')) renderSearchList();
  }

  function showScreen(name) {
    homeScreen.classList.toggle('hidden', name !== 'home');
    cityScreen.classList.toggle('hidden', name !== 'city');
    searchScreen.classList.toggle('hidden', name !== 'search');
    detailScreen.classList.toggle('hidden', name !== 'detail');
  }

  function updateCityPill() {
    cityPillBtn.textContent = activeCity;
  }

  function renderCityList() {
    const query = citySearchInput.value.trim().toLowerCase();
    const filtered = liveCities.filter((city) => city.toLowerCase().includes(query));

    if (filtered.length === 0) {
      cityListBody.innerHTML = '<div class="state-box"><strong>No matches</strong><span>Try another area name.</span></div>';
      return;
    }

    cityListBody.innerHTML =
      '<div class="city-list">' +
      filtered
        .map((city) => {
          const selected = city === activeCity;
          return (
            '<button type="button" class="city-row' + (selected ? ' selected' : '') + '" data-city="' + escapeHtml(city) + '">' +
            '<span><span class="city-row-name">' + escapeHtml(city) + '</span>' +
            (selected ? '<span class="city-row-meta">Selected</span>' : '') +
            '</span>' +
            '<span class="city-row-status">' + (selected ? 'Active' : 'Choose') + '</span>' +
            '</button>'
          );
        })
        .join('') +
      '</div>';

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
          loadError = error instanceof Error ? error.message : String(error);
          renderHomeList();
        });
      });
    });
  }

  function openCityPicker() {
    citySearchInput.value = '';
    renderCityList();
    showScreen('city');
    citySearchInput.focus();
  }

  function openVenueDetail(venueId) {
    const venue = venueStats.find((item) => item.id === venueId);
    if (!venue) return;

    previousScreen = searchScreen.classList.contains('hidden') ? 'home' : 'search';

    const display = getCardDisplay(venue);
    const address = formatVenueLocation(venue);
    let warnings = '';

    if (venue.madeWhenDriverArrivesBadge) {
      warnings += '<span class="warning-badge">Likely slow · Made when driver arrives</span>';
    }
    if (venue.closedWarning) {
      warnings += '<span class="warning-badge">Reported closed recently</span>';
    }
    if (venue.systemDownWarning) {
      warnings += '<span class="warning-badge">Tablet/server issue reported</span>';
    }
    if (venue.leftEarlyWarning) {
      warnings += '<span class="warning-badge">⚠ Drivers leaving early</span>';
    }

    const tagsHtml =
      venue.tagCounts.length > 0
        ? '<div class="tag-inline"><div class="tag-inline-title">Recent driver tags</div><div class="tag-inline-text">' +
          escapeHtml(venue.tagCounts.map((tag) => tag.label + ' (' + tag.count + ')').join(' · ')) +
          '</div></div>'
        : '<p class="venue-area">No recent driver tags.</p>';

    const currentWaitHtml =
      venue.currentWaitMinutes !== null
        ? '<div class="detail-card"><p class="detail-card-title">Current wait</p><p class="detail-card-value">' + escapeHtml(venue.currentWaitLabel) + '</p></div>'
        : '';

    detailBody.innerHTML =
      '<h2 class="venue-name" style="font-size:30px;margin-top:8px">' + escapeHtml(cleanVenueName(venue.name, activeCity)) + '</h2>' +
      '<p class="venue-area">' + escapeHtml(getVenueSubtitle(venue, activeCity)) + '</p>' +
      (address ? '<p class="venue-address">' + escapeHtml(address) + '</p>' : '') +
      warnings +
      currentWaitHtml +
      '<div class="meta-row">' +
      '<div class="meta-item"><span class="meta-label">Reports today</span><span class="meta-value">' + venue.reportsToday + '</span></div>' +
      '<div class="meta-item"><span class="meta-label">Last report</span><span class="meta-value">' + escapeHtml(display.lastReportText) + '</span></div>' +
      '<div class="meta-item"><span class="meta-label">Confidence</span><span class="meta-value">' + escapeHtml(display.confidenceText) + '</span></div>' +
      '</div>' +
      tagsHtml +
      '<div class="problem-card">' +
      '<p class="problem-title">Problem with this pickup?</p>' +
      '<p class="problem-text">Report if the venue is closed, cannot take orders, or has another issue.</p>' +
      '<div class="problem-actions">' +
      '<button type="button" class="problem-chip write-action">Closed</button>' +
      '<button type="button" class="problem-chip write-action">Tablet/server down</button>' +
      '<button type="button" class="problem-chip write-action">Venue issue</button>' +
      '<button type="button" class="problem-chip write-action">Driver tags</button>' +
      '</div>' +
      '</div>';

    detailBody.querySelectorAll('.write-action').forEach((button) => {
      button.addEventListener('click', openDownloadModal);
    });

    showScreen('detail');
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

  root.querySelectorAll('.filter-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      root.querySelectorAll('.filter-chip').forEach((item) => item.classList.remove('active'));
      chip.classList.add('active');
      selectedFilter = chip.getAttribute('data-filter');
      renderHomeList();
    });
  });

  cityPillBtn.addEventListener('click', openCityPicker);
  root.querySelector('[data-city-close]').addEventListener('click', () => showScreen('home'));
  citySearchInput.addEventListener('input', renderCityList);

  root.querySelector('[data-open-search]').addEventListener('click', () => {
    showScreen('search');
    renderSearchList();
    searchInput.focus();
  });

  root.querySelector('[data-search-back]').addEventListener('click', () => {
    searchInput.value = '';
    showScreen('home');
  });

  searchInput.addEventListener('input', renderSearchList);

  root.querySelector('[data-detail-back]').addEventListener('click', () => {
    showScreen(previousScreen);
  });

  const howItWorksBtn = root.querySelector('[data-how-it-works]');
  if (options.howItWorksScrollTo) {
    howItWorksBtn.addEventListener('click', () => {
      const target = document.querySelector(options.howItWorksScrollTo);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  } else {
    howItWorksBtn.addEventListener('click', openInfoModal);
    root.querySelector('[data-info-close]').addEventListener('click', closeInfoModal);
    infoModal.addEventListener('click', (event) => {
      if (event.target === infoModal) closeInfoModal();
    });
  }

  root.querySelectorAll('.write-action').forEach((button) => {
    button.addEventListener('click', openDownloadModal);
  });

  root.querySelector('[data-modal-close]').addEventListener('click', closeDownloadModal);
  downloadModal.addEventListener('click', (event) => {
    if (event.target === downloadModal) closeDownloadModal();
  });

  setupStoreButtons();

  (async function initPreview() {
    try {
      liveCities = await loadLiveCities();
      if (liveCities.length === 0) liveCities = [DEFAULT_CITY];
      activeCity = resolveActiveCity(liveCities);
      saveSelectedCity(activeCity);
      updateCityPill();
      document.querySelectorAll('[data-city-count]').forEach((el) => {
        el.textContent = String(liveCities.length);
      });
      await loadCityData(activeCity);
    } catch (error) {
      loadError = error instanceof Error ? error.message : String(error);
      root.querySelector('[data-home-body]').innerHTML =
        '<div class="state-box"><strong>Could not load live data</strong><span>' +
        escapeHtml(loadError) +
        '</span><button type="button" class="retry-btn" data-retry>Try again</button></div>';
      root.querySelector('[data-retry]').addEventListener('click', () => location.reload());
    }
  })();
}

window.mountPickupRadarPreview = mountPickupRadarPreview;
