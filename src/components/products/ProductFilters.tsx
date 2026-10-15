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
          className="w-full flex items-center justify-between p-4 bg-white border border-[#111111]/15 text-xs uppercase tracking-wider font-semibold text-[#111111] shadow-xs cursor-pointer"
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

      {/* Main Filterbar Container */}
      <div
        className={`${
          mobileOpen ? 'block' : 'hidden'
        } lg:block bg-white border border-[#111111]/10 p-5 xl:p-6 shadow-xs divide-y divide-[#111111]/10 space-y-6 relative z-20`}
      >
        {/* Header Section */}
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#F2B705]" />
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#111111] font-mono">
              Filter Bar
            </h3>
          </div>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-[#777777] hover:text-[#111111] transition-colors cursor-pointer"
              title="Reset all filters"
            >
              <RotateCcw className="w-3 h-3 text-[#F2B705]" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Live Search Field */}
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-widest text-[#777777]">
            Search Hardware
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-[#777777] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Model, series, or finish..."
              className="w-full pl-9 pr-8 py-2.5 bg-[#FAF9F6] border border-[#111111]/15 text-xs text-[#111111] placeholder-[#777777] focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111] transition-colors"
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

        {/* Hardware Systems / Category Select2 Dropdown */}
        <div>
          <Select2MultiDropdown
            label="Hardware Categories"
            placeholder="Select collections..."
            options={categoryOptions}
            selectedIds={selectedCategories}
            onChange={onCategoriesChange}
            icon={<Layers className="w-3.5 h-3.5" />}
          />
        </div>

        {/* Finish & Color Select2 Dropdown (Multi-select 2, 3+ colors with checkboxes) */}
        <div>
          <Select2MultiDropdown
            label="Finishes & Colors"
            placeholder="Select finishes (e.g. 2-3 colors)..."
            options={finishOptions}
            selectedIds={selectedFinishes}
            onChange={onFinishesChange}
            icon={<Palette className="w-3.5 h-3.5" />}
          />
        </div>

        {/* Product Series Select2 Dropdown */}
        {onSeriesChange && (
          <div>
            <Select2MultiDropdown
              label="Design Series"
              placeholder="Select series..."
              options={seriesOptions}
              selectedIds={selectedSeries}
              onChange={onSeriesChange}
              icon={<Sparkles className="w-3.5 h-3.5" />}
            />
          </div>
        )}

        {/* Sort Order Dropdown */}
        <div>
          <label htmlFor="sidebar-sort-select" className="block text-[11px] font-mono uppercase tracking-widest text-[#777777]">
            Sort Specifications
          </label>
          <select
            id="sidebar-sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full py-2.5 px-3 bg-[#FAF9F6] border border-[#111111]/15 text-xs uppercase tracking-wider text-[#111111] focus:outline-none focus:border-[#111111] cursor-pointer"
          >
            <option value="featured">Featured First</option>
            <option value="name-asc">Alphabetical (A - Z)</option>
            <option value="name-desc">Alphabetical (Z - A)</option>
            <option value="series">By Product Series</option>
          </select>
        </div>

        {/* Active Results Summary & Reset All Button */}
        <div>
          <div className="text-xs text-[#777777]">
            Showing <span className="font-semibold text-[#111111] font-mono">{totalResults}</span> matching hardware items
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onReset}
              className="w-full py-2.5 px-3 bg-white border border-[#111111]/20 hover:border-[#111111] text-xs font-semibold uppercase tracking-wider text-[#111111] hover:bg-[#111111] hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#F2B705]" />
              <span>Clear All Filters</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
