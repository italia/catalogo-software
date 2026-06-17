import { RELEVANCE } from '../../utils/constants';
import { labels } from '../../utils/i18n';

interface Props {
  sortBy: string;
  searchValue: string;
  onChange: (value: string) => void;
}

export function CatalogueSort({ sortBy, searchValue, onChange }: Props) {
  const showRelevance = sortBy === RELEVANCE || !!searchValue;

  return (
    <div className="d-flex flex-wrap justify-content-end align-items-center">
      <label className="mb-0 pe-2">{labels.software.sort_by}</label>
      <select value={sortBy} onChange={(e) => onChange(e.target.value)}>
        {showRelevance && <option value="relevance">{labels.software.sort_by_relevance}</option>}
        <option value="release_date">{labels.software.sort_by_release_date}</option>
        {/* TODO: re-enable when vitalityScore sorting is fixed on the API side */}
        {/* <option value="vitality">{labels.software.sort_by_vitality}</option> */}
        <option value="name">{labels.software.sort_by_alphabetic}</option>
      </select>
    </div>
  );
}
