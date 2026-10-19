import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Button } from '../components/common/Button';
import { EnquiryCTA } from '../components/common/EnquiryCTA';
import { ScrollReveal, TextReveal, ScrollRevealStagger, ScrollRevealItem } from '../components/common/ScrollReveal';
import { PolaroidLineCarousel, type Slide as PolaroidSlide } from '../components/ui/polaroid-line-carousel';
import {
  ArrowRight,
  FileArrowDown,
  Clock,
} from '@phosphor-icons/react';

const SPECIFICATION_SLIDES: PolaroidSlide[] = [
  {
    image: '/brass-door-handle.jpg',
    title: 'Master Catalogue 2026',
    caption: '184-Page Comprehensive Specifier Binder with 1:1 dimensional drawings and finish matrices.',
    alt: 'SIDDI Architectural Hardware Master Catalogue',
  },
  {
    image: '/Handles.jpg',
    title: 'Magnetic Mortise Locks',
    caption: 'DIN 18251 1:1 CNC milling schematics for silent magnetic latches and Euro-profile rebate pockets.',
    alt: 'Magnetic Mortise Lockset Milling Schematics',
  },
  {
    image: '/Knobs.jpg',
    title: 'Concealed 3D Hinges',
    caption: 'EN 1935 Grade 14 door weight calculations (160kg) and 3-way eccentric hex adjustment diagrams.',
    alt: 'Concealed 3D Hinge Weight Calculation',
  },
  {
    image: '/bathroom-accessory-kit.jpg',
    title: 'Sanitary Accessories',
    caption: 'AISI 316 marine stainless sub-surface concealed wall mounting details with silicone gaskets.',
    alt: 'Sanitary Accessories AISI 316 Marine Stainless Detail',
  },
  {
    image: '/Brushed Gold Basin Faucet.jpg',
    title: 'Residential Lookbook',
    caption: 'High-resolution photo editorial documenting custom brass and PVD applications across private residences.',
    alt: 'Luxury Residential Hardware Lookbook',
  },
  {
    image: '/Matte Black Faucet.jpg',
    title: 'Revit BIM Families',
    caption: 'LOD 350 / 400 parametric component families with door swing clearances and scheduling parameters.',
    alt: 'Parametric Revit BIM Family Master Library',
  },
  {
    image: '/Flush Button.jpg',
    title: 'PVD Finish Guide',
    caption: 'Spectral analysis, salt spray testing data, and care guidelines for Satin Gold, Gunmetal, and Bronze.',
    alt: 'Physical Vapor Deposition Finish Specification Guide',
  },
];

type CadTabKey = 'mortise' | 'hinge' | 'pull' | 'sanitary';

interface CadTabConfig {
  id: CadTabKey;
  label: string;
  badge: string;
  title: string;
  description: string;
  standard: string;
  specs: { label: string; value: string }[];
  drawingNote: string;
  downloads: { format: string; size: string; name: string }[];
}

