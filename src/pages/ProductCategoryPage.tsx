import React, { useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ProductGrid } from '../components/products/ProductGrid';
import { EnquiryCTA } from '../components/common/EnquiryCTA';
import { CATEGORIES } from '../data/categories';
import { DEMO_PRODUCTS } from '../data/products';
import { ArrowRight } from '@phosphor-icons/react';

export const ProductCategoryPage: React.FC = () => {
  const { category: categorySlug } = useParams<{ category: string }>();

  const currentCategory = useMemo(() => {
    return CATEGORIES.find((c) => c.slug === categorySlug);
  }, [categorySlug]);

  if (!currentCategory) {
    return <Navigate to="/products" replace />;
  }

  const categoryProducts = useMemo(() => {
    return DEMO_PRODUCTS.filter((p) => p.categorySlug === categorySlug);
  }, [categorySlug]);

  const otherCategories = CATEGORIES.filter((c) => c.slug !== categorySlug);

  return (
    <div className="min-h-screen pt-28 md:pt-36 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        
        {/* Breadcrumb navigation */}
        <Breadcrumbs
          items={[
            { label: 'Products', to: '/products' },
            { label: currentCategory.title }
          ]}
          className="mb-8"
        />

        {/* Category Editorial Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16 pb-12 border-b border-[#111111]/10">
          
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-6 h-[1.5px] bg-[#F2B705]" />
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#F2B705]">
                Hardware Collection
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-normal leading-tight text-[#111111]">
              {currentCategory.title}
            </h1>
            
            <p className="text-base sm:text-lg text-[#777777] leading-relaxed">
              {currentCategory.description}
            </p>

            <div className="p-4 bg-white border border-[#111111]/10 text-xs text-[#777777] font-mono leading-relaxed">
              <span className="text-black font-semibold uppercase tracking-wider block mb-1">
                Specification Note:
              </span>
              {currentCategory.editorialNote}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[16/10] border border-[#111111]/10 overflow-hidden shadow-md">
              <img
                src={currentCategory.heroImage}
                alt={currentCategory.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>

        {/* Product Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-normal text-[#111111]">
              Catalogue Specifications ({categoryProducts.length})
            </h2>
            <Link
              to="/products"
              className="text-xs uppercase tracking-wider font-semibold text-[#777777] hover:text-[#111111]"
            >
              &larr; All Hardware Systems
            </Link>
          </div>

          <ProductGrid products={categoryProducts} columns={3} />
        </div>

        {/* Related Categories Navigation */}
        <div className="pt-16 border-t border-[#111111]/10">
          <h3 className="text-xl font-normal text-[#111111] mb-6">
            Explore Other Hardware Systems
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherCategories.slice(0, 3).map((cat) => (
              <Link
                key={cat.id}
                to={`/products/${cat.slug}`}
                className="group p-5 bg-white border border-[#111111]/10 hover:border-[#111111] transition-all flex items-center justify-between"
              >
                <div>
                  <h4 className="text-sm font-semibold text-[#111111] group-hover:text-[#F2B705] transition-colors">
                    {cat.title}
                  </h4>
                  <span className="text-xs text-[#777777] line-clamp-1">
                    {cat.subtitle}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#777777] group-hover:text-[#111111] group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>

      </div>

      {/* Category Enquiry */}
      <EnquiryCTA
        title={`Inquire About ${currentCategory.title}`}
        description="Looking for specific dimensions, finish matching, or volume commercial quotes for this collection? Send us your requirement."
        categoryInterest={currentCategory.title}
      />
    </div>
  );
};
