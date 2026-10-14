import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { EnquiryCTA } from '../components/common/EnquiryCTA';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-28 md:pt-36 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={[{ label: 'About SIDDI' }]} className="mb-8" />

        {/* Editorial Brand Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 pb-16 border-b border-[#111111]/10">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-6 h-[1.5px] bg-[#F2B705]" />
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#F2B705]">
                About The Brand
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-normal leading-tight text-[#111111]">
              Architectural hardware conceived at the intersection of metallurgy and interior serenity.
            </h1>

            <p className="text-base sm:text-lg text-[#777777] leading-relaxed">
              SIDDI is an architectural hardware company dedicated to manufacturing and supplying superior door furniture, bathroom fittings, and bespoke joinery hardware. We treat hardware not as decorative afterthoughts, but as structural contact points that articulate the quality of an entire interior.
            </p>

            <p className="text-sm sm:text-base text-[#777777] leading-relaxed">
              By controlling our metal formulations, precision CNC toolpaths, and multi-layer PVD finish applications, SIDDI provides architects, interior designers, contractors, and discerning homeowners with dependable hardware that endures across generations of daily interaction.
            </p>

            <div className="pt-2">
              <Button to="/contact" variant="primary" size="md" withArrow>
                Consult With Our Engineering Team
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] border border-[#111111]/10 overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1595844730298-b960ff98fee0?auto=format&fit=crop&w=1200&q=80"
                alt="SIDDI Architectural Hardware Design"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-black/85 backdrop-blur-sm p-4 text-white text-xs">
                <span className="text-[#F2B705] font-mono font-semibold block mb-1">
                  METALLURGY & PROPORTION
                </span>
                Every curve and angle is measured for natural palm ergonomics.
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Pillars of the SIDDI Approach */}
        <div className="mb-24">
          <SectionHeading
            align="split"
            eyebrow="Core Tenets"
            title="The Principles That Guide Our Manufacturing"
            description="Our engineering decisions are grounded in durability, tactile feedback, and unified aesthetics across interior typologies."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-white border border-[#111111]/10 space-y-3">
              <span className="text-2xl font-mono font-semibold text-[#F2B705]">01</span>
              <h3 className="text-lg font-semibold text-[#111111]">
                Acoustic & Tactile Weight
              </h3>
              <p className="text-xs text-[#777777] leading-relaxed">
                Hardware must feel substantial. We avoid hollow pressings in favor of solid brass billets, dense zinc alloy, and thick-wall 304 stainless tubing.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#111111]/10 space-y-3">
              <span className="text-2xl font-mono font-semibold text-[#F2B705]">02</span>
              <h3 className="text-lg font-semibold text-[#111111]">
                Silent Mechanical Action
              </h3>
              <p className="text-xs text-[#777777] leading-relaxed">
                Magnetic latches, dampening bushings, and dual torsion return springs ensure that doors close without vibration, harsh friction, or rattles.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#111111]/10 space-y-3">
              <span className="text-2xl font-mono font-semibold text-[#F2B705]">03</span>
              <h3 className="text-lg font-semibold text-[#111111]">
                Systemic Finish Matching
              </h3>
              <p className="text-xs text-[#777777] leading-relaxed">
                A door handle, shower towel rail, and wardrobe pull should harmonize in tone. We maintain strict spectral color matching across all hardware lines.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#111111]/10 space-y-3">
              <span className="text-2xl font-mono font-semibold text-[#F2B705]">04</span>
              <h3 className="text-lg font-semibold text-[#111111]">
                Contract Integrity
              </h3>
              <p className="text-xs text-[#777777] leading-relaxed">
                Engineered to meet rigorous commercial cycle testing and high-moisture standards without flaking, delamination, or mechanical sag.
              </p>
            </div>
          </div>
        </div>

        {/* Manufacturing & Material Commitment */}
        <div className="bg-[#111111] text-white p-8 md:p-14 mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-6 h-[1.5px] bg-[#F2B705]" />
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#F2B705]">
                  Materials Disclosure
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-normal leading-tight">
                Authentic Specifications Without Exaggeration
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed">
                We believe in straightforward, transparent specifications. Rather than claiming unverifiable histories or fabricated accolades, we invite architects to inspect our raw material assays, salt spray test reports, and physical sample boxes directly.
              </p>
              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-mono text-gray-400">
                <span>&bull; Solid Brass Forgings</span>
                <span>&bull; Grade 304/316 Stainless Steel</span>
                <span>&bull; Multi-layer PVD Titanium Nitride</span>
                <span>&bull; DIN & EN Compliant Dimensions</span>
              </div>
            </div>

            <div className="lg:col-span-4 flex lg:justify-end">
              <Button to="/contact?interest=Material%20Specs" variant="secondary" size="md">
                Request Metallurgy Data Sheets
              </Button>
            </div>
          </div>
        </div>

      </div>

      {/* Enquiry CTA */}
      <EnquiryCTA />
    </div>
  );
};
