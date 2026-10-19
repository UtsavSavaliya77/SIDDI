import React, { useEffect, useState } from 'react';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { TextReveal } from '../common/ScrollReveal';
import type { ProductCategory } from '../../types';

interface CategoryHeroProps {
  category: ProductCategory;
  categoryIndex: number;
  totalProducts: number;
}

const categoryImageMap: Record<string, string> = {
  'door-handles-knobs': '/Handles.jpg',
  'door-hardware-accessories': '/brass-door-handle.jpg',
  'bathroom-accessories': '/bathroom kit.jpg',
  'towel-rails-holders': '/Bathroom Accessory Kit.jpg',
  'hooks-utility': '/Handle.jpg',
  'architectural-hardware': '/Knobs.jpg',
};

export const CategoryHero: React.FC<CategoryHeroProps> = ({
  category,
  categoryIndex,
  totalProducts,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayImage = categoryImageMap[category.slug] || category.heroImage;

  useEffect(() => {
    setIsExpanded(false);
    const timer = setTimeout(() => {
      setIsExpanded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [category.slug]);

  return (
    <section className="bg-[#111111] text-white pt-28 md:pt-36 pb-8 md:pb-10 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Breadcrumbs Navigation */}
        <div className="mb-4">
          <Breadcrumbs
            items={[
              { label: 'Products', to: '/products' },
              { label: category.title }
            ]}
            className="text-gray-400 text-xs [&_a]:text-gray-400 [&_a:hover]:text-[#F2B705] [&_span]:text-[#F2B705]"
          />
        </div>

        {/* Compact Split: Page Name on Left, Proper Crisp Image on Right (Zero Overlay) */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-2">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#F2B705]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#F2B705] font-semibold">
                Collection 0{categoryIndex}
              </span>
            </div>
            <TextReveal
              as="h1"
              text={category.title}
              className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-white tracking-tight mb-2"
            />
            <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed max-w-xl">
              {category.subtitle}
            </p>
            <div className="mt-3 text-xs text-gray-400 font-mono">
              <span>AVAILABLE MODELS: </span>
              <span className="text-[#F2B705] font-semibold">0{totalProducts}</span>
            </div>
          </div>

          {/* Right Side Proper Image (Full opacity, zero overlay, smooth scale animation) */}
          <div className="w-full sm:w-80 md:w-96 shrink-0">
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-white/15 bg-black/60 shadow-xl">
              <img
                src={displayImage}
                alt={category.title}
                className={`w-full h-full object-cover object-center transition-transform duration-[1400ms] ease-[cubic-bezier(0.25,1,0.35,1)] will-change-transform ${
                  isExpanded ? 'scale-100' : 'scale-115'
                }`}
              />
              <div className="absolute bottom-2 left-2 bg-[#111111]/90 px-2.5 py-1 rounded text-[10px] font-mono text-[#F2B705] uppercase tracking-wider border border-white/10">
                0{totalProducts} Verified Models
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
