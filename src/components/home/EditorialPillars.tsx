import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, 
  Check, 
  ShieldCheck, 
  Stack, 
  Compass, 
  Sliders 
} from '@phosphor-icons/react';

interface Pillar {
  id: string;
  number: string;
  code: string;
  category: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  image: string;
  icon: React.ElementType;
  highlights: string[];
}

const PILLARS: Pillar[] = [
  {
    id: 'metallurgy',
    number: '01',
    code: 'MET-ARCH-01',
    category: 'Metallurgy Standard',
    title: 'Solid Forged Metallurgy',
    subtitle: 'Virgin CuZn39Pb3 Brass & Marine 316 Stainless',
    tagline: 'ACOUSTIC DENSITY & ZERO DEFLECTION',
    description:
      'We forge hardware exclusively from pure solid brass and austenitic marine-grade 316 stainless steel. Every fitting carries an authentic tactile heft and reassuring acoustic weight — engineered for zero deflection and lifetimes of daily use.',
    image:
      'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=85',
    icon: Stack,
    highlights: ['Lead-Free Virgin Alloy', 'Reassuring Acoustic Heft', 'Zero Synthetic Core'],
  },
  {
    id: 'pvd-armour',
    number: '02',
    code: 'PVD-SURF-02',
    category: 'Surface Architecture',
    title: 'Titanium PVD Armour',
    subtitle: 'High-Vacuum Molecular Plasma Deposition',
    tagline: 'IMPERVIOUS TO HUMIDITY & SALINE AIR',
    description:
      'Physical Vapor Deposition bonds titanium atoms directly into the metal lattice in a high-vacuum chamber. The molecular-level bond resists coastal salt air, humidity, mechanical abrasion, and aggressive antimicrobial cleaning chemicals.',
    image:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85',
    icon: ShieldCheck,
    highlights: ['2,400 HV Hardness', 'Anti-Tarnish Molecular Seal', 'Coastal Marine Certified'],
  },
  {
    id: 'architectural-fit',
    number: '03',
    code: 'FIT-MECH-03',
    category: 'Mechanical Engineering',
    title: 'Architectural Flush Fit',
    subtitle: '4mm Low-Profile Rose & Concealed Anchorings',
    tagline: 'MILLIMETER-EXACT SPATIAL INTEGRATION',
    description:
      'Engineered for flush architectural integration. Our signature 4mm low-profile rose sits virtually flat against solid timber, marble, or steel doors, fastened by internal concealed grub-screws with 3D multi-axis micro-alignment.',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    icon: Compass,
    highlights: ['Concealed Fastenings', 'Ultra-Low 4mm Projection', 'Acoustic Return Springs'],
  },
  {
    id: 'specification-support',
    number: '04',
    code: 'SPEC-TRADE-04',
    category: 'Trade Advisory',
    title: 'Specification Support',
    subtitle: 'Turnkey Door Schedules & Rapid 48h Samples',
    tagline: 'DIRECT ARCHITECTURAL PARTNERSHIP',
    description:
      'We partner with design studios from concept to site handover. Receive automated door-by-door hardware takeoff schedules from your project plans, 48-hour curated finish sample boxes, and parametric LOD 400 Revit BIM assets.',
    image:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=85',
    icon: Sliders,
    highlights: ['48h Physical Samples', 'Full Door-by-Door Takeoffs', 'Revit BIM & CAD Ready'],
  },
];