const CAD_TABS: Record<CadTabKey, CadTabConfig> = {
  mortise: {
    id: 'mortise',
    label: 'Magnetic Mortise Locks',
    badge: 'DIN 18251 // REBATE 85MM',
    title: 'Magnetic Silent Mortise Lockset Prep',
    description: 'Standardized pocket milling dimensions for flush doors with silent magnetic detent latch and Euro-profile cylinder rebating.',
    standard: 'DIN 18251 / EN 12209 Grade 3',
    specs: [
      { label: 'Backset (A)', value: '55 mm / 60 mm' },
      { label: 'Center-to-Center (B)', value: '85 mm (Euro-Profile)' },
      { label: 'Forend / Faceplate (C)', value: '240 × 24 × 3 mm (Radius)' },
      { label: 'Pocket Rebate Depth', value: '78 mm Net Pocket' },
      { label: 'Magnetic Strike Rebate', value: '2.5 mm Flush Inset' },
      { label: 'Follower Hub Spindle', value: '8 × 8 mm Solid Steel' },
    ],
    drawingNote: 'Recommended CNC pocket feed rate: 12,000 RPM with 12mm spiral downcut bit. 0.5mm clearance gap around forend.',
    downloads: [
      { format: 'DWG', size: '1.4 MB', name: 'AutoCAD 2D Milling Detail' },
      { format: 'RVT', size: '3.2 MB', name: 'Revit LOD 400 Family' },
      { format: 'PDF', size: '820 KB', name: '1:1 Printable Rebate Template' },
    ],
  },
  hinge: {
    id: 'hinge',
    label: 'Concealed 3D Hinges',
    badge: 'EN 1935 // LOAD 160KG',
    title: 'Concealed 3-Way Adjustable Hinge Pockets',
    description: 'Milling coordinates for completely invisible door hinges with independent 3-axis hex cam adjustments for flush timber and aluminium frames.',
    standard: 'EN 1935 Grade 14 (160 kg / Pair)',
    specs: [
      { label: 'Leaf Length', value: '160 mm' },
      { label: 'Body Depth (Door)', value: '31 mm Recess' },
      { label: 'Body Depth (Frame)', value: '29 mm Recess' },
      { label: 'Min Door Thickness', value: '40 mm (Up to 55 mm)' },
      { label: 'Height Adjustment (Y)', value: '± 3.0 mm (Allen Key)' },
      { label: 'Side / Lateral Adjustment', value: '± 2.0 mm / -1.5 mm' },
    ],
    drawingNote: 'Ensure minimum 5mm solid timber framing beyond hinge pocket depth. Gap clearance between door and frame: 2.5 mm.',
    downloads: [
      { format: 'DWG', size: '2.1 MB', name: 'Hinge CNC Milling Schematics' },
      { format: 'RVT', size: '2.8 MB', name: 'Revit 3D Parametric Hinge' },
      { format: 'PDF', size: '640 KB', name: 'Weight & Sizing Capacity Matrix' },
    ],
  },
  pull: {
    id: 'pull',
    label: 'Architectural Pull Handles',
    badge: 'ENTRANCE // BACK-TO-BACK',
    title: 'Thru-Bolt & Dual-Sided Pull Anchoring',
    description: 'Structural cross-sections for monolithic brass and stainless pull handles on solid timber, acoustic laminate, and framed glass pivot portals.',
    standard: 'BS EN 1906 / ASTM Pull Spec',
    specs: [
      { label: 'Mounting Centers', value: '300 / 450 / 600 / 900 mm' },
      { label: 'Diameter / Section', value: 'Ø 25 mm & Ø 32 mm Solid' },
      { label: 'Drill Hole Glass', value: 'Ø 14 mm with Bushing' },
      { label: 'Drill Hole Timber', value: 'Ø 10 mm Through-Bore' },
      { label: 'Thread Bolt Grade', value: 'M8 Stainless Steel Gr 304' },
      { label: 'Anti-Twist Spigot', value: 'Concealed Dual Set Pins' },
    ],
    drawingNote: 'For toughened glass leaves, always utilize supplied neoprene isolation washers to prevent direct metal-to-glass contact.',
    downloads: [
      { format: 'DWG', size: '1.2 MB', name: 'Back-to-Back Glass & Timber CAD' },
      { format: 'RVT', size: '2.4 MB', name: 'Revit Parametric Pull Handle' },
      { format: 'PDF', size: '480 KB', name: 'Installation Elevation Guide' },
    ],
  },
  sanitary: {
    id: 'sanitary',
    label: 'Sanitary & Wet Systems',
    badge: 'AISI 316 // SUB-SURFACE MOUNT',
    title: 'Moisture-Barrier Concealed Wall Mounts',
    description: 'Hidden flange anchoring details for bathroom accessory systems on porcelain, stone cladding, and reinforced drywall partitions.',
    standard: 'DIN EN 12540 / Marine Grade',
    specs: [
      { label: 'Core Material', value: 'AISI 316 Marine Stainless' },
      { label: 'Flange Diameter', value: 'Ø 50 mm Concealed Rose' },
      { label: 'Wall Plug Spec', value: 'Fischer Duopower 8 × 40 mm' },
      { label: 'Fastener Spec', value: 'M5 Stainless Torx Screws' },
      { label: 'Sealing Gasket', value: 'EPDM Silicone Water-Stop' },
      { label: 'Tensile Load Rating', value: '120 kg Static Load' },
    ],
    drawingNote: 'For vitrified porcelain tiles, pre-drill with diamond core bit without hammer action. Apply silicone bead around flange groove.',
    downloads: [
      { format: 'DWG', size: '1.1 MB', name: 'Sanitary Mounting Profiles' },
      { format: 'RVT', size: '3.6 MB', name: 'Revit Bath Hardware Suite' },
      { format: 'PDF', size: '520 KB', name: 'Wet Area Installation Manual' },
    ],
  },
};

