import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Plus } from '@phosphor-icons/react';
import { RollLabel } from '../common/Button';
import { FinishOptionWheel } from './FinishOptionWheel';
import type { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className = '' }) => {
  const firstPhotographedFinish = product.finishes.find((finish) => product.imagesByFinish[finish.id]);
  const [selectedFinish, setSelectedFinish] = useState(firstPhotographedFinish?.id ?? product.finishes[0]?.id ?? '');
  const [showAllFinishes, setShowAllFinishes] = useState(false);
  const image = product.imagesByFinish[selectedFinish] ?? (selectedFinish ? undefined : product.images[0]);

  const maxVisibleSwatches = 4;
  const hasExtraFinishes = product.finishes.length > maxVisibleSwatches;
  const visibleFinishes = showAllFinishes || !hasExtraFinishes
    ? product.finishes
    : product.finishes.slice(0, maxVisibleSwatches);
  const remainingCount = product.finishes.length - maxVisibleSwatches;

  return (
    <article id={`product-${product.slug}`} className={`product-card ${className}`}>
      <div className="product-card__main">
        <div className="product-card__stage">
          {image ? (
            <img key={`${product.slug}-${selectedFinish}`} src={image} alt={`${product.name} in ${product.finishes.find((finish) => finish.id === selectedFinish)?.name ?? 'shown finish'}`} loading="lazy" width="1200" height="900" />
          ) : (
            <div key={`${product.slug}-${selectedFinish}`} className="product-card__placeholder" role="img" aria-label={`Photo needed for ${product.name}`}>
              <span className="mono-label">Photo needed</span>
              <p>{product.photoNeeded}</p>
            </div>
          )}
          {product.finishes.length > 0 && (
            <FinishOptionWheel
              finishes={product.finishes}
              selectedId={selectedFinish}
              onSelect={setSelectedFinish}
              productName={product.name}
            />
          )}
        </div>
      </div>
      <div className="product-card__copy">
        <span className="mono-label product-card__category">{product.category}</span>
        <Link to={`/product/${product.slug}`} className="product-card__title-link">
          <h3>{product.name}</h3>
        </Link>
        {product.finishes.length > 0 && (
          <div
            className="product-card__mobile-swatches"
            role="radiogroup"
            aria-label={`${product.name} finishes`}
          >
            {visibleFinishes.map((finish) => {
              const isSelected = selectedFinish === finish.id;
              return (
                <button
                  key={finish.id}
                  type="button"
                  className={`product-card__mobile-swatch${isSelected ? ' is-selected' : ''}`}
                  role="radio"
                  aria-checked={isSelected}
                  aria-label={`${finish.name}${isSelected ? ' (selected)' : ''}`}
                  title={finish.name}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedFinish(finish.id);
                  }}
                >
                  <span
                    className="product-card__mobile-swatch-dot"
                    style={{ backgroundColor: finish.hex }}
                  />
                </button>
              );
            })}
            {hasExtraFinishes && !showAllFinishes && (
              <button
                type="button"
                className="product-card__mobile-swatch-more"
                aria-label={`Show ${remainingCount} more finishes`}
                title={`+${remainingCount} more finishes`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowAllFinishes(true);
                }}
              >
                <Plus size={10} weight="bold" aria-hidden="true" />
                <span>{remainingCount}</span>
              </button>
            )}
          </div>
        )}
        <Link to={`/product/${product.slug}`} className="product-card__desc-link">
          <p>{product.shortDescription}</p>
        </Link>
      </div>
      <div className="product-card__footer">
        <Link to={`/product/${product.slug}`} className="product-card__spec-link roll-action">
          <RollLabel>View specs</RollLabel> <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
};