export const EditorialPillars: React.FC = () => {
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Desktop scroll tracking: Strictly changes on scroll with smooth interpolation
  const handleScroll = useCallback(() => {
    if (!scrollTrackRef.current) return;
    const rect = scrollTrackRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const totalScrollable = rect.height - windowHeight;
    if (totalScrollable <= 0) return;

    // How far we've scrolled inside the container
    const currentScroll = -rect.top;
    const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));
    setScrollProgress(progress);

    // Calculate active index strictly from scroll progress
    const newIndex = Math.min(PILLARS.length - 1, Math.floor(progress * PILLARS.length));
    setActiveIndex(newIndex);
  }, []);

  useEffect(() => {
    // Only bind scroll listener if on desktop screen width (lg: >= 1024px)
    const checkAndBind = () => {
      if (window.innerWidth >= 1024) {
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
      }
    };

    checkAndBind();
    window.addEventListener('resize', checkAndBind);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkAndBind);
    };
  }, [handleScroll]);

  // Click on a pillar: smoothly scrolls the window to that pillar's designated segment (desktop)
  const selectPillar = (index: number) => {
    setActiveIndex(index);

    if (!scrollTrackRef.current) return;
    const rect = scrollTrackRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const trackTop = rect.top + scrollTop;
    const totalScrollable = rect.height - window.innerHeight;
    const targetScroll = trackTop + ((index + 0.5) / PILLARS.length) * totalScrollable;

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  };

  const activePillar = PILLARS[activeIndex];
  const ActiveIcon = activePillar.icon;

  return (
    <div className="relative">
      
      {/* =========================================================================
          1. MOBILE & TABLET VIEW: Direct Card Display (Below lg: <1024px)
          Renders all 4 architectural cards directly in a clean 1-col / 2-col grid
          ========================================================================= */}
      <div className="block lg:hidden space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;

            return (
              <div
                key={pillar.id}
                className="relative bg-white border border-[#111111]/12 rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between"
              >
                {/* Architectural Solid-Color Animated Border (Mobile & Tablet) */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none rounded-2xl z-20"
                  style={{ overflow: 'visible' }}
                >
                  <rect
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    rx="16"
                    ry="16"
                    fill="none"
                    stroke="#F2B705"
                    strokeWidth="3.5"
                    pathLength="100"
                    strokeDasharray="22 78"
                    className="mobile-pillar-card-border"
                    style={{
                      animationDelay: `${idx * 0.9}s`,
                    }}
                  />
                </svg>

                {/* Media Frame */}
                <div className="relative aspect-[16/9.5] w-full overflow-hidden bg-[#181818]">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-black/20 pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="font-mono text-xs font-semibold px-2.5 py-1 bg-black/80 text-[#F2B705] rounded-md backdrop-blur-sm border border-white/10">
                      {pillar.number}
                    </span>
                    <span className="font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 bg-black/75 text-white/90 rounded-md backdrop-blur-sm border border-white/10">
                      {pillar.code}
                    </span>
                  </div>

                  {/* Tagline */}
                  <div className="absolute bottom-2.5 left-3 right-3 pointer-events-none">
                    <span className="font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 bg-black/80 text-white rounded-md backdrop-blur-sm border border-white/10">
                      {pillar.tagline}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Category */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-3 h-[1.5px] bg-[#F2B705]" />
                      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#F2B705] font-semibold">
                        {pillar.category}
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-9 h-9 rounded-lg bg-[#FAF9F6] border border-[#111111]/10 flex items-center justify-center text-[#F2B705] shrink-0 mt-0.5">
                        <Icon className="w-5 h-5" weight="duotone" />
                      </div>
                      <div>
                        <h3 className="text-xl font-serif font-normal text-[#111111] leading-tight">
                          {pillar.title}
                        </h3>
                        <p className="text-xs text-[#777777] font-medium mt-0.5">
                          {pillar.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-[#555555] leading-relaxed font-light mb-4">
                      {pillar.description}
                    </p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {pillar.highlights.map((h, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-[#FAF9F6] border border-[#111111]/8 text-[#333333]"
                        >
                          <Check className="w-3 h-3 text-[#F2B705]" weight="bold" />
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Spec Ledger */}
                  <div className="pt-4 border-t border-[#111111]/10">
                    
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#111111] hover:text-[#F2B705] transition-colors pt-1"
                    >
                      <span>Request Specification</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          2. DESKTOP VIEW: Interactive Scroll-Driven Split-Screen Dossier (lg: >=1024px)
          Pinned viewport container that smoothly advances through pillars on scroll
          ========================================================================= */}
      <div ref={scrollTrackRef} className="hidden lg:block relative min-h-[300vh]">
        
        {/* Sticky Viewport Container */}
        <div className="sticky top-20 lg:top-24 z-20 py-4">
          
          <div className="grid grid-cols-12 gap-10 items-stretch">
            
            {/* Left Column: Numbered Architectural Pillar Navigator */}
            <div className="col-span-5 flex flex-col justify-between space-y-3">
              <div className="space-y-3">
                {PILLARS.map((pillar, idx) => {
                  const isActive = activeIndex === idx;
                  const Icon = pillar.icon;

                  // Sub-progress of this specific pillar (0 to 100%)
                  const pillarStart = idx / PILLARS.length;
                  const pillarEnd = (idx + 1) / PILLARS.length;
                  let stepFill = 0;
                  if (scrollProgress >= pillarEnd) {
                    stepFill = 100;
                  } else if (scrollProgress > pillarStart) {
                    stepFill = ((scrollProgress - pillarStart) / (pillarEnd - pillarStart)) * 100;
                  }

                  return (
                    <button
                      key={pillar.id}
                      type="button"
                      onClick={() => selectPillar(idx)}
                      className={`w-full text-left p-5 rounded-2xl transition-all duration-300 flex flex-col border cursor-pointer relative overflow-hidden ${
                        isActive
                          ? 'bg-white border-[#111111] shadow-md shadow-[#111111]/8 translate-x-1'
                          : 'bg-white/60 border-[#111111]/8 hover:bg-white hover:border-[#111111]/25 hover:translate-x-0.5'
                      }`}
                    >
                      <div className="flex items-start gap-4 w-full">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                            isActive
                              ? 'bg-[#111111] text-[#F2B705]'
                              : 'bg-[#FAF9F6] text-[#777777] border border-[#111111]/10'
                          }`}
                        >
                          <Icon className="w-5 h-5" weight="duotone" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-0.5">
                            <span className="font-mono text-xs font-semibold tracking-wider text-[#F2B705]">
                              // {pillar.number}
                            </span>
                            <span className="font-mono text-[10px] tracking-wider text-[#999999] uppercase">
                              {pillar.code}
                            </span>
                          </div>

                          <h3 className={`text-lg font-serif font-normal leading-snug transition-colors ${
                            isActive ? 'text-[#111111] font-medium' : 'text-[#444444]'
                          }`}>
                            {pillar.title}
                          </h3>

                          <p className="text-xs text-[#777777] truncate mt-0.5">
                            {pillar.subtitle}
                          </p>
                        </div>

                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all ${
                            isActive
                              ? 'text-[#F2B705] translate-x-0 opacity-100'
                              : 'text-transparent -translate-x-1.5 opacity-0'
                          }`}
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Live Scroll Fill Indicator */}
                      {isActive && (
                        <div className="w-full h-1 bg-[#111111]/10 rounded-full mt-3 overflow-hidden">
                          <div
                            className="h-full bg-[#F2B705] transition-all duration-150 ease-out"
                            style={{ width: `${Math.max(15, stepFill)}%` }}
                          />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Trade Reassurance Quick Bar */}
              <div className="p-4 bg-white border border-[#111111]/10 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#F2B705] animate-pulse" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#111111]">
                    15-Year Mechanical Warranty
                  </span>
                </div>
                <Link
                  to="/contact"
                  className="text-xs font-semibold uppercase tracking-wider text-[#F2B705] hover:text-[#111111] transition-colors flex items-center gap-1"
                >
                  <span>Trade Kit</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Column: Expansive Spec Dossier Card */}
            <div className="col-span-7 bg-white border border-[#111111]/12 rounded-3xl p-8 lg:p-9 flex flex-col justify-between shadow-sm relative overflow-hidden min-h-[520px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePillar.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col justify-between h-full"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between gap-3 mb-3.5">
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-[1.5px] bg-[#F2B705]" />
                        <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#F2B705] font-semibold">
                          {activePillar.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF9F6] border border-[#111111]/10 text-[#111111] text-[10px] font-mono tracking-wider uppercase font-semibold">
                        <ActiveIcon className="w-3.5 h-3.5 text-[#F2B705]" weight="bold" />
                        <span>{activePillar.code}</span>
                      </div>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="text-3xl lg:text-4xl font-serif font-normal text-[#111111] leading-tight mb-1.5">
                      {activePillar.title}
                    </h3>
                    <p className="text-sm font-medium text-[#777777] mb-4">
                      {activePillar.subtitle}
                    </p>

                    {/* Editorial Description */}
                    <p className="text-[15px] text-[#555555] leading-relaxed font-light mb-5">
                      {activePillar.description}
                    </p>

                    {/* Macro Photo Frame */}
                    <div className="relative aspect-[16/7] w-full rounded-2xl overflow-hidden bg-[#181818] mb-5 border border-[#111111]/10">
                      <img
                        src={activePillar.image}
                        alt={activePillar.title}
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                        <span className="font-mono text-[10px] tracking-widest uppercase px-2.5 py-1 bg-black/80 text-white rounded-md backdrop-blur-sm border border-white/10">
                          {activePillar.tagline}
                        </span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {activePillar.highlights.map((h, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-[#FAF9F6] border border-[#111111]/10 text-[#333333]"
                        >
                          <Check className="w-3 h-3 text-[#F2B705]" weight="bold" />
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Spec Ledger */}
                  <div className="pt-5 border-t border-[#111111]/10">
                  
                    {/* Action Bar */}
                    <div className="flex items-center justify-end gap-3 pt-3.5 border-t border-[#111111]/8">
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#111111] hover:text-[#F2B705] transition-colors group"
                      >
                        <span>Request Specification & Sample Kit</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