export const ResourcesPage: React.FC = () => {
  const [activeCadTab, setActiveCadTab] = useState<CadTabKey>('mortise');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExpanded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const currentTab = CAD_TABS[activeCadTab];

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      {/* 1. COMPACT ARCHITECTURAL HERO SECTION (DONE & LOCKED) */}
      <section className="bg-[#111111] text-white pt-28 md:pt-36 pb-8 md:pb-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Breadcrumb Navigation */}
          <div className="mb-4">
            <Breadcrumbs
              items={[{ label: 'Resources & Specifications' }]}
              className="text-gray-400 text-xs [&_a]:text-gray-400 [&_a:hover]:text-[#F2B705] [&_span]:text-[#F2B705]"
            />
          </div>

          {/* Compact Split: Title & Narrative on Left, Visual Preview on Right */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-2">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#F2B705]" />
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#F2B705] font-semibold">
                  Technical Repository & CAD Portal
                </span>
              </div>
              <TextReveal
                as="h1"
                text="Architectural Resources"
                className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-white tracking-tight mb-2"
              />
              <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
                Direct access to 2D CAD cutouts, BIM Revit families, master catalogues, and certified metallurgical test assays for architectural practices.
              </p>
              <div className="mt-3 text-xs text-gray-400 font-mono">
                <span>FORMATS: </span>
                <span className="text-[#F2B705] font-semibold">LOD 400 BIM</span>
                <span> • 2D DWG / DXF • CSI DIV 08 • FINISH ASSAYS</span>
              </div>
            </div>

            {/* Right Side Framed Visual */}
            <div className="w-full sm:w-80 md:w-96 shrink-0">
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-white/15 bg-black/60 shadow-xl">
                <img
                  src="/brass-door-handle.jpg"
                  alt="SIDDI Architectural Specifications & Engineering Drawings"
                  className={`w-full h-full object-cover object-center transition-transform duration-[1400ms] ease-[cubic-bezier(0.25,1,0.35,1)] will-change-transform ${
                    isExpanded ? 'scale-100' : 'scale-115'
                  }`}
                />
                <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t-2 border-l-2 border-[#F2B705] pointer-events-none" />
                <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t-2 border-r-2 border-[#F2B705] pointer-events-none" />
                <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b-2 border-l-2 border-[#F2B705] pointer-events-none" />
                <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b-2 border-r-2 border-[#F2B705] pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MAIN EDITORIAL CONTENT */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 sm:py-24 space-y-28">

        {/* SECTION A: TACTILE ARCHITECTURAL VOLUMES (Hardcover Showcase) */}
        <ScrollReveal as="section">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#F2B705]" />
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] font-semibold text-[#F2B705]">
              Core Publications // 01
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <TextReveal
                as="h2"
                text="Architectural Specifier Volumes"
                className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#111111] tracking-tight"
              />
              <p className="text-xs sm:text-sm text-[#666666] font-light mt-1 max-w-xl">
                Official bound catalogues, materials assay binders, and digital BIM packages engineered for architectural studios.
              </p>
            </div>
            <span className="text-xs font-mono text-[#777777]">
              REVISION Q1 2026 • OFFICIAL RELEASES
            </span>
          </div>

          <ScrollRevealStagger className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8" staggerDelay={0.1} once={true}>
            {/* Volume 01: Master Catalogue */}
            <ScrollRevealItem className="bg-white border border-[#111111]/12 rounded-2xl overflow-hidden hover:border-[#111111]/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
              <div>
                {/* Real Hardware Photography Header */}
                <div className="relative aspect-[16/10] bg-[#FAF9F6] overflow-hidden border-b border-[#111111]/10">
                  <img
                    src="/brass-door-handle.jpg"
                    alt="SIDDI Architectural Master Catalogue"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Floating Minimal Glass Pills */}
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-black/5 text-[10px] font-mono uppercase tracking-wider text-[#111111] font-medium shadow-2xs">
                    Vol. 01 • Master Catalogue
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-serif font-normal text-[#111111] leading-snug group-hover:text-[#F2B705] transition-colors">
                    Architectural Hardware Master Catalogue
                  </h3>
                  <p className="text-xs text-[#666666] font-light leading-relaxed">
                    1:1 dimensional line drawings, rosette specifications, and preparation cutouts for specifiers.
                  </p>
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#888888] pt-2 border-t border-[#111111]/10">
                    <span>CSI DIV 08 71 00</span>
                    <span className="text-[#111111] font-medium">14.2 MB PDF</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 pt-0 space-y-2">
                <Link
                  to="/contact?interest=Document%20Request:%20SIDDI%20Master%20Catalogue%202026"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 bg-[#111111] hover:bg-[#F2B705] hover:text-[#111111] text-white text-xs font-semibold tracking-wider uppercase rounded-full transition-all duration-200 shadow-2xs group/btn cursor-pointer"
                >
                  <span>Request Catalogue</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </ScrollRevealItem>

            {/* Volume 02: PVD Metallurgy & Finish Swatchbook */}
            <ScrollRevealItem className="bg-white border border-[#111111]/12 rounded-2xl overflow-hidden hover:border-[#111111]/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
              <div>
                {/* Real Hardware Photography Header */}
                <div className="relative aspect-[16/10] bg-[#FAF9F6] overflow-hidden border-b border-[#111111]/10">
                  <img
                    src="/bathroom-accessory-kit.jpg"
                    alt="SIDDI Finish Specification & Swatchbook"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Floating Minimal Glass Pills */}
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-black/5 text-[10px] font-mono uppercase tracking-wider text-[#111111] font-medium shadow-2xs">
                    Vol. 02 • Finish Guide
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-serif font-normal text-[#111111] leading-snug group-hover:text-[#F2B705] transition-colors">
                    Finish Specification &amp; Swatchbook
                  </h3>
                  <p className="text-xs text-[#666666] font-light leading-relaxed">
                    Spectral PVD assay data, ASTM B117 salt spray tests, and chemical cleaning tolerances.
                  </p>
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#888888] pt-2 border-t border-[#111111]/10">
                    <span>ASTM B117 ASSAY</span>
                    <span className="text-[#111111] font-medium">3.8 MB PDF</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 pt-0 space-y-2">
                <Link
                  to="/contact?interest=Document%20Request:%20PVD%20Finish%20Specification%20Guide"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 bg-[#111111] hover:bg-[#F2B705] hover:text-[#111111] text-white text-xs font-semibold tracking-wider uppercase rounded-full transition-all duration-200 shadow-2xs group/btn cursor-pointer"
                >
                  <span>Request Catalouge</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </ScrollRevealItem>

            {/* Volume 03: BIM LOD 400 Library */}
            <ScrollRevealItem className="bg-white border border-[#111111]/12 rounded-2xl overflow-hidden hover:border-[#111111]/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
              <div>
                {/* Real Hardware Photography Header */}
                <div className="relative aspect-[16/10] bg-[#FAF9F6] overflow-hidden border-b border-[#111111]/10">
                  <img
                    src="/Handles.jpg"
                    alt="SIDDI Revit BIM Family Master Library"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Floating Minimal Glass Pills */}
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-black/5 text-[10px] font-mono uppercase tracking-wider text-[#111111] font-medium shadow-2xs">
                    Vol. 03 • BIM Library
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-serif font-normal text-[#111111] leading-snug group-hover:text-[#F2B705] transition-colors">
                    Revit LOD 350 / 400 Master Library
                  </h3>
                  <p className="text-xs text-[#666666] font-light leading-relaxed">
                    Native Revit component families built with parametric clearance arcs and door scheduling parameters.
                  </p>
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#888888] pt-2 border-t border-[#111111]/10">
                    <span>AUTODESK CERTIFIED</span>
                    <span className="text-[#111111] font-medium">42.0 MB ZIP</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 pt-0 space-y-2">
                <Link
                  to="/contact?interest=Document%20Request:%20Revit%20BIM%20Family%20Master%20Library"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 bg-[#111111] hover:bg-[#F2B705] hover:text-[#111111] text-white text-xs font-semibold tracking-wider uppercase rounded-full transition-all duration-200 shadow-2xs group/btn cursor-pointer"
                >
                  <span>Request Catalogue</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </ScrollRevealItem>
          </ScrollRevealStagger>
        </ScrollReveal>

        {/* SECTION B: INTERACTIVE ARCHITECTURAL CAD WORKBENCH (Blueprint Lab) */}
        <ScrollReveal as="section" className="bg-[#111111] text-white rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden border border-white/10 shadow-2xl">
          <div className="relative z-10 space-y-8">
            {/* Header & Interactive Category Switcher */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F2B705]" />
                  <span className="text-[11px] font-mono uppercase tracking-[0.25em] font-semibold text-[#F2B705]">
                    Interactive CAD Workbench // 02
                  </span>
                </div>
                <TextReveal
                  as="h2"
                  text="Door Prep & CNC Milling Schematics"
                  className="text-2xl sm:text-4xl font-serif font-normal text-white tracking-tight"
                />
              </div>

              {/* Tab Selector */}
              <div className="flex flex-wrap items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10">
                {(Object.keys(CAD_TABS) as CadTabKey[]).map((tabKey) => {
                  const tab = CAD_TABS[tabKey];
                  const isActive = activeCadTab === tabKey;
                  return (
                    <button
                      key={tabKey}
                      onClick={() => setActiveCadTab(tabKey)}
                      className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#F2B705] text-[#111111] font-bold shadow-md'
                          : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tab Content Display */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Blueprint Schematic Visual Card */}
              <div className="lg:col-span-5 bg-black/70 border border-white/15 rounded-2xl p-6 relative">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 text-[10px] font-mono">
                  <span className="text-[#F2B705] font-semibold">{currentTab.badge}</span>
                  <span className="text-gray-400">SCALE 1:1 CNC DRAFT</span>
                </div>

                {/* Wireframe Architectural Elevation Diagram */}
                <div className="relative aspect-[4/3] my-4 rounded-xl border border-white/10 bg-black/50 flex items-center justify-center p-6">
                  {/* Outer CAD Border & Registration Ticks */}
                  <span className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[#F2B705]" />
                  <span className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[#F2B705]" />
                  <span className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-[#F2B705]" />
                  <span className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-[#F2B705]" />

                  {/* Wireframe Dynamic Representation */}
                  <div className="w-36 h-48 border-2 border-dashed border-[#F2B705]/70 rounded-xs flex flex-col items-center justify-between py-3 relative bg-[#111111]/60">
                    <div className="w-7 h-7 rounded-full border border-white/60 flex items-center justify-center text-[8px] font-mono text-white">
                      85
                    </div>
                    <div className="w-10 h-14 border border-white/40 rounded-xs flex flex-col items-center justify-center text-[7px] font-mono text-gray-300 gap-1">
                      <span>CYL</span>
                      <span className="w-4 h-0.5 bg-[#F2B705]" />
                    </div>
                    <span className="absolute -left-6 top-1/2 -translate-y-1/2 -rotate-90 text-[8px] font-mono text-[#F2B705]">
                      FACE 240MM
                    </span>
                    <span className="absolute -right-6 top-1/2 -translate-y-1/2 rotate-90 text-[8px] font-mono text-gray-400">
                      DEPTH 78MM
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-gray-300 font-mono leading-relaxed bg-white/5 p-3 rounded-lg border border-white/10">
                  <span className="text-[#F2B705] font-semibold">Note: </span>
                  {currentTab.drawingNote}
                </div>
              </div>

              {/* Right Column: Spec Parameters & Direct File Request */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#F2B705] block mb-1">
                    CERTIFIED STANDARD: {currentTab.standard}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-normal text-white">
                    {currentTab.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 font-light mt-1.5 leading-relaxed">
                    {currentTab.description}
                  </p>
                </div>

                {/* 2x3 Specification Coordinates Table */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {currentTab.specs.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-white/5 border border-white/10 rounded-xl space-y-0.5"
                    >
                      <span className="block font-mono text-[9px] uppercase tracking-wider text-gray-400">
                        {item.label}
                      </span>
                      <span className="block text-xs font-semibold text-white">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Downloadable Package Formats */}
                <div className="space-y-3 pt-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400 block">
                    Available CAD/BIM File Formats for this component:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {currentTab.downloads.map((file, idx) => (
                      <Link
                        key={idx}
                        to={`/contact?interest=CAD%20Download:%20${encodeURIComponent(
                          currentTab.title + ' (' + file.format + ')'
                        )}`}
                        className="p-3 bg-white/10 hover:bg-[#F2B705] hover:text-[#111111] border border-white/15 rounded-xl transition-all group flex items-center justify-between"
                      >
                        <div className="space-y-0.5">
                          <span className="block text-[10px] font-mono font-bold uppercase text-[#F2B705] group-hover:text-[#111111]">
                            {file.format} • {file.size}
                          </span>
                          <span className="block text-xs font-semibold">
                            {file.name}
                          </span>
                        </div>
                        <FileArrowDown className="w-4 h-4 shrink-0 text-gray-400 group-hover:text-[#111111]" />
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Button
                    to="/contact?interest=Custom%20Milling%20Rebate%20Consultation"
                    variant="primary"
                    size="sm"
                    withArrow
                  >
                    Consult With Technical Ironmonger
                  </Button>
                  <Link
                    to="/contact?interest=Request%20Full%20CAD%20Bundle"
                    className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider font-semibold text-white hover:text-[#F2B705] transition-colors py-2"
                  >
                    <span>Request Complete Master CAD Package</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#F2B705]" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>


        {/* SECTION D: SPECIFICATION TAKE-OFF STUDIO BANNER */}
        <ScrollReveal as="section" className="bg-gradient-to-r from-[#1A1A1A] via-[#141414] to-[#0D0D0D] text-white rounded-3xl p-8 sm:p-12 border border-white/10 shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#F2B705]" />
                <span className="text-[11px] font-mono uppercase tracking-[0.25em] font-semibold text-[#F2B705]">
                  Studio Concierge Service // 04
                </span>
              </div>
              <TextReveal
                as="h3"
                text="Have a Project Door Schedule or Floor Plan?"
                className="text-2xl sm:text-4xl font-serif font-normal text-white tracking-tight"
              />
              <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                Send your schedule spreadsheet (Excel), floor plans (DWG/PDF), or door elevations. Our in-house architectural specification desk generates a complete door-by-door hardware specification takeoff within 48 hours.
              </p>

              {/* 3 Step Process Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 text-xs font-mono">
                <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/10">
                  <span className="w-5 h-5 rounded-full bg-[#F2B705] text-[#111111] font-bold flex items-center justify-center text-[10px]">
                    1
                  </span>
                  <span>Upload Plans / Excel</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/10">
                  <span className="w-5 h-5 rounded-full bg-[#F2B705] text-[#111111] font-bold flex items-center justify-center text-[10px]">
                    2
                  </span>
                  <span>Ironmonger Takeoff</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/10">
                  <span className="w-5 h-5 rounded-full bg-[#F2B705] text-[#111111] font-bold flex items-center justify-center text-[10px]">
                    3
                  </span>
                  <span>48h Specification Binder</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <Button
                to="/contact?interest=Door%20Schedule%20Takeoff"
                variant="primary"
                size="md"
                withArrow
              >
                Submit Project Door Schedule
              </Button>
              <Link
                to="/contact?interest=Book%20Specification%20Call"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-mono uppercase tracking-wider font-semibold text-white hover:text-[#F2B705] transition-colors py-2.5"
              >
                <Clock className="w-4 h-4 text-[#F2B705]" />
                <span>Book 15-Min Specifier Call</span>
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* SECTION E: SPECIFICATION POLAROID LINE CAROUSEL GALLERY */}
        <ScrollReveal as="section">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#F2B705]" />
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] font-semibold text-[#F2B705]">
              Specification Archive Gallery // 05
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <TextReveal
                as="h2"
                text="Technical Documentation Gallery"
                className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#111111] tracking-tight"
              />
              <p className="text-xs sm:text-sm text-[#666666] font-light mt-1 max-w-xl">
                Drag the hanging line or swipe through suspended photographic plates of our master catalogues, CAD cutouts, and metallurgy dossiers.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                to="/contact?interest=All%20Specification%20Archive%20Bundle"
                variant="primary"
                size="sm"
                withArrow
              >
                Request Full Technical Suite
              </Button>
            </div>
          </div>

          {/* Polaroid Line Carousel Container */}
          <div className="bg-[#FAF9F6] border border-[#111111]/12 rounded-3xl overflow-hidden shadow-sm">
            <PolaroidLineCarousel
              slides={SPECIFICATION_SLIDES}
              height="clamp(520px, 75vh, 600px)"
              cardWidth={290}
              sag={42}
              swing={1}
              autoplay={4500}
              string="#B8A995"
              background="#FAF9F6"
              ink="#111111"
              ariaLabel="SIDDI Technical Documentation and Architectural Specifications"
            />
          </div>
        </ScrollReveal>

      </div>

      {/* 4. PRESERVED ENQUIRY CTA (Untouched) */}
      <EnquiryCTA />
    </div>
  );
};
