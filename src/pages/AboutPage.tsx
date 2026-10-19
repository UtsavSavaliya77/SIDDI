import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from '@phosphor-icons/react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { EnquiryCTA } from '../components/common/EnquiryCTA';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { WaterRippleCarousel, type Slide } from '../components/ui/water-ripple-carousel';

const MANIFESTO_SLIDES: Slide[] = [
  {
    image: '/brass-door-handle.jpg',
    title: 'Solid Forged Brass',
    caption: 'Hot-forged at 750°C with precision diamond-knurled grip.',
    alt: 'SIDDI Forged Brass Door Handle with Knurled Grip',
  },
  {
    image: '/Handles.jpg',
    title: 'Architectural Levers',
    caption: 'Balanced ergonomic throw with dual high-tensile return springs.',
    alt: 'SIDDI Architectural Lever Collection',
  },
  {
    image: '/bathroom-accessory-kit.jpg',
    title: 'Sanitary Systems',
    caption: 'Moisture-sealed AISI 316 marine stainless & satin PVD.',
    alt: 'SIDDI Bathroom Accessory Kit',
  },
  {
    image: '/Knobs.jpg',
    title: 'Monolithic Turn Knobs',
    caption: 'CNC lathed from single virgin brass billet stock.',
    alt: 'SIDDI Precision Turned Brass Knobs',
  },
];

