import React, { useMemo, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ProductFilters } from '../components/products/ProductFilters';
import { ProductGrid } from '../components/products/ProductGrid';
import { CATEGORIES } from '../data/categories';
import { DEMO_PRODUCTS } from '../data/products';
import { Meta } from '../components/common/Meta';

export const ProductsPage: React.FC = () => {
  const { category: routeCategory } = useParams<{ category?: string }>();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryParam = searchParams.get('category');
  const finishParam = searchParams.get('finish');
  const seriesParam = searchParams.get('series');
  const queryParam = searchParams.get('q') ?? '';
  const sortParam = searchParams.get('sort') ?? 'featured';
  const [filtersOpen, setFiltersOpen] = useState(true);
  const activeCategory = CATEGORIES.find((category) => category.slug === routeCategory);

  const selectedCategories = (categoryParam ? categoryParam.split(',') : routeCategory ? [routeCategory] : []).filter(Boolean);
  const selectedFinishes = finishParam?.split(',').filter(Boolean) ?? [];
  const selectedSeries = seriesParam?.split(',').filter(Boolean) ?? [];
  const activeFilterCount = selectedCategories.length + selectedFinishes.length + selectedSeries.length + Number(Boolean(queryParam));
  const searchQuery = queryParam;
  const sortBy = sortParam;

  const updateParams = (changes: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(changes).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    setSearchParams(params, { replace: true });
  };

  const handleCategoriesChange = (values: string[]) => {
    if (routeCategory) {
      const params = new URLSearchParams(searchParams);
      if (values.length) params.set('category', values.join(','));
      else params.delete('category');
      navigate(`/products${params.size ? `?${params.toString()}` : ''}`);
      return;
    }
    updateParams({ category: values.length ? values.join(',') : null });
  };

  const handleFinishesChange = (values: string[]) => {
    updateParams({ finish: values.length ? values.join(',') : null });
  };

  const handleSeriesChange = (values: string[]) => {
    updateParams({ series: values.length ? values.join(',') : null });
  };

  const handleSearchChange = (value: string) => {
    updateParams({ q: value.trim() ? value : null });
  };

  const handleSortChange = (value: string) => {
    updateParams({ sort: value === 'featured' ? null : value });
  };

  const handleReset = () => {
    navigate('/products');
  };

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const result = DEMO_PRODUCTS.filter((product) => {
      if (selectedCategories.length && !selectedCategories.includes(product.categorySlug)) return false;
      if (selectedFinishes.length && !product.finishes.some((finish) => selectedFinishes.includes(finish.id))) return false;
      if (selectedSeries.length && !selectedSeries.includes(product.series)) return false;
      if (!query) return true;
      const searchable = [product.name, product.series, product.category, product.shortDescription, ...product.finishes.map((finish) => finish.name)];
      return searchable.some((value) => value.toLowerCase().includes(query));
    });

    return result.sort((a, b) => {
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      if (sortBy === 'series') return a.series.localeCompare(b.series);
      return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
    });
  }, [searchQuery, selectedCategories, selectedFinishes, selectedSeries, sortBy]);

  const title = activeCategory?.title ?? 'Catalogue';
  const metaTitle = activeCategory ? `${title} — SIDDI Catalogue` : 'Catalogue — SIDDI';

  return (
    <div className="catalogue-page">
      <Meta
        title={metaTitle}
        description={activeCategory ? `Browse SIDDI ${title.toLowerCase()} specifications.` : 'Browse SIDDI architectural door hardware and bathroom fitting specifications by category, finish and series.'}
      />
      <div className="spec-container catalogue">
        <nav className="catalogue__breadcrumb mono-label" aria-label="Breadcrumb">
          <Link to="/">Home</Link><span aria-hidden="true">/</span>
          {activeCategory ? <><Link to="/products">Catalogue</Link><span aria-hidden="true">/</span><span aria-current="page">{activeCategory.title}</span></> : <span aria-current="page">Catalogue</span>}
        </nav>
        <header className="catalogue__head">
          <h1>{title}</h1>
          <p>Browse architectural hardware by category, finish or series.</p>
        </header>

        <div className="catalogue__layout">
          <div className="catalogue-filter-controls">
            <button className="catalogue-filter-toggle" type="button" aria-expanded={filtersOpen} aria-controls="catalogue-filter-panel" onClick={() => setFiltersOpen((open) => !open)}>
              <svg className="catalogue-filter-toggle__icon" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="7" cy="5" r="1.5" fill="var(--ink-2)" stroke="currentColor" strokeWidth="1.5"/><circle cx="13" cy="10" r="1.5" fill="var(--ink-2)" stroke="currentColor" strokeWidth="1.5"/><circle cx="8" cy="15" r="1.5" fill="var(--ink-2)" stroke="currentColor" strokeWidth="1.5"/></svg>
              <span>Filter</span>
              {activeFilterCount > 0 && <span className="catalogue-filter-toggle__count">{activeFilterCount}</span>}
              <span className="catalogue-filter-toggle__state">{filtersOpen ? 'Close' : 'Open'}</span>
            </button>
            {activeFilterCount > 0 && <button className="catalogue-clear-filters" type="button" onClick={handleReset}>Clear filters</button>}
          </div>
          <div id="catalogue-filter-panel" hidden={!filtersOpen}>
          <ProductFilters
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            selectedCategories={selectedCategories}
            onCategoriesChange={handleCategoriesChange}
            selectedFinishes={selectedFinishes}
            onFinishesChange={handleFinishesChange}
            selectedSeries={selectedSeries}
            onSeriesChange={handleSeriesChange}
          />
          </div>
          <section className="catalogue__results" aria-label="Catalogue products">
            <div className="catalogue__results-head">
              <p aria-live="polite"><span className="tabular-nums">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'product' : 'products'}</p>
              <label className="catalogue__sort mono-label" htmlFor="catalogue-sort">
                Sort
                <select id="catalogue-sort" value={sortBy} onChange={(event) => handleSortChange(event.target.value)}>
                  <option value="featured">Featured</option>
                  <option value="name-asc">Name, A–Z</option>
                  <option value="name-desc">Name, Z–A</option>
                  <option value="series">Series</option>
                </select>
              </label>
            </div>
            <ProductGrid
              products={filteredProducts}
              columns={3}
              className="catalogue__grid"
              emptyMessage="No products match these filters. Clear them to see the full catalogue."
              onClearFilters={handleReset}
            />
          </section>
        </div>
      </div>
    </div>
  );
};
