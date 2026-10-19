import React, { useState, useEffect } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { EnquiryCTA } from '../components/common/EnquiryCTA';
import { ScrollReveal, TextReveal } from '../components/common/ScrollReveal';
import { APPLICATION_AREAS } from '../data/products';
import { Scroll01, type Scroll01Item } from '../components/ui/scroll-01';

interface SpatialMeta {
  code: string;
  environmentTag: string;
  specs: { label: string; value: string }[];
  acousticOrDurability: string;
}

const SPATIAL_METADATA: Record<string, SpatialMeta> = {
  'residential-bathrooms': {
    code: 'TYP-WET-01',
    environmentTag: 'High-Humidity & Marine Zones',
    specs: [
      { label: 'Surface Armour', value: 'Multi-Layer Titanium PVD' },
      { label: 'Substrate', value: 'Solid Forged Brass CuZn39Pb3' },
      { label: 'Mounting Chassis', value: 'Concealed Dual-Lug Anti-Spin' },
      { label: 'Moisture Seal', value: 'Neoprene & Silicone Gaskets' },
    ],
    acousticOrDurability: 'Impervious to saline air, steam, and cleaning solvents',
  },
  'master-suites-doors': {
    code: 'TYP-PASS-02',
    environmentTag: 'Acoustic & Private Suites',
    specs: [
      { label: 'Latch Mechanism', value: 'Silent Magnetic Detent (No Click)' },
      { label: 'Hinge Standard', value: 'Concealed 3D Multi-Axis Flush' },
      { label: 'Return Spring', value: 'Dual Torsion High-Tensile Cassette' },
      { label: 'Rose Profile', value: '4mm Ultra-Low Rosette' },
    ],
    acousticOrDurability: 'Zero frame-strike friction for whisper-quiet passage',
  },
  'hospitality-hotels': {
    code: 'TYP-HOSP-03',
    environmentTag: 'High-Turnover Luxury Contract',
    specs: [
      { label: 'Cycle Durability', value: 'EN 1906 Grade 4 (200k+ Cycles)' },
      { label: 'Security Standard', value: 'Euro-Profile Cylinders' },
      { label: 'Fixings', value: 'Through-Bolt Anti-Tamper Sleeves' },
      { label: 'Finish Durability', value: '2,400 HV Vickers Hardness' },
    ],
    acousticOrDurability: 'Heavy commercial duty tested for extreme guest turnover',
  },
  'commercial-interiors': {
    code: 'TYP-COMM-04',
    environmentTag: 'Executive & Glass Partition Suites',
    specs: [
      { label: 'Pivot Rating', value: '160kg Heavy Leaf Capacity' },
      { label: 'Hold-Open', value: 'Hydraulic 90° Detent Control' },
      { label: 'Door Compatibility', value: 'Timber, Aluminium & 12mm Glass' },
      { label: 'Joinery Pulls', value: 'Recessed Flush Edge Profiles' },
    ],
    acousticOrDurability: 'Oversized entrance statement with smooth hydraulic closing',
  },
  'bespoke-renovations': {
    code: 'TYP-MILL-05',
    environmentTag: 'Custom Joinery & Heritage Millwork',
    specs: [
      { label: 'Finish Consistency', value: '100% Metallic Suite Harmony' },
      { label: 'Center Spacing', value: 'Standard Architectural Pitch' },
      { label: 'Bespoke Milled', value: 'CNC Beveled & Knurled Options' },
      { label: 'Documentation', value: 'Parametric LOD 400 BIM Ready' },
    ],
    acousticOrDurability: 'Unifies door, vanity, and cabinet hardware under one finish tone',
  },
};

export const ApplicationsPage: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExpanded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollItems: Scroll01Item[] = APPLICATION_AREAS.map((app, index) => {
    const meta = SPATIAL_METADATA[app.id] || {
      code: `TYP-SPEC-0${index + 1}`,
      environmentTag: 'Architectural Typology',
      specs: [
        { label: 'Surface Metallurgy', value: 'Solid Forged Brass CuZn39Pb3' },
        { label: 'Surface Treatment', value: 'Titanium High-Vacuum PVD' },
        { label: 'Mounting Chassis', value: 'Concealed Anti-Tamper Fixing' },
        { label: 'Durability Standard', value: 'EN 1906 Commercial Certified' },
      ],
      acousticOrDurability: 'Calibrated for enduring tactile performance and flawless mechanical integrity',
    };

    return {
      title: app.title,
      subtitle: app.subtitle,
      description: app.description,
      media: app.image,
      code: meta.code,
      environmentTag: meta.environmentTag,
      specs: meta.specs,
      categoryLinks: app.relatedCategorySlugs.map((slug) => ({
        slug,
        name: slug.replace(/-/g, ' '),
      })),
    };
  });

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      {/* 1. COMPACT ARCHITECTURAL HERO SECTION (Product Page Style) */}
      <section className="bg-[#111111] text-white pt-28 md:pt-36 pb-8 md:pb-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Breadcrumb Navigation */}
          <div className="mb-4">
            <Breadcrumbs
              items={[{ label: 'Applications & Environments' }]}
              className="text-gray-400 text-xs [&_a]:text-gray-400 [&_a:hover]:text-[#F2B705] [&_span]:text-[#F2B705]"
            />
          </div>

          {/* Compact Split: Page Title & Meta on Left, Proper Crisp Image on Right (Zero Overlay) */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-2">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#F2B705]" />
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#F2B705] font-semibold">
                  Spatial Typologies
                </span>
              </div>
              <TextReveal
                as="h1"
                text="Applications & Environments"
                className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-white tracking-tight mb-2"
              />
              <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
                Hardware engineered to respond to the specific functional, acoustic, and environmental demands of each interior space.
              </p>
              <div className="mt-3 text-xs text-gray-400 font-mono">
                <span>EXPLORING </span>
                <span className="text-[#F2B705] font-semibold">05</span>
                <span> ARCHITECTURAL ENVIRONMENTS</span>
              </div>
            </div>

            {/* Right Side Proper Image (Full opacity, zero overlay, smooth scale animation) */}
            <div className="w-full sm:w-80 md:w-96 shrink-0">
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-white/15 bg-black/60 shadow-xl">
                <img
                  src="/bathroom-kit.jpg"
                  alt="SIDDI Architectural Spatial Hardware"
                  className={`w-full h-full object-cover object-center transition-transform duration-[1400ms] ease-[cubic-bezier(0.25,1,0.35,1)] will-change-transform ${
                    isExpanded ? 'scale-100' : 'scale-115'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SPATIAL STICKY SCROLL SECTION (Scroll01 Integration) */}
      <ScrollReveal className="max-w-7xl mx-auto px-6 md:px-12 py-12 sm:py-20">
        <Scroll01 items={scrollItems} />
      </ScrollReveal>

      {/* Applications Enquiry CTA */}
      <EnquiryCTA
        title="Planning an Architectural Interior Project?"
        description="Share your floor plans or joinery elevations with our team for comprehensive hardware scheduling and finish matching."
      />
    </div>
  );
};