export const AboutPage: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExpanded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      {/* 1. COMPACT ARCHITECTURAL HERO SECTION */}
      <section className="bg-[#111111] text-white pt-28 md:pt-36 pb-8 md:pb-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Breadcrumb Navigation */}
          <div className="mb-4">
            <Breadcrumbs
              items={[{ label: 'About SIDDI' }]}
              className="text-gray-400 text-xs [&_a]:text-gray-400 [&_a:hover]:text-[#F2B705] [&_span]:text-[#F2B705]"
            />
          </div>

          {/* Compact Split: Brand Narrative on Left, Crisp Hero Image on Right */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-2">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#F2B705]" />
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#F2B705] font-semibold">
                  Foundry Heritage & Metallurgy
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-white tracking-tight mb-2">
                About SIDDI Hardware
              </h1>
              <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
                Conceived at the intersection of metallurgy and interior serenity. We engineer structural touchpoints that articulate the enduring quality of an entire interior.
              </p>
              <div className="mt-3 text-xs text-gray-400 font-mono">
                <span>FOUNDED ON </span>
                <span className="text-[#F2B705] font-semibold">VIRGIN METALLURGY</span>
                <span> • ZERO DIE-CAST SHORTCUTS</span>
              </div>
            </div>

            {/* Right Side Proper Image */}
            <div className="w-full sm:w-80 md:w-96 shrink-0">
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-white/15 bg-black/60 shadow-xl">
                <img
                  src="/brass-door-handle.jpg"
                  alt="SIDDI Foundry Heritage & Metallurgy"
                  className={`w-full h-full object-cover object-center transition-transform duration-[1400ms] ease-[cubic-bezier(0.25,1,0.35,1)] will-change-transform ${
                    isExpanded ? 'scale-100' : 'scale-115'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN ABOUT CONTENT */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 sm:py-24">

        {/* SECTION 1: METALLURGICAL MANIFESTO (Editorial Architectural Spread) */}
        <ScrollReveal className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-center mb-28 pb-20 border-b border-[#111111]/15">
          {/* Left Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F2B705]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] font-semibold text-[#F2B705]">
                Metallurgical Manifesto // 01
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-serif font-normal leading-[1.14] text-[#111111] tracking-tight">
              Architectural hardware conceived at the intersection of metallurgy and interior serenity.
            </h2>

            <p className="text-base sm:text-lg text-[#555555] font-light leading-relaxed">
              At SIDDI, we treat hardware not as decorative afterthoughts, but as structural contact points that articulate the quality of an entire interior. Before you observe the proportions of a room or experience daylight streaming through a window, your hand touches the hardware.
            </p>

            <p className="text-sm sm:text-base text-[#666666] font-light leading-relaxed">
              By controlling our metal formulations, precision CNC toolpaths, and multi-layer PVD finish applications, SIDDI provides architects, interior designers, contractors, and discerning homeowners with dependable hardware that endures across generations of daily interaction.
            </p>

            {/* Architectural Manifesto Quote Card */}
            <div className="p-5 sm:p-6 bg-white border border-[#111111]/12 border-l-4 border-l-[#F2B705] rounded-r-xl shadow-xs space-y-2">
              <p className="font-serif italic text-base sm:text-lg text-[#111111] leading-snug">
                "Hardware is the first tactile touchpoint of every space. If it feels hollow or loose, the entire architecture feels compromised."
              </p>
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#777777] block">
                The SIDDI Architectural Thesis
              </span>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button to="/contact" variant="primary" size="md" withArrow>
                Consult With Our Engineering Team
              </Button>
              <Link
                to="/resources"
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider font-semibold text-[#111111] hover:text-[#F2B705] transition-colors py-2.5"
              >
                <span>View Raw Material Assays</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Media & Metallurgical Assay Matrix */}
          <div className="lg:col-span-5 space-y-5">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-[#111111]/15 bg-[#141414] shadow-2xl group">
              <div className="absolute inset-0">
                <WaterRippleCarousel
                  slides={MANIFESTO_SLIDES}
                  height="100%"
                  duration={1600}
                  strength={1.1}
                  autoplay={5000}
                  ink="#F2B705"
                  ariaLabel="SIDDI Architectural Hardware Metallurgy Carousel"
                />
              </div>

              {/* Precision Solid Gold CAD Drafting Corner Brackets */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#F2B705] pointer-events-none z-20" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#F2B705] pointer-events-none z-20" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#F2B705] pointer-events-none z-20" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#F2B705] pointer-events-none z-20" />
            </div>

            {/* 2x2 Metric Assay Matrix */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-white border border-[#111111]/12 rounded-xl shadow-xs">
                <span className="block font-mono text-[10px] uppercase tracking-wider text-[#777777] mb-1">
                  Hot Die Forged
                </span>
                <span className="block text-xs font-semibold text-[#111111]">
                  750°C Virgin Brass
                </span>
              </div>
              <div className="p-4 bg-white border border-[#111111]/12 rounded-xl shadow-xs">
                <span className="block font-mono text-[10px] uppercase tracking-wider text-[#777777] mb-1">
                  Return Springs
                </span>
                <span className="block text-xs font-semibold text-[#111111]">
                  Dual Torsion High-Tensile
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* SECTION 2: 4 CORE ENGINEERING PILLARS */}
        <ScrollReveal className="mb-28">
          <SectionHeading
            align="split"
            eyebrow="Core Tenets"
            title="The Principles That Guide Our Manufacturing"
            description="Our engineering decisions are grounded in acoustic density, tactile feedback, and unified metallic tones across all interior typologies."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {/* Pillar 01 */}
            <div className="bg-white border border-[#111111]/12 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:border-[#111111]/30 hover:shadow-md transition-all duration-300 group">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#111111]/10">
                  <span className="text-xl font-mono font-bold text-[#F2B705]">01</span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#777777]">
                    Metallurgy
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-serif font-normal text-[#111111]">
                    Acoustic & Tactile Weight
                  </h3>
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-[#F2B705] font-semibold">
                    100% Solid Billet Core
                  </span>
                </div>

                <p className="text-xs text-[#666666] leading-relaxed font-light">
                  Hardware must feel substantial. We reject hollow pressings in favor of solid forged brass billets, high-density alloys, and thick-walled stainless steel.
                </p>

                <ul className="space-y-2 pt-2 border-t border-[#111111]/5 text-xs text-[#444444]">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#F2B705] shrink-0" weight="bold" />
                    <span>Zero hollow zinc stampings</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#F2B705] shrink-0" weight="bold" />
                    <span>Weighted palm ergonomics</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Pillar 02 */}
            <div className="bg-white border border-[#111111]/12 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:border-[#111111]/30 hover:shadow-md transition-all duration-300 group">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#111111]/10">
                  <span className="text-xl font-mono font-bold text-[#F2B705]">02</span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#777777]">
                    Mechanics
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-serif font-normal text-[#111111]">
                    Silent Mechanical Action
                  </h3>
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-[#F2B705] font-semibold">
                    Silent Magnetic Detent
                  </span>
                </div>

                <p className="text-xs text-[#666666] leading-relaxed font-light">
                  Silent magnetic mortise latches, self-lubricating PTFE bushings, and dual torsion springs eliminate latch strike friction and mechanical vibration.
                </p>

                <ul className="space-y-2 pt-2 border-t border-[#111111]/5 text-xs text-[#444444]">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#F2B705] shrink-0" weight="bold" />
                    <span>No metal strike-plate click</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#F2B705] shrink-0" weight="bold" />
                    <span>Zero lever sag alignment</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Pillar 03 */}
            <div className="bg-white border border-[#111111]/12 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:border-[#111111]/30 hover:shadow-md transition-all duration-300 group">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#111111]/10">
                  <span className="text-xl font-mono font-bold text-[#F2B705]">03</span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#777777]">
                    Surfaces
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-serif font-normal text-[#111111]">
                    Systemic Finish Matching
                  </h3>
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-[#F2B705] font-semibold">
                    100% Spectral Harmony
                  </span>
                </div>

                <p className="text-xs text-[#666666] leading-relaxed font-light">
                  A lever handle, shower towel rail, flush bolt, and cabinet pull must harmonize in tone. We maintain strict PVD spectral calibration across all lines.
                </p>

                <ul className="space-y-2 pt-2 border-t border-[#111111]/5 text-xs text-[#444444]">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#F2B705] shrink-0" weight="bold" />
                    <span>Synchronized PVD chambers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#F2B705] shrink-0" weight="bold" />
                    <span>Zero multi-vendor mismatch</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Pillar 04 */}
            <div className="bg-white border border-[#111111]/12 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:border-[#111111]/30 hover:shadow-md transition-all duration-300 group">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#111111]/10">
                  <span className="text-xl font-mono font-bold text-[#F2B705]">04</span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#777777]">
                    Endurance
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-serif font-normal text-[#111111]">
                    Contract Specification
                  </h3>
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-[#F2B705] font-semibold">
                    EN 1906 Grade 4 Tested
                  </span>
                </div>

                <p className="text-xs text-[#666666] leading-relaxed font-light">
                  Cycle-tested across 200,000+ operations to exceed European contract standards, resisting coastal salt air, humidity, and high-frequency hotel traffic.
                </p>

                <ul className="space-y-2 pt-2 border-t border-[#111111]/5 text-xs text-[#444444]">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#F2B705] shrink-0" weight="bold" />
                    <span>High-humidity corrosion pass</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#F2B705] shrink-0" weight="bold" />
                    <span>15-Year mechanical warranty</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* SECTION 3: METALLURGY LABORATORY & MATERIAL TRANSPARENCY DOSSIER */}
        <ScrollReveal className="bg-[#111111] text-white rounded-3xl p-8 sm:p-12 lg:p-16 mb-28 border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Subtle Background CAD Coordinate Grid */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="aboutDossierGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#333333" strokeWidth="0.5" />
                  <circle cx="0" cy="0" r="1" fill="#666666" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#aboutDossierGrid)" />
            </svg>
          </div>

          {/* Precision CAD Drafting Corner Brackets */}
          <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#F2B705] pointer-events-none opacity-70" />
          <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#F2B705] pointer-events-none opacity-70" />
          <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#F2B705] pointer-events-none opacity-70" />
          <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#F2B705] pointer-events-none opacity-70" />

          <div className="relative z-10 space-y-10">
            {/* Header Split */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-white/10">
              <div className="max-w-2xl space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F2B705] animate-pulse" />
                  <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#F2B705] font-semibold">
                    Materials & Laboratory Certification
                  </span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-serif font-normal text-white leading-tight">
                  Authentic Specifications Without Exaggeration
                </h2>
                <p className="text-sm text-gray-300 font-light leading-relaxed">
                  We believe in straightforward, transparent engineering. Rather than claiming unverifiable histories or fabricated accolades, we invite architects and specifiers to inspect our raw material assays, salt spray test reports, and physical sample boxes directly.
                </p>
              </div>

              <div className="shrink-0 flex flex-col sm:flex-row gap-3">
                <Button to="/contact?interest=Metallurgy%20Specs" variant="secondary" size="md">
                  Request Metallurgy Data Sheets
                </Button>
                <Link
                  to="/contact?interest=Finish%20Samples"
                  className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/20 text-white rounded-lg text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Request Finish Box</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#F2B705]" />
                </Link>
              </div>
            </div>

            {/* 4 Laboratory Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-5 bg-white/[0.03] border border-white/10 rounded-xl space-y-2">
                <span className="block font-mono text-[10px] uppercase tracking-wider text-[#F2B705] font-semibold">
                  Alloy Grade
                </span>
                <span className="block text-base font-semibold text-white">
                  Virgin Solid Brass
                </span>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  CuZn39Pb3 virgin alloy hot-forged under 750-ton mechanical presses for dense acoustic heft.
                </p>
              </div>

              <div className="p-5 bg-white/[0.03] border border-white/10 rounded-xl space-y-2">
                <span className="block font-mono text-[10px] uppercase tracking-wider text-[#F2B705] font-semibold">
                  Stainless Standard
                </span>
                <span className="block text-base font-semibold text-white">
                  AISI 304 & 316 Marine
                </span>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  Austenitic stainless steel enriched with molybdenum to eliminate pitting in coastal saline air.
                </p>
              </div>

              <div className="p-5 bg-white/[0.03] border border-white/10 rounded-xl space-y-2">
                <span className="block font-mono text-[10px] uppercase tracking-wider text-[#F2B705] font-semibold">
                  Surface Treatment
                </span>
                <span className="block text-base font-semibold text-white">
                  High-Vacuum PVD Armour
                </span>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  Titanium nitride molecular lattice achieving 2,400 HV Vickers hardness for scratch protection.
                </p>
              </div>

              <div className="p-5 bg-white/[0.03] border border-white/10 rounded-xl space-y-2">
                <span className="block font-mono text-[10px] uppercase tracking-wider text-[#F2B705] font-semibold">
                  Mechanical Endurance
                </span>
                <span className="block text-base font-semibold text-white">
                  EN 1906 Grade 4 Pass
                </span>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  Cycle-tested across 200,000 actuations under continuous maximum leaf load with zero spring sag.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* SECTION 4: ARCHITECTURAL PARTNERSHIP TIMELINE */}
        <ScrollReveal className="p-8 sm:p-12 bg-white border border-[#111111]/12 rounded-2xl shadow-xs">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 mb-8 border-b border-[#111111]/10">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#F2B705] font-semibold block mb-1">
                Studio Collaboration
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-normal text-[#111111]">
                How We Partner With Architectural Practices
              </h3>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider font-semibold text-[#111111] hover:text-[#F2B705] transition-colors"
            >
              <span>Initiate Studio Partnership</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#F2B705]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-[#F2B705] block">PHASE 01</span>
              <h4 className="text-base font-semibold text-[#111111]">Specification Schedule</h4>
              <p className="text-xs text-[#666666] font-light leading-relaxed">
                Send floor plans or door schedules. Our team produces door-by-door master hardware takeoffs.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-[#F2B705] block">PHASE 02</span>
              <h4 className="text-base font-semibold text-[#111111]">48h Sample Kit</h4>
              <p className="text-xs text-[#666666] font-light leading-relaxed">
                Curated solid metal finish blocks dispatched directly to your studio for client presentation boards.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-[#F2B705] block">PHASE 03</span>
              <h4 className="text-base font-semibold text-[#111111]">CAD & LOD 400 BIM</h4>
              <p className="text-xs text-[#666666] font-light leading-relaxed">
                Download parametric Revit families, mortise cutouts, and installation rebate drawings.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-[#F2B705] block">PHASE 04</span>
              <h4 className="text-base font-semibold text-[#111111]">15-Yr Site Warranty</h4>
              <p className="text-xs text-[#666666] font-light leading-relaxed">
                Comprehensive commercial mechanical warranty issued upon site handover for complete peace of mind.
              </p>
            </div>
          </div>
        </ScrollReveal>

      </div>

      {/* Enquiry CTA */}
      <EnquiryCTA />
    </div>
  );
};
