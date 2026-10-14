import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SectionHeading } from '../components/common/SectionHeading';
import { EnquiryCTA } from '../components/common/EnquiryCTA';
import { APPLICATION_AREAS } from '../data/products';
import { Check, ArrowRight } from '@phosphor-icons/react';

export const ApplicationsPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-28 md:pt-36 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={[{ label: 'Applications & Environments' }]} className="mb-8" />

        {/* Page Heading */}
        <SectionHeading
          eyebrow="Spatial Environments"
          title="Hardware Applications Across Architectural Typologies"
          description="Hardware must respond to the specific functional and environmental demands of each room. Explore how SIDDI fittings perform in bathrooms, private bedrooms, luxury hospitality suites, and commercial interiors."
        />

        {/* Detailed Application Sections */}
        <div className="space-y-24 mt-16">
          {APPLICATION_AREAS.map((app, index) => {
            const isReversed = index % 2 === 1;

            return (
              <section
                key={app.id}
                id={app.slug}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pb-20 border-b border-[#111111]/10 ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                
                {/* Image Composition */}
                <div className={`lg:col-span-6 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="relative aspect-[4/3] border border-[#111111]/10 overflow-hidden shadow-lg group">
                    <img
                      src={app.image}
                      alt={app.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                    />
                    <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm text-white font-mono text-[11px] px-3 py-1">
                      SPACE 0{index + 1}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`lg:col-span-6 space-y-6 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-[1.5px] bg-[#F2B705]" />
                    <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#F2B705]">
                      Application Profile
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-normal leading-tight text-[#111111]">
                    {app.title}
                  </h2>

                  <p className="text-sm font-semibold uppercase tracking-wider text-[#777777]">
                    {app.subtitle}
                  </p>

                  <p className="text-sm sm:text-base text-[#777777] leading-relaxed">
                    {app.description}
                  </p>

                  {/* Highlights */}
                  <div className="p-5 bg-white border border-[#111111]/10 space-y-3">
                    <span className="text-xs uppercase tracking-wider font-semibold text-[#111111] block">
                      Hardware Highlights:
                    </span>
                    <ul className="space-y-2">
                      {app.hardwareHighlights.map((highlight, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2 text-xs text-[#777777]">
                          <Check className="w-4 h-4 text-[#F2B705] shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Related Category Links */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <span className="text-xs uppercase tracking-wider text-[#777777] font-semibold">
                      Specified Systems:
                    </span>
                    {app.relatedCategorySlugs.map((slug) => (
                      <Link
                        key={slug}
                        to={`/products/${slug}`}
                        className="inline-flex items-center gap-1 text-xs uppercase tracking-wider px-3 py-1 bg-white border border-[#111111]/10 hover:border-[#111111] font-medium text-[#111111] hover:text-[#F2B705] transition-colors"
                      >
                        <span>{slug.replace(/-/g, ' ')}</span>
                        <ArrowRight className="w-3 h-3 text-[#F2B705]" />
                      </Link>
                    ))}
                  </div>

                </div>

              </section>
            );
          })}
        </div>

      </div>

      {/* Applications Enquiry CTA */}
      <EnquiryCTA
        title="Planning an Architectural Interior Project?"
        description="Share your floor plans or joinery elevations with our team for comprehensive hardware scheduling and finish matching."
      />
    </div>
  );
};
