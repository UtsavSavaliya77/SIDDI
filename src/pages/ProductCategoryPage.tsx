import React, { useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { CategoryHero } from '../components/products/CategoryHero';
import { ProductGrid } from '../components/products/ProductGrid';
import { EnquiryCTA } from '../components/common/EnquiryCTA';
import { CATEGORIES } from '../data/categories';
import { DEMO_PRODUCTS } from '../data/products';
import { ArrowRight } from '@phosphor-icons/react';
import { ScrollReveal, TextReveal, ScrollRevealStagger, ScrollRevealItem } from '../components/common/ScrollReveal';
import { Meta } from '../components/common/Meta';

export const ProductCategoryPage: React.FC = () => {
  const { category: categorySlug } = useParams<{ category: string }>();

  const currentCategory = useMemo(() => {
    return CATEGORIES.find((c) => c.slug === categorySlug);
  }, [categorySlug]);

  const categoryIndex = useMemo(() => {
    const idx = CATEGORIES.findIndex((c) => c.slug === categorySlug);
    return idx >= 0 ? idx + 1 : 1;
  }, [categorySlug]);

  const categoryProducts = useMemo(() => {
    return DEMO_PRODUCTS.filter((p) => p.categorySlug === categorySlug);
  }, [categorySlug]);

  const otherCategories = useMemo(() => {
    return CATEGORIES.filter((c) => c.slug !== categorySlug);
  }, [categorySlug]);

  if (!currentCategory) {
    return <Navigate to="/products" replace />;
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <Meta
        title={`${currentCategory.title} — SIDDI Architectural Hardware`}
        description={currentCategory.description || `${currentCategory.title} architectural hardware specification.`}
      />
      {/* Category Architectural Hero */}
      <CategoryHero
        category={currentCategory}
        categoryIndex={categoryIndex}
        totalProducts={categoryProducts.length}
      />

      {/* Main Category Body */}
      <div id="specifications-grid" className="w-full px-4 sm:px-6 md:px-10 lg:px-16 pt-10 pb-24">

        {/* Product Grid */}
        <ScrollReveal className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <TextReveal
              as="h2"
              text={`Catalogue Specifications (${categoryProducts.length})`}
              className="text-2xl font-normal text-[#111111]"
            />
            <Link
              to="/products"
              className="text-xs uppercase tracking-wider font-semibold text-[#777777] hover:text-[#111111]"
            >
              &larr; All Hardware Systems
            </Link>
          </div>

          <ProductGrid products={categoryProducts} columns={3} />
        </ScrollReveal>

        {/* Related Categories Navigation */}
        <ScrollReveal className="pt-16 border-t border-[#111111]/10">
          <TextReveal
            as="h3"
            text="Explore Other Hardware Systems"
            className="text-xl font-normal text-[#111111] mb-6"
          />
          <ScrollRevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08} once={true}>
            {otherCategories.slice(0, 3).map((cat) => (
              <ScrollRevealItem key={cat.id}>
                <Link
                  to={`/products/${cat.slug}`}
                  className="group p-5 bg-white border border-[#111111]/10 hover:border-[#111111] transition-all flex items-center justify-between h-full"
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
              </ScrollRevealItem>
            ))}
          </ScrollRevealStagger>
        </ScrollReveal>

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
