import React from 'react';
import type { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { ScrollRevealStagger, ScrollRevealItem } from '../common/ScrollReveal';

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
  columns?: 2 | 3 | 4;
  className?: string;
  variant?: 'tilt' | 'notched' | 'classic';
  surface?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  emptyMessage = "No hardware items match the selected filter criteria.",
  columns = 3,
  className = "",
}) => {
  if (products.length === 0) {
    return (
      <div className="py-20 text-center border border-dashed border-[#111111]/20 p-8 my-8 bg-white/50">
        <h4 className="text-lg font-medium text-[#111111] mb-2">No Products Found</h4>
        <p className="text-sm text-[#777777] max-w-md mx-auto">
          {emptyMessage}
        </p>
      </div>
    );
  }

  const gridColsClass = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }[columns];

  return (
    <ScrollRevealStagger
      className={`grid ${gridColsClass} gap-6 md:gap-8 ${className}`}
      staggerDelay={0.08}
      once={true}
    >
      {products.map((product) => (
        <ScrollRevealItem key={product.id} distance={24} duration={0.6}>
          <ProductCard product={product} />
        </ScrollRevealItem>
      ))}
    </ScrollRevealStagger>
  );
};
