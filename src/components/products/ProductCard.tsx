import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { Product } from '../../types';
import { OptimizedTiltCard } from '../ui/optimized-tilt-card';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className = '' }) => {
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent) => {
    // If the click originated from an explicit link or button inside, let it handle its own navigation
    if ((e.target as HTMLElement).closest('a, button')) {
      return;
    }
    navigate(`/product/${product.slug}`);
  };

  return (
    <OptimizedTiltCard
      className={`h-full rounded-2xl border border-neutral-800 bg-[#141414] p-4 hover:border-[#F2B705]/40 transition-all duration-500 backdrop-blur-xl flex flex-col justify-between group/tilt cursor-pointer text-left ${className}`}
      sheenColor="rgba(242, 183, 5, 0.35)"
      onClick={handleCardClick}
    >
      <div className="flex flex-col flex-1">
        {/* Media Container */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#1C1C1C]">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover/tilt:scale-106"
          />

          {/* Badges Overlay */}
          <div className="pointer-events-none absolute inset-x-3 top-3 flex items-center justify-between">
           

            <span className="rounded-md border border-white/15 bg-black/60 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-neutral-300 backdrop-blur-md">
              {product.categorySlug.replace(/-/g, ' ')}
            </span>
          </div>

          {/* Interactive Disc nested inside cover */}
          <div
            className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white shadow-md backdrop-blur-md transition-all duration-300 group-hover/tilt:scale-110 group-hover/tilt:bg-[#F2B705] group-hover/tilt:text-black border border-white/15"
            aria-hidden="true"
          >
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/tilt:-translate-y-0.5 group-hover/tilt:translate-x-0.5" />
          </div>
        </div>

        {/* Content Section */}
        <div className="mt-4 flex flex-1 flex-col justify-between">
          <div>
            <div className="mb-1.5 flex items-center justify-between text-[11px] font-mono uppercase tracking-widest">
              <span className="text-[#F2B705]">{product.series}</span>
              <span className="text-[10px] text-neutral-400">PVD Engineered</span>
            </div>

            <h3 className="text-base font-semibold text-white transition-colors duration-200 group-hover/tilt:text-[#F2B705] line-clamp-1">
              <a
                href={`/product/${product.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/product/${product.slug}`);
                }}
                className="outline-none focus:underline"
              >
                {product.name}
              </a>
            </h3>

            <p className="mt-1.5 text-xs leading-relaxed text-neutral-400 line-clamp-2">
              {product.shortDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Footer Specification Details */}
      <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between">
        {/* Available finishes swatch dots */}
        <div className="flex items-center gap-1.5" title="Available Finishes">
          {product.finishes.map((finish) => (
            <span
              key={finish.id}
              className="h-3 w-3 rounded-full border border-white/30 shadow-xs"
              style={{ backgroundColor: finish.hex }}
              title={finish.name}
            />
          ))}
          <span className="ml-1 text-[10px] font-mono text-neutral-400">
            {product.finishes.length} Finishes
          </span>
        </div>

        <a
          href={`/product/${product.slug}`}
          onClick={(e) => {
            e.preventDefault();
            navigate(`/product/${product.slug}`);
          }}
          className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-neutral-300 transition-colors hover:text-[#F2B705]"
        >
          <span>Specs</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </OptimizedTiltCard>
  );
};
