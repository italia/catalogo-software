import type { CatalogueItem } from '../../types';
import { labels } from '../../utils/i18n';
import { CatalogueItemCard } from './CatalogueItem';

interface Props {
  items: CatalogueItem[];
}

export function CatalogueItems({ items }: Props) {
  if (items.length === 0) {
    return (
      <div className="text-center mt-4" data-testid="catalogue-no-results">
        <h2>{labels.software.no_results}</h2>
        <p className="font-sans-serif content-text">{labels.software.retry_search}</p>
      </div>
    );
  }

  return (
    <div className="mt-sm-3 mt-md-5 row" data-testid="catalogue-items">
      {items.map((item) => (
        <div key={item.id} className="mx-auto col-sm-11 col-md-6 col-lg-4 col-xl-4 p-1 d-flex flex-column">
          <CatalogueItemCard item={item} />
        </div>
      ))}
    </div>
  );
}
