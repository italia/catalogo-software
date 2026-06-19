import { Link } from 'react-router-dom';
import type { CatalogueItem as CatalogueItemType } from '../../types';
import { ImageWithPlaceholder } from '../ImageWithPlaceholder';
import { labels, categoryLabels } from '../../utils/i18n';

interface Props {
  item: CatalogueItemType;
}

export function CatalogueItemCard({ item }: Props) {
  const categoryLabel = categoryLabels[item.category] ?? item.category;

  return (
    <div data-testid={item.id} style={{ width: '100%', height: '100%' }}>
      <div className="it-card it-card-image rounded shadow-sm border" style={{ height: '100%' }}>
        {item.icon && (
          <div className="mb-2 border-bottom pb-2">
            <svg className="icon icon-sm me-1" aria-hidden="true">
              <use href={`/sprites.svg#${item.icon}`} xlinkHref={`/sprites.svg#${item.icon}`} />
            </svg>
            <span className="catalogue-item-category">{categoryLabel}</span>
          </div>
        )}
        <h3 className="it-card-title h6">{item.name}</h3>
        <div className="it-card-image-wrapper">
          <div className="ratio ratio-16x9">
            <figure className="figure img-full">
              <ImageWithPlaceholder
                placeholder={item.fallback}
                alt={'Logo ' + item.name}
                img={item.logo}
              />
            </figure>
          </div>
        </div>
        <div className="it-card-body">
          <p className="it-card-text">{item.description}</p>
        </div>
        <footer className="it-card-footer border-top pt-3">
          <Link
            to={item.url}
            className="it-card-link"
            data-testid="item-anchor"
          >
            <span className="text text-uppercase">{labels.software.read_more}</span>
            <svg className="icon icon-sm" aria-hidden="true">
              <use href="/sprites.svg#it-arrow-right" xlinkHref="/sprites.svg#it-arrow-right" />
            </svg>
          </Link>
        </footer>
      </div>
    </div>
  );
}
