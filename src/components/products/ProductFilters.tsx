import React, { useMemo } from 'react';
import { CATEGORIES } from '../../data/categories';
import { FINISHES, DEMO_PRODUCTS } from '../../data/products';
import { Select2MultiDropdown } from './Select2MultiDropdown';

interface ProductFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategories: string[];
  onCategoriesChange: (categorySlugs: string[]) => void;
  selectedFinishes: string[];
  onFinishesChange: (finishIds: string[]) => void;
  selectedSeries: string[];
  onSeriesChange: (seriesNames: string[]) => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategories,
  onCategoriesChange,
  selectedFinishes,
  onFinishesChange,
  selectedSeries,
  onSeriesChange,
}) => {
  const categoryOptions = useMemo(() => CATEGORIES.map((category) => ({
    ...category,
    count: DEMO_PRODUCTS.filter((product) => product.categorySlug === category.slug).length,
  })), []);
  const finishOptions = useMemo(() => FINISHES.map((finish) => ({
    ...finish,
    count: DEMO_PRODUCTS.filter((product) => product.finishes.some((item) => item.id === finish.id)).length,
  })).filter((finish) => finish.count > 0), []);
  const seriesOptions = useMemo(() => Array.from(new Set(DEMO_PRODUCTS.map((product) => product.series))).sort(), []);

  return (
    <aside className="catalogue-filter" aria-label="Filter products">
      <div className="catalogue-filter__search">
        <label className="mono-label" htmlFor="catalogue-search">Search</label>
        <input
          id="catalogue-search"
          type="search"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Name, series or category"
        />
      </div>

      <section className="catalogue-filter__group" aria-label="Filter by category">
        <Select2MultiDropdown
          label="Category"
          placeholder="All categories"
          options={categoryOptions.map((category) => ({ id: category.slug, label: category.title, count: category.count }))}
          selectedIds={selectedCategories}
          onChange={onCategoriesChange}
          theme="light"
        />
      </section>

      <section className="catalogue-filter__group" aria-label="Filter by finish">
        <Select2MultiDropdown
          label="Finish"
          placeholder="All finishes"
          options={finishOptions.map((finish) => ({ id: finish.id, label: finish.name, count: finish.count, colorHex: finish.hex }))}
          selectedIds={selectedFinishes}
          onChange={onFinishesChange}
          theme="light"
        />
      </section>

      <section className="catalogue-filter__group catalogue-filter__series-group" aria-label="Filter by series">
        <Select2MultiDropdown
          label="Series"
          placeholder="All series"
          options={seriesOptions.map((series) => ({ id: series, label: series }))}
          selectedIds={selectedSeries}
          onChange={onSeriesChange}
          theme="light"
        />
      </section>
    </aside>
  );
};
