'use strict';

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

function isPostcodeLike(value) {
  const compact = normalizeLocationPart(value).replace(/\s+/g, '');
  return /^[a-z]{1,2}\d[a-z\d]?\d[a-z]{2}$/i.test(compact);
}

function locationPartContains(a, b) {
  const left = normalizeLocationPart(a).replace(/\s+/g, '');
  const right = normalizeLocationPart(b).replace(/\s+/g, '');
  return left.includes(right) || right.includes(left);
}

function stripPostcodeFromAddress(address, postcode) {
  const cleanAddress = address.trim();
  const source = (postcode ?? '').trim();
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
    const value = (part ?? '').trim();
    if (!value) continue;

    const normalized = normalizeLocationPart(value);
    if (!normalized) continue;

    if (out.some((existing) => normalizeLocationPart(existing) === normalized)) continue;
    if (out.some((existing) => locationPartContains(existing, value) || locationPartContains(value, existing))) continue;

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
  { canonical: 'Co-op Food', aliases: ['co op food', 'the co operative food', 'co operative food'] },
  { canonical: 'Tesco Express', aliases: ['tesco express'] },
  { canonical: 'Tesco Extra', aliases: ['tesco extra'] },
  { canonical: 'Tesco', aliases: ['tesco superstore'] },
  { canonical: "Sainsbury's Local", aliases: ['sainsburys local'] },
  { canonical: "Sainsbury's", aliases: ['sainsburys superstore'] },
  { canonical: 'Asda Express', aliases: ['asda express'] },
  { canonical: 'Asda', aliases: ['asda superstore'] },
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

// Returns the canonical brand name ONLY when the venue name STARTS with a known
// chain brand on a whole-word boundary. Never matches a brand word that appears
// later in the name, so independent venues are left untouched.
function applyChainBrandCleanup(rawName) {
  const norm = normalizeBrandText(rawName);
  if (!norm) return null;

  const nameTokens = norm.split(' ');

  for (const entry of CHAIN_ALIAS_ENTRIES) {
    const aliasTokens = entry.tokens;
    if (aliasTokens.length > nameTokens.length) continue;

    let matches = true;
    for (let i = 0; i < aliasTokens.length; i += 1) {
      if (nameTokens[i] !== aliasTokens[i]) {
        matches = false;
        break;
      }
    }

    if (matches) return entry.canonical;
  }

  return null;
}

function getVenueDisplayName(venue, selectedArea) {
  const city = selectedArea.trim();
  const original = venue.name.trim();

  // Respect admin-edited names exactly — skip all display cleanup.
  if (venue.admin_edited_at && String(venue.admin_edited_at).trim()) {
    return original;
  }

  // Known chain brands → canonical brand name only (display-only).
  const brand = applyChainBrandCleanup(original);
  if (brand) return brand;

  if (!city) {
    return original.replace(/[\s,\-]+$/g, '').replace(/[\s,\-]{2,}/g, ' ').trim();
  }

  const escapedCity = escapeRegExp(city);
  const patterns = [
    new RegExp(`\\s*,\\s*${escapedCity}$`, 'i'),
    new RegExp(`\\s*[-–—]\\s*${escapedCity}$`, 'i'),
    new RegExp(`\\s*\\(\\s*${escapedCity}\\s*\\)$`, 'i'),
    new RegExp(`\\s+${escapedCity}$`, 'i'),
  ];

  let cleaned = original;
  let previous = '';

  while (cleaned !== previous) {
    previous = cleaned;
    for (const pattern of patterns) {
      cleaned = cleaned.replace(pattern, '');
    }
    cleaned = cleaned.replace(/[\s,\-]+$/g, '').replace(/[\s,\-]{2,}/g, ' ').trim();
  }

  return cleaned || original;
}

function extractPostcode(value) {
  const text = value.trim().replace(/\s+/g, ' ');
  const match = text.match(/\b([A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2})\b/i);
  return match ? match[1].toUpperCase().replace(/\s+/g, ' ') : '';
}

function getDisplayPostcode(venue, address) {
  const explicit = (venue.postcode ?? '').trim();
  if (explicit) {
    return explicit.toUpperCase().replace(/\s+/g, ' ');
  }

  return extractPostcode(address);
}

function isRedundantAddressSegment(segment, cityNorms) {
  const norm = normalizeLocationPart(segment);
  if (!norm) return true;
  if (norm === 'uk' || norm === 'united kingdom' || norm === 'gb' || norm === 'great britain') return true;
  // Only remove when the WHOLE segment equals a city — never when the city
  // is part of a longer name like "Leeds Rd".
  return cityNorms.includes(norm);
}

function removeRedundantAddressSegments(
  address,
  venue,
  selectedArea,
) {
  if (!address) return '';

  const cityNorms = uniqueLocationParts([venue.city ?? '', selectedArea])
    .map((c) => normalizeLocationPart(c))
    .filter(Boolean);

  const kept = address
    .split(',')
    .map((segment) => segment.trim())
    .filter((segment) => segment.length > 0)
    .filter((segment) => !isRedundantAddressSegment(segment, cityNorms));

  return kept.join(', ').replace(/[\s,•/-]+$/g, '').replace(/\s{2,}/g, ' ').trim();
}

function pickUsefulArea(venue, selectedArea, address, postcode) {
  const area = (venue.area ?? venue.zone ?? '').trim();
  const city = selectedArea.trim();

  if (!area) return '';
  if (isPostcodeLike(area)) return '';
  if (postcode && locationPartContains(area, postcode)) return '';
  if (city && normalizeLocationPart(area) === normalizeLocationPart(city)) return '';
  if (address && locationPartContains(address, area)) return '';
  if (normalizeLocationPart(area) === normalizeLocationPart(address)) return '';

  return area;
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
  'highway',
  'gardens',
  'grove',
  'hill',
];

const ROAD_PHRASE_KEYWORDS = ['retail park', 'industrial estate', 'business park', 'shopping centre', 'unit'];

function isStreetLikeSegment(segment) {
  const norm = normalizeLocationPart(segment);
  if (!norm) return false;
  // Starts with a house/unit number → almost always a street/address line.
  if (/^\d/.test(norm)) return true;
  if (ROAD_PHRASE_KEYWORDS.some((kw) => norm.includes(kw))) return true;
  const words = norm.split(' ');
  const lastWord = words[words.length - 1];
  return ROAD_LAST_WORD_KEYWORDS.includes(lastWord);
}

function deriveLocalSegments(venue, selectedArea, postcode) {
  const rawAddress = (venue.address ?? '').trim();
  const cityNorms = uniqueLocationParts([venue.city ?? '', selectedArea])
    .map((c) => normalizeLocationPart(c))
    .filter(Boolean);
  const addressWithoutPostcode = stripPostcodeFromAddress(rawAddress, postcode);
  return addressWithoutPostcode
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .filter((s) => !isRedundantAddressSegment(s, cityNorms));
}

function getVenueCompactAreaLabel(venue, selectedArea) {
  const rawAddress = (venue.address ?? '').trim();
  const postcode = getDisplayPostcode(venue, rawAddress);
  const city = (venue.city ?? '').trim();
  const area = (venue.area ?? venue.zone ?? '').trim();

  const cityNorms = uniqueLocationParts([city, selectedArea])
    .map((c) => normalizeLocationPart(c))
    .filter(Boolean);

  // 1. Prefer venue.area when it's a useful local label.
  if (area && !isPostcodeLike(area) && !cityNorms.includes(normalizeLocationPart(area))) {
    return area;
  }

  // 2. Derive a local area from the address — prefer the last non-street segment.
  const segments = deriveLocalSegments(venue, selectedArea, postcode);
  if (segments.length > 0) {
    for (let i = segments.length - 1; i >= 0; i -= 1) {
      if (!isStreetLikeSegment(segments[i])) {
        return segments[i];
      }
    }
    const fallback = segments[segments.length - 1];
    return fallback.replace(/^\d+[\s,]*/, '').trim() || fallback;
  }

  // 3. Last resort.
  if (area && !isPostcodeLike(area)) return area;
  return city || selectedArea;
}

function normalizeVenueNameForDup(name) {
  return name
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function getStreetClue(venue, selectedArea, postcode) {
  const segments = deriveLocalSegments(venue, selectedArea, postcode);
  const street = segments.find((s) => isStreetLikeSegment(s));
  if (!street) return '';
  const cleaned = street.replace(/^\d+[\s,]*/, '').trim();
  return cleaned || street;
}

function getVenueHomeLocationLabel(
  venue,
  visibleVenues,
  selectedArea,
) {
  const base = getVenueCompactAreaLabel(venue, selectedArea);
  const nameNorm = normalizeVenueNameForDup(getVenueDisplayName(venue, selectedArea));
  const baseNorm = normalizeLocationPart(base);

  const hasDuplicate = visibleVenues.some((other) => {
    if (other === venue) return false;
    if (normalizeVenueNameForDup(getVenueDisplayName(other, selectedArea)) !== nameNorm) return false;
    return normalizeLocationPart(getVenueCompactAreaLabel(other, selectedArea)) === baseNorm;
  });

  if (!hasDuplicate) return base;

  const rawAddress = (venue.address ?? '').trim();
  const postcode = getDisplayPostcode(venue, rawAddress);
  const clue = getStreetClue(venue, selectedArea, postcode);

  if (clue && normalizeLocationPart(clue) !== baseNorm) {
    return `${base} · ${clue}`;
  }
  if (postcode) {
    return `${base} · ${postcode}`;
  }
  return base;
}

function getVenueDisplayLocationLines(venue, selectedArea) {
  const rawAddress = (venue.address ?? '').trim();
  const postcode = getDisplayPostcode(venue, rawAddress);
  const addressWithoutPostcode = stripPostcodeFromAddress(rawAddress, postcode);
  const cleanAddress = removeRedundantAddressSegments(addressWithoutPostcode, venue, selectedArea);
  const usefulArea = pickUsefulArea(venue, selectedArea, cleanAddress || rawAddress, postcode);
  const cleanedAddress = cleanAddress || addressWithoutPostcode || rawAddress;
  const locationLine = cleanedAddress
    ? `${cleanedAddress}${postcode ? ` • ${postcode}` : ''}`
    : usefulArea
      ? `${usefulArea}${postcode ? ` • ${postcode}` : ''}`
      : postcode || (venue.city ?? selectedArea).trim();

  const lines = uniqueLocationParts([usefulArea, locationLine]);
  return lines.slice(0, 2);
}

function getVenueDisplaySubtitle(venue, selectedArea) {
  return getVenueDisplayLocationLines(venue, selectedArea).join('\n');
}

function cleanVenueName(name, selectedCity) {
  const venue = typeof name === 'string' ? { name } : name;
  return getVenueDisplayName(venue, selectedCity);
}

function getVenueSubtitle(venue, selectedCity) {
  return getVenueDisplaySubtitle(venue, selectedCity);
}

const PickupRadarVenueDisplay = {
  normalizeLocationPart,
  isPostcodeLike,
  locationPartContains,
  stripPostcodeFromAddress,
  uniqueLocationParts,
  applyChainBrandCleanup,
  getVenueDisplayName,
  removeRedundantAddressSegments,
  getVenueCompactAreaLabel,
  getVenueHomeLocationLabel,
  getVenueDisplayLocationLines,
  getVenueDisplaySubtitle,
  cleanVenueName,
  getVenueSubtitle,
};

if (typeof window !== 'undefined') {
  window.PickupRadarVenueDisplay = PickupRadarVenueDisplay;
}
