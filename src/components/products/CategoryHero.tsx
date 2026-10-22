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
    <section className="bg-[#F4F3EF] text-[#171719] pt-28 md:pt-36 pb-8 md:pb-10 border-b border-black/10">
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16">
        {/* Breadcrumbs Navigation */}
        <div className="mb-4">
          <Breadcrumbs
            items={[
              { label: 'Products', to: '/products' },
              { label: category.title }
            ]}
            className="text-gray-600 text-xs [&_a]:text-gray-600 [&_a:hover]:text-[#805C00] [&_span]:text-[#805C00]"
          />
        </div>

        {/* Compact Split: Page Name on Left, Proper Crisp Image on Right (Zero Overlay) */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-2">
          <div className="max-w-2xl">
            <TextReveal
              as="h1"
              text={category.title}
              className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#171719] tracking-tight mb-2"
            />
            <p className="text-xs sm:text-sm text-gray-600 font-sans leading-relaxed max-w-xl">
              {category.subtitle}
            </p>
            <div className="mt-3 text-xs text-gray-600 font-mono">
              <span>AVAILABLE MODELS: </span>
              <span className="text-[#F2B705] font-semibold">0{totalProducts}</span>
            </div>
          </div>

          {/* Right Side Proper Image (Full opacity, zero overlay, smooth scale animation) */}
          <div className="w-full sm:w-80 md:w-96 shrink-0">
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-black/15 bg-white shadow-xl">
              <img
                src={displayImage}
                alt={category.title}
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
