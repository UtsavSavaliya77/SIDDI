import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductsHero } from '../components/products/ProductsHero';
import { ProductFilters } from '../components/products/ProductFilters';
import { ProductGrid } from '../components/products/ProductGrid';
import { EnquiryCTA } from '../components/common/EnquiryCTA';
import { DEMO_PRODUCTS, FINISHES } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { X } from 'lucide-react';

export const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryParam = searchParams.get('category');
  const finishParam = searchParams.get('finish');
  const seriesParam = searchParams.get('series');
  const queryParam = searchParams.get('q') || '';
  const sortParam = searchParams.get('sort') || 'featured';

  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam && categoryParam !== 'all' ? categoryParam.split(',').filter(Boolean) : []
  );
  const [selectedFinishes, setSelectedFinishes] = useState<string[]>(
    finishParam && finishParam !== 'all' ? finishParam.split(',').filter(Boolean) : []
  );
  const [selectedSeries, setSelectedSeries] = useState<string[]>(
    seriesParam && seriesParam !== 'all' ? seriesParam.split(',').filter(Boolean) : []
  );
  const [sortBy, setSortBy] = useState(sortParam);

  // Sync state to URL params when filters change
  const handleCategoriesChange = (categories: string[]) => {
    setSelectedCategories(categories);
    updateParams({ category: categories.length > 0 ? categories.join(',') : null });
  };

  const handleFinishesChange = (finishes: string[]) => {
    setSelectedFinishes(finishes);
    updateParams({ finish: finishes.length > 0 ? finishes.join(',') : null });
  };

  const handleSeriesChange = (series: string[]) => {
    setSelectedSeries(series);
    updateParams({ series: series.length > 0 ? series.join(',') : null });
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    updateParams({ q: query || null });
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    updateParams({ sort: sort !== 'featured' ? sort : null });
  };

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedFinishes([]);
    setSelectedSeries([]);
    setSortBy('featured');
    setSearchParams({});
  };

  const updateParams = (newParams: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([k, v]) => {
      if (v) params.set(k, v);
      else params.delete(k);
    });
    setSearchParams(params);
  };

  // Filter and sort products across multi-selection
  const filteredProducts = useMemo(() => {
    return DEMO_PRODUCTS.filter((product) => {
      // Category filter (match any of selected categories)
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.categorySlug)) {
        return false;
      }
      // Finish filter (match any of selected finishes, e.g. 2-3 colors)
      if (selectedFinishes.length > 0) {
        const hasMatchingFinish = product.finishes.some((f) => selectedFinishes.includes(f.id));
        if (!hasMatchingFinish) return false;
      }
      // Series filter
      if (selectedSeries.length > 0 && !selectedSeries.includes(product.series)) {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesSeries = product.series.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesCat = product.category.toLowerCase().includes(q);
        if (!matchesName && !matchesSeries && !matchesDesc && !matchesCat) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      if (sortBy === 'series') return a.series.localeCompare(b.series);
      // Default: featured first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, [selectedCategories, selectedFinishes, selectedSeries, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      {/* Architectural Hero Section */}
      <ProductsHero
        selectedCategory={selectedCategories.length === 1 ? selectedCategories[0] : selectedCategories.length === 0 ? 'all' : ''}
        onSelectCategory={(slug) => handleCategoriesChange(slug === 'all' ? [] : [slug])}
        totalCount={DEMO_PRODUCTS.length}
      />

      {/* Main Product Listing Container */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-8 pb-24">
        
        {/* Informative demonstration data banner */}
        <div className="mb-8 p-4 bg-white border border-[#111111]/10 border-l-4 border-l-[#F2B705] text-xs text-[#111111] flex items-center justify-between flex-wrap gap-2 shadow-xs">
          <div>
            <span className="font-semibold text-black uppercase tracking-wider mr-2 font-mono">Specification Notice:</span>
            Demonstration catalogue items represent proposed SIDDI production specifications. To confirm current stock availability or order custom finishes, submit a schedule enquiry.
          </div>
        </div>

        {/* 1. FILTERBAR FIRST (TOP FULL-WIDTH) */}
        <div className="mb-6 relative z-30">
          <ProductFilters
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            selectedCategories={selectedCategories}
            onCategoriesChange={handleCategoriesChange}
            selectedFinishes={selectedFinishes}
            onFinishesChange={handleFinishesChange}
            selectedSeries={selectedSeries}
            onSeriesChange={handleSeriesChange}
            sortBy={sortBy}
            onSortChange={handleSortChange}
            onReset={handleReset}
            totalResults={filteredProducts.length}
          />
        </div>

        {/* Active Filter Badges Bar (when filters are active) */}
        {(searchQuery || selectedCategories.length > 0 || selectedFinishes.length > 0 || selectedSeries.length > 0) && (
          <div className="bg-white border border-[#111111]/10 px-5 py-3.5 mb-8 rounded-[11px] flex items-center justify-between flex-wrap gap-3 shadow-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#777777] mr-1 font-semibold">
                Active Filters:
              </span>

              {/* Active Category Badges */}
              {selectedCategories.map((catSlug) => {
                const cat = CATEGORIES.find((c) => c.slug === catSlug);
                return (
                  <span
                    key={catSlug}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FAF9F6] border border-[#111111]/15 text-xs text-[#111111] rounded-[11px]"
                  >
                    <span>{cat?.title || catSlug}</span>
                    <button
                      type="button"
                      onClick={() => handleCategoriesChange(selectedCategories.filter((id) => id !== catSlug))}
                      className="text-[#777777] hover:text-[#111111] cursor-pointer"
                      aria-label={`Remove ${cat?.title} filter`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                );
              })}

              {/* Active Finish Badges */}
              {selectedFinishes.map((finishId) => {
                const finish = FINISHES.find((f) => f.id === finishId);
                return (
                  <span
                    key={finishId}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FAF9F6] border border-[#111111]/15 text-xs text-[#111111] rounded-[11px]"
                  >
                    {finish && (
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-black/20 shrink-0"
                        style={{ backgroundColor: finish.hex }}
                      />
                    )}
                    <span>{finish?.name || finishId}</span>
                    <button
                      type="button"
                      onClick={() => handleFinishesChange(selectedFinishes.filter((id) => id !== finishId))}
                      className="text-[#777777] hover:text-[#111111] cursor-pointer"
                      aria-label={`Remove ${finish?.name} filter`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                );
              })}

              {/* Active Series Badges */}
              {selectedSeries.map((seriesName) => (
                <span
                  key={seriesName}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FAF9F6] border border-[#111111]/15 text-xs text-[#111111] rounded-[11px]"
                >
                  <span>Series: {seriesName}</span>
                  <button
                    type="button"
                    onClick={() => handleSeriesChange(selectedSeries.filter((s) => s !== seriesName))}
                    className="text-[#777777] hover:text-[#111111] cursor-pointer"
                    aria-label={`Remove ${seriesName} filter`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              {/* Active Search Query Badge */}
              {searchQuery && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FAF9F6] border border-[#111111]/15 text-xs text-[#111111] rounded-[11px]">
                  <span>Search: "{searchQuery}"</span>
                  <button
                    type="button"
                    onClick={() => handleSearchChange('')}
                    className="text-[#777777] hover:text-[#111111] cursor-pointer"
                    aria-label="Clear search"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#777777] hover:text-[#111111] transition-colors cursor-pointer"
            >
              Clear All
            </button>
          </div>
        )}

        {/* 2. BELOW: PRODUCT SPECIFICATION DISPLAY CARDS */}
        <main className="w-full">
          <ProductGrid products={filteredProducts} columns={3} />
        </main>
      </div>

      {/* Enquiry Call to action */}
      <EnquiryCTA
        title="Need Technical Drawings or Hardware Schedules?"
        description="Our specification team produces door-by-door schedules, finish boards, and CAD templates for architects and developers."
      />
    </div>
  );
};
