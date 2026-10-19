import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, CaretDown } from '@phosphor-icons/react';
import { CATEGORIES } from '../../data/categories';
import { Button } from '../common/Button';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({ isOpen, onClose }) => {
  const [productsExpanded, setProductsExpanded] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-[#111111] text-white shadow-2xl flex flex-col z-50 border-l border-white/10 animate-slideLeft">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <Link to="/" onClick={onClose} className="flex items-center gap-3">
            <img 
              src="/siddi-logo.png" 
              alt="SIDDI Logo" 
              className="h-10 w-auto object-contain"
            />
          </Link>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white rounded-[11px] focus:outline-none focus:ring-2 focus:ring-[#F2B705]"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
          <nav className="space-y-1">
            <Link
              to="/"
              onClick={onClose}
              className="block py-3 text-base uppercase tracking-wider text-white hover:text-[#F2B705] font-medium border-b border-white/5"
            >
              Home
            </Link>

            {/* Products direct Link + accordion toggle */}
            <div>
              <div className="flex items-center justify-between border-b border-white/5">
                <Link
                  to="/products"
                  onClick={onClose}
                  className="block py-3 text-base uppercase tracking-wider text-white hover:text-[#F2B705] font-medium flex-1"
                >
                  Products
                </Link>
                <button
                  type="button"
                  onClick={() => setProductsExpanded(!productsExpanded)}
                  className="p-3 text-gray-400 hover:text-[#F2B705] focus:outline-none"
                  aria-label="Toggle products categories"
                >
                  <CaretDown className={`w-4 h-4 transition-transform duration-200 ${productsExpanded ? 'rotate-180 text-[#F2B705]' : ''}`} />
                </button>
              </div>

              {productsExpanded && (
                <div className="pl-4 py-2 space-y-2 bg-white/[0.02] border-l-2 border-[#F2B705] my-2">
                  <Link
                    to="/products"
                    onClick={onClose}
                    className="block py-1.5 text-xs uppercase tracking-wider text-[#F2B705] font-semibold"
                  >
                    All Hardware Catalogue &rarr;
                  </Link>
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/products/${cat.slug}`}
                      onClick={onClose}
                      className="block py-1.5 text-xs text-gray-300 hover:text-white"
                    >
                      {cat.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/applications"
              onClick={onClose}
              className="block py-3 text-base uppercase tracking-wider text-white hover:text-[#F2B705] font-medium border-b border-white/5"
            >
              Applications
            </Link>

            <Link
              to="/about"
              onClick={onClose}
              className="block py-3 text-base uppercase tracking-wider text-white hover:text-[#F2B705] font-medium border-b border-white/5"
            >
              About SIDDI
            </Link>

            <Link
              to="/resources"
              onClick={onClose}
              className="block py-3 text-base uppercase tracking-wider text-white hover:text-[#F2B705] font-medium border-b border-white/5"
            >
              Resources & Specs
            </Link>

            <Link
              to="/contact"
              onClick={onClose}
              className="block py-3 text-base uppercase tracking-wider text-white hover:text-[#F2B705] font-medium border-b border-white/5"
            >
              Contact
            </Link>
          </nav>

          <div className="pt-6">
            <Button
              to="/contact"
              onClick={onClose}
              variant="secondary"
              size="md"
              className="w-full text-center"
            >
              Discuss Your Requirement
            </Button>
          </div>

          <div className="pt-6 border-t border-white/10 text-xs text-gray-400 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[#F2B705] font-semibold">Finish Range:</span>
              <span>Matte Black, Brushed Brass, Satin Steel</span>
            </div>
            <p className="text-[11px] text-gray-500">
              Architectural & Bathroom Hardware Systems.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
