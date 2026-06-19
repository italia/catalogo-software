import { useState } from 'react';

interface Props {
  title: string;
  options: [string, string][];
  selected: string | string[];
  onChange: (value: string | string[]) => void;
  radio?: boolean;
  capitalize?: boolean;
}

export function CatalogueFilters({
  title,
  options,
  selected,
  onChange,
  radio = false,
  capitalize = true,
}: Props) {
  const [expanded, setExpanded] = useState(false);

  const selectedArray = Array.isArray(selected) ? selected : [selected];
  const selectedCount = radio ? 0 : selectedArray.filter(Boolean).length;

  const handleChange = (key: string, checked: boolean) => {
    if (radio) {
      onChange(key);
    } else {
      const next = checked
        ? [...selectedArray, key]
        : selectedArray.filter((v) => v !== key);
      onChange(next);
    }
  };

  return (
    <div className="" style={{ maxHeight: expanded ? '100%' : 200, overflowY: 'hidden', paddingLeft: 2, transition: 'max-height 0.5s' }}>
      <div
        className="catalogue-filters-title"
        role="button"
        onClick={() => setExpanded(!expanded)}
        data-testid="catalogue-filters-title"
      >
        <div className="d-flex align-items-center">
          <h4 className="h6">{title}</h4>
          {selectedCount > 0 && (
            <span className="badge rounded-pill bg-primary ms-2" data-testid="counter">
              {selectedCount}
            </span>
          )}
        </div>
        {options.length > 5 && (
          <svg className="icon icon-primary icon-sm" aria-hidden="true">
            <use href={`/sprites.svg#${expanded ? 'it-collapse' : 'it-expand'}`} xlinkHref={`/sprites.svg#${expanded ? 'it-collapse' : 'it-expand'}`} />
          </svg>
        )}
      </div>
      {options.map(([key, label]) => {
        const id = `${title}-${key}`.replace(/\s+/g, '-');
        return (
          <div key={key} className="form-check">
            <input
              id={id}
              type={radio ? 'radio' : 'checkbox'}
              value={key}
              checked={radio ? selected === key : selectedArray.includes(key)}
              onChange={(e) => handleChange(key, e.target.checked)}
              name={radio ? title : undefined}
            />
            <label
              htmlFor={id}
              style={{ textTransform: capitalize ? 'capitalize' : 'none', fontWeight: 'normal' }}
            >
              {label}
            </label>
          </div>
        );
      })}
    </div>
  );
}
