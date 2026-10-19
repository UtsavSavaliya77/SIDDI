import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, Search, X, RotateCcw, ChevronDown, Layers, Palette, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { FINISHES, DEMO_PRODUCTS } from '../../data/products';
import { Select2MultiDropdown, type Select2Option } from './Select2MultiDropdown';

interface ProductFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategories: string[];
  onCategoriesChange: (categorySlugs: string[]) => void;
  selectedFinishes: string[];
  onFinishesChange: (finishIds: string[]) => void;
  selectedSeries?: string[];
  onSeriesChange?: (seriesNames: string[]) => void;
  sortBy: string;
  onSortChange: (sortBy: string) => void;
  onReset: () => void;
  totalResults: number;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategories,
  onCategoriesChange,
  selectedFinishes,
  onFinishesChange,
  selectedSeries = [],
  onSeriesChange,
  sortBy,
  onSortChange,
  onReset,
  totalResults
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Prepare Select2 Options for Categories
  const categoryOptions: Select2Option[] = useMemo(() => {
    return CATEGORIES.map((cat) => ({
      id: cat.slug,
      label: cat.title,
      count: DEMO_PRODUCTS.filter((p) => p.categorySlug === cat.slug).length,
    }));
  }, []);

  // Prepare Select2 Options for Finishes / Colors
  const finishOptions: Select2Option[] = useMemo(() => {
    return FINISHES.map((f) => ({
      id: f.id,
      label: f.name,
      colorHex: f.hex,
      count: DEMO_PRODUCTS.filter((p) => p.finishes.some((pf) => pf.id === f.id)).length,
    }));
  }, []);

  // Prepare Select2 Options for Product Series
  const seriesOptions: Select2Option[] = useMemo(() => {
    const uniqueSeries = Array.from(new Set(DEMO_PRODUCTS.map((p) => p.series)));
    return uniqueSeries.map((s) => ({
      id: s,
      label: s,
      count: DEMO_PRODUCTS.filter((p) => p.series === s).length,
    }));
  }, []);

  const activeFilterCount =
    (searchQuery.trim() !== '' ? 1 : 0) +
    selectedCategories.length +
    selectedFinishes.length +
    selectedSeries.length +
    (sortBy !== 'featured' ? 1 : 0);

  const hasActiveFilters = activeFilterCount > 0;

  return (
    <div className="w-full">
      {/* Mobile Accordion Toggle Button */}
      <div className="lg:hidden mb-4">
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-full flex items-center justify-between p-4 bg-white border border-[#111111]/15 text-xs uppercase tracking-wider font-semibold text-[#111111] shadow-xs cursor-pointer rounded-[11px]"
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#F2B705]" />
            <span>Filter Catalogue</span>
            {hasActiveFilters && (
              <span className="bg-[#111111] text-[#F2B705] text-[10px] px-2 py-0.5 rounded-full font-mono">
                {activeFilterCount}
              </span>
            )}
          </span>
          <span className="flex items-center gap-1 text-[#777777]">
            <span>{mobileOpen ? 'Hide Filters' : 'Show Filters'}</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileOpen ? 'rotate-180' : ''}`} />
          </span>
        </button>
      </div>

      {/* Main Filterbar Container - Full Width Horizontal Layout */}
      <div
        className={`${
          mobileOpen ? 'block' : 'hidden'
        } lg:block bg-white border border-[#111111]/10 p-5 lg:p-6 rounded-2xl shadow-sm relative z-30 space-y-4`}
      >
        {/* Top Header Row with Status & Reset */}
        <div className="flex items-center justify-between pb-3 border-b border-[#111111]/10 flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#F2B705]" />
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#111111] font-mono flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#F2B705]" />
              <span>Hardware Specification Filters</span>
            </h3>
            <span className="text-xs text-[#777777] font-mono">
              ({totalResults} {totalResults === 1 ? 'Product' : 'Products'})
            </span>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-neutral-100 border border-[#111111]/20 text-[#111111] text-xs font-mono font-semibold uppercase tracking-wider rounded-[11px] transition-colors cursor-pointer"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#F2B705]" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* 5-Column Responsive Filter Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          {/* 1. Live Search Field */}
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-widest text-[#777777] mb-1.5">
              Search Hardware
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-[#777777] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Model, series, finish..."
                className="w-full pl-9 pr-8 py-2.5 bg-[#FAF9F6] border border-[#111111]/15 text-xs text-[#111111] placeholder-[#777777] focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111] transition-colors rounded-[11px]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* 2. Hardware Categories Dropdown */}
          <div>
            <Select2MultiDropdown
              label="Categories"
              placeholder="All Collections..."
              options={categoryOptions}
              selectedIds={selectedCategories}
              onChange={onCategoriesChange}
              icon={<Layers className="w-3.5 h-3.5" />}
            />
          </div>

          {/* 3. Finishes & Colors Dropdown */}
          <div>
            <Select2MultiDropdown
              label="Finishes & Colors"
              placeholder="All Finishes..."
              options={finishOptions}
              selectedIds={selectedFinishes}
              onChange={onFinishesChange}
              icon={<Palette className="w-3.5 h-3.5" />}
            />
          </div>

          {/* 4. Product Series Dropdown */}
          {onSeriesChange && (
            <div>
              <Select2MultiDropdown
                label="Design Series"
                placeholder="All Series..."
                options={seriesOptions}
                selectedIds={selectedSeries}
                onChange={onSeriesChange}
                icon={<Sparkles className="w-3.5 h-3.5" />}
              />
            </div>
          )}

          {/* 5. Sort Order Dropdown */}
          <div>
            <label htmlFor="topbar-sort-select" className="block text-[11px] font-mono uppercase tracking-widest text-[#777777] mb-1.5">
              Sort Specifications
            </label>
            <select
              id="topbar-sort-select"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full py-2.5 px-3 bg-[#FAF9F6] border border-[#111111]/15 text-xs uppercase tracking-wider text-[#111111] focus:outline-none focus:border-[#111111] cursor-pointer rounded-[11px]"
            >
              <option value="featured">Featured First</option>
              <option value="name-asc">Alphabetical (A - Z)</option>
              <option value="name-desc">Alphabetical (Z - A)</option>
              <option value="series">By Product Series</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
