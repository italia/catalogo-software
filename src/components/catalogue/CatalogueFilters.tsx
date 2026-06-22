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
    <div>
      <div className="" style={{ maxHeight: expanded ? '100%' : 320, overflowY: 'hidden', paddingLeft: 2, transition: 'max-height 0.5s' }}>
        <div
          className="catalogue-filters-title"
          data-testid="catalogue-filters-title"
        >
          <div className="d-flex justify-content-between">
            <h4 className="h6" style={{ lineHeight: '2rem' }}>
              {title} {selectedCount > 0 && (
                <span className="badge bg-primary ms-2" data-testid="counter">
                  {selectedCount}
                </span>
              )}
            </h4>
          </div>
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
      <div
        onClick={() => setExpanded(!expanded)}
      >          {options.length > 5 && (
        <button className="btn btn-primary w-100 mt-1" type="button">       
          <svg className="icon icon-lg icon-inverse" aria-hidden="true" style={{ height: '2rem' }}>
            <use href={`/sprites.svg#${expanded ? 'it-collapse' : 'it-expand'}`} xlinkHref={`/sprites.svg#${expanded ? 'it-collapse' : 'it-expand'}`} />
          </svg>
        </button>
      )}</div>

    </div>
  );
}
