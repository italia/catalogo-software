import type { SearchFilters } from '../../types';
import { ALL_CATALOGUE, SOFTWARE_OPEN, SOFTWARE_REUSE } from '../../utils/constants';
import {
  labels,
  getSortedCategories,
  getSortedScopes,
  getSortedDevelopmentStatuses,
  pnrrTargets,
  pnrrMeasures,
} from '../../utils/i18n';
import { CatalogueFilters } from './CatalogueFilters';

const softwareTypes: [string, string][] = [
  [ALL_CATALOGUE, labels.all],
  [SOFTWARE_OPEN, labels.software[SOFTWARE_OPEN]],
  [SOFTWARE_REUSE, labels.software[SOFTWARE_REUSE]],
];

const categories = getSortedCategories();
const scopes = getSortedScopes();
const devStatuses = getSortedDevelopmentStatuses();

interface Props {
  type: string;
  filters: SearchFilters;
  onTypeChange: (type: string) => void;
  onFiltersChange: (filters: SearchFilters) => void;
}

export function CatalogueFiltersPanel({ type, filters, onTypeChange, onFiltersChange }: Props) {
  const pnrrFilter: [string, string][] = [['1', labels.software.pnrr]];

  return (
    <>
      <CatalogueFilters
        title="PNRR"
        options={pnrrFilter}
        selected={filters.pnrr ? ['1'] : []}
        onChange={(val) => {
          const isPnrr = Array.isArray(val) ? val.includes('1') : val === '1';
          onFiltersChange({
            ...filters,
            pnrr: isPnrr,
            pnrrTargets: isPnrr ? filters.pnrrTargets : 'Tutti',
            pnrrMeasures: isPnrr ? filters.pnrrMeasures : 'Tutte',
          });
        }}
        capitalize={false}
      />
      <hr/>

      {filters.pnrr && (
        <>
          <CatalogueFilters
            title={labels.software.pnrr_targets}
            options={pnrrTargets}
            selected={filters.pnrrTargets}
            onChange={(val) => onFiltersChange({ ...filters, pnrrTargets: val as string })}
            capitalize={false}
            radio
          />
          <hr/>
          <CatalogueFilters
            title={labels.software.pnrr_measures}
            options={pnrrMeasures}
            selected={filters.pnrrMeasures}
            onChange={(val) => onFiltersChange({ ...filters, pnrrMeasures: val as string })}
            capitalize={false}
            radio
          />
          <hr/>
        </>
      )}

      <CatalogueFilters
        title={labels.software.type}
        options={softwareTypes}
        selected={type}
        onChange={(val) => onTypeChange(val as string)}
        radio
      />
      <hr/>
      <CatalogueFilters
        title={labels.software.categories}
        options={categories}
        selected={filters.categories}
        onChange={(val) => onFiltersChange({ ...filters, categories: val as string[] })}
      />
      <hr/>
      <CatalogueFilters
        title={labels.software.intended_audience}
        options={scopes}
        selected={filters.intendedAudiences}
        onChange={(val) => onFiltersChange({ ...filters, intendedAudiences: val as string[] })}
      />
      <hr/>
      <CatalogueFilters
        title={labels.software.development_status}
        options={devStatuses}
        selected={filters.developmentStatuses}
        onChange={(val) => onFiltersChange({ ...filters, developmentStatuses: val as string[] })}
      />
      <hr/>
    </>
  );
}
