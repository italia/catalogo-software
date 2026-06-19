import { useCallback, useRef } from 'react';
import { DEBOUNCE_SEARCH_MS } from '../utils/constants';

interface SearchBarProps {
  defaultValue: string;
  placeholder: string;
  onChange: (value: string) => void;
}

export function SearchBar({ defaultValue, placeholder, onChange }: SearchBarProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        onChange(e.target.value);
      }, DEBOUNCE_SEARCH_MS);
    },
    [onChange]
  );

  return (
    <div className="form-group">     
      <label htmlFor="main-search">Nome del software</label> 
      <div className="input-group">
        <span className="input-group-text">
          <svg className="icon icon-sm icon-secondary" aria-hidden="true">
            <use href="/sprites.svg#it-search" xlinkHref="/sprites.svg#it-search" />
          </svg>
        </span>
        <input
          id="main-search"
          data-testid="search-bar"
          autoFocus
          placeholder={placeholder}
          type="text"
          className="form-control"
          defaultValue={defaultValue}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
