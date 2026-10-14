import React from 'react';
import { MagnifyingGlass, X } from '@phosphor-icons/react';
import { CATEGORIES } from '../../data/categories';
import { FINISHES } from '../../data/products';

interface ProductFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (categorySlug: string) => void;
  selectedFinish: string;
  onFinishChange: (finishId: string) => void;
  sortBy: string;
  onSortChange: (sortBy: string) => void;
  onReset: () => void;
  totalResults: number;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedFinish,
  onFinishChange,
  sortBy,
  onSortChange,
  onReset,
  totalResults
}) => {
  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'all' || selectedFinish !== 'all';

  return (
    <div className="bg-white border border-[#111111]/10 p-6 mb-10 space-y-6">
      
      {/* Search & Sort Row */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        
        {/* Search Input */}
        <div className="md:col-span-8 relative">
          <MagnifyingGlass className="w-4 h-4 text-[#777777] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search door handles, towel rails, mortise locks, accessories..."
            className="w-full pl-10 pr-10 py-3 bg-[#FAF9F6] border border-[#111111]/15 text-sm text-[#111111] placeholder-[#777777] focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="md:col-span-4 flex items-center justify-end gap-3">
          <label htmlFor="sort-select" className="text-xs uppercase tracking-wider text-[#777777] whitespace-nowrap">
            Sort by:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="py-3 px-4 bg-[#FAF9F6] border border-[#111111]/15 text-xs uppercase tracking-wider text-[#111111] focus:outline-none focus:border-[#111111] cursor-pointer"
          >
            <option value="featured">Featured First</option>
            <option value="name-asc">Alphabetical (A - Z)</option>
            <option value="name-desc">Alphabetical (Z - A)</option>
            <option value="series">By Product Series</option>
          </select>
        </div>

      </div>

      {/* Category Pills & Finish Swatches */}
      <div className="pt-4 border-t border-[#111111]/10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-[#777777] mr-2 font-semibold">
            Category:
          </span>
          <button
            type="button"
            onClick={() => onCategoryChange('all')}
            className={`px-3 py-1.5 text-xs uppercase tracking-wider border transition-colors cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#111111] text-white border-[#111111]'
                : 'bg-transparent text-[#777777] border-black/10 hover:border-black/30'
            }`}
          >
            All Hardware
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => onCategoryChange(cat.slug)}
              className={`px-3 py-1.5 text-xs uppercase tracking-wider border transition-colors cursor-pointer ${
                selectedCategory === cat.slug
                  ? 'bg-[#111111] text-white border-[#111111]'
                  : 'bg-transparent text-[#777777] border-black/10 hover:border-black/30'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Finish Filter Swatches */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs uppercase tracking-widest text-[#777777] mr-1 font-semibold">
            Finish:
          </span>
          <button
            type="button"
            onClick={() => onFinishChange('all')}
            className={`px-2.5 py-1 text-[11px] uppercase tracking-wider border cursor-pointer ${
              selectedFinish === 'all'
                ? 'bg-[#111111] text-white border-[#111111]'
                : 'text-[#777777] border-black/10'
            }`}
          >
            All
          </button>
          {FINISHES.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => onFinishChange(f.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1 border text-[11px] cursor-pointer transition-all ${
                selectedFinish === f.id
                  ? 'border-[#111111] ring-1 ring-[#111111] bg-black/5 font-semibold text-[#111111]'
                  : 'border-black/10 text-[#777777] hover:border-black/30'
              }`}
              title={f.name}
            >
              <span
                className="w-2.5 h-2.5 rounded-full border border-black/20"
                style={{ backgroundColor: f.hex }}
              />
              <span className="hidden sm:inline">{f.name}</span>
            </button>
          ))}
        </div>

      </div>

      {/* Active State Bar */}
      <div className="flex items-center justify-between text-xs text-[#777777] pt-2">
        <div>
          Showing <span className="font-semibold text-[#111111]">{totalResults}</span> matching products
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1 text-[#F2B705] hover:underline uppercase tracking-wider font-semibold cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>

    </div>
  );
};
