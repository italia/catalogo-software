import type { SearchFilters, CatalogueItem, SoftwareDetail } from '../types';
import {
  ALL_CATALOGUE,
  SOFTWARE_OPEN,
  SOFTWARE_REUSE,
  ALPHABETICAL,
  VITALITY,
  RELEASE_DATE,
  LANG,
  ES_INDEX,
} from '../utils/constants';
import { mockResponse } from './mockData';

const ES_URL = import.meta.env.VITE_ELASTICSEARCH_URL as string;
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';
const preference = Date.now();

async function executeQuery(
  query: object,
  sort: object,
  from: number,
  size: number,
  mockSearchValue = ''
) {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 300));
    const allHits = (
      mockResponse.hits.hits as Array<{ _id: string; _source: Record<string, unknown> }>
    ).filter((hit) => mockHitMatches(hit._source, mockSearchValue));
    const sliced = allHits.slice(from, from + size);
    return {
      hits: sliced,
      total: allHits.length,
    };
  }

  const response = await fetch(`${ES_URL}/${ES_INDEX}/_search?preference=${preference}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, sort, from, size }),
  });

  if (!response.ok) {
    throw new Error(`Elasticsearch error: ${response.status}`);
  }

  const data = await response.json();
  return {
    hits: data.hits.hits as Array<{ _id: string; _source: Record<string, unknown> }>,
    total: data.hits.total.value as number,
  };
}

function buildFilterClauses(filters: SearchFilters) {
  const clauses: object[] = [];

  for (const audience of filters.intendedAudiences) {
    clauses.push({ term: { 'publiccode.intendedAudience.scope': audience } });
  }
  for (const cat of filters.categories) {
    clauses.push({ term: { 'publiccode.categories.keyword': cat } });
  }
  for (const status of filters.developmentStatuses) {
    clauses.push({ term: { 'publiccode.developmentStatus': status } });
  }

  if (filters.pnrrTargets && filters.pnrrTargets !== 'Tutti') {
    clauses.push({
      term: {
        [`publiccode.description.${LANG}.features.keyword`]: `PNRR/Beneficiari/${filters.pnrrTargets}`,
      },
    });
  }
  if (filters.pnrrMeasures && filters.pnrrMeasures !== 'Tutte') {
    clauses.push({
      term: {
        [`publiccode.description.${LANG}.features.keyword`]: `PNRR/Misura/${filters.pnrrMeasures}`,
      },
    });
  }
  if (filters.pnrr) {
    clauses.push({
      term: { [`publiccode.description.${LANG}.features`]: 'pnrr' },
    });
  }

  return clauses;
}

function buildSort(sortBy: string) {
  if (sortBy === ALPHABETICAL) {
    return {
      _script: {
        type: 'string',
        order: 'asc',
        script: {
          lang: 'painless',
          source: `
            if (
                doc['publiccode.description.${LANG}.localisedName.keyword'].size() != 0
                && !doc['publiccode.description.${LANG}.localisedName.keyword'].empty
               ) {
              return doc['publiccode.description.${LANG}.localisedName.keyword'].value
            }
            else {
              return doc['publiccode.name.keyword'].value
            }
          `,
        },
      },
    };
  }
  if (sortBy === VITALITY) {
    return [{ vitalityScore: { order: 'desc' } }];
  }
  if (sortBy === RELEASE_DATE) {
    return [{ 'publiccode.releaseDate': { order: 'desc' } }];
  }
  return [];
}

function buildSearchFields() {
  return [
    'publiccode.name^3',
    `publiccode.description.${LANG}.localisedName^3`,
    `publiccode.description.${LANG}.genericName^2`,
    `publiccode.description.${LANG}.shortDescription^2`,
    `publiccode.description.${LANG}.longDescription`,
    `publiccode.description.${LANG}.features`,
  ];
}

// Matches software whose name, description or features contain every word of
// the query, in any order and spread across fields (e.g. "sito comune" finds
// "Sito web comunale ... il sito web di un comune"). Exact phrase / prefix
// matches are still kept and boosted, so search-as-you-type and name searches
// keep ranking first.
function buildSearchQuery(searchValue: string) {
  const fields = buildSearchFields();
  return {
    bool: {
      should: [
        { multi_match: { query: searchValue, type: 'phrase_prefix', fields, boost: 3 } },
        { multi_match: { query: searchValue, type: 'cross_fields', operator: 'and', fields } },
        { multi_match: { query: searchValue, type: 'bool_prefix', operator: 'and', fields } },
      ],
      minimum_should_match: 1,
    },
  };
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

// Client-side equivalent of buildSearchQuery, used only with VITE_USE_MOCK.
function mockHitMatches(source: Record<string, unknown>, searchValue: string) {
  const words = normalize(searchValue).split(/\s+/).filter(Boolean);
  if (words.length === 0) return true;
  const pc = source.publiccode as Record<string, unknown> | undefined;
  const desc = getDescriptionField(source);
  const text = normalize(
    [
      pc?.name,
      desc?.localisedName,
      desc?.genericName,
      desc?.shortDescription,
      desc?.longDescription,
      ...((desc?.features as unknown[]) ?? []),
    ]
      .filter((v) => typeof v === 'string')
      .join(' ')
  );
  return words.every((w) => text.includes(w));
}

export async function searchCatalogue(
  type: string,
  searchValue: string,
  filters: SearchFilters,
  sortBy: string,
  from: number,
  size: number
): Promise<{ items: CatalogueItem[]; total: number }> {
  const must: object[] = [{ term: { type: 'software' } }];
  const should: object[] = [];
  const must_not: object[] = [];

  if (searchValue) {
    must.push(buildSearchQuery(searchValue));
  }

  if (type === SOFTWARE_REUSE) {
    should.push(
      { exists: { field: 'publiccode.organisation.uri' } },
      { exists: { field: 'publiccode.IT.riuso.codiceIPA' } },
      { exists: { field: 'publiccode.it.riuso.codiceIPA' } }
    );
  }

  if (type === SOFTWARE_OPEN) {
    must_not.push(
      { exists: { field: 'publiccode.organisation.uri' } },
      { exists: { field: 'publiccode.IT.riuso.codiceIPA' } },
      { exists: { field: 'publiccode.it.riuso.codiceIPA' } },
      { match: { 'publiccode.indendedAudience.unsupportedCountries': 'IT' } }
    );
  }

  const query = {
    bool: {
      filter: buildFilterClauses(filters),
      must: [{ bool: { should } }, ...must],
      must_not,
      should,
    },
  };

  const { hits, total } = await executeQuery(query, buildSort(sortBy), from, size, searchValue);
  return { items: hits.map(mapHitToItem), total };
}

export async function fetchSoftwareBySlug(slug: string): Promise<SoftwareDetail | null> {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 200));
    const hit = mockResponse.hits.hits.find(
      (h) => h._source.slug.toLowerCase() === slug.toLowerCase()
    );
    if (!hit) return null;
    return { id: hit._id, ...hit._source } as unknown as SoftwareDetail;
  }

  const query = {
    bool: {
      must: [
        { term: { type: 'software' } },
        { term: { 'slug': slug } },
      ],
    },
  };

  const { hits } = await executeQuery(query, [], 0, 1);
  if (hits.length === 0) return null;

  return { id: hits[0]._id, ...hits[0]._source } as unknown as SoftwareDetail;
}

function getDescriptionField(source: Record<string, unknown>) {
  const publiccode = source.publiccode as Record<string, unknown> | undefined;
  if (!publiccode?.description) return null;

  const descriptions = publiccode.description as Record<string, Record<string, unknown>>;
  const keys = Object.keys(descriptions);
  if (keys.length === 0) return null;

  if (descriptions[LANG]) return descriptions[LANG];

  const baseLang = LANG.split('-')[0];
  const variant = keys.find((k) => k.startsWith(baseLang + '-'));
  if (variant) return descriptions[variant];

  if (descriptions['en']) return descriptions['en'];
  if (descriptions['it']) return descriptions['it'];

  return descriptions[keys[0]];
}

function cropString(value: unknown): string {
  if (!value || typeof value !== 'string') return '';
  return value.length >= 100 ? value.substring(0, 100) + '...' : value;
}

function getSoftwareCategory(source: Record<string, unknown>): string {
  const pc = source.publiccode as Record<string, unknown> | undefined;
  const ipaCode =
    (pc?.organisation as Record<string, unknown>)?.uri ||
    (pc?.IT as Record<string, unknown>)?.riuso &&
    ((pc?.IT as Record<string, unknown>)?.riuso as Record<string, unknown>)?.codiceIPA ||
    (pc?.it as Record<string, unknown>)?.riuso &&
    ((pc?.it as Record<string, unknown>)?.riuso as Record<string, unknown>)?.codiceIPA;
  return ipaCode ? SOFTWARE_REUSE : SOFTWARE_OPEN;
}

function mapHitToItem(hit: { _id: string; _source: Record<string, unknown> }): CatalogueItem {
  const source = hit._source;
  const desc = getDescriptionField(source);
  const pc = source.publiccode as Record<string, unknown>;

  const category = getSoftwareCategory(source);
  const name = (desc?.localisedName as string) ?? (pc?.name as string) ?? '';
  const description = desc?.shortDescription ? cropString(desc.shortDescription) : '';
  const icon = category === SOFTWARE_REUSE ? 'it-software' : 'it-open-source';
  const fallback =
    category === SOFTWARE_REUSE
      ? '/assets/images/cover_softwareriuso.png'
      : '/assets/images/cover_software_opensource.png';

  let logo = (desc?.screenshots as string[])?.[0] ?? (pc?.logo as string) ?? fallback;
  if (/github/.test(logo) && /\.svg$/.test(logo)) {
    logo += '?sanitize=true';
  }

  const slug = (source.slug as string)?.toLowerCase() ?? '';
  const url = `/software/${slug}`;

  return { id: hit._id, category, description, icon, logo, fallback, name, url };
}
