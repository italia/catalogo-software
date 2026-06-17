import { useCallback, useEffect, useReducer, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchCatalogue } from '../api/elasticsearch';
import type { CatalogueItem, SearchFilters } from '../types';
import { ALL_CATALOGUE, PAGE_SIZE, RELEVANCE, RELEASE_DATE } from '../utils/constants';

interface State {
  items: CatalogueItem[];
  total: number;
  isLoading: boolean;
  error: string | null;
}

type Action =
  | { type: 'LOADING' }
  | { type: 'SET_ITEMS'; items: CatalogueItem[]; total: number }
  | { type: 'APPEND_ITEMS'; items: CatalogueItem[] }
  | { type: 'ERROR'; message: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'LOADING':
      return { ...state, isLoading: true, error: null };
    case 'SET_ITEMS':
      return { isLoading: false, items: action.items, total: action.total, error: null };
    case 'APPEND_ITEMS':
      return { ...state, isLoading: false, items: [...state.items, ...action.items] };
    case 'ERROR':
      return { ...state, isLoading: false, error: action.message };
  }
}

function readFiltersFromParams(params: URLSearchParams) {
  return {
    searchValue: params.get('search_value') ?? '',
    type: params.get('type') ?? ALL_CATALOGUE,
    sortBy: params.get('sort_by') ?? (params.get('search_value') ? RELEVANCE : RELEASE_DATE),
    page: Number(params.get('page') ?? 0),
    filters: {
      categories: params.getAll('categories'),
      developmentStatuses: params.getAll('development_statuses'),
      intendedAudiences: params.getAll('intended_audiences'),
      pnrr: params.has('pnrr'),
      pnrrTargets: params.get('pnrr_target') ?? 'Tutti',
      pnrrMeasures: params.get('pnrr_measure') ?? 'Tutte',
    } satisfies SearchFilters,
  };
}

export function writeFiltersToParams(
  searchValue: string,
  type: string,
  sortBy: string,
  page: number,
  filters: SearchFilters
) {
  const p = new URLSearchParams();
  filters.categories.forEach((c) => p.append('categories', c));
  filters.developmentStatuses.forEach((d) => p.append('development_statuses', d));
  filters.intendedAudiences.forEach((i) => p.append('intended_audiences', i));
  if (filters.pnrr) p.append('pnrr', '1');
  if (filters.pnrrTargets !== 'Tutti') p.set('pnrr_target', filters.pnrrTargets);
  if (filters.pnrrMeasures !== 'Tutte') p.set('pnrr_measure', filters.pnrrMeasures);
  p.set('type', type);
  p.set('sort_by', sortBy);
  if (searchValue) p.set('search_value', searchValue);
  p.set('page', String(page));
  return p;
}

export function useCatalogueSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchValue, type, sortBy, page, filters } = readFiltersFromParams(searchParams);

  const [state, dispatch] = useReducer(reducer, {
    items: [],
    total: 0,
    isLoading: false,
    error: null,
  });

  const resumeRef = useRef(page > 0 ? page : false as number | false);

  const from = resumeRef.current !== false ? 0 : page * PAGE_SIZE;
  const size = resumeRef.current !== false ? (Number(resumeRef.current) + 1) * PAGE_SIZE : PAGE_SIZE;

  useEffect(() => {
    let cancelled = false;

    async function run() {
      dispatch({ type: 'LOADING' });
      try {
        const result = await searchCatalogue(type, searchValue, filters, sortBy, from, size);
        if (cancelled) return;
        dispatch(
          from === 0
            ? { type: 'SET_ITEMS', items: result.items, total: result.total }
            : { type: 'APPEND_ITEMS', items: result.items }
        );
      } catch (e) {
        if (cancelled) return;
        dispatch({ type: 'ERROR', message: `(Elasticsearch) ${(e as Error).message}` });
      }
      resumeRef.current = false;
    }

    run();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.toString()]);

  const updateParams = useCallback(
    (updates: Partial<{ searchValue: string; type: string; sortBy: string; page: number; filters: SearchFilters }>) => {
      const next = {
        searchValue: updates.searchValue ?? searchValue,
        type: updates.type ?? type,
        sortBy: updates.sortBy ?? sortBy,
        page: updates.page ?? 0,
        filters: updates.filters ?? filters,
      };
      setSearchParams(writeFiltersToParams(next.searchValue, next.type, next.sortBy, next.page, next.filters), {
        replace: true,
      });
    },
    [searchValue, type, sortBy, filters, setSearchParams]
  );

  const fetchMore = useCallback(() => {
    if (!state.isLoading && (page + 1) * PAGE_SIZE < state.total) {
      updateParams({ page: page + 1 });
    }
  }, [state.isLoading, state.total, page, updateParams]);

  return {
    items: state.items,
    total: state.total,
    isLoading: state.isLoading,
    error: state.error,
    searchValue,
    type,
    sortBy,
    page,
    filters,
    updateParams,
    fetchMore,
  };
}
