import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from '@phosphor-icons/react';

export interface ArchitecturalFinish {
  id: string;
  name: string;
  subname: string;
  number: string;
  tagline: string;
  hex: string;
  accent: string;
  metallicBackground: string;
  gradientOverlay: string;
  puckGradient: string;
  specimenImage: string;
  hardwareTitle: string;
  alloy: string;
  treatment: string;
  pairing: string;
  description: string;
}

export const ARCHITECTURAL_FINISHES: ArchitecturalFinish[] = [
  {
    id: 'brushed-brass',
    name: 'Brushed Brass',
    subname: 'Natural Warm Radiance',
    number: '01',
    tagline: 'Directional Hand-Brushed Satin with Vacuum PVD Seal',
    hex: '#D4AF37',
    accent: '#F2B705',
    metallicBackground: '#1C160B',
    gradientOverlay: 'transparent',
    puckGradient: '#D4AF37',
    specimenImage: '/brass-door-handle.jpg',
    hardwareTitle: 'Verona Architectural Leverset',
    alloy: 'Solid Forged Brass C37700',
    treatment: 'Zirconium PVD Layering',
    pairing: 'American Walnut & Calacatta Gold',
    description: 'A tactile, directional satin grain machined along the length of each fitting. Captures ambient room daylight and casts an inviting golden glow without harsh specular glares.'
  },
  {
    id: 'matte-black',
    name: 'Matte Black',
    subname: 'Monolithic Architectural Shadow',
    number: '02',
    tagline: 'Deep Carbon Vacuum Sputtered with Oleophobic Coating',
    hex: '#181818',
    accent: '#E5E5E5',
    metallicBackground: '#111111',
    gradientOverlay: 'transparent',
    puckGradient: '#181818',
    specimenImage: '/Matte Black Faucet.jpg',
    hardwareTitle: 'Kyoto Cylindrical Passage Set',
    alloy: 'Austenitic Grade 304 Steel',
    treatment: 'Carbon-Nitride PVD Matrix',
    pairing: 'Light European Oak & Nero Marquina',
    description: 'An uncompromising, light-absorbent tactile matte finish. Infused with microscopic carbon particles that naturally repel fingerprint oils, ensuring clean architectural silhouettes.'
  },
  {
    id: 'satin-steel',
    name: 'Satin Stainless',
    subname: 'Marine-Grade Precision Machining',
    number: '03',
    tagline: 'AISI 316 Marine Stainless with Linear Satin Honing',
    hex: '#A8A9AD',
    accent: '#D1D5DB',
    metallicBackground: '#14161A',
    gradientOverlay: 'transparent',
    puckGradient: '#A8A9AD',
    specimenImage: '/Handles.jpg',
    hardwareTitle: 'Astrid Knurled Mortise Knob',
    alloy: 'Marine Grade AISI 316 Stainless',
    treatment: '320-Grit Directional Micro-Honing',
    pairing: 'Honed Basalt & Fluted Glass',
    description: 'Machined from solid bar stock with molybdenum enrichment. Completely unreactive in marine air and high-humidity master ensuites while retaining a crisp, surgical satin sheen.'
  },
  {
    id: 'polished-chrome',
    name: 'Polished Chrome',
    subname: 'Jewelry-Grade Liquid Specular',
    number: '04',
    tagline: 'Optically Flat Multi-Plate Nickel-Chrome Mirror',
    hex: '#E5E7EB',
    accent: '#FFFFFF',
    metallicBackground: '#16191E',
    gradientOverlay: 'transparent',
    puckGradient: '#E5E7EB',
    specimenImage: '/Brushed Gold Basin Faucet.jpg',
    hardwareTitle: 'Nordic Minimal Wall Fitting',
    alloy: 'Forged Dezincification Brass',
    treatment: 'Duplex Nickel + Hard Chrome',
    pairing: 'Carrara Marble & Pure White Quartz',
    description: 'Optically buffed to a seamless mirror before 45-minute electrolytic immersion. Reflects spatial architecture with crystalline liquid brilliance, elevating both classic and minimalist settings.'
  },
  {
    id: 'gunmetal',
    name: 'Gunmetal PVD',
    subname: 'Industrial Titanium Charcoal',
    number: '05',
    tagline: 'Titanium-Carbide Magnetron Sputtered Dark Graphite',
    hex: '#3E424B',
    accent: '#A3AAB8',
    metallicBackground: '#121418',
    gradientOverlay: 'transparent',
    puckGradient: '#3E424B',
    specimenImage: '/Handle.jpg',
    hardwareTitle: 'Titanium Linear Corridor Pull',
    alloy: 'Structural Grade 304 Stainless',
    treatment: 'Cathodic Magnetron Sputter',
    pairing: 'Charcoal Timber Slats & Silver Travertine',
    description: 'A moody, shifting titanium tone with subtle cold-rolled blue graphite highlights. Shifts subtly between deep charcoal in daylight and warm espresso under evening interior downlights.'
  },
  {
    id: 'antique-bronze',
    name: 'Antique Bronze',
    subname: 'Aged Hand-Rubbed Patina',
    number: '06',
    tagline: 'Hand-Relieved Living Patina with Microcrystalline Wax',
    hex: '#614E3C',
    accent: '#D4AF37',
    metallicBackground: '#18120C',
    gradientOverlay: 'transparent',
    puckGradient: '#614E3C',
    specimenImage: '/Knobs.jpg',
    hardwareTitle: 'Heritage Heavyweight Lockset',
    alloy: 'Architectural Cast Bronze Alloy',
    treatment: 'Hand-Relieved Patina + Wax Seal',
    pairing: 'Smoked Oak Herringbone & Antique Brass',
    description: 'An authentic living finish. Carefully buffed by hand across high edges to reveal the warm golden bronze beneath deep coffee patina. Infuses spaces with heirloom warmth and tactile permanence.'
  }
];

