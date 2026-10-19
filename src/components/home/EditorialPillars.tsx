import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowUpRight, 
  Check, 
  ShieldCheck, 
  Stack, 
  Compass, 
  Sliders
} from '@phosphor-icons/react';
import { ScrollRevealStagger, ScrollRevealItem } from '../common/ScrollReveal';

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
  metricValue: string;
  metricLabel: string;
}

const PILLARS: Pillar[] = [
  {
    id: 'metallurgy',
    number: '01',
    code: 'MET-ARCH-01',
    category: 'Metallurgy Standard',
    title: 'Solid Forged Metallurgy',
    subtitle: 'Virgin CuZn39Pb3 Brass & 316 Stainless',
    tagline: 'ACOUSTIC DENSITY & ZERO DEFLECTION',
    description:
      'Forged exclusively from pure solid brass and austenitic marine-grade 316 stainless steel. Engineered for authentic tactile heft, acoustic density, and zero deflection.',
    image:
      '/brass-door-handle.jpg',
    icon: Stack,
    highlights: [
      'Lead-Free Virgin Alloy',
      'Solid Metal Core — Zero Diecast',
      'Acoustic Heft & Zero Deflection',
    ],
    metricValue: '100% Solid',
    metricLabel: 'Virgin Forged Metallurgy',
  },
  {
    id: 'pvd-armour',
    number: '02',
    code: 'PVD-SURF-02',
    category: 'Surface Architecture',
    title: 'Titanium PVD Armour',
    subtitle: 'High-Vacuum Plasma Deposition',
    tagline: 'IMPERVIOUS TO HUMIDITY & SALINE AIR',
    description:
      'Physical Vapor Deposition bonds titanium atoms directly into the metal lattice in a high-vacuum chamber. Impervious to coastal salt air, humidity, and antimicrobial solvents.',
    image:
      '/Handles.jpg',
    icon: ShieldCheck,
    highlights: [
      '2,400 HV Vickers Hardness',
      'Molecular Anti-Tarnish Seal',
      'Coastal Marine Certified',
    ],
    metricValue: '2,400 HV',
    metricLabel: 'Surface Hardness Rating',
  },
  {
    id: 'architectural-fit',
    number: '03',
    code: 'FIT-MECH-03',
    category: 'Mechanical Engineering',
    title: 'Architectural Flush Fit',
    subtitle: '4mm Low-Profile Rose System',
    tagline: 'MILLIMETER-EXACT SPATIAL INTEGRATION',
    description:
      'Engineered for flush architectural integration. Signature 4mm low-profile rose sits virtually flat against timber or marble doors with 3D multi-axis micro-alignment.',
    image:
      '/Knobs.jpg',
    icon: Compass,
    highlights: [
      'Concealed Sub-Rose Fixings',
      'Ultra-Low 4mm Projection',
      'Acoustic Return Springs',
    ],
    metricValue: '4.0 mm',
    metricLabel: 'Ultra-Low Rose Profile',
  },
  {
    id: 'specification-support',
    number: '04',
    code: 'SPEC-TRADE-04',
    category: 'Trade Advisory',
    title: 'Specification Support',
    subtitle: 'Turnkey Schedules & 48h Samples',
    tagline: 'DIRECT ARCHITECTURAL PARTNERSHIP',
    description:
      'We partner with architectural studios from concept to handover. Automated door schedules, 48-hour finish sample boxes, and parametric LOD 400 Revit BIM assets.',
    image:
      '/bathroom-kit.jpg',
    icon: Sliders,
    highlights: [
      '48h Curated Finish Samples',
      'Door Takeoff Project Schedules',
      'Revit LOD 400 BIM Ready',
    ],
    metricValue: '48 Hours',
    metricLabel: 'Sample Kit Dispatch',
  },
];

export const EditorialPillars: React.FC = () => {
  return (
    <div className="relative mt-8 space-y-6">

      {/* =========================================================================
          4-CARD ARCHITECTURAL GRID (All 4 Visible Simultaneously — Zero Tabs)
          ========================================================================= */}
      <ScrollRevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch" staggerDelay={0.1} once={false}>
        {PILLARS.map((pillar, idx) => {
          const Icon = pillar.icon;

          return (
            <ScrollRevealItem key={pillar.id} distance={20} duration={0.65} className="h-full flex flex-col">
              <div
                className="bg-white border border-[#111111]/12 rounded-3xl overflow-hidden flex flex-col justify-between shadow-xs transition-all duration-300 hover:border-[#111111]/30 hover:shadow-md hover:-translate-y-1 group relative h-full"
              >
              {/* Animated Solid Border Trace (NO GRADIENTS) */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none rounded-3xl z-20"
                style={{ overflow: 'visible' }}
              >
                <rect
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  rx="24"
                  ry="24"
                  fill="none"
                  stroke="#F2B705"
                  strokeWidth="2.5"
                  pathLength="100"
                  strokeDasharray="22 78"
                  className="pillar-card-animated-border"
                  style={{
                    animationDelay: `${idx * 1.1}s`,
                  }}
                />
              </svg>

              {/* Card Header Media Frame */}
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#FAF9F6] border-b border-[#111111]/10">
                <img
                  src={pillar.image}
                  alt={pillar.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />

                {/* Subtle solid scrim for contrast (NO GRADIENTS) */}
                <div className="absolute inset-0 bg-black/15 pointer-events-none" />

                {/* Bottom Tagline Overlay */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 pointer-events-none">
                  <span className="font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 bg-black/85 text-white rounded border border-white/10 block truncate">
                    {pillar.tagline}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                <div>
                  {/* Category Eyebrow */}
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-3 h-[1.5px] bg-[#F2B705]" />
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#F2B705] font-semibold">
                      {pillar.category}
                    </span>
                  </div>

                  {/* Title & Icon Header */}
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-9 h-9 rounded-xl bg-[#FAF9F6] border border-[#111111]/10 flex items-center justify-center text-[#111111] group-hover:text-[#F2B705] group-hover:border-[#F2B705]/40 transition-colors shrink-0 mt-0.5">
                      <Icon className="w-5 h-5" weight="duotone" />
                    </div>
                    <div>
                      <h3 className="text-lg xl:text-xl font-serif font-normal text-[#111111] leading-snug">
                        {pillar.title}
                      </h3>
                      <p className="text-[11px] font-mono uppercase tracking-wider text-[#777777] mt-0.5">
                        {pillar.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Highlights Checklist */}
                  <div className="space-y-1.5 mb-5">
                    {pillar.highlights.map((h, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-[11px] text-[#222222]"
                      >
                        <div className="w-3.5 h-3.5 rounded bg-[#F2B705] flex items-center justify-center text-[#111111] shrink-0">
                          <Check className="w-2.5 h-2.5" weight="bold" />
                        </div>
                        <span className="truncate">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Metric & Action Bar */}
                <div className="pt-4 border-t border-[#111111]/10 flex items-center justify-between gap-2 mt-auto">
                  <div>
                    <div className="text-base font-mono font-bold text-[#111111]">
                      {pillar.metricValue}
                    </div>
                    <div className="text-[9px] font-mono uppercase tracking-wider text-[#777777]">
                      {pillar.metricLabel}
                    </div>
                  </div>

                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[#111111] group-hover:text-[#F2B705] transition-colors"
                  >
                    <span>Enquire</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </ScrollRevealItem>
        );
        })}
      </ScrollRevealStagger>

    </div>
  );
};
