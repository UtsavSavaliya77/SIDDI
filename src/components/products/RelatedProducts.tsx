import React from 'react';
import type { Product } from '../../types';
import { ProductCard } from './ProductCard';

interface RelatedProductsProps {
  products: Product[];
  currentProductId: string;
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({ products, currentProductId }) => {
  const filtered = products.filter((p) => p.id !== currentProductId).slice(0, 3);

  if (filtered.length === 0) return null;

  return (
    <section className="mt-20 pt-16 border-t border-[#111111]/10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#F2B705] font-semibold block mb-1">
            Complementary Hardware
          </span>
          <h3 className="text-2xl md:text-3xl font-normal text-[#111111]">
            Related Specifications
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