export const FinishesShowcase: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('brushed-brass');
  const activeFinish = ARCHITECTURAL_FINISHES.find(f => f.id === activeId) || ARCHITECTURAL_FINISHES[0];

  // Auto-advance through finishes across all screen sizes
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveId((currentId) => {
        const currentIndex = ARCHITECTURAL_FINISHES.findIndex(f => f.id === currentId);
        const nextIndex = (currentIndex + 1) % ARCHITECTURAL_FINISHES.length;
        return ARCHITECTURAL_FINISHES[nextIndex].id;
      });
    }, 4500);

    return () => clearInterval(timer);
  }, [activeId]);

  return (
    <div className="w-full">
      {/* 1. DESKTOP (lg and above): Interactive Expanding Architectural Metal Slabs */}
      <div className="hidden lg:flex gap-3 h-[600px] lg:h-[640px] select-none">
        {ARCHITECTURAL_FINISHES.map((finish) => {
          const isExpanded = finish.id === activeId;

          return (
            <motion.div
              key={finish.id}
              layout
              onClick={() => setActiveId(finish.id)}
              onMouseEnter={() => setActiveId(finish.id)}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{
                flex: isExpanded ? 6 : 1,
                background: finish.metallicBackground,
              }}
              className={`relative rounded-[28px] overflow-hidden border transition-colors duration-500 cursor-pointer flex flex-col justify-between p-4 xl:p-6 ${
                isExpanded
                  ? 'border-[#F2B705]/80 shadow-[0_20px_50px_rgba(0,0,0,0.8)]'
                  : 'border-white/10 hover:border-white/30'
              }`}
            >
              {/* Ambient radial glow inside slab */}
              <div 
                aria-hidden 
                className="absolute inset-0 pointer-events-none transition-opacity duration-700"
                style={{
                  background: finish.gradientOverlay,
                  opacity: isExpanded ? 1 : 0.2
                }}
              />

              {/* Background Macro Hardware Image (only visible on active expanded slab) */}
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 0.35, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7 }}
                  className="absolute inset-0 pointer-events-none overflow-hidden"
                >
                  <img
                    src={finish.specimenImage}
                    alt={finish.name}
                    className="w-full h-full object-cover object-center filter saturate-125 brightness-90"
                  />
                  <div className="absolute inset-0 bg-black/60" />
                </motion.div>
              )}

              {/* TOP ROW: Number & Indicator */}
              <div className="relative z-10 flex items-center justify-between">
                <span className={`font-mono text-sm tracking-widest transition-colors ${
                  isExpanded ? 'text-[#F2B705] font-semibold' : 'text-gray-500'
                }`}>
                  {finish.number}
                </span>

                {/* Metallic Turned Swatch Disc */}
                <div 
                  className={`w-9 h-9 rounded-full p-0.5 shadow-xl transition-all duration-300 ${
                    isExpanded ? 'scale-110 ring-2 ring-[#F2B705]/60' : 'group-hover:scale-105'
                  }`}
                  style={{ background: finish.puckGradient }}
                >
                  <div className="w-full h-full rounded-full border border-black/30 shadow-inner" />
                </div>
              </div>

              {/* COLLAPSED STATE: Vertical Rotated Label */}
              {!isExpanded && (
                <div className="relative z-10 flex-1 flex items-center justify-center py-6">
                  <span className="font-serif text-lg tracking-wider text-gray-300 uppercase whitespace-nowrap rotate-[-90deg] origin-center">
                    {finish.name}
                  </span>
                </div>
              )}

              {/* EXPANDED STATE CONTENT */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="relative z-10 space-y-5 max-w-xl"
                  >
                    {/* Auto-advance timer progress bar */}
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        key={finish.id}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 4.5, ease: "linear" }}
                        className="h-full bg-[#F2B705] rounded-full"
                      />
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#F2B705] mb-2">
                        <span>Physical Vapor Deposition</span>
                        <span>•</span>
                        <span>{finish.subname}</span>
                      </div>

                      <h3 className="text-3xl lg:text-5xl font-serif font-normal text-white tracking-tight mb-2">
                        {finish.name}
                      </h3>

                      <p className="text-xs lg:text-sm text-gray-300 leading-relaxed line-clamp-3">
                        {finish.description}
                      </p>
                    </div>

                    {/* Metadata Specs Pills */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
                        <span className="text-[10px] font-mono uppercase text-gray-400 block mb-0.5">
                          Base Substrate
                        </span>
                        <span className="text-xs text-white font-medium">
                          {finish.alloy}
                        </span>
                      </div>

                      <div className="p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
                        <span className="text-[10px] font-mono uppercase text-gray-400 block mb-0.5">
                          Architectural Pairing
                        </span>
                        <span className="text-xs text-white font-medium">
                          {finish.pairing}
                        </span>
                      </div>
                    </div>

                    {/* Action Links */}
                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <Link
                        to={`/products?finish=${finish.id}`}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F2B705] text-[#111111] font-semibold text-xs uppercase tracking-wider hover:bg-[#ffc61a] transition-all shadow-lg shrink-0"
                      >
                        <span>Explore {finish.name} Hardware</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>

                      <Link
                        to="/contact?interest=Finish%20Samples"
                        className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-gray-300 hover:text-white transition-colors py-2"
                      >
                        <span>Request Swatch Block &rarr;</span>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* BOTTOM LABEL FOR COLLAPSED VIEW */}
              {!isExpanded && (
                <div className="relative z-10 text-center">
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                    Inspect
                  </span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* 2. TABLET (md to lg): Master-Detail Architectural Specimen Stage */}
      <div className="hidden md:grid lg:hidden grid-cols-12 gap-5 min-h-[580px] select-none">
        {/* Left: Swatch Selector List */}
        <div className="col-span-5 flex flex-col justify-between gap-2.5">
          {ARCHITECTURAL_FINISHES.map((finish) => {
            const isSelected = finish.id === activeId;

            return (
              <button
                key={finish.id}
                type="button"
                onClick={() => setActiveId(finish.id)}
                className={`relative flex items-center justify-between p-3.5 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'border-[#F2B705] bg-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.5)] translate-x-1'
                    : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full p-0.5 shadow-md shrink-0"
                    style={{ background: finish.puckGradient }}
                  >
                    <div className="w-full h-full rounded-full border border-black/30" />
                  </div>
                  <div>
                    <h4 className={`text-sm font-medium transition-colors ${
                      isSelected ? 'text-[#F2B705]' : 'text-white'
                    }`}>
                      {finish.name}
                    </h4>
                    <span className="text-[10px] font-mono text-gray-400 block">
                      {finish.number} • {finish.subname}
                    </span>
                  </div>
                </div>

                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-[#F2B705] shadow-[0_0_8px_#F2B705]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right: Active Finish Feature Stage */}
        <div className="col-span-7 relative rounded-[28px] overflow-hidden border border-[#F2B705]/80 p-6 sm:p-8 flex flex-col justify-between shadow-2xl"
          style={{ background: activeFinish.metallicBackground }}
        >
          {/* Ambient Glow & Image */}
          <div 
            aria-hidden 
            className="absolute inset-0 pointer-events-none"
            style={{ background: activeFinish.gradientOverlay }}
          />
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-35">
            <img
              src={activeFinish.specimenImage}
              alt={activeFinish.name}
              className="w-full h-full object-cover filter saturate-125 brightness-90"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>

          {/* Top Header */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#F2B705]">
              <span>PVD SPECIMEN {activeFinish.number}</span>
            </div>

            <div 
              className="w-10 h-10 rounded-full p-0.5 shadow-xl ring-2 ring-[#F2B705]/60"
              style={{ background: activeFinish.puckGradient }}
            >
              <div className="w-full h-full rounded-full border border-black/30 shadow-inner" />
            </div>
          </div>

          {/* Auto-advance timer progress bar */}
          <div className="relative z-10 w-full h-1 bg-white/10 rounded-full overflow-hidden mt-3">
            <motion.div
              key={activeFinish.id}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 4.5, ease: "linear" }}
              className="h-full bg-[#F2B705] rounded-full"
            />
          </div>

          {/* Content */}
          <div className="relative z-10 space-y-4 my-auto py-4">
            <div>
              <span className="text-xs font-mono text-[#F2B705] uppercase tracking-wider block mb-1">
                {activeFinish.subname}
              </span>
              <h3 className="text-3xl font-serif text-white tracking-tight mb-2">
                {activeFinish.name}
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                {activeFinish.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <div className="p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
                <span className="text-[10px] font-mono uppercase text-gray-400 block mb-0.5">
                  Base Substrate
                </span>
                <span className="text-xs text-white font-medium line-clamp-2">
                  {activeFinish.alloy}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
                <span className="text-[10px] font-mono uppercase text-gray-400 block mb-0.5">
                  Architectural Pairing
                </span>
                <span className="text-xs text-white font-medium line-clamp-2">
                  {activeFinish.pairing}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="relative z-10 flex flex-col gap-2.5 pt-2">
            <Link
              to={`/products?finish=${activeFinish.id}`}
              className="w-full py-3 px-5 rounded-full bg-[#F2B705] text-[#111111] font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#ffc61a] transition-all shadow-lg"
            >
              <span>Explore {activeFinish.name} Hardware</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <Link
              to="/contact?interest=Finish%20Samples"
              className="text-center text-xs uppercase tracking-wider text-gray-300 hover:text-white transition-colors py-1"
            >
              <span>Request Physical Swatch Block &rarr;</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 3. MOBILE: Tactile Interactive Cards Carousel / Stack */}
      <div className="flex md:hidden flex-col gap-4">
        {ARCHITECTURAL_FINISHES.map((finish) => {
          const isOpen = finish.id === activeId;

          return (
            <div
              key={finish.id}
              onClick={() => setActiveId(finish.id)}
              className={`rounded-2xl border p-5 transition-all overflow-hidden relative cursor-pointer ${
                isOpen
                  ? 'border-[#F2B705] bg-white/[0.06] shadow-xl'
                  : 'border-white/10 bg-white/[0.02]'
              }`}
            >
              {/* Header inside mobile card */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded-full p-0.5 shadow-md"
                    style={{ background: finish.puckGradient }}
                  >
                    <div className="w-full h-full rounded-full border border-black/30" />
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-white">
                      {finish.name}
                    </h4>
                    <span className="text-[10px] font-mono text-gray-400">
                      {finish.number} • {finish.subname}
                    </span>
                  </div>
                </div>

                <span className={`text-xs font-mono uppercase tracking-wider ${
                  isOpen ? 'text-[#F2B705]' : 'text-gray-500'
                }`}>
                  {isOpen ? 'Active' : 'Tap'}
                </span>
              </div>

              {isOpen && (
                <div className="space-y-4 pt-2 border-t border-white/10">
                  {/* Auto-advance timer progress bar */}
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      key={finish.id}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 4.5, ease: "linear" }}
                      className="h-full bg-[#F2B705] rounded-full"
                    />
                  </div>

                  <div className="aspect-[16/9] rounded-xl overflow-hidden relative">
                    <img 
                      src={finish.specimenImage} 
                      alt={finish.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60" />
                    <span className="absolute bottom-2 left-3 text-xs text-white font-medium">
                      {finish.hardwareTitle}
                    </span>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed">
                    {finish.description}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-gray-400 font-mono">
                    <span>{finish.alloy}</span>
                    <span className="text-[#F2B705]">{finish.treatment}</span>
                  </div>

                  <Link
                    to={`/products?finish=${finish.id}`}
                    className="w-full py-2.5 px-4 rounded-full bg-[#F2B705] text-[#111111] font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    <span>View All</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
