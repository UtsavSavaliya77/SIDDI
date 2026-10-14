import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SectionHeading } from '../components/common/SectionHeading';
import { ProductFilters } from '../components/products/ProductFilters';
import { ProductGrid } from '../components/products/ProductGrid';
import { EnquiryCTA } from '../components/common/EnquiryCTA';
import { DEMO_PRODUCTS } from '../data/products';

export const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryParam = searchParams.get('category') || 'all';
  const finishParam = searchParams.get('finish') || 'all';
  const queryParam = searchParams.get('q') || '';
  const sortParam = searchParams.get('sort') || 'featured';

  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedFinish, setSelectedFinish] = useState(finishParam);
  const [sortBy, setSortBy] = useState(sortParam);

  // Sync state to URL params when filters change
  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    updateParams({ category: cat !== 'all' ? cat : null });
  };

  const handleFinishChange = (finish: string) => {
    setSelectedFinish(finish);
    updateParams({ finish: finish !== 'all' ? finish : null });
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
    setSelectedCategory('all');
    setSelectedFinish('all');
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

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return DEMO_PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.categorySlug !== selectedCategory) {
        return false;
      }
      // Finish filter
      if (selectedFinish !== 'all') {
        const hasFinish = product.finishes.some((f) => f.id === selectedFinish);
        if (!hasFinish) return false;
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
  }, [selectedCategory, selectedFinish, searchQuery, sortBy]);

  return (
    <div className="min-h-screen pt-28 md:pt-36 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: 'Product Catalogue' }]} className="mb-6" />

        {/* Page Heading */}
        <SectionHeading
          eyebrow="Architectural Catalogue"
          title="Architectural Hardware & Bathroom Fittings"
          description="Browse our comprehensive catalogue of precision-forged door handles, security mortise systems, and luxury bathroom accessories. All models available for specification takeoffs."
        />

        {/* Informative demonstration data banner */}
        <div className="mb-8 p-4 bg-amber-500/10 border-l-4 border-[#F2B705] text-xs text-[#111111] flex items-center justify-between flex-wrap gap-2">
          <div>
            <span className="font-semibold text-black uppercase tracking-wider mr-2 font-mono">Specification Notice:</span>
            Demonstration catalogue items represent proposed SIDDI production specifications. To confirm current stock availability or order custom finishes, submit a schedule enquiry.
          </div>
        </div>

        {/* Filter controls */}
        <ProductFilters
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          selectedFinish={selectedFinish}
          onFinishChange={handleFinishChange}
          sortBy={sortBy}
          onSortChange={handleSortChange}
          onReset={handleReset}
          totalResults={filteredProducts.length}
        />

        {/* Products Grid */}
        <ProductGrid products={filteredProducts} columns={3} />

      </div>

      {/* Enquiry Call to action */}
      <EnquiryCTA
        title="Need Technical Drawings or Hardware Schedules?"
        description="Our specification team produces door-by-door schedules, finish boards, and CAD templates for architects and developers."
      />
    </div>
  );
};
