/*
 * pickupradar-logic.js — GENERATED FILE, DO NOT EDIT BY HAND.
 *
 * The PickupRadar mobile app's own venue display, prediction, wait-colour and
 * city/country modules, bundled for the website preview.
 *
 * Source:   pickupradar-app @ 5dcfec43ee1d9e7452d214181db4902eb7759b45
 * Files:    lib/countryConfig.ts, lib/geo.ts, lib/liveCitySelection.ts, lib/waitColors.ts, lib/venuePrediction.ts, lib/venueDisplay.ts
 * Compiler: TypeScript 5.9.3 (transpileModule, CommonJS, ES2019)
 * Rebuild:  node tools/build-logic.js --commit 5dcfec4
 * Check:    node tools/build-logic.js --check
 *
 * Exposes window.PickupRadarLogic = { commit, countryConfig, geo, liveCitySelection, waitColors, venuePrediction, venueDisplay }.
 */
(function (global) {
  'use strict';
  var defs = {};
  var cache = {};
  function req(id) {
    if (cache[id]) return cache[id].exports;
    var def = defs[id];
    if (!def) throw new Error('PickupRadarLogic: unknown module ' + id);
    var module = { exports: {} };
    cache[id] = module;
    def(module.exports, req, module);
    return module.exports;
  }

  // ---- lib/countryConfig.ts ----
  defs["./countryConfig"] = function (exports, require, module) {
    "use strict";
    // Shared country / language config.
    // Kept in its own module so screens can import it WITHOUT importing App.tsx
    // (App.tsx imports the screens, so a screen importing App.tsx = circular import).
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CITY_DISPLAY_CONFIG = exports.KM_PER_MILE = exports.CITY_TIMEZONES = exports.COUNTRY_DEFAULT_TIMEZONES = exports.LANGUAGE_DISPLAY_NAMES = exports.RTL_LANGUAGE_CODES = exports.LANGUAGE_CODES = exports.LANGUAGES_BY_COUNTRY = exports.LANGUAGE_RANKING_BY_COUNTRY = exports.ISO_COUNTRY_TO_PICKUPRADAR = exports.INTERNATIONAL_CITY_TO_COUNTRY = exports.INTERNATIONAL_COMING_SOON = void 0;
    exports.getCountryForCity = getCountryForCity;
    exports.getPickupRadarCountryForIsoCode = getPickupRadarCountryForIsoCode;
    exports.getCountryCodeForCity = getCountryCodeForCity;
    exports.getLanguagesForCity = getLanguagesForCity;
    exports.getLanguageCode = getLanguageCode;
    exports.getLanguageDisplayName = getLanguageDisplayName;
    exports.getAllLanguageEntries = getAllLanguageEntries;
    exports.buildLanguagePickerSections = buildLanguagePickerSections;
    exports.getTimeZoneForCity = getTimeZoneForCity;
    exports.getDistanceUnitForCountry = getDistanceUnitForCountry;
    exports.getDistanceUnitForCity = getDistanceUnitForCity;
    exports.getCityDisplayName = getCityDisplayName;
    exports.getCitySearchAliases = getCitySearchAliases;
    exports.normalizeCitySearchText = normalizeCitySearchText;
    exports.cityMatchesSearchQuery = cityMatchesSearchQuery;
    exports.INTERNATIONAL_COMING_SOON = [
        { country: 'Ireland', cities: ['Dublin', 'Cork', 'Galway', 'Limerick', 'Waterford'] },
        { country: 'France', cities: ['Paris', 'Lyon', 'Marseille', 'Lille', 'Toulouse', 'Bordeaux', 'Nantes', 'Nice'] },
        { country: 'Germany', cities: ['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt', 'Düsseldorf', 'Stuttgart', 'Leipzig', 'Dortmund', 'Dresden', 'Nuremberg', 'Bremen'] },
        { country: 'Spain', cities: ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Malaga', 'Zaragoza', 'Alicante', 'Bilbao', 'Murcia', 'Palma de Mallorca'] },
        { country: 'Italy', cities: ['Milan', 'Rome', 'Naples', 'Turin', 'Bologna', 'Florence', 'Palermo', 'Bari', 'Genoa', 'Catania'] },
        { country: 'Netherlands', cities: ['Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht', 'Eindhoven', 'Groningen', 'Tilburg', 'Breda', 'Nijmegen', 'Arnhem'] },
        { country: 'Belgium', cities: ['Brussels', 'Antwerp', 'Ghent', 'Liège', 'Leuven', 'Charleroi', 'Bruges'] },
        { country: 'Poland', cities: ['Warsaw', 'Kraków', 'Wrocław', 'Łódź', 'Poznań', 'Gdańsk', 'Katowice', 'Szczecin', 'Lublin'] },
        { country: 'Portugal', cities: ['Lisbon', 'Porto', 'Braga', 'Coimbra', 'Faro', 'Funchal', 'Setúbal', 'Aveiro'] },
        { country: 'Austria', cities: ['Vienna', 'Graz', 'Linz', 'Salzburg', 'Innsbruck', 'Klagenfurt'] },
        { country: 'Switzerland', cities: ['Zurich', 'Geneva', 'Basel', 'Lausanne', 'Bern', 'Winterthur', 'St Gallen', 'Lucerne'] },
        { country: 'United States', cities: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Dallas', 'Miami', 'Atlanta', 'San Francisco Bay Area', 'Seattle', 'Boston'] },
        { country: 'Canada', cities: ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton', 'Ottawa', 'Winnipeg'] },
        { country: 'Australia', cities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast', 'Canberra'] },
        { country: 'New Zealand', cities: ['Auckland', 'Wellington', 'Christchurch', 'Hamilton', 'Tauranga', 'Dunedin'] },
        { country: 'UAE', cities: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Al Ain'] },
        { country: 'Denmark', cities: ['Copenhagen', 'Aarhus', 'Odense', 'Aalborg'] },
        { country: 'Sweden', cities: ['Stockholm', 'Gothenburg', 'Malmö', 'Uppsala'] },
        { country: 'Norway', cities: ['Oslo', 'Bergen', 'Trondheim', 'Stavanger'] },
        { country: 'Finland', cities: ['Helsinki', 'Tampere', 'Espoo', 'Turku', 'Vantaa', 'Oulu'] },
        { country: 'Czechia', cities: ['Prague', 'Brno'] },
    ];
    exports.INTERNATIONAL_CITY_TO_COUNTRY = exports.INTERNATIONAL_COMING_SOON.reduce((acc, group) => {
        for (const city of group.cities) {
            acc[city] = group.country;
        }
        return acc;
    }, {});
    function getCountryForCity(city) {
        var _a;
        return (_a = exports.INTERNATIONAL_CITY_TO_COUNTRY[city]) !== null && _a !== void 0 ? _a : 'UK';
    }
    // ISO 3166-1 alpha-2 country code -> PickupRadar country name. Used only for
    // best-effort foreground country DETECTION (reverse geocoding). This is separate
    // from getCountryForCity(), which maps a selected city string to its country.
    exports.ISO_COUNTRY_TO_PICKUPRADAR = {
        GB: 'UK',
        IE: 'Ireland',
        FR: 'France',
        DE: 'Germany',
        ES: 'Spain',
        IT: 'Italy',
        NL: 'Netherlands',
        BE: 'Belgium',
        PL: 'Poland',
        PT: 'Portugal',
        AT: 'Austria',
        CH: 'Switzerland',
        US: 'United States',
        CA: 'Canada',
        AU: 'Australia',
        NZ: 'New Zealand',
        AE: 'UAE',
        DK: 'Denmark',
        SE: 'Sweden',
        NO: 'Norway',
        FI: 'Finland',
        CZ: 'Czechia',
    };
    // Returns the PickupRadar country for an ISO alpha-2 code, or null if unsupported/unknown.
    function getPickupRadarCountryForIsoCode(code) {
        var _a;
        if (!code)
            return null;
        const normalized = code.trim().toUpperCase();
        if (!normalized)
            return null;
        return (_a = exports.ISO_COUNTRY_TO_PICKUPRADAR[normalized]) !== null && _a !== void 0 ? _a : null;
    }
    const PICKUPRADAR_COUNTRY_TO_ISO_CODE = Object.fromEntries(Object.entries(exports.ISO_COUNTRY_TO_PICKUPRADAR).map(([isoCode, country]) => [country, isoCode]));
    // ISO alpha-2 code for a selected city. Derived from the existing city->country
    // and ISO->PickupRadar mappings. Does not invent a second country table.
    function getCountryCodeForCity(city) {
        var _a;
        const country = getCountryForCity(city);
        return (_a = PICKUPRADAR_COUNTRY_TO_ISO_CODE[country]) !== null && _a !== void 0 ? _a : null;
    }
    const RECOMMENDED_LANGUAGE_COUNT = 15;
    // Full language ranking per country (every LANGUAGE_CODES key exactly once). The first
    // RECOMMENDED_LANGUAGE_COUNT are the recommended list; the rest order "More languages".
    exports.LANGUAGE_RANKING_BY_COUNTRY = {
        UK: [
            'English', 'Portuguese', 'Romanian', 'Bengali', 'Urdu', 'Punjabi', 'Hindi', 'Arabic', 'Polish', 'Albanian',
            'Spanish', 'Turkish', 'Kurmanji', 'Persian', 'Pashto', 'Dari', 'Tigrinya', 'Amharic', 'Somali', 'French',
            'Ukrainian', 'Russian', 'Gujarati', 'Tamil', 'Malayalam', 'Nepali', 'Italian', 'Lithuanian', 'Bulgarian', 'Chinese',
            'Traditional Chinese', 'Vietnamese', 'Swahili', 'Twi / Akan', 'Yoruba', 'Igbo', 'Hausa', 'Lingala', 'Oromo', 'Sinhala',
            'Telugu', 'Greek', 'Hungarian', 'Czech', 'Welsh', 'Irish', 'German', 'Dutch', 'Tagalog', 'Wolof',
            'Haitian Creole', 'Thai', 'Korean', 'Japanese', 'Malay', 'Indonesian', 'Luganda', 'Kinyarwanda', 'Shona', 'Danish',
            'Swedish', 'Norwegian Bokmål', 'Finnish', 'Cebuano', 'Samoan',
        ],
        'United States': [
            'English', 'Spanish', 'Portuguese', 'Haitian Creole', 'Chinese', 'Bengali', 'French', 'Arabic', 'Russian', 'Polish',
            'Ukrainian', 'Urdu', 'Hindi', 'Punjabi', 'Vietnamese', 'Tagalog', 'Korean', 'Amharic', 'Tigrinya', 'Somali',
            'Nepali', 'Persian', 'Dari', 'Pashto', 'Wolof', 'Twi / Akan', 'Yoruba', 'Igbo', 'Swahili', 'Lithuanian',
            'Gujarati', 'Telugu', 'Tamil', 'Malayalam', 'Traditional Chinese', 'Turkish', 'Kurmanji', 'Albanian', 'Romanian', 'Bulgarian',
            'Oromo', 'Hausa', 'Lingala', 'Kinyarwanda', 'Luganda', 'Shona', 'Sinhala', 'Thai', 'Indonesian', 'Malay',
            'Cebuano', 'Samoan', 'Japanese', 'Italian', 'German', 'Greek', 'Hungarian', 'Czech', 'Dutch', 'Swedish',
            'Danish', 'Norwegian Bokmål', 'Finnish', 'Irish', 'Welsh',
        ],
    };
    // Recommended language ordering per country (UI ordering only). All listed languages are
    // fully translated and selectable everywhere; this only controls which appear first.
    exports.LANGUAGES_BY_COUNTRY = {
        UK: exports.LANGUAGE_RANKING_BY_COUNTRY.UK.slice(0, RECOMMENDED_LANGUAGE_COUNT),
        Ireland: ['English', 'Irish', 'Portuguese', 'Spanish', 'Arabic', 'French'],
        France: ['French', 'Arabic', 'Portuguese', 'Spanish', 'English', 'Wolof'],
        Germany: ['German', 'English', 'Turkish', 'Arabic', 'Polish', 'Romanian', 'Russian', 'Ukrainian'],
        Spain: ['Spanish', 'English', 'Arabic', 'Romanian', 'Portuguese'],
        Italy: ['Italian', 'English', 'Arabic', 'Romanian', 'Bengali', 'Urdu', 'Punjabi'],
        Netherlands: ['Dutch', 'English', 'Arabic', 'Turkish', 'Polish'],
        Belgium: ['Dutch', 'French', 'English', 'Arabic', 'Turkish'],
        Poland: ['Polish', 'English', 'Ukrainian', 'Russian', 'Vietnamese'],
        Portugal: ['Portuguese', 'English', 'Spanish', 'Hindi', 'Nepali', 'Bengali'],
        Austria: ['German', 'English', 'Turkish', 'Arabic', 'Romanian'],
        Switzerland: ['German', 'French', 'Italian', 'English', 'Portuguese', 'Spanish'],
        'United States': exports.LANGUAGE_RANKING_BY_COUNTRY['United States'].slice(0, RECOMMENDED_LANGUAGE_COUNT),
        Canada: ['English', 'French', 'Punjabi', 'Hindi', 'Urdu', 'Spanish', 'Haitian Creole', 'Arabic'],
        Australia: ['English', 'Hindi', 'Punjabi', 'Nepali', 'Urdu', 'Bengali', 'Chinese', 'Tagalog'],
        'New Zealand': ['English', 'Hindi', 'Punjabi', 'Chinese', 'Tagalog', 'Nepali', 'Samoan'],
        UAE: ['Arabic', 'English', 'Hindi', 'Urdu', 'Punjabi', 'Bengali', 'Malayalam', 'Tamil', 'Tagalog'],
        Denmark: ['Danish', 'English', 'Arabic', 'Urdu', 'Somali'],
        Sweden: ['Swedish', 'English', 'Arabic', 'Somali', 'Persian', 'Kurmanji'],
        Norway: ['Norwegian Bokmål', 'English', 'Arabic', 'Somali', 'Urdu', 'Polish'],
        Finland: ['Finnish', 'Swedish', 'English', 'Arabic', 'Somali', 'Russian'],
        Czechia: ['Czech', 'English', 'Ukrainian', 'Russian', 'Vietnamese'],
    };
    function getLanguagesForCity(city) {
        var _a;
        return (_a = exports.LANGUAGES_BY_COUNTRY[getCountryForCity(city)]) !== null && _a !== void 0 ? _a : exports.LANGUAGES_BY_COUNTRY.UK;
    }
    // Stable PickupRadar language codes (English language name -> dictionary/locale code).
    exports.LANGUAGE_CODES = {
        English: 'en',
        Portuguese: 'pt',
        Spanish: 'es',
        Romanian: 'ro',
        Albanian: 'sq',
        Urdu: 'ur',
        Punjabi: 'pa',
        Bengali: 'bn',
        Hindi: 'hi',
        Polish: 'pl',
        'Haitian Creole': 'ht',
        Arabic: 'ar',
        Chinese: 'zh-Hans',
        French: 'fr',
        Nepali: 'ne',
        Tagalog: 'tl',
        Wolof: 'wo',
        Samoan: 'sm',
        Turkish: 'tr',
        Kurmanji: 'ku',
        Gujarati: 'gu',
        Russian: 'ru',
        Ukrainian: 'uk',
        Lithuanian: 'lt',
        German: 'de',
        Dutch: 'nl',
        Italian: 'it',
        Vietnamese: 'vi',
        Somali: 'so',
        Swahili: 'sw',
        Tigrinya: 'ti',
        Amharic: 'am',
        'Twi / Akan': 'ak',
        Korean: 'ko',
        Japanese: 'ja',
        Persian: 'fa',
        Bulgarian: 'bg',
        Greek: 'el',
        Czech: 'cs',
        Hungarian: 'hu',
        Malayalam: 'ml',
        Tamil: 'ta',
        Telugu: 'te',
        Irish: 'ga',
        Welsh: 'cy',
        Pashto: 'ps',
        Sinhala: 'si',
        Danish: 'da',
        Swedish: 'sv',
        Finnish: 'fi',
        'Norwegian Bokmål': 'nb',
        Yoruba: 'yo',
        Igbo: 'ig',
        Oromo: 'om',
        Hausa: 'ha',
        Lingala: 'ln',
        'Traditional Chinese': 'zh-Hant',
        Dari: 'prs',
        Luganda: 'lg',
        Kinyarwanda: 'rw',
        Shona: 'sn',
        Thai: 'th',
        Malay: 'ms',
        Indonesian: 'id',
        Cebuano: 'ceb',
    };
    function getLanguageCode(language) {
        var _a;
        return (_a = exports.LANGUAGE_CODES[language]) !== null && _a !== void 0 ? _a : null;
    }
    // Language codes whose scripts render right-to-left.
    exports.RTL_LANGUAGE_CODES = ['ur', 'ar', 'fa', 'ps', 'prs'];
    // Native display names (UI only, no translation).
    exports.LANGUAGE_DISPLAY_NAMES = {
        English: 'English',
        Portuguese: 'Português',
        Spanish: 'Español',
        Romanian: 'Română',
        Albanian: 'Shqip',
        Urdu: 'اردو',
        Punjabi: 'ਪੰਜਾਬੀ',
        Bengali: 'বাংলা',
        Hindi: 'हिन्दी',
        Polish: 'Polski',
        French: 'Français',
        Arabic: 'العربية',
        Chinese: '中文',
        Tagalog: 'Filipino / Tagalog',
        'Haitian Creole': 'Kreyòl ayisyen',
        Wolof: 'Wolof',
        Samoan: 'Gagana Samoa',
        Nepali: 'नेपाली',
        Turkish: 'Türkçe',
        Kurmanji: 'Kurdî (Kurmancî)',
        Gujarati: 'ગુજરાતી',
        Russian: 'Русский',
        Ukrainian: 'Українська',
        Lithuanian: 'Lietuvių',
        German: 'Deutsch',
        Dutch: 'Nederlands',
        Italian: 'Italiano',
        Vietnamese: 'Tiếng Việt',
        Somali: 'Soomaali',
        Swahili: 'Kiswahili',
        Tigrinya: 'ትግርኛ',
        Amharic: 'አማርኛ',
        'Twi / Akan': 'Twi / Akan',
        Korean: '한국어',
        Japanese: '日本語',
        Persian: 'فارسی',
        Bulgarian: 'Български',
        Greek: 'Ελληνικά',
        Czech: 'Čeština',
        Hungarian: 'Magyar',
        Malayalam: 'മലയാളം',
        Tamil: 'தமிழ்',
        Telugu: 'తెలుగు',
        Irish: 'Gaeilge',
        Welsh: 'Cymraeg',
        Pashto: 'پښتو',
        Sinhala: 'සිංහල',
        Danish: 'Dansk',
        Swedish: 'Svenska',
        Finnish: 'Suomi',
        'Norwegian Bokmål': 'Norsk bokmål',
        Yoruba: 'Yorùbá',
        Igbo: 'Igbo',
        Oromo: 'Afaan Oromoo',
        Hausa: 'Hausa',
        Lingala: 'Lingála',
        'Traditional Chinese': '繁體中文',
        Dari: 'دری',
        Luganda: 'Luganda',
        Kinyarwanda: 'Kinyarwanda',
        Shona: 'ChiShona',
        Thai: 'ไทย',
        Malay: 'Bahasa Melayu',
        Indonesian: 'Bahasa Indonesia',
        Cebuano: 'Cebuano',
    };
    function getLanguageDisplayName(language) {
        var _a;
        return (_a = exports.LANGUAGE_DISPLAY_NAMES[language]) !== null && _a !== void 0 ? _a : language;
    }
    function getAllLanguageEntries() {
        return Object.keys(exports.LANGUAGE_CODES).map((name) => ({
            name,
            code: exports.LANGUAGE_CODES[name],
            display: getLanguageDisplayName(name),
        }));
    }
    // Language picker rows for a city. In countries with a full ranking (UK / US), an in-use
    // language outside the recommended list goes straight after English and "More languages"
    // follows the ranking. Other countries keep the in-use language first and the
    // LANGUAGE_CODES order under "More languages".
    function buildLanguagePickerSections(city, entries, activeCode, isAvailable) {
        var _a;
        const byName = new Map(entries.map((entry) => [entry.name, entry]));
        const recommended = getLanguagesForCity(city)
            .map((name) => byName.get(name))
            .filter((entry) => Boolean(entry));
        const ranking = (_a = exports.LANGUAGE_RANKING_BY_COUNTRY[getCountryForCity(city)]) !== null && _a !== void 0 ? _a : null;
        if (activeCode && !recommended.some((entry) => entry.code === activeCode)) {
            const active = entries.find((entry) => entry.code === activeCode && isAvailable(entry.code));
            if (active) {
                const englishIndex = ranking ? recommended.findIndex((entry) => entry.name === 'English') : -1;
                if (englishIndex >= 0) {
                    recommended.splice(englishIndex + 1, 0, active);
                }
                else {
                    recommended.unshift(active);
                }
            }
        }
        const shown = new Set(recommended.map((entry) => entry.code));
        const more = entries.filter((entry) => !shown.has(entry.code));
        if (ranking) {
            const rank = new Map(ranking.map((name, index) => [name, index]));
            more.sort((a, b) => { var _a, _b; return ((_a = rank.get(a.name)) !== null && _a !== void 0 ? _a : ranking.length) - ((_b = rank.get(b.name)) !== null && _b !== void 0 ? _b : ranking.length); });
        }
        return { recommended, more };
    }
    // ---------------------------------------------------------------------------
    // Timezone configuration for public venue stats (client-side only).
    // Stats must use the SELECTED CITY's local timezone, not the device timezone,
    // so the DB computes the correct local-midnight day boundary.
    // ---------------------------------------------------------------------------
    // Countries where every currently listed PickupRadar city can share one timezone.
    exports.COUNTRY_DEFAULT_TIMEZONES = {
        UK: 'Europe/London',
        Ireland: 'Europe/Dublin',
        France: 'Europe/Paris',
        Spain: 'Europe/Madrid',
        'New Zealand': 'Pacific/Auckland',
        Germany: 'Europe/Berlin',
        Italy: 'Europe/Rome',
        Netherlands: 'Europe/Amsterdam',
        Belgium: 'Europe/Brussels',
        Poland: 'Europe/Warsaw',
        Portugal: 'Europe/Lisbon',
        Austria: 'Europe/Vienna',
        Switzerland: 'Europe/Zurich',
        UAE: 'Asia/Dubai',
        Denmark: 'Europe/Copenhagen',
        Sweden: 'Europe/Stockholm',
        Norway: 'Europe/Oslo',
        Finland: 'Europe/Helsinki',
        Czechia: 'Europe/Prague',
    };
    // Explicit per-city timezones for multi-timezone countries.
    exports.CITY_TIMEZONES = {
        // Australia
        Sydney: 'Australia/Sydney',
        Melbourne: 'Australia/Melbourne',
        Brisbane: 'Australia/Brisbane',
        Perth: 'Australia/Perth',
        Adelaide: 'Australia/Adelaide',
        'Gold Coast': 'Australia/Brisbane',
        Canberra: 'Australia/Sydney',
        // Canada
        Toronto: 'America/Toronto',
        Vancouver: 'America/Vancouver',
        Montreal: 'America/Toronto',
        Calgary: 'America/Edmonton',
        Edmonton: 'America/Edmonton',
        Ottawa: 'America/Toronto',
        Winnipeg: 'America/Winnipeg',
        // United States
        'New York': 'America/New_York',
        'Los Angeles': 'America/Los_Angeles',
        Chicago: 'America/Chicago',
        Houston: 'America/Chicago',
        Dallas: 'America/Chicago',
        Miami: 'America/New_York',
        Atlanta: 'America/New_York',
        'San Francisco Bay Area': 'America/Los_Angeles',
        Seattle: 'America/Los_Angeles',
        Boston: 'America/New_York',
        // Portugal exception: Madeira has its own timezone (mainland Portugal is Europe/Lisbon).
        Funchal: 'Atlantic/Madeira',
    };
    // Resolve the IANA timezone for a stats city.
    // 1. Explicit multi-zone city mapping wins.
    // 2. Known international city -> its country default (null if country unmapped).
    // 3. Otherwise treat as an existing UK city -> Europe/London.
    function getTimeZoneForCity(city) {
        var _a;
        const explicitCityTimeZone = exports.CITY_TIMEZONES[city];
        if (explicitCityTimeZone) {
            return explicitCityTimeZone;
        }
        const internationalCountry = exports.INTERNATIONAL_CITY_TO_COUNTRY[city];
        if (internationalCountry) {
            return (_a = exports.COUNTRY_DEFAULT_TIMEZONES[internationalCountry]) !== null && _a !== void 0 ? _a : null;
        }
        return exports.COUNTRY_DEFAULT_TIMEZONES.UK;
    }
    // ---------------------------------------------------------------------------
    // Displayed distance units (miles vs kilometres). This is a DISPLAY concern
    // only — all proximity/routing/report-eligibility logic stays in miles
    // (see lib/geo.ts: distanceInMiles, MAX_LIVE_REPORT_DISTANCE_MILES = 0.5).
    // UK and United States display miles; every other configured country uses km.
    // ---------------------------------------------------------------------------
    exports.KM_PER_MILE = 1.609344;
    const MILE_COUNTRIES = new Set(['UK', 'United States']);
    function getDistanceUnitForCountry(country) {
        return MILE_COUNTRIES.has(country) ? 'mi' : 'km';
    }
    function getDistanceUnitForCity(city) {
        return getDistanceUnitForCountry(getCountryForCity(city));
    }
    exports.CITY_DISPLAY_CONFIG = {
        // United States
        'New York': {
            displayName: 'New York City',
            aliases: ['New York City', 'NYC'],
        },
        // Germany
        Munich: {
            displayName: 'München',
            aliases: ['Munich', 'München', 'Munchen'],
        },
        Cologne: {
            displayName: 'Köln',
            aliases: ['Cologne', 'Köln', 'Koln', 'Koeln'],
        },
        Nuremberg: {
            displayName: 'Nürnberg',
            aliases: ['Nuremberg', 'Nürnberg', 'Nurnberg', 'Nuernberg'],
        },
        // Spain
        Seville: {
            displayName: 'Sevilla',
            aliases: ['Seville', 'Sevilla'],
        },
        Malaga: {
            displayName: 'Málaga',
            aliases: ['Malaga', 'Málaga'],
        },
        // Italy
        Milan: {
            displayName: 'Milano',
            aliases: ['Milan', 'Milano'],
        },
        Rome: {
            displayName: 'Roma',
            aliases: ['Rome', 'Roma'],
        },
        Naples: {
            displayName: 'Napoli',
            aliases: ['Naples', 'Napoli'],
        },
        Turin: {
            displayName: 'Torino',
            aliases: ['Turin', 'Torino'],
        },
        Florence: {
            displayName: 'Firenze',
            aliases: ['Florence', 'Firenze'],
        },
        Genoa: {
            displayName: 'Genova',
            aliases: ['Genoa', 'Genova'],
        },
        // Netherlands
        'The Hague': {
            displayName: 'Den Haag',
            aliases: ['The Hague', 'Den Haag', "'s-Gravenhage"],
        },
        // Poland
        Warsaw: {
            displayName: 'Warszawa',
            aliases: ['Warsaw', 'Warszawa'],
        },
        // Portugal
        Lisbon: {
            displayName: 'Lisboa',
            aliases: ['Lisbon', 'Lisboa'],
        },
        // Austria
        Vienna: {
            displayName: 'Wien',
            aliases: ['Vienna', 'Wien'],
        },
        // Switzerland
        Zurich: {
            displayName: 'Zürich',
            aliases: ['Zurich', 'Zürich'],
        },
        Geneva: {
            displayName: 'Genève',
            aliases: ['Geneva', 'Genève', 'Geneve'],
        },
        Lucerne: {
            displayName: 'Luzern',
            aliases: ['Lucerne', 'Luzern'],
        },
        // Belgium
        Antwerp: {
            displayName: 'Antwerpen',
            aliases: ['Antwerp', 'Antwerpen'],
        },
        Ghent: {
            displayName: 'Gent',
            aliases: ['Ghent', 'Gent'],
        },
        Bruges: {
            displayName: 'Brugge',
            aliases: ['Bruges', 'Brugge'],
        },
        // Canada
        Montreal: {
            displayName: 'Montréal',
            aliases: ['Montreal', 'Montréal'],
        },
        // Denmark
        Copenhagen: {
            displayName: 'København',
            aliases: ['Copenhagen', 'København', 'Kobenhavn', 'Koebenhavn'],
        },
        // Sweden
        Gothenburg: {
            displayName: 'Göteborg',
            aliases: ['Gothenburg', 'Göteborg', 'Goteborg'],
        },
        // Czechia
        Prague: {
            displayName: 'Praha',
            aliases: ['Prague', 'Praha'],
        },
        // UK display cleanup (internal key retains parentheses)
        'Newport (Wales)': {
            displayName: 'Newport, Wales',
            aliases: ['Newport (Wales)', 'Newport, Wales', 'Newport Wales'],
        },
        'St Ives (Cambridgeshire)': {
            displayName: 'St Ives, Cambridgeshire',
            aliases: ['St Ives (Cambridgeshire)', 'St Ives, Cambridgeshire', 'St Ives Cambridgeshire'],
        },
    };
    function getCityDisplayName(city) {
        var _a, _b;
        return (_b = (_a = exports.CITY_DISPLAY_CONFIG[city]) === null || _a === void 0 ? void 0 : _a.displayName) !== null && _b !== void 0 ? _b : city;
    }
    function getCitySearchAliases(city) {
        var _a, _b;
        const config = exports.CITY_DISPLAY_CONFIG[city];
        const displayName = (_a = config === null || config === void 0 ? void 0 : config.displayName) !== null && _a !== void 0 ? _a : city;
        const extras = (_b = config === null || config === void 0 ? void 0 : config.aliases) !== null && _b !== void 0 ? _b : [];
        const seen = new Set();
        const aliases = [];
        for (const value of [city, displayName, ...extras]) {
            const trimmed = typeof value === 'string' ? value.trim() : '';
            if (!trimmed || seen.has(trimmed)) {
                continue;
            }
            seen.add(trimmed);
            aliases.push(trimmed);
        }
        return aliases;
    }
    // Lowercase + NFD + strip combining marks for City Selector search only.
    // Rendered city labels keep their accents; this never becomes a backend identity.
    function normalizeCitySearchText(value) {
        const lowered = value.trim().toLowerCase();
        try {
            if (typeof lowered.normalize === 'function') {
                return lowered.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            }
        }
        catch {
            // Fall through to the un-normalized lowercase value.
        }
        return lowered;
    }
    function cityMatchesSearchQuery(city, query) {
        const needle = normalizeCitySearchText(query);
        if (!needle) {
            return true;
        }
        return getCitySearchAliases(city).some((alias) => normalizeCitySearchText(alias).includes(needle));
    }
  };

  // ---- lib/geo.ts ----
  defs["./geo"] = function (exports, require, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CITY_SEARCH_BIAS_MAX_LOCAL_MILES = exports.CITY_CENTROIDS = exports.MAX_LIVE_REPORT_DISTANCE_MILES = void 0;
    exports.normalizeCityKey = normalizeCityKey;
    exports.deriveCityCentroidFromVenues = deriveCityCentroidFromVenues;
    exports.resolveCityCentroid = resolveCityCentroid;
    exports.distanceInMiles = distanceInMiles;
    exports.resolveCitySearchBias = resolveCitySearchBias;
    exports.findNearestCity = findNearestCity;
    exports.formatDistance = formatDistance;
    exports.formatCityListDistanceLabel = formatCityListDistanceLabel;
    exports.formatCityDistance = formatCityDistance;
    exports.formatReportRadius = formatReportRadius;
    exports.getDistanceTextColor = getDistanceTextColor;
    exports.MAX_LIVE_REPORT_DISTANCE_MILES = 0.5;
    const countryConfig_1 = require("./countryConfig");
    exports.CITY_CENTROIDS = {
        London: { lat: 51.5074, lng: -0.1278 },
        Birmingham: { lat: 52.4862, lng: -1.8904 },
        Manchester: { lat: 53.4808, lng: -2.2426 },
        Leeds: { lat: 53.8008, lng: -1.5491 },
        Glasgow: { lat: 55.8642, lng: -4.2518 },
        Liverpool: { lat: 53.4084, lng: -2.9916 },
        Bristol: { lat: 51.4545, lng: -2.5879 },
        Sheffield: { lat: 53.3811, lng: -1.4701 },
        Nottingham: { lat: 52.9548, lng: -1.1581 },
        Leicester: { lat: 52.6369, lng: -1.1398 },
        Newcastle: { lat: 54.9783, lng: -1.6178 },
        Cardiff: { lat: 51.4816, lng: -3.1791 },
        Edinburgh: { lat: 55.9533, lng: -3.1883 },
        Belfast: { lat: 54.5973, lng: -5.9301 },
        Coventry: { lat: 52.4068, lng: -1.5197 },
        Bradford: { lat: 53.796, lng: -1.7594 },
        Southampton: { lat: 50.9097, lng: -1.4044 },
        Brighton: { lat: 50.8225, lng: -0.1372 },
        Reading: { lat: 51.4543, lng: -0.9781 },
        Oxford: { lat: 51.752, lng: -1.2577 },
        Cambridge: { lat: 52.2053, lng: 0.1218 },
        Luton: { lat: 51.8787, lng: -0.42 },
        Northampton: { lat: 52.2405, lng: -0.9027 },
        'Milton Keynes': { lat: 52.0406, lng: -0.7594 },
        'St Neots': { lat: 52.228, lng: -0.268 },
        Hull: { lat: 53.7676, lng: -0.3274 },
        Sunderland: { lat: 54.9069, lng: -1.3838 },
        Slough: { lat: 51.5105, lng: -0.595 },
        Dundee: { lat: 56.462, lng: -2.9707 },
        Watford: { lat: 51.6565, lng: -0.3903 },
        // International city centroids (distance/nearest-city support only). These
        // cities must NOT auto-select until liveAreas reports them as live.
        'New York': { lat: 40.7128, lng: -74.006 },
        Chicago: { lat: 41.8781, lng: -87.6298 },
        Paris: { lat: 48.8566, lng: 2.3522 },
        Madrid: { lat: 40.4168, lng: -3.7038 },
        // Ireland
        Dublin: { lat: 53.3498, lng: -6.2603 },
        Cork: { lat: 51.8985, lng: -8.4756 },
        Galway: { lat: 53.2707, lng: -9.0568 },
        Limerick: { lat: 52.6638, lng: -8.6267 },
        Waterford: { lat: 52.2593, lng: -7.1101 },
        // France
        Lyon: { lat: 45.764, lng: 4.8357 },
        Marseille: { lat: 43.2965, lng: 5.3698 },
        Lille: { lat: 50.6292, lng: 3.0573 },
        Toulouse: { lat: 43.6047, lng: 1.4442 },
        Bordeaux: { lat: 44.8378, lng: -0.5792 },
        Nantes: { lat: 47.2184, lng: -1.5536 },
        Nice: { lat: 43.7102, lng: 7.262 },
        // Germany
        Berlin: { lat: 52.52, lng: 13.405 },
        Hamburg: { lat: 53.5511, lng: 9.9937 },
        Munich: { lat: 48.1351, lng: 11.582 },
        Cologne: { lat: 50.9375, lng: 6.9603 },
        Frankfurt: { lat: 50.1109, lng: 8.6821 },
        'Düsseldorf': { lat: 51.2277, lng: 6.7735 },
        Stuttgart: { lat: 48.7758, lng: 9.1829 },
        Leipzig: { lat: 51.3397, lng: 12.3731 },
        Dortmund: { lat: 51.5136, lng: 7.4653 },
        Dresden: { lat: 51.0504, lng: 13.7373 },
        Nuremberg: { lat: 49.4521, lng: 11.0767 },
        Bremen: { lat: 53.0793, lng: 8.8017 },
        // Spain
        Barcelona: { lat: 41.3874, lng: 2.1686 },
        Valencia: { lat: 39.4699, lng: -0.3763 },
        Seville: { lat: 37.3891, lng: -5.9845 },
        Malaga: { lat: 36.7213, lng: -4.4214 },
        Zaragoza: { lat: 41.6488, lng: -0.8891 },
        Alicante: { lat: 38.3452, lng: -0.481 },
        Bilbao: { lat: 43.263, lng: -2.935 },
        Murcia: { lat: 37.9922, lng: -1.1307 },
        'Palma de Mallorca': { lat: 39.5696, lng: 2.6502 },
        // Italy
        Milan: { lat: 45.4642, lng: 9.19 },
        Rome: { lat: 41.9028, lng: 12.4964 },
        Naples: { lat: 40.8518, lng: 14.2681 },
        Turin: { lat: 45.0703, lng: 7.6869 },
        Bologna: { lat: 44.4949, lng: 11.3426 },
        Florence: { lat: 43.7696, lng: 11.2558 },
        Palermo: { lat: 38.1157, lng: 13.3615 },
        Bari: { lat: 41.1171, lng: 16.8719 },
        Genoa: { lat: 44.4056, lng: 8.9463 },
        Catania: { lat: 37.5079, lng: 15.083 },
        // Netherlands
        Amsterdam: { lat: 52.3676, lng: 4.9041 },
        Rotterdam: { lat: 51.9244, lng: 4.4777 },
        'The Hague': { lat: 52.0705, lng: 4.3007 },
        Utrecht: { lat: 52.0907, lng: 5.1214 },
        Eindhoven: { lat: 51.4416, lng: 5.4697 },
        Groningen: { lat: 53.2194, lng: 6.5665 },
        Tilburg: { lat: 51.5555, lng: 5.0913 },
        Breda: { lat: 51.5719, lng: 4.7683 },
        Nijmegen: { lat: 51.8126, lng: 5.8372 },
        Arnhem: { lat: 51.9851, lng: 5.8987 },
        // Belgium
        Brussels: { lat: 50.8503, lng: 4.3517 },
        Antwerp: { lat: 51.2194, lng: 4.4025 },
        Ghent: { lat: 51.0543, lng: 3.7174 },
        'Liège': { lat: 50.6326, lng: 5.5797 },
        Leuven: { lat: 50.8798, lng: 4.7005 },
        Charleroi: { lat: 50.4108, lng: 4.4446 },
        Bruges: { lat: 51.2093, lng: 3.2247 },
        // Poland
        Warsaw: { lat: 52.2297, lng: 21.0122 },
        'Kraków': { lat: 50.0647, lng: 19.945 },
        'Wrocław': { lat: 51.1079, lng: 17.0385 },
        'Łódź': { lat: 51.7592, lng: 19.456 },
        'Poznań': { lat: 52.4064, lng: 16.9252 },
        'Gdańsk': { lat: 54.352, lng: 18.6466 },
        Katowice: { lat: 50.2649, lng: 19.0238 },
        Szczecin: { lat: 53.4285, lng: 14.5528 },
        Lublin: { lat: 51.2465, lng: 22.5684 },
        // Portugal
        Lisbon: { lat: 38.7223, lng: -9.1393 },
        Porto: { lat: 41.1579, lng: -8.6291 },
        Braga: { lat: 41.5454, lng: -8.4265 },
        Coimbra: { lat: 40.2033, lng: -8.4103 },
        Faro: { lat: 37.0194, lng: -7.9304 },
        Funchal: { lat: 32.6669, lng: -16.9241 },
        'Setúbal': { lat: 38.5244, lng: -8.8882 },
        Aveiro: { lat: 40.6405, lng: -8.6538 },
        // Austria
        Vienna: { lat: 48.2082, lng: 16.3738 },
        Graz: { lat: 47.0707, lng: 15.4395 },
        Linz: { lat: 48.3069, lng: 14.2858 },
        Salzburg: { lat: 47.8095, lng: 13.055 },
        Innsbruck: { lat: 47.2692, lng: 11.4041 },
        Klagenfurt: { lat: 46.6247, lng: 14.3053 },
        // Switzerland
        Zurich: { lat: 47.3769, lng: 8.5417 },
        Geneva: { lat: 46.2044, lng: 6.1432 },
        Basel: { lat: 47.5596, lng: 7.5886 },
        Lausanne: { lat: 46.5197, lng: 6.6323 },
        Bern: { lat: 46.948, lng: 7.4474 },
        Winterthur: { lat: 47.5, lng: 8.7241 },
        'St Gallen': { lat: 47.4245, lng: 9.3767 },
        Lucerne: { lat: 47.0502, lng: 8.3093 },
        // United States
        'Los Angeles': { lat: 34.0522, lng: -118.2437 },
        Houston: { lat: 29.7604, lng: -95.3698 },
        Dallas: { lat: 32.7767, lng: -96.797 },
        Miami: { lat: 25.7617, lng: -80.1918 },
        Atlanta: { lat: 33.749, lng: -84.388 },
        'San Francisco Bay Area': { lat: 37.7749, lng: -122.4194 },
        Seattle: { lat: 47.6062, lng: -122.3321 },
        Boston: { lat: 42.3601, lng: -71.0589 },
        // Canada
        Toronto: { lat: 43.6532, lng: -79.3832 },
        Montreal: { lat: 45.5017, lng: -73.5673 },
        Vancouver: { lat: 49.2827, lng: -123.1207 },
        Calgary: { lat: 51.0447, lng: -114.0719 },
        Edmonton: { lat: 53.5461, lng: -113.4938 },
        Ottawa: { lat: 45.4215, lng: -75.6972 },
        Winnipeg: { lat: 49.8951, lng: -97.1384 },
        // Australia
        Sydney: { lat: -33.8688, lng: 151.2093 },
        Melbourne: { lat: -37.8136, lng: 144.9631 },
        Brisbane: { lat: -27.4698, lng: 153.0251 },
        Perth: { lat: -31.9505, lng: 115.8605 },
        Adelaide: { lat: -34.9285, lng: 138.6007 },
        'Gold Coast': { lat: -28.0167, lng: 153.4 },
        Canberra: { lat: -35.2809, lng: 149.13 },
        // New Zealand
        Auckland: { lat: -36.8485, lng: 174.7633 },
        Wellington: { lat: -41.2865, lng: 174.7762 },
        Christchurch: { lat: -43.5321, lng: 172.6362 },
        Hamilton: { lat: -37.787, lng: 175.2793 },
        Tauranga: { lat: -37.6878, lng: 176.1651 },
        Dunedin: { lat: -45.8788, lng: 170.5028 },
        // UAE
        Dubai: { lat: 25.2048, lng: 55.2708 },
        'Abu Dhabi': { lat: 24.4539, lng: 54.3773 },
        Sharjah: { lat: 25.3463, lng: 55.4209 },
        Ajman: { lat: 25.4052, lng: 55.5136 },
        'Al Ain': { lat: 24.1917, lng: 55.7605 },
        // Denmark
        Copenhagen: { lat: 55.6761, lng: 12.5683 },
        Aarhus: { lat: 56.1629, lng: 10.2039 },
        Odense: { lat: 55.4038, lng: 10.4024 },
        Aalborg: { lat: 57.0488, lng: 9.9217 },
        // Sweden
        Stockholm: { lat: 59.3293, lng: 18.0686 },
        Gothenburg: { lat: 57.7089, lng: 11.9746 },
        'Malmö': { lat: 55.605, lng: 13.0038 },
        Uppsala: { lat: 59.8586, lng: 17.6389 },
        // Norway
        Oslo: { lat: 59.9139, lng: 10.7522 },
        Bergen: { lat: 60.3913, lng: 5.3221 },
        Trondheim: { lat: 63.4305, lng: 10.3951 },
        Stavanger: { lat: 58.97, lng: 5.7331 },
        // Finland
        Helsinki: { lat: 60.1699, lng: 24.9384 },
        Tampere: { lat: 61.4978, lng: 23.761 },
        Espoo: { lat: 60.2055, lng: 24.6559 },
        Turku: { lat: 60.4518, lng: 22.2666 },
        Vantaa: { lat: 60.2934, lng: 25.0378 },
        Oulu: { lat: 65.0121, lng: 25.4651 },
        // Czechia
        Prague: { lat: 50.0755, lng: 14.4378 },
        Brno: { lat: 49.1951, lng: 16.6068 },
    };
    // Normalize a city name so lookups are punctuation- and variation-insensitive.
    // e.g. "St. Neots", "Saint Neots", "St Neots" all collapse to the same key.
    function normalizeCityKey(city) {
        return city
            .toLowerCase()
            .replace(/\./g, '')
            .replace(/[^a-z0-9\s]/g, ' ')
            .replace(/\bsaint\b/g, 'st')
            .replace(/\s+/g, ' ')
            .trim();
    }
    // Normalized lookup built once from the static centroids.
    const NORMALIZED_CENTROIDS = Object.entries(exports.CITY_CENTROIDS).reduce((acc, [name, coords]) => {
        acc[normalizeCityKey(name)] = coords;
        return acc;
    }, {});
    function isValidCoord(lat, lng) {
        return (typeof lat === 'number' &&
            typeof lng === 'number' &&
            Number.isFinite(lat) &&
            Number.isFinite(lng) &&
            Math.abs(lat) <= 90 &&
            Math.abs(lng) <= 180 &&
            !(lat === 0 && lng === 0));
    }
    // Cache of centroids derived from venue coordinates (keyed by normalized city name),
    // so we do not recalculate the average on every render.
    const derivedCentroidCache = {};
    const missingCentroidWarned = new Set();
    // Average the valid coordinates of the venues in a city to derive a centroid.
    function deriveCityCentroidFromVenues(city, venues) {
        const key = normalizeCityKey(city);
        if (key in derivedCentroidCache) {
            return derivedCentroidCache[key];
        }
        const valid = venues.filter((venue) => { var _a; return normalizeCityKey((_a = venue.city) !== null && _a !== void 0 ? _a : '') === key && isValidCoord(venue.lat, venue.lng); });
        if (valid.length === 0) {
            // Do not cache a null when we simply had no venue data available yet.
            return null;
        }
        const sum = valid.reduce((acc, venue) => ({ lat: acc.lat + venue.lat, lng: acc.lng + venue.lng }), { lat: 0, lng: 0 });
        const centroid = { lat: sum.lat / valid.length, lng: sum.lng / valid.length };
        derivedCentroidCache[key] = centroid;
        return centroid;
    }
    // Resolve a city centroid: static list first (with name normalization),
    // then a centroid derived from active venue coordinates. Future-proof for
    // newly added active cities that were not manually added to CITY_CENTROIDS.
    function resolveCityCentroid(city, venues = []) {
        const direct = exports.CITY_CENTROIDS[city];
        if (direct) {
            return direct;
        }
        const normalized = NORMALIZED_CENTROIDS[normalizeCityKey(city)];
        if (normalized) {
            return normalized;
        }
        const derived = deriveCityCentroidFromVenues(city, venues);
        if (derived) {
            return derived;
        }
        // Development-only warning to catch future cities added without distance support.
        const isDev = globalThis.__DEV__ === true;
        if (isDev && !missingCentroidWarned.has(city)) {
            missingCentroidWarned.add(city);
            console.warn('Missing city coordinates and no valid venue coordinates for:', city);
        }
        return null;
    }
    function distanceInMiles(from, to) {
        const earthRadiusMiles = 3958.8;
        const toRad = (value) => (value * Math.PI) / 180;
        const dLat = toRad(to.lat - from.lat);
        const dLng = toRad(to.lng - from.lng);
        const lat1 = toRad(from.lat);
        const lat2 = toRad(to.lat);
        const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
        return 2 * earthRadiusMiles * Math.asin(Math.sqrt(h));
    }
    // Same radius as App nearest-city auto-select (35 mi). Used only for Google Places
    // autocomplete ranking bias — never for live-report / distance validation.
    exports.CITY_SEARCH_BIAS_MAX_LOCAL_MILES = 35;
    // Choose autocomplete locationBias for the selected PickupRadar city:
    // - device coords when the driver is within maxLocalMiles of that city's centroid
    // - otherwise the city centroid (static or venue-derived)
    // - otherwise null (omit locationBias)
    function resolveCitySearchBias(selectedCity, venues, userCoords, maxLocalMiles = exports.CITY_SEARCH_BIAS_MAX_LOCAL_MILES) {
        const centroid = resolveCityCentroid(selectedCity, venues);
        if (userCoords &&
            centroid &&
            Number.isFinite(userCoords.lat) &&
            Number.isFinite(userCoords.lng) &&
            distanceInMiles(userCoords, centroid) <= maxLocalMiles) {
            return userCoords;
        }
        return centroid;
    }
    function findNearestCity(coords, liveAreas, venues = []) {
        let best = null;
        for (const city of liveAreas) {
            const centroid = resolveCityCentroid(city, venues);
            if (!centroid) {
                continue;
            }
            const distance = distanceInMiles(coords, centroid);
            if (!best || distance < best.distance) {
                best = { city, distance };
            }
        }
        return best;
    }
    // Distance shown on a venue card, e.g. "0.4 mi" (or "0.6 km" for metric countries).
    // Core proximity logic stays in miles; this is display-only unit conversion.
    function formatDistance(miles, unit = 'mi') {
        if (unit === 'km') {
            const km = miles * countryConfig_1.KM_PER_MILE;
            if (km < 0.1) {
                return '<0.1 km';
            }
            if (km < 10) {
                return `${km.toFixed(1)} km`;
            }
            return `${Math.round(km)} km`;
        }
        if (miles < 0.1) {
            return '<0.1 mi';
        }
        if (miles < 10) {
            return `${miles.toFixed(1)} mi`;
        }
        return `${Math.round(miles)} mi`;
    }
    // City-list distance, e.g. "58 mi" / "<1 mi" / "1750 mi". No thousands separator.
    // Unit is chosen from the city's country (UK/USA miles, otherwise km).
    // Home cards keep formatDistance.
    function formatCityDistanceAmount(value) {
        if (value < 10) {
            const oneDecimal = (Math.round(value * 10) / 10).toFixed(1);
            return oneDecimal.endsWith('.0') ? oneDecimal.slice(0, -2) : oneDecimal;
        }
        return String(Math.round(value));
    }
    /** City-list label only. 999 stays "999 mi"; 1000 stays "1000 mi". */
    function formatCityListDistanceLabel(value, unit) {
        if (!Number.isFinite(value) || value < 0) {
            return '';
        }
        if (value < 1) {
            return `<1 ${unit}`;
        }
        return `${formatCityDistanceAmount(value)} ${unit}`;
    }
    function formatCityDistance(coords, city, venues = []) {
        const centroid = resolveCityCentroid(city, venues);
        if (!centroid) {
            return null;
        }
        const miles = distanceInMiles(coords, centroid);
        if ((0, countryConfig_1.getDistanceUnitForCity)(city) === 'km') {
            return formatCityListDistanceLabel(miles * countryConfig_1.KM_PER_MILE, 'km');
        }
        return formatCityListDistanceLabel(miles, 'mi');
    }
    // Displayed live-report radius string for the given unit. Internally the rule is
    // always MAX_LIVE_REPORT_DISTANCE_MILES = 0.5 mi; metric countries show ~0.8 km.
    function formatReportRadius(unit) {
        return unit === 'km' ? '0.8 km' : '0.5 mi';
    }
    // Shared colour rule for distance text across the app (distance, NOT wait speed).
    // One neutral colour for every valid finite distance so it does not clash with wait-severity colours.
    function getDistanceTextColor(miles) {
        if (typeof miles !== 'number' || !Number.isFinite(miles)) {
            return null;
        }
        return '#8FB5D7';
    }
  };

  // ---- lib/liveCitySelection.ts ----
  defs["./liveCitySelection"] = function (exports, require, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PUBLIC_LAUNCH_MARKETS = exports.PUBLIC_LAUNCH_COUNTRIES = exports.NON_LIVE_CITY_READ_ONLY_MESSAGE = exports.NON_LIVE_CITY_READ_ONLY_CODE = exports.OFFLINE_LIVE_AREAS_FALLBACK = exports.LAUNCH_DEFAULT_CITY = void 0;
    exports.resolveOfflineNoCacheLiveAreasStartup = resolveOfflineNoCacheLiveAreasStartup;
    exports.resolveOwnerCityBrowsePreview = resolveOwnerCityBrowsePreview;
    exports.canSaveVenuesInCity = canSaveVenuesInCity;
    exports.shouldAllowOwnerPreviewToggle = shouldAllowOwnerPreviewToggle;
    exports.parseInternalCityBrowseAccessResponse = parseInternalCityBrowseAccessResponse;
    exports.resolveOwnerBrowseAccessOnUserChange = resolveOwnerBrowseAccessOnUserChange;
    exports.resolveOwnerBrowseAccessRpcApply = resolveOwnerBrowseAccessRpcApply;
    exports.isLiveCity = isLiveCity;
    exports.isOfflineLiveAreasFallback = isOfflineLiveAreasFallback;
    exports.resolveQueuedWaitReportFlushAction = resolveQueuedWaitReportFlushAction;
    exports.shouldBlockSubmissionForCity = shouldBlockSubmissionForCity;
    exports.resolveFallbackLiveCity = resolveFallbackLiveCity;
    exports.resolveActiveLiveCity = resolveActiveLiveCity;
    exports.shouldFetchVenuesForCity = shouldFetchVenuesForCity;
    exports.filterVenuesForSelectedCity = filterVenuesForSelectedCity;
    exports.launchCountryForTimeZone = launchCountryForTimeZone;
    exports.resolvePublicBrowseCountry = resolvePublicBrowseCountry;
    exports.resolvePublicBrowseDistanceOrigin = resolvePublicBrowseDistanceOrigin;
    exports.sortCitiesNearestFirst = sortCitiesNearestFirst;
    exports.buildPublicCityBrowseView = buildPublicCityBrowseView;
    exports.resolveOwnerPreviewCityList = resolveOwnerPreviewCityList;
    const geo_1 = require("./geo");
    const countryConfig_1 = require("./countryConfig");
    /** Default when no live city can be resolved from coordinates. */
    exports.LAUNCH_DEFAULT_CITY = 'Milton Keynes';
    /**
     * Last-resort live list when the public live-cities RPC fails AND there is no
     * valid v2 AsyncStorage cache. Used only for that offline path — ordinary
     * selection and venue loads still follow the RPC response or v2 cache.
     */
    exports.OFFLINE_LIVE_AREAS_FALLBACK = [
        'Milton Keynes',
        'Chicago',
    ];
    /** Friendly local rejection when submitting from a non-live (owner-preview) city. */
    exports.NON_LIVE_CITY_READ_ONLY_CODE = 'preview_read_only';
    exports.NON_LIVE_CITY_READ_ONLY_MESSAGE = 'Reporting is not available while browsing this city.';
    /**
     * Offline startup branch: RPC failed and there is no valid v2 cache.
     * Callers MUST run applySelection with the returned liveAreas (race guards apply).
     */
    function resolveOfflineNoCacheLiveAreasStartup() {
        return {
            liveAreas: [...exports.OFFLINE_LIVE_AREAS_FALLBACK],
            mustApplySelection: true,
        };
    }
    /** Owner preview is on only when allowlist access AND the session toggle are both true. */
    function resolveOwnerCityBrowsePreview(options) {
        return options.ownerCityBrowseAccess === true && options.ownerPreviewToggled === true;
    }
    /**
     * A bookmark is allowed in a live city, or in any city while verified owner
     * preview is on. Access or the toggle alone does not open non-live cities.
     */
    function canSaveVenuesInCity(options) {
        if (isLiveCity(options.city, options.liveAreas)) {
            return true;
        }
        return resolveOwnerCityBrowsePreview({
            ownerCityBrowseAccess: options.ownerCityBrowseAccess,
            ownerPreviewToggled: options.ownerPreviewToggled,
        });
    }
    /** Long-press Browse cities only toggles when the signed-in owner passed the RPC. */
    function shouldAllowOwnerPreviewToggle(ownerCityBrowseAccess) {
        return ownerCityBrowseAccess === true;
    }
    /** Strict boolean RPC: only literal `true` grants access. */
    function parseInternalCityBrowseAccessResponse(response) {
        return response === true;
    }
    /**
     * When the authenticated user id changes, revoke previous owner browse state
     * immediately. Same-user token refresh preserves access/toggle while rechecking.
     */
    function resolveOwnerBrowseAccessOnUserChange(options) {
        if (!options.nextUserId) {
            return { access: false, toggle: false };
        }
        if (options.previousUserId !== null && options.previousUserId !== options.nextUserId) {
            return { access: false, toggle: false };
        }
        return {
            access: options.previousAccess,
            toggle: options.previousToggle,
        };
    }
    /**
     * Apply an owner-browse RPC result only for the still-current user.
     * Stale responses (different user) must not restore access.
     */
    function resolveOwnerBrowseAccessRpcApply(options) {
        if (!options.currentUserId || options.currentUserId !== options.requestUserId) {
            return { apply: false, access: false, toggle: false };
        }
        const access = parseInternalCityBrowseAccessResponse(options.response);
        return {
            apply: true,
            access,
            toggle: access ? options.currentToggle : false,
        };
    }
    function isLiveCity(city, liveAreas) {
        const trimmed = city.trim();
        if (!trimmed) {
            return false;
        }
        return liveAreas.some((area) => area.trim() === trimmed);
    }
    /** True when the in-memory list is exactly the hard-coded offline fallback. */
    function isOfflineLiveAreasFallback(liveAreas) {
        if (liveAreas.length !== exports.OFFLINE_LIVE_AREAS_FALLBACK.length) {
            return false;
        }
        const set = new Set(liveAreas.map((city) => city.trim()).filter(Boolean));
        if (set.size !== exports.OFFLINE_LIVE_AREAS_FALLBACK.length) {
            return false;
        }
        return exports.OFFLINE_LIVE_AREAS_FALLBACK.every((city) => set.has(city));
    }
    /**
     * Decide what to do with a queued offline wait report.
     * - Empty liveAreas → defer (startup race; never delete).
     * - City present in liveAreas → submit (including non-authoritative offline fallback).
     * - City absent + authoritative list → discard (no network).
     * - City absent + non-authoritative list → defer (do not delete yet).
     */
    function resolveQueuedWaitReportFlushAction(options) {
        const liveAreas = options.liveAreas;
        if (liveAreas.length === 0) {
            return 'defer';
        }
        if (isLiveCity(options.queuedCity, liveAreas)) {
            return 'submit';
        }
        if (options.liveAreasAuthoritative) {
            return 'discard';
        }
        return 'defer';
    }
    /** Block wait/status/tag/suggestion for non-live cities (after an authoritative list). */
    function shouldBlockSubmissionForCity(city, liveAreas) {
        return !isLiveCity(city, liveAreas);
    }
    /**
     * Pick a valid live city when the current selection is not launchable.
     * Prefers the nearest live city when coordinates are available; otherwise the
     * launch default (Milton Keynes) when it is live; otherwise the first live city.
     */
    function resolveFallbackLiveCity(options) {
        var _a, _b;
        const liveAreas = options.liveAreas.filter((city) => city.trim().length > 0);
        const defaultCity = ((_a = options.defaultCity) !== null && _a !== void 0 ? _a : exports.LAUNCH_DEFAULT_CITY).trim() || exports.LAUNCH_DEFAULT_CITY;
        if (liveAreas.length === 0) {
            return defaultCity;
        }
        if (options.userCoords) {
            const nearest = (0, geo_1.findNearestCity)(options.userCoords, [...liveAreas], (_b = options.venues) !== null && _b !== void 0 ? _b : []);
            if (nearest) {
                return nearest.city;
            }
        }
        if (liveAreas.includes(defaultCity)) {
            return defaultCity;
        }
        return liveAreas[0];
    }
    /**
     * Keep a live (or preview-allowed) city; otherwise fall back.
     * `allowNonLive` is only for the owner city-browse preview path.
     */
    function resolveActiveLiveCity(options) {
        const activeCity = options.activeCity.trim();
        const allowNonLive = options.allowNonLive === true;
        if (activeCity && isLiveCity(activeCity, options.liveAreas)) {
            return activeCity;
        }
        if (activeCity && allowNonLive) {
            return activeCity;
        }
        return resolveFallbackLiveCity({
            liveAreas: options.liveAreas,
            userCoords: options.userCoords,
            venues: options.venues,
            defaultCity: options.defaultCity,
        });
    }
    /** Ordinary drivers must never fetch venues for a city outside the public live list. */
    function shouldFetchVenuesForCity(city, liveAreas, allowNonLive) {
        if (allowNonLive) {
            return true;
        }
        if (liveAreas.length === 0) {
            return false;
        }
        return isLiveCity(city, liveAreas);
    }
    /**
     * Hard city scope for venue catalogues. Prevents cross-city mixes (e.g. historic
     * Luton selection showing London / Birmingham / Manchester rows).
     */
    function filterVenuesForSelectedCity(venues, selectedCity) {
        const key = selectedCity.trim().toLowerCase();
        if (!key) {
            return [];
        }
        return venues.filter((venue) => { var _a; return ((_a = venue.city) !== null && _a !== void 0 ? _a : '').trim().toLowerCase() === key; });
    }
    exports.PUBLIC_LAUNCH_COUNTRIES = ['UK', 'United States'];
    exports.PUBLIC_LAUNCH_MARKETS = {
        UK: {
            isoCode: 'GB',
            liveCity: 'Milton Keynes',
            comingNextCity: 'London',
            comingSoonCities: [
                'Manchester',
                'Birmingham',
                'Leeds',
                'Liverpool',
                'Glasgow',
                'Sheffield',
                'Bristol',
                'Leicester',
                'Nottingham',
                'Edinburgh',
                'Newcastle',
                'Cardiff',
                'Belfast',
            ],
        },
        'United States': {
            isoCode: 'US',
            liveCity: 'Chicago',
            comingNextCity: 'New York',
            comingSoonCities: [
                'Los Angeles',
                'Houston',
                'Dallas',
                'Miami',
                'Atlanta',
                'San Francisco Bay Area',
                'Seattle',
                'Boston',
            ],
        },
    };
    function launchCountryForIsoCode(code) {
        var _a;
        const iso = (code !== null && code !== void 0 ? code : '').trim().toUpperCase();
        if (!iso) {
            return null;
        }
        return (_a = exports.PUBLIC_LAUNCH_COUNTRIES.find((country) => exports.PUBLIC_LAUNCH_MARKETS[country].isoCode === iso)) !== null && _a !== void 0 ? _a : null;
    }
    function isPublicLaunchCountry(country) {
        return exports.PUBLIC_LAUNCH_COUNTRIES.includes(country);
    }
    // Only these identifiers count. Canada, Mexico and others also use America/*
    // zones, so there is no blanket America/* rule, and offsets (GMT+1) never match.
    const UK_TIME_ZONES = new Set(['Europe/London']);
    const US_TIME_ZONES = new Set([
        'America/New_York',
        'America/Detroit',
        'America/Chicago',
        'America/Menominee',
        'America/Denver',
        'America/Boise',
        'America/Phoenix',
        'America/Los_Angeles',
        'America/Anchorage',
        'America/Juneau',
        'America/Sitka',
        'America/Metlakatla',
        'America/Yakutat',
        'America/Nome',
        'America/Adak',
        'Pacific/Honolulu',
    ]);
    const US_TIME_ZONE_PREFIXES = [
        'US/',
        'America/Kentucky/',
        'America/Indiana/',
        'America/North_Dakota/',
    ];
    /** Device time zone → launch country, or null when the zone does not decide it. */
    function launchCountryForTimeZone(timeZone) {
        const zone = typeof timeZone === 'string' ? timeZone.trim() : '';
        if (!zone) {
            return null;
        }
        if (UK_TIME_ZONES.has(zone)) {
            return 'UK';
        }
        if (US_TIME_ZONES.has(zone)
            || US_TIME_ZONE_PREFIXES.some((prefix) => zone.startsWith(prefix) && zone.length > prefix.length)) {
            return 'United States';
        }
        return null;
    }
    /**
     * Which country's public cities to show:
     * 1. GPS-detected physical country — UK/US use that list; any other country is
     *    "not available yet" (device hints never override a physical location).
     * 2. Device time zone (getCalendars()[0].timeZone), only the supported UK/US zones.
     * 3. Phone region (getLocales()[0].regionCode), only when GB or US.
     * 4. Country of the selected city.
     * 5. Milton Keynes / UK default.
     */
    function resolvePublicBrowseCountry(options) {
        var _a, _b, _c;
        const gpsIso = ((_a = options.gpsCountryIso) !== null && _a !== void 0 ? _a : '').trim().toUpperCase();
        if (gpsIso) {
            const market = launchCountryForIsoCode(gpsIso);
            if (market) {
                return { kind: 'market', country: market, source: 'gps' };
            }
            const country = (0, countryConfig_1.getPickupRadarCountryForIsoCode)(gpsIso);
            const countryName = ((_b = options.gpsCountryName) !== null && _b !== void 0 ? _b : '').trim() || country;
            return { kind: 'outside', country, countryName: countryName || null, source: 'gps' };
        }
        const timeZoneMarket = launchCountryForTimeZone(options.deviceTimeZone);
        if (timeZoneMarket) {
            return { kind: 'market', country: timeZoneMarket, source: 'timeZone' };
        }
        const regionMarket = launchCountryForIsoCode(options.deviceRegionCode);
        if (regionMarket) {
            return { kind: 'market', country: regionMarket, source: 'region' };
        }
        const activeCity = ((_c = options.activeCity) !== null && _c !== void 0 ? _c : '').trim();
        if (activeCity) {
            const country = (0, countryConfig_1.getCountryForCity)(activeCity);
            if (isPublicLaunchCountry(country)) {
                return { kind: 'market', country, source: 'activeCity' };
            }
            return { kind: 'outside', country, countryName: country, source: 'activeCity' };
        }
        return { kind: 'market', country: 'UK', source: 'default' };
    }
    function isFiniteCoords(coords) {
        return Boolean(coords && Number.isFinite(coords.lat) && Number.isFinite(coords.lng));
    }
    /**
     * Distance origin for one country's Coming Soon cities: driver GPS (when it is
     * nearer this country's live city than the other launch country's), else the
     * selected city when it belongs to this country, else Milton Keynes (UK) /
     * Chicago (US). Null means the configured order is kept.
     */
    function resolvePublicBrowseDistanceOrigin(options) {
        var _a, _b;
        const venues = (_a = options.venues) !== null && _a !== void 0 ? _a : [];
        const market = exports.PUBLIC_LAUNCH_MARKETS[options.country];
        if (isFiniteCoords(options.userCoords)) {
            const anchors = exports.PUBLIC_LAUNCH_COUNTRIES.map((country) => exports.PUBLIC_LAUNCH_MARKETS[country].liveCity);
            const nearestAnchor = (0, geo_1.findNearestCity)(options.userCoords, anchors, venues);
            if (nearestAnchor && nearestAnchor.city === market.liveCity) {
                return options.userCoords;
            }
        }
        const activeCity = ((_b = options.activeCity) !== null && _b !== void 0 ? _b : '').trim();
        if (activeCity && (0, countryConfig_1.getCountryForCity)(activeCity) === options.country) {
            const selectedCentroid = (0, geo_1.resolveCityCentroid)(activeCity, venues);
            if (selectedCentroid) {
                return selectedCentroid;
            }
        }
        return (0, geo_1.resolveCityCentroid)(market.liveCity, venues);
    }
    /** Nearest-first. Equal or unresolvable distances keep the configured order. */
    function sortCitiesNearestFirst(cities, origin, venues = []) {
        const ranked = cities.map((city, index) => {
            const centroid = origin ? (0, geo_1.resolveCityCentroid)(city, venues) : null;
            const distance = origin && centroid ? (0, geo_1.distanceInMiles)(origin, centroid) : Number.POSITIVE_INFINITY;
            return { city, index, distance };
        });
        ranked.sort((a, b) => (a.distance === b.distance ? a.index - b.index : a.distance - b.distance));
        return ranked.map((entry) => entry.city);
    }
    function uniqueLiveCities(liveAreas) {
        const seen = new Set();
        const out = [];
        for (const area of liveAreas) {
            const city = area.trim();
            if (city && !seen.has(city)) {
                seen.add(city);
                out.push(city);
            }
        }
        return out;
    }
    function compareCityNames(a, b) {
        const left = a.toLowerCase();
        const right = b.toLowerCase();
        if (left === right) {
            return a < b ? -1 : a > b ? 1 : 0;
        }
        return left < right ? -1 : 1;
    }
    function buildPublicMarketRows(country, liveCities, origin, venues) {
        const market = exports.PUBLIC_LAUNCH_MARKETS[country];
        const live = new Set(liveCities);
        const rows = [
            { city: market.liveCity, status: live.has(market.liveCity) ? 'live' : 'comingSoon' },
            { city: market.comingNextCity, status: live.has(market.comingNextCity) ? 'live' : 'comingNext' },
        ];
        // Extra live cities reported by Supabase stay selectable within their own country.
        const fixed = new Set([market.liveCity, market.comingNextCity]);
        const extraLive = liveCities
            .filter((city) => !fixed.has(city) && (0, countryConfig_1.getCountryForCity)(city) === country)
            .sort(compareCityNames);
        for (const city of extraLive) {
            rows.push({ city, status: 'live' });
        }
        const comingSoon = market.comingSoonCities.filter((city) => !live.has(city));
        for (const city of sortCitiesNearestFirst(comingSoon, origin, venues)) {
            rows.push({ city, status: 'comingSoon' });
        }
        return rows;
    }
    function buildPublicOutsideRows(ownCountry, liveCities) {
        const launchOrder = exports.PUBLIC_LAUNCH_COUNTRIES.map((country) => exports.PUBLIC_LAUNCH_MARKETS[country].liveCity);
        const ownRank = (city) => (ownCountry && (0, countryConfig_1.getCountryForCity)(city) === ownCountry ? 0 : 1);
        const launchRank = (city) => {
            const index = launchOrder.indexOf(city);
            return index === -1 ? launchOrder.length : index;
        };
        return [...liveCities]
            .sort((a, b) => ownRank(a) - ownRank(b) || launchRank(a) - launchRank(b) || compareCityNames(a, b))
            .map((city) => ({ city, status: 'live' }));
    }
    /**
     * Owner preview OFF city list. Only one country's public cities are returned;
     * drivers outside the UK and US get only live cities (own country first).
     * Search filters these rows only, so hidden cities can never be revealed.
     */
    function buildPublicCityBrowseView(options) {
        var _a, _b;
        const venues = (_a = options.venues) !== null && _a !== void 0 ? _a : [];
        const liveCities = uniqueLiveCities(options.liveAreas);
        const query = (_b = options.query) !== null && _b !== void 0 ? _b : '';
        const matches = (row) => (0, countryConfig_1.cityMatchesSearchQuery)(row.city, query);
        const resolved = resolvePublicBrowseCountry({
            gpsCountryIso: options.gpsCountryIso,
            gpsCountryName: options.gpsCountryName,
            deviceTimeZone: options.deviceTimeZone,
            deviceRegionCode: options.deviceRegionCode,
            activeCity: options.activeCity,
        });
        if (resolved.kind === 'outside') {
            const rows = buildPublicOutsideRows(resolved.country, liveCities);
            const ownCountryHasLiveCity = Boolean(resolved.country && liveCities.some((city) => (0, countryConfig_1.getCountryForCity)(city) === resolved.country));
            return {
                kind: 'outside',
                countryName: resolved.countryName,
                showUnavailableMessage: !ownCountryHasLiveCity,
                rows: rows.filter(matches),
            };
        }
        const origin = resolvePublicBrowseDistanceOrigin({
            country: resolved.country,
            userCoords: options.userCoords,
            activeCity: options.activeCity,
            venues,
        });
        return {
            kind: 'market',
            country: resolved.country,
            source: resolved.source,
            rows: buildPublicMarketRows(resolved.country, liveCities, origin, venues).filter(matches),
        };
    }
    /**
     * Owner "Viewing as a driver in" list. "all" keeps the full owner browser
     * (publicView null). A chosen country is passed as the GPS country so it wins
     * over the real GPS, time zone, phone region and selected city. Those inputs
     * are not mutated. Coords are kept only when the chosen country is the real
     * GPS country.
     */
    function resolveOwnerPreviewCityList(options) {
        var _a;
        const realCoords = (_a = options.userCoords) !== null && _a !== void 0 ? _a : null;
        if (options.ownerDriverView === 'all') {
            return { publicView: null, listCoords: realCoords };
        }
        const country = options.ownerDriverView;
        const realGpsCountry = launchCountryForIsoCode(options.gpsCountryIso);
        const listCoords = realGpsCountry === country ? realCoords : null;
        return {
            publicView: buildPublicCityBrowseView({
                liveAreas: options.liveAreas,
                activeCity: options.activeCity,
                userCoords: listCoords,
                venues: options.venues,
                gpsCountryIso: exports.PUBLIC_LAUNCH_MARKETS[country].isoCode,
                gpsCountryName: null,
                deviceTimeZone: null,
                deviceRegionCode: null,
                query: options.query,
            }),
            listCoords,
        };
    }
  };

  // ---- lib/waitColors.ts ----
  defs["./waitColors"] = function (exports, require, module) {
    "use strict";
    // Single source of truth for real wait-range severity colours.
    // Four canonical buckets: <5 (green), 5–10 (yellow), 10–15 (orange), 15+ (red).
    // Used by Home venue cards, the Report Wait selected bucket, and the Current wait pill.
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WAIT_BUCKET_TRANSLATION_KEYS = exports.LOCAL_LIVE_WAIT_MAX_MINUTES = exports.VENUE_ICON_COLOR_NEUTRAL = exports.LIKELY_SLOW_WAIT_PILL = exports.LIKELY_FAST_WAIT_PILL = exports.HOME_VENUE_CARD_WAIT_TINTS = exports.WAIT_BUCKET_COLORS = void 0;
    exports.getWaitBucketFromMinutes = getWaitBucketFromMinutes;
    exports.getWaitColorsFromMinutes = getWaitColorsFromMinutes;
    exports.getHomeVenueCardWaitTint = getHomeVenueCardWaitTint;
    exports.getVenueWaitIconColor = getVenueWaitIconColor;
    exports.isLocallyLiveWait = isLocallyLiveWait;
    exports.WAIT_BUCKET_COLORS = {
        '<5 min': { backgroundColor: '#33C977', borderColor: '#69E5A0', color: '#07140D' },
        '5-10 min': { backgroundColor: '#F2C14E', borderColor: '#FFD66B', color: '#1B1402' },
        '10-15 min': { backgroundColor: '#F2994A', borderColor: '#FFB168', color: '#1B0D03' },
        '15+ min': { backgroundColor: '#E85D6A', borderColor: '#FF7B86', color: '#1A0608' },
    };
    // True four-range boundaries: under 5, 5 to under 10, 10 to under 15, 15 or more.
    function getWaitBucketFromMinutes(waitMinutes) {
        if (waitMinutes < 5) {
            return '<5 min';
        }
        if (waitMinutes < 10) {
            return '5-10 min';
        }
        if (waitMinutes < 15) {
            return '10-15 min';
        }
        return '15+ min';
    }
    function getWaitColorsFromMinutes(waitMinutes) {
        return exports.WAIT_BUCKET_COLORS[getWaitBucketFromMinutes(waitMinutes)];
    }
    // Home cards sit on #071018, the same surface as Report Wait. Unselected wait
    // tiles use WAIT_BUCKET_COLORS fill at alpha 0x26 and border at alpha 0x80.
    // Blend those to opaque hex so an iOS highlight shadow cannot glow through the card.
    const HOME_VENUE_CARD_SURFACE = '#071018';
    const HOME_VENUE_CARD_FILL_ALPHA = 0x26;
    const HOME_VENUE_CARD_BORDER_ALPHA = 0x80;
    function blendHexOverSurface(foregroundHex, alphaByte) {
        const alpha = alphaByte / 255;
        const channel = (offset) => {
            const foreground = parseInt(foregroundHex.slice(offset, offset + 2), 16);
            const background = parseInt(HOME_VENUE_CARD_SURFACE.slice(offset, offset + 2), 16);
            return Math.round(foreground * alpha + background * (1 - alpha));
        };
        const byte = (offset) => channel(offset).toString(16).padStart(2, '0').toUpperCase();
        return `#${byte(1)}${byte(3)}${byte(5)}`;
    }
    exports.HOME_VENUE_CARD_WAIT_TINTS = Object.keys(exports.WAIT_BUCKET_COLORS).reduce((tints, bucket) => {
        const colors = exports.WAIT_BUCKET_COLORS[bucket];
        tints[bucket] = {
            backgroundColor: blendHexOverSurface(colors.backgroundColor, HOME_VENUE_CARD_FILL_ALPHA),
            borderColor: blendHexOverSurface(colors.borderColor, HOME_VENUE_CARD_BORDER_ALPHA),
        };
        return tints;
    }, {});
    // Same live-wait decision as the Home pill. Closed and system-issue warnings
    // stay on the neutral card. An arrival badge does not block the tint.
    function getHomeVenueCardWaitTint(venue, nowMs) {
        if (venue.closedWarning || venue.systemDownWarning) {
            return null;
        }
        if (!isLocallyLiveWait(venue, nowMs) || venue.currentWaitMinutes === null) {
            return null;
        }
        return exports.HOME_VENUE_CARD_WAIT_TINTS[getWaitBucketFromMinutes(venue.currentWaitMinutes)];
    }
    // Likely-fast / likely-slow pills. Icons use the same text colours.
    exports.LIKELY_FAST_WAIT_PILL = { backgroundColor: '#1F4A33', color: '#8BE6AE' };
    exports.LIKELY_SLOW_WAIT_PILL = { backgroundColor: '#4E2730', color: '#E79AA1' };
    exports.VENUE_ICON_COLOR_NEUTRAL = '#8FB5D7';
    // Icon colour for the wait shown beside it. A closed or system warning stays neutral.
    function getVenueWaitIconColor(venue, nowMs, predicted) {
        if (venue.closedWarning || venue.systemDownWarning) {
            return exports.VENUE_ICON_COLOR_NEUTRAL;
        }
        if (isLocallyLiveWait(venue, nowMs) && venue.currentWaitMinutes !== null) {
            return exports.WAIT_BUCKET_COLORS[getWaitBucketFromMinutes(venue.currentWaitMinutes)].backgroundColor;
        }
        if (predicted === 'fast') {
            return exports.LIKELY_FAST_WAIT_PILL.color;
        }
        if (predicted === 'slow') {
            return exports.LIKELY_SLOW_WAIT_PILL.color;
        }
        return exports.VENUE_ICON_COLOR_NEUTRAL;
    }
    // Local client safety net only. A cached currentWaitMinutes is LIVE when the
    // wait-report timestamp is parseable and strictly younger than 120 minutes
    // (clock-skew into the future clamps to age 0). Missing/invalid lastReportAt
    // is never treated as live, even if currentWaitMinutes is still non-null.
    exports.LOCAL_LIVE_WAIT_MAX_MINUTES = 120;
    function isLocallyLiveWait(venue, nowMs) {
        if (venue.currentWaitMinutes === null) {
            return false;
        }
        if (!venue.lastReportAt) {
            return false;
        }
        const reportTimestampMs = new Date(venue.lastReportAt).getTime();
        if (!Number.isFinite(reportTimestampMs)) {
            return false;
        }
        const ageMinutes = Math.max(0, Math.floor((nowMs - reportTimestampMs) / 60000));
        return ageMinutes < exports.LOCAL_LIVE_WAIT_MAX_MINUTES;
    }
    // Maps the exact (ASCII-hyphen) WaitBucketKey union to translation keys.
    // Record keys stay byte-identical to WaitBucketKey / DB bucket strings;
    // the user-facing translated values use en-dash U+2013 (deliberate difference).
    exports.WAIT_BUCKET_TRANSLATION_KEYS = {
        '<5 min': 'wait.range.under5',
        '5-10 min': 'wait.range.fiveToTen',
        '10-15 min': 'wait.range.tenToFifteen',
        '15+ min': 'wait.range.fifteenPlus',
    };
  };

  // ---- lib/venuePrediction.ts ----
  defs["./venuePrediction"] = function (exports, require, module) {
    "use strict";
    // Market-aware Likely Fast / Likely Slow cold-start presets.
    // Shared by Home cards and Report Wait's display-only RP estimate.
    //
    // Effective status precedence (unchanged):
    //   1. fresh local live wait
    //   2. recentConsensusStatus (server-owned; no client thresholds)
    //   3. cold-start prediction preset
    //   4. null
    //
    // Within presets:
    //   A. global petrol/gas-station format (beats parent supermarket/big-box chains)
    //   B. explicit market/store-format chain rule
    //   C. global convenience (fast) / pizza (slow) category prior
    //   D. null
    //
    // Market resolution uses getCountryForCity (authoritative city→country map;
    // non-international cities intentionally resolve to UK). Empty/missing city ⇒
    // no market-specific chain rules (global category priors may still apply).
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getVenuePredictedStatus = getVenuePredictedStatus;
    exports.getEffectiveVenueStatus = getEffectiveVenueStatus;
    const countryConfig_1 = require("./countryConfig");
    const waitColors_1 = require("./waitColors");
    function normalizePredictionText(value) {
        return value
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[’']/g, '')
            .replace(/[^a-z0-9]+/g, ' ')
            .trim()
            .replace(/\s+/g, ' ');
    }
    function tokenize(value) {
        const normalized = normalizePredictionText(value);
        return normalized ? normalized.split(' ') : [];
    }
    function sortRulesLongestFirst(rules) {
        return [...rules].sort((a, b) => b.tokens.length - a.tokens.length);
    }
    function matchPrefixRules(nameTokens, rules) {
        for (const rule of rules) {
            if (rule.tokens.length > nameTokens.length) {
                continue;
            }
            let matches = true;
            for (let i = 0; i < rule.tokens.length; i += 1) {
                if (nameTokens[i] !== rule.tokens[i]) {
                    matches = false;
                    break;
                }
            }
            if (matches) {
                return rule.status;
            }
        }
        return null;
    }
    function tokensFromAliases(aliases) {
        return aliases.map((alias) => tokenize(alias)).filter((tokens) => tokens.length > 0);
    }
    function rulesFromAliases(aliases, status) {
        return tokensFromAliases(aliases).map((tokens) => ({ tokens, status }));
    }
    function matchAnyPrefix(texts, rules) {
        for (const text of texts) {
            if (!text || !text.trim()) {
                continue;
            }
            if (matchPrefixRules(tokenize(text), rules) !== null) {
                return true;
            }
        }
        return false;
    }
    /** True if `tokens` contains the consecutive phrase `phrase` at any index. */
    function tokensContainPhrase(tokens, phrase) {
        if (phrase.length === 0 || tokens.length < phrase.length) {
            return false;
        }
        for (let start = 0; start <= tokens.length - phrase.length; start += 1) {
            let matches = true;
            for (let i = 0; i < phrase.length; i += 1) {
                if (tokens[start + i] !== phrase[i]) {
                    matches = false;
                    break;
                }
            }
            if (matches) {
                return true;
            }
        }
        return false;
    }
    // UK: specific store formats BEFORE parent-chain rules (longest-prefix wins).
    // Plain "Coop" / "Co-op" are handled separately so "Co-op Live" stays neutral.
    const UK_FAST_RULES = sortRulesLongestFirst([
        ...rulesFromAliases(['little waitrose'], 'fast'),
        ...rulesFromAliases(['central co op food', 'central coop food'], 'fast'),
        ...rulesFromAliases(['co op food', 'coop food', 'the co operative food', 'co operative food'], 'fast'),
        ...rulesFromAliases(['tesco express'], 'fast'),
        ...rulesFromAliases(['asda express'], 'fast'),
        ...rulesFromAliases(['morrisons daily'], 'fast'),
        ...rulesFromAliases(['sainsburys local', 'sainsbury s local'], 'fast'),
        ...rulesFromAliases(['one stop'], 'fast'),
        ...rulesFromAliases(['waitrose'], 'fast'),
        ...rulesFromAliases(['londis'], 'fast'),
        ...rulesFromAliases(['nisa local', 'nisa'], 'fast'),
    ]);
    const UK_SLOW_RULES = sortRulesLongestFirst([
        ...rulesFromAliases(['tesco extra'], 'slow'),
        ...rulesFromAliases(['tesco superstore'], 'slow'),
        ...rulesFromAliases(['asda superstore'], 'slow'),
        ...rulesFromAliases(['burger king'], 'slow'),
        ...rulesFromAliases(['five guys'], 'slow'),
        ...rulesFromAliases(['wing stop', 'wingstop'], 'slow'),
        ...rulesFromAliases(['mc donalds', 'mcdonalds'], 'slow'),
        ...rulesFromAliases(['popeyes'], 'slow'),
        ...rulesFromAliases(['greggs'], 'slow'),
        ...rulesFromAliases(['subway'], 'slow'),
        ...rulesFromAliases(['morrisons'], 'slow'),
        ...rulesFromAliases(['asda'], 'slow'),
        ...rulesFromAliases(['tesco'], 'slow'),
        ...rulesFromAliases(['kfc'], 'slow'),
    ]);
    // Combined UK list: fast+slow sorted together so Express/Local/Daily always beat parent.
    const UK_CHAIN_RULES = sortRulesLongestFirst([...UK_FAST_RULES, ...UK_SLOW_RULES]);
    const US_SLOW_RULES = sortRulesLongestFirst([
        // Large grocery / big-box cold-start priors (US only). Specific formats first.
        ...rulesFromAliases(['walmart supercenter', 'wal mart supercenter'], 'slow'),
        ...rulesFromAliases(['walmart', 'wal mart'], 'slow'),
        ...rulesFromAliases(['jewel osco'], 'slow'),
        ...rulesFromAliases(['marianos'], 'slow'),
        ...rulesFromAliases(['target'], 'slow'),
        ...rulesFromAliases(['aldi'], 'slow'),
        ...rulesFromAliases(['burger king'], 'slow'),
        ...rulesFromAliases(['five guys'], 'slow'),
        ...rulesFromAliases(['taco bell'], 'slow'),
        // Initial cold-start prior only; live wait + recentConsensusStatus always override.
        ...rulesFromAliases(['white castle'], 'slow'),
        ...rulesFromAliases(['potbelly'], 'slow'),
        ...rulesFromAliases(['wing stop', 'wingstop'], 'slow'),
        ...rulesFromAliases(['mc donalds', 'mcdonalds'], 'slow'),
        ...rulesFromAliases(['popeyes'], 'slow'),
        ...rulesFromAliases(['kfc'], 'slow'),
    ]);
    // Global convenience-chain aliases (fast in every market). Not generic supermarkets.
    const GLOBAL_CONVENIENCE_CHAIN_RULES = sortRulesLongestFirst([
        ...rulesFromAliases(['7 eleven', '7eleven'], 'fast'),
        ...rulesFromAliases(['circle k'], 'fast'),
        ...rulesFromAliases(['one stop'], 'fast'),
        ...rulesFromAliases(['londis'], 'fast'),
        ...rulesFromAliases(['nisa local', 'nisa'], 'fast'),
    ]);
    // Global pizza-specialist chains (slow in every market). Name may omit the word "pizza".
    const GLOBAL_PIZZA_CHAIN_RULES = sortRulesLongestFirst([
        ...rulesFromAliases(['pizza hut'], 'slow'),
        ...rulesFromAliases(['pizza express', 'pizzaexpress'], 'slow'),
        ...rulesFromAliases(['little caesars', 'little caesar'], 'slow'),
        ...rulesFromAliases(['papa johns', 'papa john'], 'slow'),
        ...rulesFromAliases(['dominos', 'domino s'], 'slow'),
    ]);
    // Consecutive name/brand phrases for petrol / gas / fuel stations (global fast).
    const PETROL_GAS_NAME_PHRASES = [
        ['petrol', 'filling', 'station'],
        ['petrol', 'station'],
        ['gas', 'station'],
        ['fuel', 'station'],
        ['filling', 'station'],
        ['service', 'station'],
    ];
    function resolvePredictionMarket(city) {
        const trimmed = (city !== null && city !== void 0 ? city : '').trim();
        if (!trimmed) {
            return null;
        }
        // Prefer getCountryForCity — same authoritative resolution as the rest of the app
        // (international map hit, otherwise intentional UK default for non-empty cities).
        const country = (0, countryConfig_1.getCountryForCity)(trimmed);
        if (country === 'United States') {
            return 'United States';
        }
        if (country === 'UK') {
            return 'UK';
        }
        return 'other';
    }
    /**
     * Plain UK Coop / Co-op / Co Op cold-start fast, excluding Co-op Live.
     * Food forms are covered by UK_FAST_RULES; this only adds bare Coop/Co-op.
     */
    function matchesUkPlainCoopFast(nameTokens) {
        if (nameTokens.length === 0) {
            return false;
        }
        // "Coop" / "Coop Something" but not "Coop Live…"
        if (nameTokens[0] === 'coop') {
            return nameTokens[1] !== 'live';
        }
        // "Co-op" / "Co Op" / "Co-op Something" but not "Co-op Live…"
        if (nameTokens[0] === 'co' && nameTokens[1] === 'op') {
            return nameTokens[2] !== 'live';
        }
        return false;
    }
    function matchMarketChainRules(nameTokens, market) {
        if (market === 'UK') {
            const matched = matchPrefixRules(nameTokens, UK_CHAIN_RULES);
            if (matched) {
                return matched;
            }
            if (matchesUkPlainCoopFast(nameTokens)) {
                return 'fast';
            }
            return null;
        }
        if (market === 'United States') {
            return matchPrefixRules(nameTokens, US_SLOW_RULES);
        }
        return null;
    }
    function isPetrolOrGasType(venueType) {
        const typeNorm = normalizePredictionText(venueType !== null && venueType !== void 0 ? venueType : '');
        if (!typeNorm) {
            return false;
        }
        const typeTokens = typeNorm.split(' ');
        // petrol_station / gas_station / fuel_station / filling_station / service_station
        // normalize to space-separated tokens.
        if ((typeTokens.includes('petrol') && typeTokens.includes('station'))
            || (typeTokens.includes('gas') && typeTokens.includes('station'))
            || (typeTokens.includes('fuel') && typeTokens.includes('station'))
            || (typeTokens.includes('filling') && typeTokens.includes('station'))
            || (typeTokens.includes('service') && typeTokens.includes('station'))) {
            return true;
        }
        return (typeNorm.includes('petrol station')
            || typeNorm.includes('gas station')
            || typeNorm.includes('fuel station')
            || typeNorm.includes('filling station')
            || typeNorm.includes('service station'));
    }
    function textHasPetrolOrGasPhrase(text) {
        if (!text || !text.trim()) {
            return false;
        }
        const tokens = tokenize(text);
        return PETROL_GAS_NAME_PHRASES.some((phrase) => tokensContainPhrase(tokens, phrase));
    }
    function isPetrolOrGasStation(venue) {
        // 1) Category/type evidence first.
        if (isPetrolOrGasType(venue.venue_type)) {
            return true;
        }
        // 2) Explicit phrases on name/brand only (not address) — e.g. "ASDA Petrol Station".
        if (textHasPetrolOrGasPhrase(venue.name) || textHasPetrolOrGasPhrase(venue.brand)) {
            return true;
        }
        return false;
    }
    function isConvenienceType(venueType) {
        const typeNorm = normalizePredictionText(venueType !== null && venueType !== void 0 ? venueType : '');
        if (!typeNorm) {
            return false;
        }
        const typeTokens = typeNorm.split(' ');
        if (typeTokens.includes('convenience')) {
            return true;
        }
        // Catalogue phrasings such as convenience_store / convenience-store / convenience shop.
        return (typeNorm.includes('convenience store')
            || typeNorm.includes('convenience shop')
            || typeNorm === 'convenience store');
    }
    function isPizzaType(venueType) {
        const typeNorm = normalizePredictionText(venueType !== null && venueType !== void 0 ? venueType : '');
        if (!typeNorm) {
            return false;
        }
        const typeTokens = typeNorm.split(' ');
        if (typeTokens.includes('pizza') || typeTokens.includes('pizzeria')) {
            return true;
        }
        return (typeNorm.includes('pizza restaurant')
            || typeNorm.includes('pizza shop')
            || typeNorm === 'pizzeria');
    }
    function isConvenienceVenue(venue) {
        // 1) Category/type evidence first.
        if (isConvenienceType(venue.venue_type)) {
            return true;
        }
        // 2) Explicit global convenience chains on name/brand (prefix, not loose substring).
        if (matchAnyPrefix([venue.name, venue.brand], GLOBAL_CONVENIENCE_CHAIN_RULES)) {
            return true;
        }
        // 3) Careful name/brand token fallback — whole token "convenience" only.
        if (tokenize(venue.name).includes('convenience')) {
            return true;
        }
        if (venue.brand && tokenize(venue.brand).includes('convenience')) {
            return true;
        }
        return false;
    }
    function isPizzaVenue(venue) {
        // 1) Category/type evidence first.
        if (isPizzaType(venue.venue_type)) {
            return true;
        }
        // 2) Explicit pizza-specialist chains (Domino's etc. may omit the word "pizza").
        if (matchAnyPrefix([venue.name, venue.brand], GLOBAL_PIZZA_CHAIN_RULES)) {
            return true;
        }
        // 3) Whole-token "pizza" / "pizzeria" on name or brand only (not address/branch).
        const nameTokens = tokenize(venue.name);
        if (nameTokens.includes('pizza') || nameTokens.includes('pizzeria')) {
            return true;
        }
        if (venue.brand) {
            const brandTokens = tokenize(venue.brand);
            if (brandTokens.includes('pizza') || brandTokens.includes('pizzeria')) {
                return true;
            }
        }
        return false;
    }
    function matchAgainstText(text, market) {
        const nameTokens = tokenize(text);
        if (nameTokens.length === 0) {
            return null;
        }
        return matchMarketChainRules(nameTokens, market);
    }
    /**
     * Cold-start prediction only. Does not consider live wait or consensus.
     */
    function getVenuePredictedStatus(venue) {
        const market = resolvePredictionMarket(venue.city);
        // 1) Global petrol / gas / fuel station format — must beat generic parent-chain
        //    supermarket/big-box rules (e.g. ASDA Petrol Station → fast, not ASDA slow).
        if (isPetrolOrGasStation(venue)) {
            return 'fast';
        }
        // 2) Market / store-format chain rules (specific formats before parent chains).
        const fromName = matchAgainstText(venue.name, market);
        if (fromName) {
            return fromName;
        }
        if (venue.brand && venue.brand.trim()) {
            const fromBrand = matchAgainstText(venue.brand, market);
            if (fromBrand) {
                return fromBrand;
            }
        }
        // 3) Global category priors — below live/consensus (handled by getEffectiveVenueStatus)
        //    and below any explicit market/format rule above.
        if (isConvenienceVenue(venue)) {
            return 'fast';
        }
        if (isPizzaVenue(venue)) {
            return 'slow';
        }
        return null;
    }
    function getEffectiveVenueStatus(venue, nowMs) {
        if ((0, waitColors_1.isLocallyLiveWait)(venue, nowMs) && venue.currentWaitMinutes !== null) {
            return venue.currentWaitMinutes < 10 ? 'fast' : 'slow';
        }
        if (venue.recentConsensusStatus === 'fast' || venue.recentConsensusStatus === 'slow') {
            return venue.recentConsensusStatus;
        }
        return getVenuePredictedStatus(venue);
    }
  };

  // ---- lib/venueDisplay.ts ----
  defs["./venueDisplay"] = function (exports, require, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.normalizeLocationPart = normalizeLocationPart;
    exports.isPostcodeLike = isPostcodeLike;
    exports.isUsZipLike = isUsZipLike;
    exports.isPostalCodeLike = isPostalCodeLike;
    exports.locationPartContains = locationPartContains;
    exports.stripPostcodeFromAddress = stripPostcodeFromAddress;
    exports.uniqueLocationParts = uniqueLocationParts;
    exports.applyChainBrandCleanup = applyChainBrandCleanup;
    exports.getVenueDisplayName = getVenueDisplayName;
    exports.removeRedundantAddressSegments = removeRedundantAddressSegments;
    exports.formatHomeAreaForDisplay = formatHomeAreaForDisplay;
    exports.expandUkStreetAbbreviations = expandUkStreetAbbreviations;
    exports.getVenueCompactAreaLabel = getVenueCompactAreaLabel;
    exports.getVenueHomeLocationLabel = getVenueHomeLocationLabel;
    exports.splitHomeLocationLabelParts = splitHomeLocationLabelParts;
    exports.getHomeLocationLabelPartIssues = getHomeLocationLabelPartIssues;
    exports.getHomeLocationLabelIssues = getHomeLocationLabelIssues;
    exports.getVenueOpenedLocationDetails = getVenueOpenedLocationDetails;
    exports.getVenueDisplayLocationLines = getVenueDisplayLocationLines;
    exports.getVenueDisplaySubtitle = getVenueDisplaySubtitle;
    exports.cleanVenueName = cleanVenueName;
    exports.getVenueSubtitle = getVenueSubtitle;
    exports.getVenueTypeIconName = getVenueTypeIconName;
    exports.trimLeadingSeparators = trimLeadingSeparators;
    /** Same venue by trimmed non-empty id, else by object reference. */
    function isSameVenue(a, b) {
        if (a === b)
            return true;
        const aId = typeof a.id === 'string' ? a.id.trim() : '';
        const bId = typeof b.id === 'string' ? b.id.trim() : '';
        if (aId && bId)
            return aId === bId;
        return false;
    }
    function escapeRegExp(value) {
        return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    function normalizeLocationPart(value) {
        return value
            .toLowerCase()
            .trim()
            .replace(/[.,/#!$%^&*;:{}=\-_`~()\[\]<>?"'|]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    }
    /** Space-insensitive place equality ("Lake View" ≡ "Lakeview"). */
    function placesEqualFlex(a, b) {
        return normalizeLocationPart(a).replace(/\s+/g, '') === normalizeLocationPart(b).replace(/\s+/g, '');
    }
    function isPostcodeLike(value) {
        const compact = normalizeLocationPart(value).replace(/\s+/g, '');
        return /^[a-z]{1,2}\d[a-z\d]?\d[a-z]{2}$/i.test(compact);
    }
    function isUsZipLike(value) {
        // Do not run through normalizeLocationPart — it turns ZIP+4 hyphens into spaces.
        const compact = value.trim().replace(/\s+/g, '');
        return /^\d{5}(?:-\d{4})?$/.test(compact);
    }
    function isPostalCodeLike(value) {
        return isPostcodeLike(value) || isUsZipLike(value);
    }
    function locationPartContains(a, b) {
        const left = normalizeLocationPart(a).replace(/\s+/g, '');
        const right = normalizeLocationPart(b).replace(/\s+/g, '');
        return left.includes(right) || right.includes(left);
    }
    function stripPostcodeFromAddress(address, postcode) {
        const cleanAddress = address.trim();
        const source = (postcode !== null && postcode !== void 0 ? postcode : '').trim();
        if (!source) {
            return cleanAddress;
        }
        const escaped = escapeRegExp(source).replace(/\s+/g, '\\s*');
        const re = new RegExp(`(?:\\s*[•,/-]?\\s*)?${escaped}\\b`, 'ig');
        return cleanAddress.replace(re, '').replace(/[\s,•/-]+$/g, '').replace(/\s{2,}/g, ' ').trim();
    }
    function uniqueLocationParts(parts) {
        const out = [];
        for (const part of parts) {
            const value = (part !== null && part !== void 0 ? part : '').trim();
            if (!value)
                continue;
            const normalized = normalizeLocationPart(value);
            if (!normalized)
                continue;
            if (out.some((existing) => normalizeLocationPart(existing) === normalized))
                continue;
            if (out.some((existing) => locationPartContains(existing, value) || locationPartContains(value, existing)))
                continue;
            out.push(value);
        }
        return out;
    }
    const KNOWN_CHAINS = [
        // Food delivery / restaurants
        { canonical: 'KFC', aliases: ['kfc'] },
        { canonical: "McDonald's", aliases: ['mcdonalds', 'mc donalds'] },
        { canonical: 'Burger King', aliases: ['burger king'] },
        { canonical: 'Subway', aliases: ['subway'] },
        { canonical: 'Greggs', aliases: ['greggs'] },
        { canonical: 'Costa Coffee', aliases: ['costa coffee'] },
        { canonical: 'Caffè Nero', aliases: ['caffe nero'] },
        { canonical: 'Starbucks', aliases: ['starbucks'] },
        { canonical: 'Taco Bell', aliases: ['taco bell'] },
        { canonical: 'Pizza Hut', aliases: ['pizza hut'] },
        { canonical: "Domino's", aliases: ['dominos', 'domino s'] },
        { canonical: 'Popeyes', aliases: ['popeyes'] },
        { canonical: 'Tim Hortons', aliases: ['tim hortons'] },
        { canonical: 'Five Guys', aliases: ['five guys'] },
        { canonical: 'German Doner Kebab', aliases: ['german doner kebab'] },
        { canonical: "Pepe's", aliases: ['pepes'] },
        { canonical: "Nando's", aliases: ['nandos'] },
        { canonical: 'Wingstop', aliases: ['wingstop', 'wing stop'] },
        { canonical: 'Creams', aliases: ['creams cafe', 'creams'] },
        { canonical: "Kaspa's", aliases: ['kaspas'] },
        { canonical: "Wenzel's", aliases: ['wenzels'] },
        { canonical: 'Pret A Manger', aliases: ['pret a manger', 'pret'] },
        { canonical: 'Itsu', aliases: ['itsu'] },
        { canonical: 'Wasabi', aliases: ['wasabi'] },
        { canonical: 'Chopstix', aliases: ['chopstix'] },
        { canonical: 'LEON', aliases: ['leon'] },
        { canonical: 'Tortilla', aliases: ['tortilla'] },
        { canonical: 'Kokoro', aliases: ['kokoro'] },
        { canonical: 'Roosters Piri Piri', aliases: ['roosters piri piri'] },
        { canonical: 'Dixy Chicken', aliases: ['dixy chicken'] },
        { canonical: 'Chicken Cottage', aliases: ['chicken cottage'] },
        { canonical: "Morley's", aliases: ['morleys'] },
        // Convenience / grocery pickup chains
        // NOTE: "Co-op Live" is intentionally NOT matched — only food/shop patterns.
        { canonical: 'Central Co-op Food', aliases: ['central co op food'] },
        { canonical: 'Co-op', aliases: ['co op food', 'the co operative food', 'co operative food'] },
        { canonical: 'Tesco Express', aliases: ['tesco express'] },
        { canonical: 'Tesco Extra', aliases: ['tesco extra'] },
        { canonical: 'Tesco', aliases: ['tesco superstore'] },
        { canonical: "Sainsbury's Local", aliases: ['sainsburys local'] },
        { canonical: "Sainsbury's", aliases: ['sainsburys superstore'] },
        // ASDA is handled by applyAsdaDisplayName (keeps verified store format).
        // BP has no generic alias — "BP Chicheley Park Simply Food" stays stored.
        { canonical: 'Morrisons Daily', aliases: ['morrisons daily'] },
        { canonical: 'Morrisons', aliases: ['morrisons'] },
        { canonical: 'M&S Foodhall', aliases: ['m s foodhall', 'marks spencer foodhall', 'marks and spencer foodhall'] },
        { canonical: 'One Stop', aliases: ['one stop'] },
        { canonical: 'Londis', aliases: ['londis'] },
        { canonical: 'Premier', aliases: ['premier'] },
        { canonical: 'Nisa', aliases: ['nisa local', 'nisa'] },
        { canonical: 'Costcutter', aliases: ['costcutter'] },
        { canonical: 'Budgens', aliases: ['budgens'] },
        { canonical: 'Best-one', aliases: ['best one'] },
        { canonical: 'SPAR', aliases: ['spar'] },
        // Pharmacy / retail pickup points
        { canonical: 'Boots', aliases: ['boots'] },
        { canonical: 'Superdrug', aliases: ['superdrug'] },
        { canonical: 'WHSmith', aliases: ['whsmith', 'wh smith'] },
    ];
    // Flatten to (canonical, aliasTokens) pairs sorted by token count DESC so the
    // longest matching brand prefix always wins (e.g. "Morrisons Daily" beats
    // "Morrisons", "Central Co-op Food" beats "Co-op Food").
    const CHAIN_ALIAS_ENTRIES = KNOWN_CHAINS
        .flatMap((chain) => chain.aliases.map((alias) => ({ canonical: chain.canonical, tokens: alias.split(' ') })))
        .sort((a, b) => b.tokens.length - a.tokens.length);
    // Distinct outlet formats kept after chain cleanup so cafe/petrol/drive-thru
    // do not collapse into the same supermarket/restaurant display name.
    const PRESERVED_OUTLET_SUFFIXES = [
        { tokens: ['petrol', 'station'], label: 'Petrol Station' },
        { tokens: ['drive', 'through'], label: 'Drive Thru' },
        { tokens: ['drive', 'thru'], label: 'Drive Thru' },
        { tokens: ['foodhall'], label: 'Foodhall' },
        { tokens: ['kitchen'], label: 'Kitchen' },
        { tokens: ['express'], label: 'Express' },
        { tokens: ['extra'], label: 'Extra' },
        { tokens: ['daily'], label: 'Daily' },
        { tokens: ['local'], label: 'Local' },
        { tokens: ['cafe'], label: 'Cafe' },
        { tokens: ['dt'], label: 'Drive Thru' },
    ].sort((a, b) => b.tokens.length - a.tokens.length);
    function normalizeBrandText(value) {
        return value
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[’']/g, '')
            .replace(/[^a-z0-9]+/g, ' ')
            .trim()
            .replace(/\s+/g, ' ');
    }
    function matchPreservedOutletSuffix(tokens, selectedCity) {
        if (!tokens.length)
            return null;
        const cityNorm = selectedCity ? normalizeBrandText(selectedCity) : '';
        for (const suffix of PRESERVED_OUTLET_SUFFIXES) {
            if (suffix.tokens.length > tokens.length)
                continue;
            let matches = true;
            for (let i = 0; i < suffix.tokens.length; i += 1) {
                if (tokens[i] !== suffix.tokens[i]) {
                    matches = false;
                    break;
                }
            }
            if (!matches)
                continue;
            const leftover = tokens.slice(suffix.tokens.length);
            // Exact outlet remainder, or outlet + trailing selected city only.
            // Never keep "Cafe Kingston" when Kingston is not the selected city token.
            if (leftover.length === 0
                || (cityNorm && leftover.join(' ') === cityNorm)) {
                return suffix.label;
            }
        }
        return null;
    }
    /** Verified motorway-services branch descriptors only — never invent locations. */
    function matchVerifiedServicesBranch(tokens) {
        if (!tokens.length)
            return null;
        const joined = tokens.join(' ');
        const match = joined.match(/\bm(\d{1,2})\s+(north|south)\s+services\b/);
        if (!match)
            return null;
        const dir = match[2].charAt(0).toUpperCase() + match[2].slice(1);
        return `M${match[1]} ${dir} Services`;
    }
    const CHAIN_KEPT_REMAINDER_LABELS = {
        southbound: 'Southbound',
        northbound: 'Northbound',
        eastbound: 'Eastbound',
        westbound: 'Westbound',
        north: 'North',
        south: 'South',
        east: 'East',
        west: 'West',
    };
    /**
     * After a chain match, drop city/area tokens from the remainder but keep
     * verified direction / motorway-service / outlet identity words.
     */
    function matchKeptChainRemainder(remainder, selectedCity, selectedArea) {
        if (!remainder.length)
            return null;
        const cityTokens = selectedCity ? normalizeBrandText(selectedCity).split(' ').filter(Boolean) : [];
        const areaTokens = selectedArea ? normalizeBrandText(selectedArea).split(' ').filter(Boolean) : [];
        const droppable = new Set([...cityTokens, ...areaTokens, 'the']);
        const kept = [];
        let i = 0;
        while (i < remainder.length) {
            const token = remainder[i];
            if (droppable.has(token)) {
                i += 1;
                continue;
            }
            // Drop a direction prefix that belongs to a following dropped place token.
            if (PLACE_DIRECTION_PREFIXES.includes(token)
                && i + 1 < remainder.length
                && droppable.has(remainder[i + 1])) {
                i += 1;
                continue;
            }
            const label = CHAIN_KEPT_REMAINDER_LABELS[token];
            if (label) {
                kept.push(label);
                i += 1;
                continue;
            }
            if (token === 'welcome' && remainder[i + 1] === 'break') {
                kept.push('Welcome Break');
                i += 2;
                continue;
            }
            if (token === 'm1' || token === 'm25' || /^m\d{1,2}$/.test(token)) {
                // Fall through to services matcher for full M1 North Services.
                break;
            }
            // Unknown leftover → not a pure location/direction remainder.
            return null;
        }
        if (!kept.length)
            return null;
        // Avoid duplicating a bare "North" onto brands that already end with it.
        return kept.join(' ');
    }
    // Returns the canonical brand name ONLY when the venue name STARTS with a known
    // chain brand on a whole-word boundary. Distinct outlet-type suffixes
    // (Cafe / Petrol Station / Drive Thru / Daily / …) and verified M1 North/South
    // Services descriptors are preserved. Never matches a brand word that appears
    // later in the name, so independent venues are left untouched.
    function applyChainBrandCleanup(rawName, selectedCity, selectedArea) {
        const norm = normalizeBrandText(rawName);
        if (!norm)
            return null;
        const nameTokens = norm.split(' ');
        for (const entry of CHAIN_ALIAS_ENTRIES) {
            const aliasTokens = entry.tokens;
            if (aliasTokens.length > nameTokens.length)
                continue;
            let matches = true;
            for (let i = 0; i < aliasTokens.length; i += 1) {
                if (nameTokens[i] !== aliasTokens[i]) {
                    matches = false;
                    break;
                }
            }
            if (!matches)
                continue;
            const remainder = nameTokens.slice(aliasTokens.length);
            const outlet = matchPreservedOutletSuffix(remainder, selectedCity);
            if (outlet) {
                // Avoid "Morrisons Daily Daily" when the alias already includes the format.
                const canonicalNorm = normalizeBrandText(entry.canonical);
                if (canonicalNorm.endsWith(` ${normalizeBrandText(outlet)}`)) {
                    return entry.canonical;
                }
                return `${entry.canonical} ${outlet}`;
            }
            const servicesBranch = matchVerifiedServicesBranch(remainder);
            if (servicesBranch) {
                return `${entry.canonical} ${servicesBranch}`;
            }
            const kept = matchKeptChainRemainder(remainder, selectedCity, selectedArea);
            if (kept) {
                const hasWelcome = /\bWelcome Break\b/.test(kept);
                const withoutWelcome = kept.replace(/\bWelcome Break\b/g, '').replace(/\s{2,}/g, ' ').trim();
                if (hasWelcome) {
                    return withoutWelcome
                        ? `${entry.canonical} ${withoutWelcome} (Welcome Break)`
                        : `${entry.canonical} (Welcome Break)`;
                }
                return `${entry.canonical} ${kept}`;
            }
            return entry.canonical;
        }
        return null;
    }
    // Protected brands kept ALL-CAPS (plus anything containing &).
    const PROTECTED_ALL_CAPS_BRANDS = new Set([
        'ASDA',
        'ALDI',
        'IKEA',
        'IHOP',
        'TGI',
        'IGA',
        'OXXO',
        'YO',
        'KFC',
        'ASK',
        'ABR',
        'OPA',
        'MK',
        'UK',
        'BP',
        'BBQ',
        'SRDS',
        'CVS',
        'DQ',
        'BJ',
        'NYC',
        'USA',
        'AYCE',
        'QDOBA',
        'WIC',
        'AAA',
        'UIC',
        'IDOF',
        'ALK',
        'NYFC',
        'DOSA',
        'ROYCE',
    ]);
    // Two-letter particles title-cased even when ALL-CAPS.
    const ALL_CAPS_TWO_LETTER_TITLECASE = new Set([
        'EL',
        'LA',
        'DE',
        'DA',
        'DI',
        'LE',
        'OF',
        'IN',
        'ON',
        'AT',
        'TO',
        'BY',
        'OR',
        'MY',
    ]);
    // Mixed-case path: leave these lowercase connector/particles alone.
    const MIXED_CASE_KEEP_LOWERCASE = new Set([
        'and',
        'the',
        'of',
        'for',
        'with',
        'on',
        'in',
        'at',
        'by',
        'from',
        'de',
        'del',
        'la',
        'el',
        'los',
        'las',
        'da',
        'di',
        'les',
        'des',
        'du',
        'y',
        'sus',
    ]);
    function stripDiacritics(value) {
        return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
    function lettersOnly(word) {
        return Array.from(word).filter((ch) => /\p{L}/u.test(ch)).join('');
    }
    function isFullyUppercaseAlphaWord(word) {
        const letters = lettersOnly(word);
        if (!letters)
            return false;
        return Array.from(letters).every((ch) => /\p{Lu}/u.test(ch));
    }
    function wordHasVowel(word) {
        // Count Y/y as a vowel for title-case decisions.
        return /[AEIOUYaeiouyÁÉÍÓÚÜáéíóúüÀÈÌÒÙàèìòùÂÊÎÔÛâêîôûÄËÏÖäëïöÑñ]/u.test(stripDiacritics(word));
    }
    function allCapsBrandKey(word) {
        return stripDiacritics(lettersOnly(word)).toUpperCase();
    }
    function titleCaseLetterChunk(chunk) {
        const chars = Array.from(chunk);
        if (chars.length === 0)
            return chunk;
        return chars[0].toLocaleUpperCase('en-US') + chars.slice(1).join('').toLocaleLowerCase('en-US');
    }
    function titleCasePreservingPunctuation(word) {
        // Title-case the first letter-run only; later runs (e.g. after ') stay lowercase → Kaz's.
        let firstChunk = true;
        return word.replace(/\p{L}+/gu, (chunk) => {
            if (firstChunk) {
                firstChunk = false;
                return titleCaseLetterChunk(chunk);
            }
            return chunk.toLocaleLowerCase('en-US');
        });
    }
    function titleCaseHyphenatedParts(word) {
        return word
            .split('-')
            .map((part) => {
            const letters = lettersOnly(part);
            if (!letters.length)
                return part;
            // No-vowel acronyms of 3+ stay CAPS; everything else title-cased per part.
            if (letters.length >= 3 && !wordHasVowel(letters)) {
                return part.toLocaleUpperCase('en-US');
            }
            return titleCasePreservingPunctuation(part);
        })
            .join('-');
    }
    /**
     * Polish one ALL-CAPS token (Unicode-aware). Single-word whole-name brands are
     * handled by the caller and never passed here for automatic title-casing.
     */
    const ROMAN_NUMERAL_RE = /^(I|II|III|IV|V|VI|VII|VIII|IX|X|XI|XII)$/i;
    const DOTTED_INITIALS_RE = /^(?:[A-Za-z]\.){2,}[A-Za-z]?\.?$/;
    function polishAllCapsWordToken(word, isFirstWord = false, prevWord = '') {
        if (!/\p{L}/u.test(word))
            return word;
        if (/&/.test(word))
            return word;
        // Ordinals: 63RD → 63rd
        const ordinal = word.match(/^(\d+)(ST|ND|RD|TH)$/iu);
        if (ordinal) {
            return `${ordinal[1]}${ordinal[2].toLocaleLowerCase('en-US')}`;
        }
        // Non-ordinal tokens with digits stay as stored (HWY51, A1).
        if (/\d/.test(word))
            return word;
        // Roman numerals and dotted initials stay CAPS / structured.
        if (ROMAN_NUMERAL_RE.test(word.replace(/\./g, '')))
            return word.toLocaleUpperCase('en-US');
        if (DOTTED_INITIALS_RE.test(word)) {
            return word.replace(/[A-Za-z]/g, (ch) => ch.toLocaleUpperCase('en-US'));
        }
        if (/-/.test(word)) {
            return titleCaseHyphenatedParts(word);
        }
        // MR. → Mr.
        if (/^MR\.?$/i.test(word))
            return word.endsWith('.') ? 'Mr.' : 'Mr';
        // UP → Up
        if (/^UP$/i.test(word))
            return 'Up';
        const brandKey = allCapsBrandKey(word);
        if (PROTECTED_ALL_CAPS_BRANDS.has(brandKey))
            return word;
        const letters = lettersOnly(word);
        if (letters.length === 0)
            return word;
        const key = stripDiacritics(letters).toUpperCase();
        const prevKey = stripDiacritics(lettersOnly(prevWord)).toUpperCase();
        // de/del/a → following La/El/Los/Las stay lowercase; otherwise title-case them.
        const articleKeys = new Set(['LA', 'EL', 'LOS', 'LAS']);
        const afterDe = prevKey === 'DE' || prevKey === 'DEL' || prevKey === 'A';
        if (articleKeys.has(key)) {
            if (!isFirstWord && afterDe)
                return word.toLocaleLowerCase('en-US');
            return titleCasePreservingPunctuation(word);
        }
        const lowerMid = new Set(['DE', 'DEL', 'DA', 'DI', 'OF', 'AND', 'FOR']);
        if (lowerMid.has(key)) {
            return isFirstWord ? titleCasePreservingPunctuation(word) : word.toLocaleLowerCase('en-US');
        }
        if (ALL_CAPS_TWO_LETTER_TITLECASE.has(key) || key === 'THE' || key === 'AL') {
            return titleCasePreservingPunctuation(word);
        }
        if (letters.length <= 2) {
            return word.toLocaleUpperCase('en-US');
        }
        if (!wordHasVowel(letters)) {
            return word.toLocaleUpperCase('en-US');
        }
        // D'ORO → D'Oro (single-letter prefix before apostrophe).
        if (/^[A-Za-z]['\u2019]\p{L}/u.test(word)) {
            return word.replace(/^([A-Za-z])(['\u2019])(\p{L}+)/u, (_m, a, ap, rest) => (`${String(a).toLocaleUpperCase('en-US')}${ap}${titleCaseLetterChunk(String(rest))}`));
        }
        return titleCasePreservingPunctuation(word);
    }
    function isEntirelyLowercaseName(words) {
        const alpha = words.filter((w) => /\p{L}/u.test(w));
        if (!alpha.length)
            return false;
        return alpha.every((w) => {
            const letters = lettersOnly(w);
            return letters.length > 0 && letters === letters.toLocaleLowerCase('en-US');
        });
    }
    function polishMixedCaseToken(word, isFirstWord, prevWord, entirelyLowercase, insideParens) {
        if (word === 'Mk' || word === 'mk')
            return 'MK';
        // Exact bbq/Bbq only — not bb.q brand tokens.
        if (/^bbq$/i.test(word))
            return 'BBQ';
        // Hyphenated words in mixed-case names stay unchanged, except Al-bayan → Al-Bayan.
        if (/-/.test(word)) {
            if (/^al-bayan$/i.test(word))
                return 'Al-Bayan';
            return word;
        }
        // Never rewrite ALL-CAPS tokens inside mixed-case names (QDOBA, NYFC, DOSA, …).
        if (isFullyUppercaseAlphaWord(word) && lettersOnly(word).length >= 2) {
            return word;
        }
        // Never lower-case a word the source already capitalised.
        if (/\p{Lu}/u.test(word))
            return word;
        if (insideParens && !entirelyLowercase)
            return word;
        // Lower-case first word stays as brand styling unless the whole name is lowercase.
        if (isFirstWord && !entirelyLowercase)
            return word;
        const lower = word.toLocaleLowerCase('en-US');
        const prevLower = prevWord.toLocaleLowerCase('en-US');
        // Capitalise La/El/Los/Las except after de/del/a.
        if (/^(la|el|los|las)$/i.test(word)) {
            if (/^(de|del|a)$/i.test(prevLower))
                return lower;
            return word.charAt(0).toLocaleUpperCase('en-US') + word.slice(1).toLocaleLowerCase('en-US');
        }
        if (MIXED_CASE_KEEP_LOWERCASE.has(lower) && !entirelyLowercase)
            return word;
        // Entirely-lowercase multi-word names: keep "and" lowercase ("Fish and Chips").
        if (entirelyLowercase && lower === 'and')
            return 'and';
        // Leave short lowercase particles / brand letters alone in mixed-case names.
        if (!entirelyLowercase && lettersOnly(word).length <= 2)
            return word;
        // Lower-case word (including those followed by punctuation) → capitalise.
        if (/\p{L}/u.test(word)) {
            const m = word.match(/^(\p{L})(.*)$/u);
            if (m)
                return m[1].toLocaleUpperCase('en-US') + m[2];
        }
        return word;
    }
    function applyCasingToWordList(words, insideParens) {
        const alphaWords = words.filter((w) => /\p{L}/u.test(w));
        if (alphaWords.length === 0)
            return words.join(' ');
        // Genuine single-word ALL-CAPS business names stay exactly as stored.
        if (!insideParens
            && alphaWords.length === 1
            && words.length === 1
            && isFullyUppercaseAlphaWord(words[0])) {
            return words.join(' ');
        }
        const allCapsAlpha = alphaWords.every(isFullyUppercaseAlphaWord);
        if (allCapsAlpha) {
            return words
                .map((word, i) => polishAllCapsWordToken(word, i === 0, i > 0 ? words[i - 1] : ''))
                .join(' ');
        }
        const entirelyLower = isEntirelyLowercaseName(words);
        // Single-word lowercase brand styling stays (goosefoot®, m.henry); only bp → BP.
        if (entirelyLower
            && words.length === 1
            && !/^bp$/i.test(words[0])) {
            return words.join(' ');
        }
        return words
            .map((word, i) => polishMixedCaseToken(word, i === 0, i > 0 ? words[i - 1] : '', entirelyLower, insideParens))
            .join(' ');
    }
    // Display-only casing:
    // - Title-case capitals only when the whole name is ALL-CAPS.
    // - Mixed-case: leave capitalised source words alone (Mk→MK and Al-bayan→Al-Bayan only).
    // - Entirely lowercase names are title-cased.
    function applyDisplayCasing(value) {
        const trimmed = value.trim();
        if (!trimmed)
            return value;
        if (/^bp$/i.test(trimmed))
            return 'BP';
        const parts = [];
        const re = /\([^)]*\)/g;
        let last = 0;
        let match = re.exec(trimmed);
        while (match) {
            if (match.index > last) {
                parts.push({ text: trimmed.slice(last, match.index), parens: false });
            }
            parts.push({ text: match[0], parens: true });
            last = match.index + match[0].length;
            match = re.exec(trimmed);
        }
        if (last < trimmed.length) {
            parts.push({ text: trimmed.slice(last), parens: false });
        }
        if (parts.length === 0) {
            parts.push({ text: trimmed, parens: false });
        }
        return parts
            .map((part) => {
            var _a, _b, _c, _d;
            if (part.parens) {
                const inner = part.text.slice(1, -1);
                const innerWords = inner.trim().split(/\s+/).filter(Boolean);
                return `(${applyCasingToWordList(innerWords, true)})`;
            }
            const words = part.text.split(/\s+/).filter(Boolean);
            if (words.length === 0)
                return part.text;
            const leading = (_b = (_a = part.text.match(/^\s*/)) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : '';
            const trailing = (_d = (_c = part.text.match(/\s*$/)) === null || _c === void 0 ? void 0 : _c[0]) !== null && _d !== void 0 ? _d : '';
            return `${leading}${applyCasingToWordList(words, false)}${trailing}`;
        })
            .join('');
    }
    /** ASDA keeps verified store format from the name (or branch field); never invent. */
    function applyAsdaDisplayName(rawName, branch) {
        const norm = normalizeBrandText(rawName);
        // First whole word only — "Cafe Asda Express" / "The ASDA Coffee Shop" / "Asdaq" stay.
        if (!/^asda(?:\s|$)/.test(norm))
            return null;
        const formats = [
            { test: /\bsupercentre\b/, label: 'Supercentre' },
            { test: /\bsuperstore\b/, label: 'Superstore' },
            { test: /\bsupermarket\b/, label: 'Supermarket' },
            { test: /\bexpress\b/, label: 'Express' },
            { test: /\bpetrol\s+station\b/, label: 'Petrol Station' },
        ];
        const nameNorm = normalizeBrandText(rawName);
        for (const format of formats) {
            if (format.test.test(nameNorm))
                return `ASDA ${format.label}`;
        }
        const branchNorm = normalizeBrandText(branch !== null && branch !== void 0 ? branch : '');
        if (branchNorm) {
            for (const format of formats) {
                if (format.test.test(branchNorm))
                    return `ASDA ${format.label}`;
            }
        }
        return 'ASDA';
    }
    /** Trailing corporate suffixes only — never strip "Co" / "& Co". */
    const TRAILING_BUSINESS_SUFFIX_RE = /(?:\s|,)+(?:ltd|limited|llc|inc\.?|incorporated|corp\.?|corporation|plc)\.?\s*$/i;
    function splitLastNameSeparator(name) {
        const re = /\s+[-–—]\s+|\s+\|\s+/g;
        let last = null;
        let match = re.exec(name);
        while (match) {
            last = match;
            match = re.exec(name);
        }
        if (!last || last.index === undefined)
            return null;
        const left = name.slice(0, last.index).trim();
        const right = name.slice(last.index + last[0].length).trim();
        if (!left || !right)
            return null;
        return { left, right };
    }
    function stripTrailingBusinessSuffixes(name) {
        let cleaned = name.trim();
        let previous = '';
        while (cleaned !== previous) {
            previous = cleaned;
            cleaned = cleaned.replace(TRAILING_BUSINESS_SUFFIX_RE, '').trim();
        }
        return cleaned;
    }
    function stripDanglingNameConnectors(name) {
        let cleaned = name.trim();
        let previous = '';
        while (cleaned !== previous) {
            previous = cleaned;
            cleaned = cleaned
                .replace(/[\s,|/_:]+$/g, '')
                .replace(/\s+[-–—]+$/g, '')
                .replace(/\s+(?:at|on|near|by|of|and|the|for|with|de|del|la|el)\s*$/i, '')
                // Keep "Drive In"; only strip a lone trailing "in".
                .replace(/(?<!\bdrive)\s+in\s*$/i, '')
                .trim();
        }
        return cleaned;
    }
    /** Area key for collision checks — avoids calling getVenueDisplayName (recursion). */
    function getDisplayCollisionAreaKey(venue, selectedArea) {
        var _a;
        for (const candidate of [venue.area, venue.zone]) {
            const value = (candidate !== null && candidate !== void 0 ? candidate : '').trim();
            if (!value || isPostalCodeLike(value))
                continue;
            const norm = normalizeLocationPart(value);
            if (!norm)
                continue;
            if (norm === normalizeLocationPart(selectedArea))
                continue;
            if (norm === normalizeLocationPart(((_a = venue.city) !== null && _a !== void 0 ? _a : '').trim()))
                continue;
            return norm;
        }
        return '';
    }
    const PLACE_DIRECTION_PREFIXES = ['north', 'south', 'east', 'west', 'near'];
    function normalizeEnDashes(name) {
        let cleaned = name.replace(/\s*[–—]\s*/g, ' - ');
        // Treat "X- Y" and "X -Y" the same as " - ".
        cleaned = cleaned.replace(/(\S)-\s+(\S)/g, '$1 - $2');
        cleaned = cleaned.replace(/(\S)\s+-(\S)/g, '$1 - $2');
        // "Wing Wah -63rd" → "Wing Wah - 63rd"
        cleaned = cleaned.replace(/(\S)-(\d)/g, '$1 - $2');
        // Everything after the first " | " is a tagline — drop it.
        const pipeIdx = cleaned.indexOf(' | ');
        if (pipeIdx >= 0)
            cleaned = cleaned.slice(0, pipeIdx);
        return cleaned.replace(/\s{2,}/g, ' ').trim();
    }
    /** Category/cuisine/product descriptors removable in an all-or-nothing dash chain. */
    function isCategoryDescriptorSegment(segment) {
        const norm = normalizeLocationPart(segment).replace(/\./g, '').trim();
        if (!norm)
            return true;
        const stripped = norm
            .replace(/\b(market|butcher|empanadas?|grocery|bakery|halal|meat|chocolate|fudge|ice\s*cream|cuisine|indian|nepali|persian|turkish|middle\s*eastern|european|african|asian|chinese|sichuan|thai|italian|mexican|american|restaurant|cafe|bar|tobacco|smoke\s*shop|cookout|cocktails?|meal\s*prep|food|beverage|deli|sweets?)\b/g, ' ')
            .replace(/\b(and|or|of|the|a|an)\b/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
        return stripped.length === 0;
    }
    /** If every dash segment after the first is a descriptor, keep only the first. */
    function collapseDescriptorDashChain(name) {
        if (!/\s+-\s+/.test(name))
            return name;
        const parts = name.split(/\s+-\s+/).map((p) => p.trim()).filter(Boolean);
        if (parts.length < 2)
            return name;
        const rest = parts.slice(1);
        if (rest.every(isCategoryDescriptorSegment)) {
            return parts[0];
        }
        return name;
    }
    function fixParenthesisSpacing(name) {
        return name
            .replace(/\(\s+/g, '(')
            .replace(/\s+\)/g, ')')
            .replace(/\s{2,}/g, ' ')
            .trim();
    }
    /** Lone leftovers that are too generic to stand alone as a trading name. */
    const GENERIC_LONE_WORDS = new Set([
        'welcome',
        'the',
        'store',
        'shop',
        'market',
        'restaurant',
        'kitchen',
        'house',
        'place',
    ]);
    /** True when leftover is a single generic word that is not a known chain brand. */
    function isGenericLoneWordLeftover(left) {
        const tokens = left.trim().split(/\s+/).filter(Boolean);
        if (tokens.length !== 1)
            return false;
        const word = stripDiacritics(tokens[0].replace(/[^A-Za-zÀ-ÿ]/g, '')).toLowerCase();
        if (!word)
            return false;
        if (applyChainBrandCleanup(tokens[0]))
            return false;
        if (PROTECTED_ALL_CAPS_BRANDS.has(word.toUpperCase()))
            return false;
        return GENERIC_LONE_WORDS.has(word);
    }
    function leftHasMeaningfulDisplayWord(left) {
        const words = left.trim().split(/\s+/).filter(Boolean);
        return words.some((word) => {
            const letters = word.replace(/[^A-Za-z]/g, '');
            if (letters.length < 3)
                return false;
            if (/^the$/i.test(letters))
                return false;
            return true;
        });
    }
    /** Flexible place body: "Lake View" also matches "Lakeview" (spaces ignored). */
    function flexiblePlaceBody(place) {
        const parts = place.trim().split(/\s+/).filter(Boolean).map(escapeRegExp);
        if (parts.length === 0)
            return '';
        if (parts.length === 1)
            return parts[0];
        return `(?:${parts.join('\\s+')}|${parts.join('')})`;
    }
    /**
     * Remove a whole-phrase place name (city or area).
     * Default: trailing only. With allowInternal: also mid-name (YO! kiosk), never when
     * owned by of/de or immediately before Style.
     */
    function stripWholePlacePhrase(name, place, options = {}) {
        const placeTrim = place.trim();
        if (!placeTrim)
            return name;
        const placeBody = flexiblePlaceBody(placeTrim);
        if (!placeBody)
            return name;
        const dir = PLACE_DIRECTION_PREFIXES.join('|');
        const prefix = options.absorbDirectionPrefix ? `(?:(?:${dir})\\s+)?` : '';
        const body = `${prefix}${placeBody}`;
        // Refuse when the place is owned by of / de immediately before it
        // ("Taste of Chicago", "Lambdens of Woburn"). Trailing "'s City" (Portillo's Chicago)
        // is a branch city suffix and may still be peeled.
        const ownedBy = new RegExp(`(?:\\bof|\\bde)\\s+${body}(?=\\s|$|[?!,.;:])`, 'i');
        if (ownedBy.test(name))
            return name;
        // Never strip "Chicago" when it comes before Style.
        if (new RegExp(`${body}\\s+Style\\b`, 'i').test(name))
            return name;
        const patterns = [
            new RegExp(`\\s*,\\s*${body}\\s*$`, 'i'),
            new RegExp(`\\s+-\\s*${body}\\s*$`, 'i'),
            new RegExp(`\\s+${body}\\s*$`, 'i'),
            // City stuck straight onto punctuation: "beef?Milton Keynes"
            new RegExp(`([?!,.;:])${body}\\s*$`, 'i'),
        ];
        if (options.allowInternal) {
            patterns.push(new RegExp(`([\\s,|]|\\s+-\\s+)${body}(?=\\s+[A-Za-z])`, 'i'));
        }
        for (const pattern of patterns) {
            if (!pattern.test(name))
                continue;
            const left = name
                .replace(pattern, (_match, lead) => {
                if (typeof lead === 'string' && /[?!,.;:]/.test(lead))
                    return lead;
                if (typeof lead === 'string' && /^\s*-\s*$/.test(lead))
                    return ' - ';
                return ' ';
            })
                .replace(/\s{2,}/g, ' ')
                .replace(/\s+-\s*$/g, '')
                .replace(/-\s*$/g, '')
                .replace(/^\s*-\s+/g, '')
                .trim();
            if (!left || left === name.trim())
                continue;
            if (!leftHasMeaningfulDisplayWord(left) && isGenericLoneWordLeftover(left)) {
                return name;
            }
            if (leftHasMeaningfulDisplayWord(left) || left.split(/\s+/).length > 1) {
                return stripDanglingNameConnectors(left);
            }
        }
        return name;
    }
    function stripTrailingCityPatterns(name, city) {
        if (!city.trim())
            return name.trim();
        let cleaned = name.trim();
        let previous = '';
        while (cleaned !== previous) {
            previous = cleaned;
            cleaned = stripWholePlacePhrase(cleaned, city, { absorbDirectionPrefix: true });
            const placeBody = flexiblePlaceBody(city.trim());
            // "City, IL" / "City IL" / trailing state after city peel.
            cleaned = cleaned.replace(new RegExp(`\\s*,\\s*${placeBody}\\s*,?\\s*IL\\s*$`, 'i'), '').trim();
            cleaned = cleaned.replace(new RegExp(`\\s+${placeBody}\\s*,?\\s*IL\\s*$`, 'i'), '').trim();
            cleaned = cleaned.replace(/\s+,?\s*IL\s*$/i, '').trim();
            cleaned = stripDanglingNameConnectors(cleaned);
        }
        return cleaned;
    }
    function stripTrailingOwnArea(name, area, city) {
        const areaTrim = area.trim();
        if (!areaTrim)
            return name;
        if (normalizeLocationPart(areaTrim) === normalizeLocationPart(city.trim()))
            return name;
        return stripWholePlacePhrase(name, areaTrim, { absorbDirectionPrefix: true });
    }
    /**
     * Drop trailing " UK", a trailing UK postcode district (e.g. MK1), and a stray
     * apostrophe only after Cafe/Café ("Cafe'" → "Cafe"). Keep Dunkin'/Cookin'.
     */
    function stripTrailingUkDistrictAndApostrophe(name) {
        let cleaned = name.trim();
        cleaned = cleaned.replace(/\s+UK\s*$/i, '').trim();
        cleaned = cleaned.replace(/\s+[A-Z]{1,2}\d[A-Z\d]?\s*$/i, '').trim();
        cleaned = cleaned.replace(/(Café|Cafe)['\u2019]+$/iu, '$1');
        return cleaned;
    }
    /** Inner text is only place words (The, area, city, Location, separators). */
    function isPlaceOnlyParenthetical(inner, city, area) {
        const cityNorm = normalizeLocationPart(city);
        const areaNorm = normalizeLocationPart(area);
        const tokens = normalizeLocationPart(inner)
            .split(/\s+/)
            .filter(Boolean)
            .filter((t) => t !== 'the' && t !== 'and' && t !== 'location');
        if (tokens.length === 0)
            return true;
        const allowed = new Set();
        if (cityNorm) {
            cityNorm.split(/\s+/).forEach((t) => allowed.add(t));
            allowed.add(cityNorm.replace(/\s+/g, ''));
        }
        if (areaNorm) {
            areaNorm.split(/\s+/).forEach((t) => allowed.add(t));
            allowed.add(areaNorm.replace(/\s+/g, ''));
        }
        PLACE_DIRECTION_PREFIXES.forEach((d) => allowed.add(d));
        return tokens.every((t) => allowed.has(t));
    }
    function stripRedundantTrailingParentheses(name, city, area) {
        // Never cut through unbalanced brackets.
        const opens = (name.match(/\(/g) || []).length;
        const closes = (name.match(/\)/g) || []).length;
        if (opens !== closes)
            return fixParenthesisSpacing(name);
        const match = name.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
        if (!match)
            return fixParenthesisSpacing(name);
        const base = match[1].trim();
        const inner = match[2].trim();
        if (!base)
            return fixParenthesisSpacing(name);
        if (/^previously\b/i.test(inner)) {
            return base;
        }
        if (isPlaceOnlyParenthetical(inner, city, area)) {
            return base;
        }
        const innerNorm = normalizeLocationPart(inner);
        const cityNorm = normalizeLocationPart(city);
        const areaNorm = normalizeLocationPart(area);
        if (cityNorm && innerNorm === cityNorm)
            return base;
        if (cityNorm && new RegExp(`^${escapeRegExp(cityNorm)}(?:\\s+[a-z]{2})?$`).test(innerNorm)) {
            return base;
        }
        if (areaNorm && innerNorm === areaNorm)
            return base;
        return fixParenthesisSpacing(name);
    }
    function isPreservedBranchSuffix(suffix) {
        const norm = normalizeLocationPart(suffix);
        if (!norm)
            return false;
        if (/\bm\d{1,2}\s+(north|south)\s+services\b/.test(norm))
            return true;
        if (/\b(drive thru|drive through)\b/.test(norm))
            return true;
        // Keep motorway-service / outlet direction identifiers in the title.
        if (/^(northbound|southbound|eastbound|westbound)$/.test(norm))
            return true;
        if (/\b(welcome\s+break|services)\b/.test(norm))
            return true;
        return false;
    }
    function isDirectionOrOutletRemainder(suffix) {
        const norm = normalizeLocationPart(suffix);
        if (!norm)
            return false;
        if (/^(north|south|east|west|northbound|southbound|eastbound|westbound)$/.test(norm)) {
            return true;
        }
        if (/\b(welcome\s+break|services|petrol\s+station|drive\s+thru|drive\s+through|kiosk)\b/.test(norm)) {
            return true;
        }
        return false;
    }
    function isDescriptiveOrLocationNameSuffix(suffix, city, area) {
        const norm = normalizeLocationPart(suffix);
        if (!norm)
            return true;
        const cityNorm = normalizeLocationPart(city);
        const areaNorm = normalizeLocationPart(area);
        if (cityNorm) {
            if (norm === cityNorm)
                return true;
            if (norm.endsWith(` ${cityNorm}`) || norm.startsWith(`${cityNorm} `) || norm.includes(` ${cityNorm} `)) {
                return true;
            }
            // "Gladstone Park Chicago, IL" — commas become spaces under normalize, so
            // also accept raw ", IL" / normalized "chicago il" tails.
            if (new RegExp(`\\b${escapeRegExp(cityNorm)}\\b`).test(norm)
                && (/,\s*[A-Za-z]{2}\s*$/.test(suffix.trim())
                    || new RegExp(`\\b${escapeRegExp(cityNorm)}\\s+[a-z]{2}$`).test(norm))) {
                return true;
            }
        }
        // Trailing area only when it genuinely duplicates the verified area (exact or
        // verified-area prefix). Never strip a short token merely because the area
        // starts with it (e.g. area "Newport Pagnell", suffix "Newport").
        if (areaNorm && (norm === areaNorm || norm.startsWith(`${areaNorm} `))) {
            return true;
        }
        if (/\bin\b/.test(norm) && cityNorm && norm.includes(cityNorm))
            return true;
        if (/\b(retail park|shopping (?:centre|center|park)|industrial estate|business park|outlet (?:mall|village|centre|center)|food court)\b/.test(norm)) {
            return true;
        }
        if (/\b(restaurant|takeaway|take away|eatery)\b/.test(norm)
            && /\b(halal|cuisine|indian|pakistani|pak|chinese|thai|italian|turkish|persian|lebanese|food)\b/.test(norm)) {
            return true;
        }
        if (/\b(halal\s+food|food\s+restaurant)\b/.test(norm))
            return true;
        // Cuisine-only taglines such as "Indian & SriLankan" (after normalize, & → space).
        if (/^(?:pak|pakistani|indian|chinese|thai|italian|turkish|persian|lebanese|sri\s*lankan|srilankan|asian|oriental|mexican|american)(?:\s+(?:and\s+)?(?:pak|pakistani|indian|chinese|thai|italian|turkish|persian|lebanese|sri\s*lankan|srilankan|asian|oriental|mexican|american))*$/.test(norm)) {
            return true;
        }
        return false;
    }
    /**
     * Short geographic branch token (e.g. Addison) — only removable when it matches
     * the venue's verified area so menu/specialty suffixes are preserved.
     */
    function isRemovableGeographicBranchSuffix(suffix, area) {
        const norm = normalizeLocationPart(suffix);
        const areaNorm = normalizeLocationPart(area);
        if (!norm || !areaNorm)
            return false;
        const words = norm.split(/\s+/).filter(Boolean);
        if (words.length < 1 || words.length > 3)
            return false;
        if (/\d/.test(norm))
            return false;
        if (/\b(restaurant|ltd|limited|llc|inc|corp|plc|market|supermarket|pizza|burger|coffee|shop|store|food|halal|cuisine|takeaway|cafe|cheesesteak|philly)\b/.test(norm)) {
            return false;
        }
        // Exact verified area (spaces ignored), or a longer suffix that begins with it.
        if (placesEqualFlex(suffix, area))
            return true;
        return norm.startsWith(`${areaNorm} `) || norm.replace(/\s+/g, '').startsWith(areaNorm.replace(/\s+/g, ''));
    }
    function isDroppableTailSegment(segment, city, area) {
        if (isCategoryDescriptorSegment(segment))
            return true;
        if (area.trim() && placesEqualFlex(segment, area))
            return true;
        if (city.trim() && placesEqualFlex(segment, city))
            return true;
        if (isDescriptiveOrLocationNameSuffix(segment, city, area))
            return true;
        const dirPlace = segment.match(new RegExp(`^(${PLACE_DIRECTION_PREFIXES.join('|')})\\s+(.+)$`, 'i'));
        if (dirPlace && area.trim() && placesEqualFlex(dirPlace[2], area))
            return true;
        return false;
    }
    function polishIndependentVenueName(original, city, area) {
        let cleaned = normalizeEnDashes(original.trim());
        // Collect the whole removed dash-tail (end → start) so we can restore it intact.
        const removedTailSegments = [];
        let removedBranchSuffix = null;
        const areaNorm = normalizeLocationPart(area);
        const areaEscaped = area.trim() ? escapeRegExp(area.trim()) : '';
        const cityNorm = normalizeLocationPart(city);
        cleaned = stripTrailingBusinessSuffixes(cleaned);
        cleaned = stripRedundantTrailingParentheses(cleaned, city, area);
        let previous = '';
        while (cleaned !== previous) {
            previous = cleaned;
            const split = splitLastNameSeparator(cleaned);
            if (!split)
                break;
            if (isPreservedBranchSuffix(split.right))
                break;
            // Compound place: "South Loop" when area is "Loop".
            const dirPlace = split.right.match(new RegExp(`^(${PLACE_DIRECTION_PREFIXES.join('|')})\\s+(.+)$`, 'i'));
            if (dirPlace && areaNorm && placesEqualFlex(dirPlace[2], area)) {
                removedTailSegments.unshift(split.right);
                cleaned = split.left;
                continue;
            }
            if (areaEscaped) {
                const areaThenRest = split.right.match(new RegExp(`^${areaEscaped}\\s+(.+)$`, 'i'));
                if (areaThenRest) {
                    const after = areaThenRest[1].trim();
                    const afterFirst = after.split(/\s+/)[0] || '';
                    if (isDirectionOrOutletRemainder(afterFirst) || /\bwelcome\s+break\b/i.test(after)) {
                        cleaned = `${split.left} ${after}`.replace(/\s{2,}/g, ' ').trim();
                        continue;
                    }
                }
                const dirThenArea = split.right.match(new RegExp(`^(${PLACE_DIRECTION_PREFIXES.join('|')})\\s+${areaEscaped}$`, 'i'));
                if (dirThenArea) {
                    removedTailSegments.unshift(split.right);
                    cleaned = split.left;
                    continue;
                }
            }
            if (isRemovableGeographicBranchSuffix(split.right, area)) {
                removedTailSegments.unshift(split.right);
                removedBranchSuffix = split.right;
                cleaned = split.left;
                continue;
            }
            if (isDescriptiveOrLocationNameSuffix(split.right, city, area)) {
                removedTailSegments.unshift(split.right);
                cleaned = split.left;
                continue;
            }
            // Distinct branch / descriptor segment — collect full tail; decide restore later.
            if (areaNorm && !placesEqualFlex(split.right, area)) {
                removedTailSegments.unshift(split.right);
                cleaned = split.left;
                continue;
            }
            break;
        }
        const leftHadCity = Boolean(cityNorm && normalizeLocationPart(cleaned).includes(cityNorm));
        cleaned = stripTrailingOwnArea(cleaned, area, city);
        cleaned = stripTrailingCityPatterns(cleaned, city);
        cleaned = stripTrailingOwnArea(cleaned, area, city);
        cleaned = stripTrailingCityPatterns(cleaned, city);
        // YO! kiosk only: drop mid-name city + area ("YO! Milton Keynes Kingston Tesco Kiosk").
        if (/^YO!/i.test(cleaned)) {
            cleaned = stripWholePlacePhrase(cleaned, city, { allowInternal: true });
            if (area.trim() && areaNorm !== cityNorm) {
                cleaned = stripWholePlacePhrase(cleaned, area, {
                    absorbDirectionPrefix: true,
                    allowInternal: true,
                });
            }
        }
        cleaned = collapseDescriptorDashChain(cleaned);
        cleaned = stripTrailingBusinessSuffixes(cleaned);
        cleaned = stripTrailingUkDistrictAndApostrophe(cleaned);
        cleaned = stripRedundantTrailingParentheses(cleaned, city, area);
        cleaned = stripDanglingNameConnectors(cleaned);
        cleaned = stripTrailingUkDistrictAndApostrophe(cleaned);
        cleaned = fixParenthesisSpacing(cleaned);
        cleaned = normalizeEnDashes(cleaned);
        if (cleaned && isGenericLoneWordLeftover(cleaned)) {
            return { name: original.trim(), removedBranchSuffix: null };
        }
        // Descriptor / area / city tails: drop all. Otherwise restore the full original tail.
        if (removedTailSegments.length > 0) {
            const allDroppable = removedTailSegments.every((seg) => isDroppableTailSegment(seg, city, area));
            if (allDroppable) {
                removedBranchSuffix = null;
            }
            else {
                const fullTail = removedTailSegments.join(' - ');
                if (!new RegExp(`\\b${escapeRegExp(removedTailSegments[removedTailSegments.length - 1])}\\s*$`, 'i').test(cleaned)) {
                    cleaned = normalizeEnDashes(`${cleaned} - ${fullTail}`);
                }
                // Portillo's-style: city peeled from left, single non-droppable branch kept in title.
                removedBranchSuffix = null;
                return { name: cleaned, removedBranchSuffix: null };
            }
        }
        // "Portillo's Chicago - Addison" when Addison was the only removable area-branch.
        if (removedBranchSuffix && cleaned && leftHadCity) {
            if (!new RegExp(`\\b${escapeRegExp(removedBranchSuffix)}\\s*$`, 'i').test(cleaned)) {
                cleaned = normalizeEnDashes(`${cleaned} - ${removedBranchSuffix}`);
            }
            return { name: cleaned, removedBranchSuffix: null };
        }
        return {
            name: cleaned || original.trim(),
            removedBranchSuffix,
        };
    }
    /** Base display name without peer-collision branch restoration. */
    function computeBaseDisplayName(venue, selectedArea) {
        var _a;
        const city = selectedArea.trim();
        const original = venue.name.trim();
        const area = ((_a = venue.area) !== null && _a !== void 0 ? _a : '').trim();
        if (venue.admin_edited_at && String(venue.admin_edited_at).trim()) {
            return { name: original, removedBranchSuffix: null };
        }
        const asda = applyAsdaDisplayName(original, venue.branch);
        if (asda)
            return { name: asda, removedBranchSuffix: null };
        const brand = applyChainBrandCleanup(original, city, area);
        if (brand)
            return { name: brand, removedBranchSuffix: null };
        const polished = polishIndependentVenueName(original, city, area);
        return {
            name: applyDisplayCasing(polished.name || original),
            removedBranchSuffix: polished.removedBranchSuffix,
        };
    }
    // Venue arrays are replaced on refresh (App state / useMemo), never mutated in place.
    // WeakMap keys the array identity so a replaced list always rebuilds a fresh index.
    const cityDisplayIndexCache = new WeakMap();
    // Peer lists change the display name only when buildCityDisplayIndex restores a
    // removed branch suffix. The base name, compact area and collision key do not
    // depend on other venues, so they can be reused across replacement arrays.
    const VENUE_CALC_MEMO_LIMIT = 25000;
    const venueCalcMemo = new Map();
    function venueCalcMemoKey(venue, selectedArea) {
        var _a, _b, _c, _d, _e, _f, _g;
        return [
            selectedArea.trim(),
            venueIndexKey(venue),
            ((_a = venue.name) !== null && _a !== void 0 ? _a : '').trim(),
            ((_b = venue.area) !== null && _b !== void 0 ? _b : '').trim(),
            ((_c = venue.zone) !== null && _c !== void 0 ? _c : '').trim(),
            ((_d = venue.city) !== null && _d !== void 0 ? _d : '').trim(),
            ((_e = venue.branch) !== null && _e !== void 0 ? _e : '').trim(),
            ((_f = venue.address) !== null && _f !== void 0 ? _f : '').trim(),
            ((_g = venue.postcode) !== null && _g !== void 0 ? _g : '').trim(),
            venue.admin_edited_at ? String(venue.admin_edited_at).trim() : '',
        ].join('\0');
    }
    function getVenueCalc(venue, selectedArea) {
        const key = venueCalcMemoKey(venue, selectedArea);
        const cached = venueCalcMemo.get(key);
        if (cached)
            return cached;
        if (venueCalcMemo.size >= VENUE_CALC_MEMO_LIMIT) {
            venueCalcMemo.clear();
        }
        const base = computeBaseDisplayName(venue, selectedArea);
        // Store before the compact-area label: that label reads the display name,
        // which must hit this entry instead of calculating it again.
        const entry = {
            baseName: base.name,
            removedBranchSuffix: base.removedBranchSuffix,
            compactArea: '',
            collisionAreaKey: '',
            nameNorm: normalizeVenueNameForDup(base.name),
            compactAreaNorm: '',
            ready: false,
        };
        venueCalcMemo.set(key, entry);
        entry.compactArea = getVenueCompactAreaLabel(venue, selectedArea);
        entry.compactAreaNorm = normalizeLocationPart(entry.compactArea);
        entry.collisionAreaKey = getDisplayCollisionAreaKey(venue, selectedArea);
        entry.ready = true;
        return entry;
    }
    function venueIndexKey(venue) {
        const id = typeof venue.id === 'string' ? venue.id.trim() : '';
        return id || '';
    }
    function buildCityDisplayIndex(cityVenues, selectedArea) {
        const displayNameById = new Map();
        const displayNameByVenue = new WeakMap();
        const collisionAreasByPolishedNorm = new Map();
        const peersByDisplayAndArea = new Map();
        // Pass 1: base names (no recursive peer scans). Memoized per venue, so a
        // replacement array of known venues only looks up and groups.
        const rows = cityVenues.map((venue) => {
            const calc = getVenueCalc(venue, selectedArea);
            return {
                venue,
                baseName: calc.baseName,
                removedBranchSuffix: calc.removedBranchSuffix,
                collisionAreaKey: calc.collisionAreaKey,
                compactArea: calc.compactArea,
            };
        });
        // Pass 2: group polished norms → collision area keys.
        const rowNorms = rows.map((row) => getVenueCalc(row.venue, selectedArea).nameNorm);
        for (let i = 0; i < rows.length; i += 1) {
            const polishedNorm = rowNorms[i];
            if (!polishedNorm)
                continue;
            let areas = collisionAreasByPolishedNorm.get(polishedNorm);
            if (!areas) {
                areas = new Set();
                collisionAreasByPolishedNorm.set(polishedNorm, areas);
            }
            areas.add(rows[i].collisionAreaKey);
        }
        // Count polished+collisionArea occurrences to detect genuine collisions.
        const collisionCounts = new Map();
        for (let i = 0; i < rows.length; i += 1) {
            const key = `${rowNorms[i]}\0${rows[i].collisionAreaKey}`;
            collisionCounts.set(key, (collisionCounts.get(key) || 0) + 1);
        }
        // Pass 3: restore branch only when peers collide under same polished name + area key.
        const finalNames = rows.map((row, i) => {
            let name = row.baseName;
            if (row.removedBranchSuffix) {
                const key = `${rowNorms[i]}\0${row.collisionAreaKey}`;
                if ((collisionCounts.get(key) || 0) > 1) {
                    name = applyDisplayCasing(stripDanglingNameConnectors(`${row.baseName} - ${row.removedBranchSuffix}`));
                }
            }
            return name;
        });
        // Pass 4: store display names + peer groups for Home labels.
        for (let i = 0; i < rows.length; i += 1) {
            const row = rows[i];
            const name = finalNames[i];
            const id = venueIndexKey(row.venue);
            if (id)
                displayNameById.set(id, name);
            displayNameByVenue.set(row.venue, name);
            const nameNorm = name === row.baseName ? rowNorms[i] : normalizeVenueNameForDup(name);
            const peerKey = `${nameNorm}\0${getVenueCalc(row.venue, selectedArea).compactAreaNorm}`;
            let peers = peersByDisplayAndArea.get(peerKey);
            if (!peers) {
                peers = [];
                peersByDisplayAndArea.set(peerKey, peers);
            }
            peers.push(row.venue);
        }
        return {
            displayNameById,
            displayNameByVenue,
            collisionAreasByPolishedNorm,
            peersByDisplayAndArea,
        };
    }
    function getCityDisplayIndex(cityVenues, selectedArea) {
        let byArea = cityDisplayIndexCache.get(cityVenues);
        if (!byArea) {
            byArea = new Map();
            cityDisplayIndexCache.set(cityVenues, byArea);
        }
        const areaKey = selectedArea.trim();
        let index = byArea.get(areaKey);
        if (!index) {
            index = buildCityDisplayIndex(cityVenues, areaKey);
            byArea.set(areaKey, index);
        }
        return index;
    }
    function lookupIndexedDisplayName(index, venue) {
        const id = venueIndexKey(venue);
        if (id && index.displayNameById.has(id)) {
            return index.displayNameById.get(id);
        }
        return index.displayNameByVenue.get(venue);
    }
    function getVenueDisplayName(venue, selectedArea, cityVenues = []) {
        const calc = getVenueCalc(venue, selectedArea);
        // The current peer list changes a display name only when this venue's own
        // polish removed a branch suffix and another venue in that list collides.
        // Every other name is venue-specific, so skip the city index.
        if (!calc.ready || !calc.removedBranchSuffix || cityVenues.length === 0) {
            return calc.baseName;
        }
        const index = getCityDisplayIndex(cityVenues, selectedArea);
        const indexed = lookupIndexedDisplayName(index, venue);
        if (indexed !== undefined)
            return indexed;
        return calc.baseName;
    }
    function extractPostcode(value) {
        const text = value.trim().replace(/\s+/g, ' ');
        const match = text.match(/\b([A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2})\b/i);
        return match ? match[1].toUpperCase().replace(/\s+/g, ' ') : '';
    }
    /**
     * US ZIP from a stored address only when it follows a two-letter state abbreviation
     * at the end (e.g. "IL 60622" / "IL 60622-1234"). Never treats a leading house
     * number such as "10900 South Doty Avenue" as a ZIP.
     */
    function extractUsZipFromAddress(address) {
        const text = address.trim().replace(/\s+/g, ' ');
        const match = text.match(/\b[A-Z]{2}\s+(\d{5}(?:-\d{4})?)\s*$/i);
        return match ? match[1] : '';
    }
    function normalizeStoredUsZip(value) {
        const compact = value.trim().replace(/\s+/g, '');
        const match = compact.match(/^(\d{5})(?:-(\d{4}))?$/);
        if (!match)
            return '';
        return match[2] ? `${match[1]}-${match[2]}` : match[1];
    }
    function getDisplayPostcode(venue, address) {
        var _a;
        const explicit = ((_a = venue.postcode) !== null && _a !== void 0 ? _a : '').trim();
        if (explicit) {
            if (isUsZipLike(explicit)) {
                return normalizeStoredUsZip(explicit);
            }
            return explicit.toUpperCase().replace(/\s+/g, ' ');
        }
        const uk = extractPostcode(address);
        if (uk)
            return uk;
        return extractUsZipFromAddress(address);
    }
    function isRedundantAddressSegment(segment, cityNorms) {
        const norm = normalizeLocationPart(segment);
        if (!norm)
            return true;
        if (norm === 'uk' || norm === 'united kingdom' || norm === 'gb' || norm === 'great britain')
            return true;
        // Only remove when the WHOLE segment equals a city — never when the city
        // is part of a longer name like "Leeds Rd".
        return cityNorms.includes(norm);
    }
    function splitAddressSegments(address) {
        return address
            .split(',')
            .map((segment) => segment.trim())
            .filter((segment) => segment.length > 0);
    }
    function isCompanyIdentificationSegment(segment) {
        const norm = normalizeLocationPart(segment);
        if (!norm)
            return true;
        if (/\b(ltd|limited|plc|inc|llc)\b/.test(norm))
            return true;
        if (/\b(stores?|store)\s+(ltd|limited)\b/.test(norm))
            return true;
        // Chain + city + supercentre/superstore company lines (not geographical areas).
        if (/\b(asda|tesco|morrisons|sainsburys|sainsbury)\b/.test(norm)
            && /\b(supercentre|supercenter|superstore|supermarket)\b/.test(norm)) {
            return true;
        }
        return false;
    }
    function isBusinessNameAddressSegment(segment, venue, selectedArea) {
        var _a, _b;
        const segNorm = normalizeLocationPart(segment);
        if (!segNorm)
            return true;
        if (isCompanyIdentificationSegment(segment))
            return true;
        const displayNorm = normalizeLocationPart(getVenueDisplayName(venue, selectedArea));
        const rawNorm = normalizeLocationPart(((_a = venue.name) !== null && _a !== void 0 ? _a : '').trim());
        if (displayNorm && segNorm === displayNorm)
            return true;
        if (rawNorm && segNorm === rawNorm)
            return true;
        // Brand-only alias as its own address component (e.g. "Costa" for Costa Coffee).
        // Precise whole-segment match only — never strip geographical names that merely
        // share a word with the venue (Broughton, Woburn Sands, …).
        const brand = applyChainBrandCleanup(((_b = venue.name) !== null && _b !== void 0 ? _b : '').trim(), selectedArea);
        if (brand) {
            const brandNorm = normalizeLocationPart(brand);
            if (segNorm === brandNorm)
                return true;
            const brandCore = brandNorm.split(' ')[0];
            if (brandCore && brandCore.length >= 4 && segNorm === brandCore)
                return true;
        }
        return false;
    }
    function removeBusinessNameAddressSegments(segments, venue, selectedArea) {
        return segments.filter((segment) => !isBusinessNameAddressSegment(segment, venue, selectedArea));
    }
    function removeRedundantAddressSegments(address, venue, selectedArea) {
        var _a;
        if (!address)
            return '';
        const cityNorms = uniqueLocationParts([(_a = venue.city) !== null && _a !== void 0 ? _a : '', selectedArea])
            .map((c) => normalizeLocationPart(c))
            .filter(Boolean);
        const kept = removeBusinessNameAddressSegments(splitAddressSegments(address), venue, selectedArea).filter((segment) => !isRedundantAddressSegment(segment, cityNorms));
        return kept.join(', ').replace(/[\s,•/-]+$/g, '').replace(/\s{2,}/g, ' ').trim();
    }
    function isUntrustworthyNeighbourhoodToken(value) {
        const norm = normalizeLocationPart(value);
        if (!norm)
            return true;
        // Junk fragments such as "& F" collapse to a single letter after normalisation.
        if (norm.length <= 2)
            return true;
        if (norm === 'lounge' || norm === 'level' || /^level\s*\d+[a-z]?$/.test(norm))
            return true;
        if (/\b(airport|departure|departures|arrival|arrivals|terminal|concourse|airside)\b/.test(norm)) {
            return true;
        }
        if (/\b(shopping centre|shopping center|retail park|industrial estate|business park|outlet centre|outlet center)\b/.test(norm)) {
            return true;
        }
        // Centre:mk / similar mall labels are not neighbourhoods.
        if (norm === 'centremk' || /^centre\s*mk$/.test(norm) || norm.includes('centre mk')) {
            return true;
        }
        return false;
    }
    function isGenericAreaValue(value, venue, selectedArea) {
        var _a, _b;
        const trimmed = value.trim();
        if (!trimmed)
            return true;
        if (isPostalCodeLike(trimmed))
            return true;
        if (isUntrustworthyNeighbourhoodToken(trimmed))
            return true;
        const norm = normalizeLocationPart(trimmed);
        if (!norm)
            return true;
        if (normalizeLocationPart(selectedArea) === norm)
            return true;
        if (normalizeLocationPart(((_a = venue.city) !== null && _a !== void 0 ? _a : '').trim()) === norm)
            return true;
        if (normalizeLocationPart(getVenueDisplayName(venue, selectedArea)) === norm)
            return true;
        if (normalizeLocationPart(((_b = venue.name) !== null && _b !== void 0 ? _b : '').trim()) === norm)
            return true;
        return false;
    }
    function pickSpecificAreaOrZone(venue, selectedArea) {
        for (const candidate of [venue.area, venue.zone]) {
            const value = (candidate !== null && candidate !== void 0 ? candidate : '').trim();
            if (!value || isGenericAreaValue(value, venue, selectedArea))
                continue;
            return value;
        }
        return '';
    }
    /** Display-only Home/list label: Central Milton Keynes → Central MK. Never mutates stored data. */
    function formatHomeAreaForDisplay(area) {
        const trimmed = area.trim();
        if (!trimmed)
            return '';
        if (normalizeLocationPart(trimmed) === 'central milton keynes')
            return 'Central MK';
        return trimmed;
    }
    const ROAD_LAST_WORD_KEYWORDS = [
        'road',
        'rd',
        'street',
        'st',
        'avenue',
        'ave',
        'lane',
        'ln',
        'drive',
        'dr',
        'way',
        'wy',
        'close',
        'cl',
        'court',
        'ct',
        'place',
        'pl',
        'square',
        'sq',
        'terrace',
        'crescent',
        'cres',
        'walk',
        'row',
        'parade',
        'mews',
        'parkway',
        'pkwy',
        'highway',
        'gardens',
        'grove',
        'hill',
        'circle',
        'cir',
        'boulevard',
        'blvd',
        'circus',
        'gate',
        'arcade',
        // Single-token UK ways where the road-type is fused into the name.
        'portway',
        'queensway',
        'groveway',
        'broadway',
    ];
    // Development-site phrases are never standalone street signals. Genuine streets
    // inside those developments are still recognised via normal road-type keywords.
    const DEVELOPMENT_SITE_PHRASES = [
        'retail park',
        'industrial estate',
        'business park',
        'shopping centre',
        'shopping center',
    ];
    const COMPASS_WORDS = new Set([
        'n',
        's',
        'e',
        'w',
        'north',
        'south',
        'east',
        'west',
        'ne',
        'nw',
        'se',
        'sw',
    ]);
    /** Display-only UK road-type expansions. Never mutates stored addresses. */
    const UK_STREET_ABBREVIATIONS = {
        rd: 'Road',
        st: 'Street',
        ave: 'Avenue',
        ln: 'Lane',
        dr: 'Drive',
        wy: 'Way',
        cl: 'Close',
        ct: 'Court',
        pl: 'Place',
        sq: 'Square',
        cres: 'Crescent',
        blvd: 'Boulevard',
        cir: 'Circle',
        pkwy: 'Parkway',
        hwy: 'Highway',
    };
    // Unit / suite / kiosk identifiers: Unit 5, U12, U1C, Suite 3, Ste 14/15, Space 2, Store 1-3, Shop 4, Kiosk A.
    // Bare "U" must be followed by a digit so Underwood / University are never stripped.
    const UNIT_IDENTIFIER_PATTERN = /^(?:(?:unit|suite|ste|space|store|shop|kiosk)\s+[a-z0-9]+(?:\s*[/-]\s*[a-z0-9]+)*|u\s*\d[a-z0-9]*(?:\s*[/-]\s*[a-z0-9]+)*)\b/i;
    function isChicagoContext(selectedArea, city) {
        return (normalizeLocationPart(selectedArea) === 'chicago'
            || normalizeLocationPart((city !== null && city !== void 0 ? city : '').trim()) === 'chicago');
    }
    function isMiltonKeynesContext(selectedArea, city) {
        return (normalizeLocationPart(selectedArea) === 'milton keynes'
            || normalizeLocationPart((city !== null && city !== void 0 ? city : '').trim()) === 'milton keynes');
    }
    function sanitizeStreetSegment(segment) {
        return segment
            .trim()
            // Drop unmatched wrappers from messy geocoder fragments such as
            // "Unit H1 (Treat Street" / "Stadium Way W)".
            .replace(/^[(\[{]+/, '')
            .replace(/[)\]}.,;:]+$/g, '')
            .trim();
    }
    function stripLeadingUnitIdentifier(value) {
        const cleaned = sanitizeStreetSegment(value);
        if (!cleaned)
            return '';
        return sanitizeStreetSegment(cleaned.replace(UNIT_IDENTIFIER_PATTERN, '').trim());
    }
    function isUnitOnlySegment(segment) {
        const cleaned = sanitizeStreetSegment(segment);
        if (!cleaned)
            return true;
        if (!UNIT_IDENTIFIER_PATTERN.test(cleaned))
            return false;
        return stripLeadingUnitIdentifier(cleaned) === '';
    }
    function isLevelOnlySegment(segment) {
        const norm = normalizeLocationPart(segment);
        return norm === 'level' || /^level\s*\d+[a-z]?$/.test(norm);
    }
    function isNumericIndexSegment(segment) {
        const raw = segment.trim();
        if (!raw)
            return true;
        // "1", "2", "1A", "12B"
        if (/^\d+[A-Za-z]?$/.test(raw))
            return true;
        // "14/15", "14 / 15", "14-15"
        if (/^\d+[A-Za-z]?(?:\s*[/-]\s*\d+[A-Za-z]?)+$/.test(raw))
            return true;
        const norm = normalizeLocationPart(raw);
        if (/^\d+[a-z]?$/.test(norm))
            return true;
        // slash/hyphen numbers become "14 15" after normalisation
        if (/^\d+[a-z]?(?:\s+\d+[a-z]?)+$/.test(norm))
            return true;
        return false;
    }
    /** Strip MK grid-road prefixes (H1–H10, V1–V11) from displayed streets only. */
    function stripMkGridRoadPrefix(streetName, selectedArea, city) {
        if (!streetName)
            return '';
        if (isChicagoContext(selectedArea, city))
            return streetName;
        if (!isMiltonKeynesContext(selectedArea, city))
            return streetName;
        return sanitizeStreetSegment(streetName.replace(/^(?:H(?:10|[1-9])|V(?:1[01]|[1-9]))\b[\s,]*/i, ''));
    }
    /**
     * Expand only the final road-type word (or the word immediately before a
     * trailing compass direction). Leading "St" meaning Saint is never expanded.
     * Display-only — never mutates stored addresses.
     */
    function expandUkStreetAbbreviations(streetName) {
        const words = streetName.split(/\s+/).filter(Boolean);
        if (!words.length)
            return streetName;
        let targetIndex = words.length - 1;
        const lastBare = words[targetIndex].replace(/\.+$/g, '').toLowerCase();
        if (COMPASS_WORDS.has(lastBare) && targetIndex > 0) {
            targetIndex -= 1;
        }
        return words
            .map((word, index) => {
            if (index !== targetIndex)
                return word;
            const bare = word.replace(/\.+$/g, '');
            const expanded = UK_STREET_ABBREVIATIONS[bare.toLowerCase()];
            return expanded || word;
        })
            .join(' ');
    }
    function isDevelopmentSiteLabel(value) {
        const norm = normalizeLocationPart(value);
        if (!norm)
            return false;
        return DEVELOPMENT_SITE_PHRASES.some((phrase) => norm.includes(phrase));
    }
    function normalizeStreetDisplayCasing(streetName) {
        const words = streetName.split(/\s+/).filter(Boolean);
        if (!words.length)
            return streetName;
        const alpha = words.filter((w) => /[a-zA-Z]/.test(w));
        if (!alpha.length)
            return streetName;
        const allCaps = alpha.every((w) => w === w.toUpperCase());
        if (!allCaps)
            return streetName;
        return words
            .map((word) => {
            const lower = word.toLowerCase();
            // Preserve single-letter / short compass markers (N, S, E, W, NE…).
            if (COMPASS_WORDS.has(lower) && word.length <= 2)
                return word.toUpperCase();
            if (!/^[a-zA-Z]/.test(word))
                return word;
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
            .join(' ');
    }
    /** Display-only street polish: MK grid strip, UK abbrev expand, ALL-CAPS title case. */
    function formatHomeStreetForDisplay(streetName, selectedArea, city) {
        let value = stripMkGridRoadPrefix(streetName, selectedArea, city);
        if (!value)
            return '';
        if (!isChicagoContext(selectedArea, city)) {
            value = expandUkStreetAbbreviations(value);
        }
        return normalizeStreetDisplayCasing(value);
    }
    function toHomeStreetName(segment) {
        const cleaned = sanitizeStreetSegment(segment);
        const withoutUnit = stripLeadingUnitIdentifier(cleaned) || cleaned;
        // If the whole segment was a unit identifier, do not treat the unit id as a street.
        if (isUnitOnlySegment(cleaned))
            return '';
        const withoutNumber = withoutUnit
            .replace(/^\d+[a-zA-Z]?(?:\s*[/-]\s*\d+[a-zA-Z]?)*\s+/, '')
            .trim();
        return sanitizeStreetSegment(withoutNumber || withoutUnit);
    }
    function extractBuildingNumber(segment) {
        const cleaned = sanitizeStreetSegment(segment);
        const withoutUnit = stripLeadingUnitIdentifier(cleaned) || cleaned;
        if (isUnitOnlySegment(cleaned))
            return '';
        const match = withoutUnit.match(/^(\d+[a-zA-Z]?(?:\s*[/-]\s*\d+[a-zA-Z]?)*)\s+\S/);
        return match ? match[1].replace(/\s+/g, '') : '';
    }
    function streetKeywordTailWord(norm) {
        const words = norm.split(' ').filter(Boolean);
        if (!words.length)
            return '';
        let index = words.length - 1;
        if (COMPASS_WORDS.has(words[index]) && index > 0) {
            index -= 1;
        }
        return words[index];
    }
    function segmentHasStreetKeyword(segment) {
        const norm = normalizeLocationPart(sanitizeStreetSegment(segment));
        if (!norm)
            return false;
        // Development sites are never street signals by themselves.
        if (isDevelopmentSiteLabel(norm))
            return false;
        return ROAD_LAST_WORD_KEYWORDS.includes(streetKeywordTailWord(norm));
    }
    function looksLikeChicagoNumberedStreetName(streetName) {
        const words = normalizeLocationPart(streetName).split(' ').filter(Boolean);
        const meaningful = words.filter((word) => !COMPASS_WORDS.has(word));
        // Bare ordinals such as "35th" / "E 35th" without a road type are not used as MK-style fallbacks.
        return meaningful.length > 0 && meaningful.every((word) => /^\d+(st|nd|rd|th)$/.test(word));
    }
    function isNumberedNamelessStreetSegment(segment) {
        const cleaned = sanitizeStreetSegment(segment);
        // Credible house number + street name, even without a conventional road suffix.
        if (!/^\d+[a-zA-Z]?(?:\s*[/-]\s*\d+[a-zA-Z]?)*\s+[A-Za-z]/.test(cleaned))
            return false;
        if (isUnitOnlySegment(cleaned) || isLevelOnlySegment(cleaned))
            return false;
        if (isCompanyIdentificationSegment(cleaned))
            return false;
        if (isUntrustworthyNeighbourhoodToken(cleaned))
            return false;
        if (isDevelopmentSiteLabel(cleaned))
            return false;
        const streetName = toHomeStreetName(cleaned);
        if (!streetName)
            return false;
        if (isUnitOnlySegment(streetName) || isLevelOnlySegment(streetName))
            return false;
        if (isUntrustworthyNeighbourhoodToken(streetName))
            return false;
        if (isCompanyIdentificationSegment(streetName))
            return false;
        if (isDevelopmentSiteLabel(streetName))
            return false;
        if (looksLikeChicagoNumberedStreetName(streetName))
            return false;
        const words = normalizeLocationPart(streetName).split(' ').filter(Boolean);
        const meaningful = words.filter((word) => !COMPASS_WORDS.has(word));
        return meaningful.length >= 1;
    }
    function pickHomeStreetParts(segments, venue, selectedArea) {
        let numberedBusinessNameFallback = null;
        for (const rawSegment of segments) {
            const segment = sanitizeStreetSegment(rawSegment);
            if (!segment)
                continue;
            if (isUnitOnlySegment(segment) || isLevelOnlySegment(segment) || isNumericIndexSegment(segment)) {
                continue;
            }
            if (isCompanyIdentificationSegment(segment))
                continue;
            const streetName = toHomeStreetName(segment);
            if (!streetName || isUnitOnlySegment(streetName) || isNumericIndexSegment(streetName))
                continue;
            if (isUntrustworthyNeighbourhoodToken(streetName))
                continue;
            if (isCompanyIdentificationSegment(streetName))
                continue;
            // Never treat retail/business parks or shopping centres as the Home street.
            if (isDevelopmentSiteLabel(streetName) || isDevelopmentSiteLabel(segment))
                continue;
            const hasKeyword = segmentHasStreetKeyword(streetName) || segmentHasStreetKeyword(segment);
            const numberedNameless = isNumberedNamelessStreetSegment(segment);
            if (!hasKeyword && !numberedNameless)
                continue;
            const buildingNumber = extractBuildingNumber(segment);
            const displayStreet = selectedArea !== undefined
                ? formatHomeStreetForDisplay(streetName, selectedArea, venue === null || venue === void 0 ? void 0 : venue.city)
                : streetName;
            if (!displayStreet)
                continue;
            // Never surface a bare street that is just the venue/brand name. Prefer a
            // later genuine street; if none exists, keep a numbered form as fallback.
            if (venue
                && selectedArea !== undefined
                && (isBusinessNameAddressSegment(streetName, venue, selectedArea)
                    || isBusinessNameAddressSegment(displayStreet, venue, selectedArea))) {
                if (buildingNumber && !numberedBusinessNameFallback) {
                    numberedBusinessNameFallback = { streetName: displayStreet, buildingNumber };
                }
                continue;
            }
            return {
                streetName: displayStreet,
                buildingNumber,
            };
        }
        return numberedBusinessNameFallback || { streetName: '', buildingNumber: '' };
    }
    function pickHomeStreetSegment(segments, venue, selectedArea) {
        const parts = pickHomeStreetParts(segments, venue, selectedArea);
        if (!parts.streetName)
            return '';
        if (venue
            && selectedArea !== undefined
            && isBusinessNameAddressSegment(parts.streetName, venue, selectedArea)
            && parts.buildingNumber) {
            return `${parts.buildingNumber} ${parts.streetName}`;
        }
        return parts.streetName;
    }
    function deriveLocalSegments(venue, selectedArea, postcode) {
        var _a, _b;
        const rawAddress = ((_a = venue.address) !== null && _a !== void 0 ? _a : '').trim();
        const cityNorms = uniqueLocationParts([(_b = venue.city) !== null && _b !== void 0 ? _b : '', selectedArea])
            .map((c) => normalizeLocationPart(c))
            .filter(Boolean);
        const addressWithoutPostcode = stripPostcodeFromAddress(rawAddress, postcode);
        return removeBusinessNameAddressSegments(splitAddressSegments(addressWithoutPostcode), venue, selectedArea).filter((segment) => !isRedundantAddressSegment(segment, cityNorms));
    }
    function getVenueCompactAreaLabel(venue, selectedArea) {
        var _a;
        // Home cards: genuine stored neighbourhood only, else clean street name.
        // Never invent locality from address fragments, and never show postcodes/ZIPs.
        const specificArea = pickSpecificAreaOrZone(venue, selectedArea);
        if (specificArea) {
            return trimLeadingSeparators(formatHomeAreaForDisplay(specificArea));
        }
        const rawAddress = ((_a = venue.address) !== null && _a !== void 0 ? _a : '').trim();
        const postcode = getDisplayPostcode(venue, rawAddress);
        const segments = deriveLocalSegments(venue, selectedArea, postcode);
        const street = pickHomeStreetSegment(segments, venue, selectedArea);
        if (street) {
            return trimLeadingSeparators(street);
        }
        return '';
    }
    function normalizeVenueNameForDup(name) {
        return name
            .toLowerCase()
            .replace(/[’']/g, '')
            .replace(/[^a-z0-9]+/g, ' ')
            .trim();
    }
    function getHomeStreetPartsForVenue(venue, selectedArea) {
        var _a;
        const rawAddress = ((_a = venue.address) !== null && _a !== void 0 ? _a : '').trim();
        const postcode = getDisplayPostcode(venue, rawAddress);
        return pickHomeStreetParts(deriveLocalSegments(venue, selectedArea, postcode), venue, selectedArea);
    }
    /**
     * Home Screen location subtitle.
     * `cityVenues` must be the complete active venue dataset for the selected city
     * (not the filtered/visible list) so duplicate branch labels stay stable across filters.
     */
    function getVenueHomeLocationLabel(venue, cityVenues, selectedArea) {
        const base = getVenueCalc(venue, selectedArea).compactArea;
        const displayName = getVenueDisplayName(venue, selectedArea, cityVenues);
        const nameNorm = normalizeVenueNameForDup(displayName);
        const baseNorm = normalizeLocationPart(base);
        let peers = [];
        if (cityVenues.length > 0) {
            const index = getCityDisplayIndex(cityVenues, selectedArea);
            const peerKey = `${nameNorm}\0${baseNorm}`;
            const group = index.peersByDisplayAndArea.get(peerKey) || [];
            peers = group.filter((other) => !isSameVenue(other, venue));
        }
        if (peers.length === 0)
            return base;
        const mine = getHomeStreetPartsForVenue(venue, selectedArea);
        if (!mine.streetName) {
            // No trustworthy street — omit invented clues (never postcode/ZIP).
            return base;
        }
        const streetNorm = normalizeLocationPart(mine.streetName);
        const peersShareStreet = peers.some((other) => {
            const otherStreet = getHomeStreetPartsForVenue(other, selectedArea).streetName;
            return Boolean(otherStreet) && normalizeLocationPart(otherStreet) === streetNorm;
        });
        // Base is already the street (no trustworthy area): escalate to building number only.
        if (base && streetNorm === baseNorm) {
            if (peersShareStreet && mine.buildingNumber) {
                return trimLeadingSeparators(`${mine.buildingNumber} ${mine.streetName}`);
            }
            return base;
        }
        if (peersShareStreet && mine.buildingNumber) {
            const withNumber = `${mine.buildingNumber} ${mine.streetName}`;
            if (!base)
                return trimLeadingSeparators(withNumber);
            return `${base} · ${withNumber}`;
        }
        if (base && streetNorm !== baseNorm && !locationPartContains(mine.streetName, base)) {
            return `${base} · ${mine.streetName}`;
        }
        if (!base) {
            return trimLeadingSeparators(peersShareStreet && mine.buildingNumber
                ? `${mine.buildingNumber} ${mine.streetName}`
                : mine.streetName);
        }
        return base;
    }
    /** Split a Home subtitle into area / street components around ` · `. */
    function splitHomeLocationLabelParts(label) {
        return String(label || '')
            .split(/\s*·\s*/)
            .map((part) => part.trim())
            .filter(Boolean);
    }
    /**
     * Validate one Home subtitle component (including content after ` · `).
     * Legitimate streets/neighbourhoods such as Broughton or High Street are not flagged.
     */
    function getHomeLocationLabelPartIssues(part, options) {
        const trimmed = String(part || '').trim();
        if (!trimmed)
            return [];
        const issues = [];
        const cityNorm = normalizeLocationPart(((options === null || options === void 0 ? void 0 : options.city) || '').trim() || 'Milton Keynes');
        if (isPostalCodeLike(trimmed))
            issues.push('postcode');
        if (normalizeLocationPart(trimmed) === cityNorm)
            issues.push('city');
        if (isUnitOnlySegment(trimmed))
            issues.push('unit');
        if (isCompanyIdentificationSegment(trimmed))
            issues.push('company');
        if (isDevelopmentSiteLabel(trimmed))
            issues.push('development_site');
        const partNorm = normalizeLocationPart(trimmed);
        const nameNorm = normalizeLocationPart(((options === null || options === void 0 ? void 0 : options.venueName) || '').trim());
        const displayNorm = normalizeLocationPart(((options === null || options === void 0 ? void 0 : options.displayName) || '').trim());
        if ((nameNorm && partNorm === nameNorm) || (displayNorm && partNorm === displayNorm)) {
            issues.push('business_name');
        }
        return issues;
    }
    function getHomeLocationLabelIssues(label, options) {
        return splitHomeLocationLabelParts(label)
            .map((part) => ({ part, issues: getHomeLocationLabelPartIssues(part, options) }))
            .filter((entry) => entry.issues.length > 0);
    }
    function formatUnitLabel(segment) {
        const cleaned = sanitizeStreetSegment(segment);
        const match = cleaned.match(UNIT_IDENTIFIER_PATTERN);
        if (!match)
            return '';
        let label = sanitizeStreetSegment(match[0]);
        label = label.replace(/^(unit|suite|ste|space|store|shop|kiosk)\b/i, (token) => (token.charAt(0).toUpperCase() + token.slice(1).toLowerCase()));
        label = label.replace(/^u(\d)/i, 'U$1');
        return label;
    }
    function qualifiesAsOpenedStreetSegment(segment, streetName, venue, selectedArea) {
        if (!streetName || isUnitOnlySegment(streetName) || isNumericIndexSegment(streetName))
            return false;
        if (isUntrustworthyNeighbourhoodToken(streetName))
            return false;
        if (isCompanyIdentificationSegment(streetName) || isCompanyIdentificationSegment(segment))
            return false;
        if (isDevelopmentSiteLabel(streetName) || isDevelopmentSiteLabel(segment))
            return false;
        if (isBusinessNameAddressSegment(streetName, venue, selectedArea)
            || isBusinessNameAddressSegment(segment, venue, selectedArea)) {
            return false;
        }
        const hasKeyword = segmentHasStreetKeyword(streetName) || segmentHasStreetKeyword(segment);
        const numberedNameless = isNumberedNamelessStreetSegment(segment);
        return hasKeyword || numberedNameless;
    }
    /**
     * Opened-card street line: reuse Home street recognition, keep building numbers,
     * and preserve a unit identifier only when it is attached to that genuine street.
     */
    function pickOpenedStreetParts(segments, venue, selectedArea) {
        let pendingUnit = '';
        for (const rawSegment of segments) {
            const segment = sanitizeStreetSegment(rawSegment);
            if (!segment)
                continue;
            if (isLevelOnlySegment(segment)) {
                pendingUnit = '';
                continue;
            }
            if (isUnitOnlySegment(segment)) {
                pendingUnit = formatUnitLabel(segment);
                continue;
            }
            if (isNumericIndexSegment(segment)) {
                // Bare index alone is not a street; drop any pending unit association.
                pendingUnit = '';
                continue;
            }
            const sameSegmentUnit = formatUnitLabel(segment);
            const streetNameRaw = toHomeStreetName(segment);
            if (!qualifiesAsOpenedStreetSegment(segment, streetNameRaw, venue, selectedArea)) {
                pendingUnit = '';
                continue;
            }
            const displayStreet = formatHomeStreetForDisplay(streetNameRaw, selectedArea, venue.city);
            if (!displayStreet) {
                pendingUnit = '';
                continue;
            }
            const unitLabel = sameSegmentUnit || pendingUnit;
            pendingUnit = '';
            return {
                streetName: displayStreet,
                buildingNumber: extractBuildingNumber(segment),
                unitLabel,
            };
        }
        return { streetName: '', buildingNumber: '', unitLabel: '' };
    }
    function formatOpenedStreetLine(parts) {
        if (!parts.streetName)
            return '';
        const core = parts.buildingNumber
            ? `${parts.buildingNumber} ${parts.streetName}`
            : parts.streetName;
        if (parts.unitLabel) {
            return `${parts.unitLabel}, ${core}`;
        }
        return core;
    }
    /**
     * Structured opened-venue location (Venue Details + Report Wait info card).
     * Area, street and postcode are independent so styling does not rely on line index.
     */
    function getVenueOpenedLocationDetails(venue, selectedArea) {
        var _a, _b;
        const rawAddress = ((_a = venue.address) !== null && _a !== void 0 ? _a : '').trim();
        const postcodeRaw = getDisplayPostcode(venue, rawAddress);
        // Opened cards show the verified neighbourhood in full (e.g. Central Milton Keynes),
        // not the shortened Home/list form (Central MK).
        const specificArea = pickSpecificAreaOrZone(venue, selectedArea);
        let area = specificArea ? specificArea.trim() : '';
        const segments = deriveLocalSegments(venue, selectedArea, postcodeRaw);
        let street = formatOpenedStreetLine(pickOpenedStreetParts(segments, venue, selectedArea));
        let postcode = postcodeRaw;
        // Chicago: only stored ZIP field or state-suffixed ZIP in the address (never invent).
        if (isChicagoContext(selectedArea, venue.city)) {
            if (postcode && !isUsZipLike(postcode)) {
                postcode = '';
            }
        }
        // Never show the selected city / venue city as area.
        if (area && normalizeLocationPart(area) === normalizeLocationPart(selectedArea)) {
            area = '';
        }
        if (area && normalizeLocationPart(area) === normalizeLocationPart(((_b = venue.city) !== null && _b !== void 0 ? _b : '').trim())) {
            area = '';
        }
        // Deduplicate across lines — never repeat area/street/postcode content.
        if (area && street && normalizeLocationPart(street) === normalizeLocationPart(area)) {
            street = '';
        }
        if (postcode && street && locationPartContains(street, postcode)) {
            street = stripPostcodeFromAddress(street, postcode);
        }
        if (postcode && area && normalizeLocationPart(area) === normalizeLocationPart(postcode)) {
            area = '';
        }
        if (area && street && locationPartContains(street, area) && !locationPartContains(area, street)) {
            // Drop a trailing/leading area echo from the street line only.
            const areaNorm = normalizeLocationPart(area);
            const streetParts = splitAddressSegments(street);
            street = streetParts
                .filter((part) => normalizeLocationPart(part) !== areaNorm)
                .join(', ')
                .trim();
        }
        return {
            area: trimLeadingSeparators(area),
            street: trimLeadingSeparators(street),
            postcode: trimLeadingSeparators(postcode),
        };
    }
    /** Compatibility helper: ordered non-empty opened-location lines. */
    function getVenueDisplayLocationLines(venue, selectedArea) {
        const details = getVenueOpenedLocationDetails(venue, selectedArea);
        return [details.area, details.street, details.postcode].filter(Boolean);
    }
    function getVenueDisplaySubtitle(venue, selectedArea) {
        return getVenueDisplayLocationLines(venue, selectedArea).join('\n');
    }
    function cleanVenueName(name, selectedCity, cityVenues = []) {
        const venue = typeof name === 'string' ? { name } : name;
        return getVenueDisplayName(venue, selectedCity, cityVenues);
    }
    function getVenueSubtitle(venue, selectedCity) {
        return getVenueDisplaySubtitle(venue, selectedCity);
    }
    function normalizeVenueTypeKey(venueType) {
        return (venueType !== null && venueType !== void 0 ? venueType : '')
            .trim()
            .toLowerCase()
            .replace(/[_-]+/g, ' ')
            .replace(/\s+/g, ' ');
    }
    function getVenueTypeIconName(venueType) {
        const normalized = normalizeVenueTypeKey(venueType);
        if (normalized.includes('grocery') ||
            normalized.includes('supermarket') ||
            normalized.includes('convenience') ||
            normalized.includes('food store') ||
            normalized.includes('mini market') ||
            normalized.includes('minimarket') ||
            normalized.includes('off licence') ||
            normalized.includes('off license') ||
            normalized.includes('liquor') ||
            normalized.includes('newsagent') ||
            normalized.includes('market') ||
            normalized.includes('store') ||
            normalized.includes('pharmacy') ||
            normalized.includes('drugstore') ||
            normalized.includes('drug store') ||
            normalized.includes('chemist') ||
            normalized.includes('gas station') ||
            normalized.includes('petrol station') ||
            normalized.includes('service station') ||
            normalized.includes('fuel station')) {
            return 'basket-outline';
        }
        if (normalized.includes('restaurant') ||
            normalized.includes('food') ||
            normalized.includes('meal') ||
            normalized.includes('takeaway') ||
            normalized.includes('cafe') ||
            normalized.includes('café') ||
            normalized.includes('bakery')) {
            return 'restaurant-outline';
        }
        return 'restaurant-outline';
    }
    function trimLeadingSeparators(value) {
        // Remove leading separator characters ( - – — • , ) and surrounding spaces
        // ONLY at the very start of a display string. Never touches hyphens inside
        // valid names/addresses like "Co-op Food", "Best-one", "Unit 1-3 Scotland St".
        return value.replace(/^[\s\-–—•,]+/, '').trim();
    }
  };

  var api = Object.freeze({
    commit: "5dcfec43ee1d9e7452d214181db4902eb7759b45",
    countryConfig: req("./countryConfig"),
    geo: req("./geo"),
    liveCitySelection: req("./liveCitySelection"),
    waitColors: req("./waitColors"),
    venuePrediction: req("./venuePrediction"),
    venueDisplay: req("./venueDisplay"),
  });
  global.PickupRadarLogic = api;
  if (typeof module === 'object' && module && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
