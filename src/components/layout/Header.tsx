import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { List, CaretDown, MagnifyingGlass } from '@phosphor-icons/react';
import { MegaMenu } from './MegaMenu';
import { MobileNavigation } from './MobileNavigation';
import { Button } from '../common/Button';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === '/';
  const isTransparent = isHomePage && !isScrolled && !isMegaMenuOpen;

  // Scroll listener for subtle header elevation and background transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMegaMenuOpen(false);
    setIsMobileNavOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'About Us', to: '/about' },
    { label: 'Applications', to: '/applications' },
    { label: 'Resources', to: '/resources' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out ${
          isTransparent
            ? 'bg-transparent py-3'
            : 'bg-[#111111] backdrop-blur-md py-3'
        }`}
      >
        <div className="mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Exact SIDDI Logo */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#F2B705] p-1">
            <img 
              src="/siddi-logo.png" 
              alt="SIDDI Architectural Hardware" 
              className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-102"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-widest text-white/90 font-medium">
            
            {/* Home Link */}
            <Link
              to="/"
              className={`transition-colors py-2 relative focus:outline-none focus:text-[#F2B705] ${
                location.pathname === '/' ? 'text-[#F2B705]' : 'hover:text-[#F2B705]'
              }`}
            >
              Home
              {location.pathname === '/' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#F2B705]" />
              )}
            </Link>

            {/* Products direct Link with MegaMenu */}
            <div 
              className="relative py-2 group"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
            >
              <Link
                to="/products"
                className={`flex items-center gap-1.5 transition-colors py-2 relative focus:outline-none focus:text-[#F2B705] ${
                  location.pathname.startsWith('/product') ? 'text-[#F2B705]' : 'hover:text-[#F2B705]'
                }`}
                onClick={() => setIsMegaMenuOpen(false)}
              >
                <span>Products</span>
                <CaretDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isMegaMenuOpen ? 'rotate-180 text-[#F2B705]' : 'text-white/60 group-hover:text-[#F2B705]'}`} />
                {location.pathname.startsWith('/product') && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#F2B705]" />
                )}
              </Link>
            </div>

            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`transition-colors py-2 relative focus:outline-none focus:text-[#F2B705] ${
                    isActive ? 'text-[#F2B705]' : 'hover:text-[#F2B705]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#F2B705]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Area */}
          <div className="hidden lg:flex items-center gap-5">
            <Button to="/contact" variant="secondary" size="sm">
              Discuss Your Requirement
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <Link 
              to="/products"
              className="p-2 text-white/80 hover:text-[#F2B705]"
              title="Search"
            >
              <MagnifyingGlass className="w-5 h-5" />
            </Link>
            <button
              type="button"
              onClick={() => setIsMobileNavOpen(true)}
              className="p-2 text-white hover:text-[#F2B705] focus:outline-none focus:ring-2 focus:ring-[#F2B705]"
              aria-label="Open navigation menu"
            >
              <List className="w-6 h-6" />
            </button>
          </div>

        </div>

        {/* Desktop MegaMenu */}
        <MegaMenu 
          isOpen={isMegaMenuOpen} 
          onClose={() => setIsMegaMenuOpen(false)} 
        />
      </header>

      {/* Mobile Drawer */}
      <MobileNavigation 
        isOpen={isMobileNavOpen} 
        onClose={() => setIsMobileNavOpen(false)} 
      />
    </>
  );
};
