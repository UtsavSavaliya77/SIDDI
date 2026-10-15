import React, { useEffect, useState } from 'react';
import { Breadcrumbs } from '../common/Breadcrumbs';

interface ProductsHeroProps {
  selectedCategory?: string;
  onSelectCategory?: (categorySlug: string) => void;
  totalCount: number;
}

export const ProductsHero: React.FC<ProductsHeroProps> = ({
  totalCount,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExpanded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="bg-[#111111] text-white pt-28 md:pt-36 pb-8 md:pb-10 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Breadcrumb Navigation */}
        <div className="mb-4">
          <Breadcrumbs 
            items={[{ label: 'Product Catalogue' }]} 
            className="text-gray-400 text-xs [&_a]:text-gray-400 [&_a:hover]:text-[#F2B705] [&_span]:text-[#F2B705]" 
          />
        </div>

        {/* Compact Split: Page Name on Left, Proper Crisp Image on Right (Zero Overlay) */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-2">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#F2B705]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#F2B705] font-semibold">
                Hardware Catalogue
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-white tracking-tight mb-2">
              Product Catalogue
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
              Precision door furniture, security locks, and luxury bathroom fittings forged in solid brass and 304 stainless steel.
            </p>
            <div className="mt-3 text-xs text-gray-400 font-mono">
              <span>SHOWING </span>
              <span className="text-[#F2B705] font-semibold">{totalCount}</span>
              <span> ARCHITECTURAL MODELS</span>
            </div>
          </div>

          {/* Right Side Proper Image (Full opacity, zero overlay, smooth scale animation) */}
          <div className="w-full sm:w-80 md:w-96 shrink-0">
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-white/15 bg-black/60 shadow-xl">
              <img
                src="/Handles.jpg"
                alt="SIDDI Product Catalogue Hardware"
                className={`w-full h-full object-cover object-center transition-transform duration-[1400ms] ease-[cubic-bezier(0.25,1,0.35,1)] will-change-transform ${
                  isExpanded ? 'scale-100' : 'scale-115'
                }`}
              />
              <div className="absolute bottom-2 left-2 bg-[#111111]/90 px-2.5 py-1 rounded text-[10px] font-mono text-[#F2B705] uppercase tracking-wider border border-white/10">
                Solid Brass Collection
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
