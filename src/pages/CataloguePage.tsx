import { useCallback, useState } from 'react';
import { useCatalogueSearch } from '../hooks/useCatalogueSearch';
import Layout from '../components/layout';
import { SearchBar } from '../components/SearchBar';
import { CatalogueFiltersPanel } from '../components/catalogue/CatalogueFiltersPanel';
import { CatalogueSort } from '../components/catalogue/CatalogueSort';
import { CatalogueItems } from '../components/catalogue/CatalogueItems';
import { ErrorMessage } from '../components/ErrorMessage';
import { Spinner } from '../components/Spinner';
import { labels } from '../utils/i18n';
import type { SearchFilters } from '../types';

export function CataloguePage() {
  const {
    items,
    total,
    isLoading,
    error,
    searchValue,
    type,
    sortBy,
    filters,
    updateParams,
    fetchMore,
  } = useCatalogueSearch();

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const totalAppliedFilters =
    filters.categories.length +
    filters.intendedAudiences.length +
    filters.developmentStatuses.length +
    (type ? 1 : 0);

  const handleSearch = useCallback(
    (value: string) => updateParams({ searchValue: value }),
    [updateParams]
  );

  const handleSortChange = useCallback(
    (value: string) => updateParams({ sortBy: value }),
    [updateParams]
  );

  const handleTypeChange = useCallback(
    (value: string) => updateParams({ type: value }),
    [updateParams]
  );

  const handleFiltersChange = useCallback(
    (next: SearchFilters) => updateParams({ filters: next }),
    [updateParams]
  );

  if (error) {
    return <ErrorMessage description={error} />;
  }

  return (
    <Layout>
      <article className="container" style={{ marginTop: '2.5rem', marginBottom: '6rem' }} data-testid="catalogue-container">
        <div className="row">
          {/* Desktop sidebar */}
          <section className="col-lg-3 d-none d-lg-flex flex-column">
            <h3>Filtra per</h3>
            <CatalogueFiltersPanel
              type={type}
              filters={filters}
              onTypeChange={handleTypeChange}
              onFiltersChange={handleFiltersChange}
            />
          </section>

          {/* Main content */}
          <section className="col-12 col-lg-9">
            {/* Header with search */}
            <div className="row mb-4">
              {/* <h1 style={{ fontSize: '3rem' }}>
                {{filters.pnrr ? labels.software.cataloguePNRR : labels.software.catalogue}}
              </h1> */}
                <div className="col-12 col-lg-9">
                <SearchBar
                  onChange={handleSearch}
                  defaultValue={searchValue}
                  placeholder={labels.search_form_catalogue}
                />
                </div>
                <div className="col-12 col-lg-3">
                  <CatalogueSort
                    sortBy={sortBy}
                    searchValue={searchValue}
                    onChange={handleSortChange}
                  />
                </div>
              
            </div>

            {/* Summary bar */}
            <div className="row">
              <div className="col-12 py-3 px-2 align-items-center text-center">
                <h3 className="col-12 fw-bold text-start" data-testid="counter-summary">
                  {total} {labels.software.results}
                </h3>
                <div className="col-12 col-md-2 d-lg-none">
                  <div
                    className="btn btn-outline-primary"
                    role="button"
                    onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                  >
                    <span>{labels.software.filters}</span>
                    {totalAppliedFilters > 0 && (
                      <span className="badge bg-primary ms-2">{totalAppliedFilters}</span>
                    )}
                  </div>
                </div>

              </div>

              {/* Mobile filters */}
              {mobileFiltersOpen && (
                <div className="col-12 mb-5 d-lg-none">
                  <div className="col-12 m-auto">
                    <CatalogueFiltersPanel
                      type={type}
                      filters={filters}
                      onTypeChange={handleTypeChange}
                      onFiltersChange={handleFiltersChange}
                    />
                  </div>
                </div>
              )}
            </div>

            <hr/>

            {/* Results */}
            {isLoading && items.length === 0 ? (
              <Spinner />
            ) : (
              <>
                <CatalogueItems items={items} />
                {items.length > 0 && items.length < total && (
                  <div className="d-flex w-100 justify-content-center mt-4">
                    <button
                      className="btn btn-primary"
                      onClick={fetchMore}
                      disabled={isLoading}
                    >
                      {labels.software.load_more}
                    </button>
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      </article>
    </Layout>
  );
}
