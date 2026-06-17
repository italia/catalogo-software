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
    <h2 className="d-flex align-items-center mb-0">
      <svg className="icon icon-lg mb-0 d-none d-lg-block icon-primary" aria-hidden="true">
        <use href="/sprites.svg#it-search" xlinkHref="/sprites.svg#it-search" />
      </svg>
      <input
        data-testid="search-bar"
        autoFocus
        placeholder={placeholder}
        type="text"
        className="search-bar"
        defaultValue={defaultValue}
        onChange={handleChange}
      />
    </h2>
  );
}
