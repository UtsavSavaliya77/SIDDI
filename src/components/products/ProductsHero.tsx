import React, { useEffect, useState } from 'react';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { TextReveal } from '../common/ScrollReveal';

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
    <section className="bg-[#F4F3EF] text-[#171719] pt-28 md:pt-36 pb-8 md:pb-10 border-b border-black/10">
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16">
        {/* Breadcrumb Navigation */}
        <div className="mb-4">
          <Breadcrumbs 
            items={[{ label: 'Product Catalogue' }]} 
            className="text-gray-600 text-xs [&_a]:text-gray-600 [&_a:hover]:text-[#805C00] [&_span]:text-[#805C00]" 
          />
        </div>

        {/* Compact Split: Page Name on Left, Proper Crisp Image on Right (Zero Overlay) */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-2">
          <div className="max-w-2xl">
            <TextReveal
              as="h1"
              text="Product Catalogue"
              className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#171719] tracking-tight mb-2"
            />
            <p className="text-xs sm:text-sm text-gray-600 font-sans leading-relaxed">
              Precision door furniture, security locks, and luxury bathroom fittings forged in solid brass and 304 stainless steel.
            </p>
            <div className="mt-3 text-xs text-gray-600 font-mono">
              <span>SHOWING </span>
              <span className="text-[#F2B705] font-semibold">{totalCount}</span>
              <span> ARCHITECTURAL MODELS</span>
            </div>
          </div>

          {/* Right Side Proper Image (Full opacity, zero overlay, smooth scale animation) */}
          <div className="w-full sm:w-80 md:w-96 shrink-0">
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-black/15 bg-white shadow-xl">
              <img
                src="/Handles.jpg"
                alt="SIDDI Product Catalogue Hardware"
                className={`w-full h-full object-cover object-center transition-transform duration-[1400ms] ease-[cubic-bezier(0.25,1,0.35,1)] will-change-transform ${
                  isExpanded ? 'scale-100' : 'scale-115'
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
