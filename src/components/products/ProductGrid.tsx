import React from 'react';
import type { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { Button } from '../common/Button';

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
  columns?: 2 | 3 | 4;
  className?: string;
  variant?: 'tilt' | 'notched' | 'classic';
  surface?: string;
  onClearFilters?: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  emptyMessage = "No hardware items match the selected filter criteria.",
  columns = 3,
  className = "",
  onClearFilters,
}) => {
  if (products.length === 0) {
    return (
      <div className="product-grid-empty">
        <h4>No products found</h4>
        <p>
          {emptyMessage}
        </p>
        {onClearFilters && <Button variant="outline" onClick={onClearFilters}>Clear filters</Button>}
      </div>
    );
  }

  const gridColsClass = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }[columns];

  return (
    <div className={`grid ${gridColsClass} gap-6 md:gap-8 ${className}`}>
      {products.map((product) => (
        <div key={product.id} className="product-grid__item">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};
