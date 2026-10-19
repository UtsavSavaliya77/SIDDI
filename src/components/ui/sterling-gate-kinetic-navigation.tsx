import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { X, CaretDown } from "@phosphor-icons/react";
import { ArrowUpRight } from "lucide-react";
import { CATEGORIES } from "../../data/categories";
import { Button } from "../common/Button";
import "./sterling-gate-kinetic-navigation.css";

// Register GSAP Plugins safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
}

export interface KineticNavigationProps {
  logoSrc?: string;
  onNavigate?: () => void;
}

export function Component({ logoSrc = "/siddi-logo.png", onNavigate }: KineticNavigationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [isDesktopProductOpen, setIsDesktopProductOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();
  const isProductDetailPage = location.pathname.startsWith('/product/');

  const handleMouseEnterProduct = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsDesktopProductOpen(true);
  };

  const handleMouseLeaveProduct = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setIsDesktopProductOpen(false);
    }, 180);
  };

  // Scroll listener for subtle header elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initial Setup & Hover Effects
  useEffect(() => {
    if (!containerRef.current) return;

    // Create custom easing
    try {
      if (!gsap.parseEase("main")) {
        CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");
        gsap.defaults({ ease: "main", duration: 0.7 });
      }
    } catch (e) {
      console.warn("CustomEase failed to load, falling back to default.", e);
      gsap.defaults({ ease: "power2.out", duration: 0.7 });
    }

    const ctx = gsap.context(() => {
      const menuItems = containerRef.current!.querySelectorAll(".menu-list-item[data-shape]");
      const shapesContainer = containerRef.current!.querySelector(".ambient-background-shapes");
      
      menuItems.forEach((item) => {
        const shapeIndex = item.getAttribute("data-shape");
        const shape = shapesContainer ? shapesContainer.querySelector(`.bg-shape-${shapeIndex}`) : null;
        
        if (!shape) return;

        const shapeEls = shape.querySelectorAll(".shape-element");

        const onEnter = () => {
          if (shapesContainer) {
            shapesContainer.querySelectorAll(".bg-shape").forEach((s) => s.classList.remove("active"));
          }
          shape.classList.add("active");
          
          gsap.fromTo(shapeEls, 
            { scale: 0.5, opacity: 0, rotation: -10 },
            { scale: 1, opacity: 1, rotation: 0, duration: 0.6, stagger: 0.08, ease: "back.out(1.7)", overwrite: "auto" }
          );
        };
        
        const onLeave = () => {
          gsap.to(shapeEls, {
            scale: 0.8, opacity: 0, duration: 0.3, ease: "power2.in",
            onComplete: () => shape.classList.remove("active"),
            overwrite: "auto"
          });
        };

        item.addEventListener("mouseenter", onEnter);
        item.addEventListener("mouseleave", onLeave);
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item as any)._cleanup = () => {
          item.removeEventListener("mouseenter", onEnter);
          item.removeEventListener("mouseleave", onLeave);
        };
      });
      
    }, containerRef);

    return () => {
      ctx.revert();
      if (containerRef.current) {
        const items = containerRef.current.querySelectorAll(".menu-list-item[data-shape]");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        items.forEach((item: any) => item._cleanup && item._cleanup());
      }
    };
  }, []);

  // Menu Open/Close Animation Effect
  useEffect(() => {
    if (!containerRef.current) return;
    
    const ctx = gsap.context(() => {
      const navWrap = containerRef.current!.querySelector(".nav-overlay-wrapper");
      const menu = containerRef.current!.querySelector(".menu-content");
      const overlay = containerRef.current!.querySelector(".overlay");
      const bgPanels = containerRef.current!.querySelectorAll(".backdrop-layer");
      const menuLinks = containerRef.current!.querySelectorAll(".nav-link");
      const fadeTargets = containerRef.current!.querySelectorAll("[data-menu-fade]");

      const tl = gsap.timeline();
      
      if (isMenuOpen) {
        // OPEN
        if (navWrap) navWrap.setAttribute("data-nav", "open");
        
        tl.set(navWrap, { display: "block" })
          .set(menu, { xPercent: 0 }, "<")
          .fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1 }, "<")
          .fromTo(bgPanels, { xPercent: 101 }, { xPercent: 0, stagger: 0.12, duration: 0.575 }, "<")
          .fromTo(menuLinks, { yPercent: 140, rotate: 10 }, { yPercent: 0, rotate: 0, stagger: 0.05 }, "<+=0.35");
          
        if (fadeTargets.length) {
          tl.fromTo(fadeTargets, { autoAlpha: 0, yPercent: 50 }, { autoAlpha: 1, yPercent: 0, stagger: 0.04, clearProps: "all" }, "<+=0.2");
        }

      } else {
        // CLOSE
        if (navWrap) navWrap.setAttribute("data-nav", "closed");

        tl.to(overlay, { autoAlpha: 0 })
          .to(menu, { xPercent: 120 }, "<")
          .set(navWrap, { display: "none" });
      }

    }, containerRef);
    
    return () => ctx.revert();
  }, [isMenuOpen]);

  // keydown Escape handling
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isMenuOpen]);

  // Close menus on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsDesktopProductOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsDesktopProductOpen(false);
    if (onNavigate) onNavigate();
  };

  return (
    <div ref={containerRef}>
      {/* =========================================================================
          SITE HEADER BAR
          - On screens < 1024px: Single 3-line hamburger icon button (NO duplicate, NO text)
          - On screens >= 1024px: Standard desktop navigation with MegaMenu
          ========================================================================= */}
      <div className={`site-header-wrapper ${isScrolled ? "is-scrolled" : ""} ${isProductDetailPage ? "is-product-detail !bg-[#111111]" : isDesktopProductOpen ? "bg-[#111111]" : "bg-transparent"}`}>
        <header className="header">
          <div className="container is--full">
            <nav className="nav-row">
              {/* Logo */}
              <Link to="/" onClick={closeMenu} aria-label="home" className="nav-logo-row">
                <img 
                  src={logoSrc} 
                  alt="SIDDI Architectural Hardware" 
                  className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 hover:scale-102"
                />
              </Link>

              {/* Desktop Navigation Links (>= 1024px) */}
              <div className="hidden lg:flex items-center gap-1 text-xs uppercase tracking-widest font-medium">
                {/* 1. Home */}
                <Link 
                  to="/" 
                  className={`px-3.5 py-2 transition-colors relative ${location.pathname === '/' ? 'text-[#F2B705]' : 'text-white/90 hover:text-[#F2B705]'}`}
                >
                  Home
                  {location.pathname === '/' && <span className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-[#F2B705]" />}
                </Link>

                {/* 2. Product (Hover/Click opens Full-Width Mega Dropdown) */}
                <div 
                  className="relative py-2"
                  onMouseEnter={handleMouseEnterProduct}
                  onMouseLeave={handleMouseLeaveProduct}
                >
                  <Link 
                    to="/products"
                    className={`flex items-center gap-1.5 px-3.5 py-2 transition-colors relative ${
                      location.pathname.startsWith('/product') || isDesktopProductOpen ? 'text-[#F2B705]' : 'text-white/90 hover:text-[#F2B705]'
                    }`}
                  >
                    <span>Product</span>
                    <CaretDown 
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${isDesktopProductOpen ? 'rotate-180 text-[#F2B705]' : 'text-white/60'}`} 
                    />
                    {(location.pathname.startsWith('/product') || isDesktopProductOpen) && (
                      <span className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-[#F2B705]" />
                    )}
                  </Link>
                </div>

                {/* 3. Application */}
                <Link 
                  to="/applications" 
                  className={`px-3.5 py-2 transition-colors relative ${location.pathname === '/applications' ? 'text-[#F2B705]' : 'text-white/90 hover:text-[#F2B705]'}`}
                >
                  Application
                  {location.pathname === '/applications' && <span className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-[#F2B705]" />}
                </Link>

                {/* 4. About */}
                <Link 
                  to="/about" 
                  className={`px-3.5 py-2 transition-colors relative ${location.pathname === '/about' ? 'text-[#F2B705]' : 'text-white/90 hover:text-[#F2B705]'}`}
                >
                  About
                  {location.pathname === '/about' && <span className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-[#F2B705]" />}
                </Link>

                {/* 5. Resource */}
                <Link 
                  to="/resources" 
                  className={`px-3.5 py-2 transition-colors relative ${location.pathname === '/resources' ? 'text-[#F2B705]' : 'text-white/90 hover:text-[#F2B705]'}`}
                >
                  Resource
                  {location.pathname === '/resources' && <span className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-[#F2B705]" />}
                </Link>

                {/* 6. contact */}
                <Link 
                  to="/contact" 
                  className={`px-3.5 py-2 transition-colors relative ${location.pathname === '/contact' ? 'text-[#F2B705]' : 'text-white/90 hover:text-[#F2B705]'}`}
                >
                  contact
                  {location.pathname === '/contact' && <span className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-[#F2B705]" />}
                </Link>
              </div>

              {/* Desktop CTA (>= 1024px) */}
              <div className="hidden lg:flex items-center gap-4">
                <Button to="/contact" variant="secondary" size="sm">
                  Discuss Your Requirement
                </Button>
              </div>
              
              {/* Mobile / Tablet Menu Button (< 1024px) — Single 3-Line Menu Icon */}
              <div className="flex lg:hidden items-center">
                <button 
                  type="button" 
                  onClick={toggleMenu} 
                  className="w-11 h-11 rounded-[11px] bg-white/5 border border-white/12 text-white hover:text-[#F2B705] hover:border-[#F2B705]/40 transition-colors flex items-center justify-center cursor-pointer shadow-xs"
                  aria-label="Open navigation menu"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="4" y1="18" x2="20" y2="18" />
                  </svg>
                </button>
              </div>
            </nav>
          </div>
        </header>

        {/* =========================================================================
            FULL-WIDTH ARCHITECTURAL MEGA DROPDOWN (Direct child of site-header-wrapper)
            Spans full 100vw width with max-w-7xl centered container - ZERO squishing!
            ========================================================================= */}
        <AnimatePresence>
          {isDesktopProductOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:block absolute top-full left-0 right-0 w-full bg-[#111111] text-white border-y border-white/10 z-50 overflow-hidden"
              onMouseEnter={handleMouseEnterProduct}
              onMouseLeave={handleMouseLeaveProduct}
            >
              <div className="max-w-7xl mx-auto px-6 md:px-12 py-9">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  
                  {/* Column 1: Editorial Showcase (3 of 12 cols) */}
                  <div className="md:col-span-3 border-r border-white/10 pr-6 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F2B705]" />
                        <span className="text-[10px] uppercase tracking-[0.25em] text-[#F2B705] font-semibold font-mono">
                          Architectural Portfolio
                        </span>
                      </div>
                      <h3 className="text-2xl font-serif text-white mb-2 leading-tight">
                        Precision Hardware Systems
                      </h3>
                      <p className="text-xs text-gray-400 leading-relaxed mb-4 font-sans">
                        Forged from solid brass and grade 304 stainless steel. Manufactured for enduring mechanical luxury.
                      </p>
                    </div>

                    <Link
                      to="/products"
                      onClick={() => setIsDesktopProductOpen(false)}
                      className="group/featured mt-2 block rounded-lg overflow-hidden border border-white/10 hover:border-[#F2B705]/60 transition-colors bg-white/[0.02]"
                    >
                      <div className="h-28 w-full overflow-hidden bg-black/40 relative">
                        <img 
                          src="/Handles.jpg" 
                          alt="Architectural Leverset" 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover/featured:scale-105" 
                        />
                        <div className="absolute inset-0 bg-black/35 group-hover/featured:bg-black/15 transition-colors" />
                        <span className="absolute bottom-2 left-2 text-[10px] font-mono uppercase bg-[#111111]/90 px-2 py-0.5 rounded text-[#F2B705] border border-white/10">
                          Solid Brass Collection
                        </span>
                      </div>
                      <div className="p-3 flex items-center justify-between text-xs font-semibold text-white group-hover/featured:text-[#F2B705] transition-colors">
                        <span>View Full 2026 Catalogue</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </Link>
                  </div>

                  {/* Column 2: 6 Core Categories Grid (6 of 12 cols) */}
                  <div className="md:col-span-6 grid grid-cols-2 gap-3.5">
                    {CATEGORIES.map((cat, idx) => (
                      <Link
                        key={cat.id}
                        to={`/products/${cat.slug}`}
                        onClick={() => setIsDesktopProductOpen(false)}
                        className="group/item p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/8 hover:border-[#F2B705]/50 transition-all duration-200 block text-left"
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono text-[#F2B705] font-semibold">
                              0{idx + 1}
                            </span>
                            <span className="text-xs uppercase tracking-wider font-semibold text-white group-hover/item:text-[#F2B705] transition-colors">
                              {cat.title}
                            </span>
                          </div>
                          <span className="text-[10px] text-gray-400 font-mono">
                            0{cat.itemCountDemonstration}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-400 group-hover/item:text-gray-300 leading-relaxed line-clamp-1">
                          {cat.subtitle}
                        </p>
                      </Link>
                    ))}
                  </div>

                  {/* Column 3: Finish Library & Specifier Action (3 of 12 cols) */}
                  <div className="md:col-span-3 border-l border-white/10 pl-6 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F2B705]" />
                        <span className="text-[10px] uppercase tracking-[0.25em] text-[#F2B705] font-semibold font-mono">
                          Finish Library
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-1">
                        PVD & Metallurgical Finishes
                      </h4>
                      <p className="text-[11px] text-gray-400 leading-relaxed mb-4">
                        Specifier-grade multi-layer coatings cycle-tested against corrosion and hand-wear.
                      </p>

                      {/* Finish Swatch Pills */}
                      <div className="space-y-1.5 mb-5">
                        {[
                          { name: 'Matte Black', hex: '#141414', border: '#333' },
                          { name: 'Brushed Brass', hex: '#C59B27', border: '#C59B27' },
                          { name: 'Satin Stainless Steel', hex: '#B0B0B0', border: '#B0B0B0' },
                          { name: 'Polished Chrome', hex: '#E0E0E0', border: '#E0E0E0' },
                          { name: 'Gunmetal PVD', hex: '#3E3E3E', border: '#3E3E3E' },
                        ].map((finish) => (
                          <div key={finish.name} className="flex items-center justify-between py-1 px-2.5 rounded bg-white/[0.02] border border-white/5">
                            <div className="flex items-center gap-2.5">
                              <span 
                                className="w-3 h-3 rounded-full border" 
                                style={{ backgroundColor: finish.hex, borderColor: finish.border }} 
                              />
                              <span className="text-xs text-gray-300 font-medium">{finish.name}</span>
                            </div>
                            <span className="text-[10px] font-mono text-gray-500">PVD</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Link
                      to="/contact?interest=Custom%20Specification"
                      onClick={() => setIsDesktopProductOpen(false)}
                      className="w-full py-2.5 px-4 bg-[#F2B705] hover:bg-[#d9a404] text-[#111111] font-semibold text-xs uppercase tracking-wider text-center rounded-lg transition-colors shadow-xs block"
                    >
                      Request Custom Specs &rarr;
                    </Link>
                  </div>

                </div>

                {/* Bottom Reassurance Strip */}
                <div className="mt-8 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-gray-400 font-mono">
                  <div className="flex items-center gap-6">
                    <span className="text-[#F2B705] font-semibold">EST. ARCHITECTURAL METALLURGY</span>
                    <span className="hidden sm:inline text-white/30">|</span>
                    <span>15-YEAR FINISH WARRANTY</span>
                    <span className="hidden sm:inline text-white/30">|</span>
                    <span>CYCLE-TESTED FOR 200,000+ MOVEMENTS</span>
                  </div>
                  <div className="flex items-center gap-4 text-[11px] text-gray-400">
                    <span>Direct Dispatch Across India</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* =========================================================================
          FULLSCREEN KINETIC MENU OVERLAY (Screens < 1024px)
          - Multi-layer kinetic backdrop panels
          - Ambient geometric hover shapes
          - Requested page names: Home, Product (with dropdown), Application, About, Resource, contact
          - Prominent Close (X) button at top-right
          ========================================================================= */}
      <section className="fullscreen-menu-container">
        <div data-nav="closed" className="nav-overlay-wrapper">
          <div className="overlay" onClick={closeMenu}></div>
          <nav className="menu-content">
            <div className="menu-bg">
              <div className="backdrop-layer first"></div>
              <div className="backdrop-layer second"></div>
              <div className="backdrop-layer"></div>

              {/* Abstract shapes container */}
              <div className="ambient-background-shapes">
                {/* Shape 1: Floating circles */}
                <svg className="bg-shape bg-shape-1" viewBox="0 0 400 400" fill="none">
                  <circle className="shape-element" cx="80" cy="120" r="40" fill="rgba(242,183,5,0.18)" />
                  <circle className="shape-element" cx="300" cy="80" r="60" fill="rgba(255,255,255,0.08)" />
                  <circle className="shape-element" cx="200" cy="300" r="80" fill="rgba(242,183,5,0.12)" />
                  <circle className="shape-element" cx="350" cy="280" r="30" fill="rgba(242,183,5,0.15)" />
                </svg>

                {/* Shape 2: Wave pattern */}
                <svg className="bg-shape bg-shape-2" viewBox="0 0 400 400" fill="none">
                  <path
                    className="shape-element"
                    d="M0 200 Q100 100, 200 200 T 400 200"
                    stroke="rgba(242,183,5,0.22)"
                    strokeWidth="60"
                    fill="none"
                  />
                  <path
                    className="shape-element"
                    d="M0 280 Q100 180, 200 280 T 400 280"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="40"
                    fill="none"
                  />
                </svg>

                {/* Shape 3: Grid dots */}
                <svg className="bg-shape bg-shape-3" viewBox="0 0 400 400" fill="none">
                  <circle className="shape-element" cx="50" cy="50" r="8" fill="rgba(242,183,5,0.3)" />
                  <circle className="shape-element" cx="150" cy="50" r="8" fill="rgba(255,255,255,0.15)" />
                  <circle className="shape-element" cx="250" cy="50" r="8" fill="rgba(242,183,5,0.3)" />
                  <circle className="shape-element" cx="350" cy="50" r="8" fill="rgba(255,255,255,0.15)" />
                  <circle className="shape-element" cx="100" cy="150" r="12" fill="rgba(242,183,5,0.25)" />
                  <circle className="shape-element" cx="200" cy="150" r="12" fill="rgba(255,255,255,0.12)" />
                  <circle className="shape-element" cx="300" cy="150" r="12" fill="rgba(242,183,5,0.25)" />
                  <circle className="shape-element" cx="50" cy="250" r="10" fill="rgba(255,255,255,0.12)" />
                  <circle className="shape-element" cx="150" cy="250" r="10" fill="rgba(242,183,5,0.3)" />
                  <circle className="shape-element" cx="250" cy="250" r="10" fill="rgba(255,255,255,0.12)" />
                  <circle className="shape-element" cx="350" cy="250" r="10" fill="rgba(242,183,5,0.3)" />
                  <circle className="shape-element" cx="100" cy="350" r="6" fill="rgba(242,183,5,0.3)" />
                  <circle className="shape-element" cx="200" cy="350" r="6" fill="rgba(255,255,255,0.15)" />
                  <circle className="shape-element" cx="300" cy="350" r="6" fill="rgba(242,183,5,0.3)" />
                </svg>

                {/* Shape 4: Organic blobs */}
                <svg className="bg-shape bg-shape-4" viewBox="0 0 400 400" fill="none">
                  <path
                    className="shape-element"
                    d="M100 100 Q150 50, 200 100 Q250 150, 200 200 Q150 250, 100 200 Q50 150, 100 100"
                    fill="rgba(242,183,5,0.14)"
                  />
                  <path
                    className="shape-element"
                    d="M250 200 Q300 150, 350 200 Q400 250, 350 300 Q400 250, 350 300 Q300 350, 250 300 Q200 250, 250 200"
                    fill="rgba(255,255,255,0.08)"
                  />
                </svg>

                {/* Shape 5: Diagonal lines */}
                <svg className="bg-shape bg-shape-5" viewBox="0 0 400 400" fill="none">
                  <line className="shape-element" x1="0" y1="100" x2="300" y2="400" stroke="rgba(242,183,5,0.16)" strokeWidth="30" />
                  <line className="shape-element" x1="100" y1="0" x2="400" y2="300" stroke="rgba(255,255,255,0.08)" strokeWidth="25" />
                  <line className="shape-element" x1="200" y1="0" x2="400" y2="200" stroke="rgba(242,183,5,0.12)" strokeWidth="20" />
                </svg>
              </div>
            </div>

            <div className="menu-content-wrapper">
              {/* Top Block: Navigation header and all tabs */}
              <div className="w-full">
                {/* Menu Top Bar: Prominent Close (X) Button */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F2B705]" />
                    <span className="font-mono text-xs uppercase tracking-widest text-[#F2B705] font-semibold">
                      Navigation
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={closeMenu}
                    className="w-10 h-10 rounded-[11px] bg-white/10 hover:bg-[#F2B705] hover:text-[#111111] text-white flex items-center justify-center transition-colors border border-white/15 cursor-pointer shadow-xs"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" weight="bold" />
                  </button>
                </div>

                {/* Exact Requested Page Names */}
                <ul className="menu-list">
                  {/* 1. Home */}
                  <li className="menu-list-item" data-shape="1">
                    <Link to="/" onClick={closeMenu} className="nav-link w-inline-block">
                      <span className="nav-link-num">// 01</span>
                      <p className="nav-link-text">Home</p>
                      <div className="nav-link-hover-bg"></div>
                    </Link>
                  </li>

                  {/* 2. Product (with Animated Dropdown) */}
                  <li className="menu-list-item" data-shape="2">
                    <div className="flex items-center justify-between w-full">
                      <Link to="/products" onClick={closeMenu} className="nav-link w-inline-block">
                        <span className="nav-link-num">// 02</span>
                        <p className="nav-link-text">Product</p>
                        <div className="nav-link-hover-bg"></div>
                      </Link>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsProductOpen(!isProductOpen);
                        }}
                        className="p-2 text-white/70 hover:text-[#F2B705] transition-colors cursor-pointer"
                        aria-label="Toggle product categories"
                      >
                        <CaretDown 
                          className={`w-5 h-5 transition-transform duration-300 ${isProductOpen ? 'rotate-180 text-[#F2B705]' : ''}`} 
                          weight="bold" 
                        />
                      </button>
                    </div>

                    {/* Animated Dropdown */}
                    <AnimatePresence>
                      {isProductOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden pl-7 pr-3 py-2.5 my-1 border-l-2 border-[#F2B705] bg-white/[0.03] rounded-r-xl space-y-2"
                        >
                          <Link
                            to="/products"
                            onClick={closeMenu}
                            className="block py-1 text-xs uppercase tracking-wider text-[#F2B705] font-semibold hover:underline"
                          >
                            All Hardware Catalogue &rarr;
                          </Link>
                          {CATEGORIES.map((cat) => (
                            <Link
                              key={cat.id}
                              to={`/products/${cat.slug}`}
                              onClick={closeMenu}
                              className="block py-1 text-xs text-gray-300 hover:text-white transition-colors"
                            >
                              {cat.title}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>

                  {/* 3. Application */}
                  <li className="menu-list-item" data-shape="3">
                    <Link to="/applications" onClick={closeMenu} className="nav-link w-inline-block">
                      <span className="nav-link-num">// 03</span>
                      <p className="nav-link-text">Application</p>
                      <div className="nav-link-hover-bg"></div>
                    </Link>
                  </li>

                  {/* 4. About */}
                  <li className="menu-list-item" data-shape="4">
                    <Link to="/about" onClick={closeMenu} className="nav-link w-inline-block">
                      <span className="nav-link-num">// 04</span>
                      <p className="nav-link-text" data-menu-fade>About</p>
                      <div className="nav-link-hover-bg"></div>
                    </Link>
                  </li>

                  {/* 5. Resource */}
                  <li className="menu-list-item" data-shape="5">
                    <Link to="/resources" onClick={closeMenu} className="nav-link w-inline-block">
                      <span className="nav-link-num">// 05</span>
                      <p className="nav-link-text">Resource</p>
                      <div className="nav-link-hover-bg"></div>
                    </Link>
                  </li>

                  {/* 6. contact */}
                  <li className="menu-list-item" data-shape="1">
                    <Link to="/contact" onClick={closeMenu} className="nav-link w-inline-block">
                      <span className="nav-link-num">// 06</span>
                      <p className="nav-link-text">contact</p>
                      <div className="nav-link-hover-bg"></div>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Sub-bar Architectural Reassurance (Fixed at bottom) */}
              <div className="w-full mt-auto pt-5 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-gray-400 pb-1">
                <span>EST. ARCHITECTURAL METALLURGY</span>
                <span className="text-[#F2B705]">15-YR WARRANTY</span>
              </div>
            </div>
          </nav>
        </div>
      </section>
    </div>
  );
}

export default Component;
