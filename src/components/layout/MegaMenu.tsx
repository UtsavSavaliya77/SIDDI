import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../data/categories';
import { ArrowUpRight } from '@phosphor-icons/react';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="absolute top-full left-0 w-full bg-[#111111] text-white border-b border-white/10 shadow-2xl transition-all duration-300 z-50 animate-fadeIn"
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Left: Overview Column */}
          <div className="md:col-span-3 border-r border-white/10 pr-6">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#F2B705] font-semibold block mb-2">
              Hardware Systems
            </span>
            <h3 className="text-2xl font-normal text-white mb-3">
              Architectural Catalogue
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-6">
              Precision door furniture, high-grade bathroom accessories, and architectural fittings manufactured for refined living.
            </p>
            <Link
              to="/products"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#F2B705] hover:underline font-semibold"
            >
              <span>View Full Catalogue</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Center: Category Grid */}
          <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={`/products/${cat.slug}`}
                onClick={onClose}
                className="group p-4 bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-[#F2B705]/40 transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white group-hover:text-[#F2B705] transition-colors">
                    {cat.title}
                  </span>
                  <span className="text-[10px] text-gray-500 font-mono">
                    0{cat.itemCountDemonstration}
                  </span>
                </div>
                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                  {cat.subtitle}
                </p>
              </Link>
            ))}
          </div>

        </div>

        {/* Bottom utility bar */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-6">
            <span className="text-[#F2B705]">Finish Library:</span>
            <span>Matte Black</span>
            <span>Brushed Brass</span>
            <span>Satin Stainless Steel</span>
            <span>Polished Chrome</span>
            <span>Gunmetal PVD</span>
          </div>
          <Link
            to="/contact?interest=Custom%20Specification"
            onClick={onClose}
            className="text-white hover:text-[#F2B705] transition-colors mt-2 sm:mt-0"
          >
            Custom Project Specification Request &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};
