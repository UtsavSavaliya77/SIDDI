import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Cube, Compass, FileText } from '@phosphor-icons/react';

export const FeaturesGrid: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const cards = cardsRef.current.filter(Boolean);
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      // Progressive enhancement: add hidden state in JS only
      gsap.set(cards, { opacity: 0, y: 16 });

      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.07,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 88%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      label: 'METALLURGY // 01',
      title: 'Solid forged brass',
      icon: Cube,
      specs: [
        { key: 'Alloy Grade', value: 'IS 319 Grade 1 extrusion' },
        { key: 'Tensile Strength', value: '410 MPa min' },
        { key: 'Machining', value: 'Forged & machined in Rajkot' },
      ],
      description: 'Zero pot metal, zinc alloys, or hollow stampings. Dense metallurgy provides heavy hand feel and lifelong mechanical integrity.',
    },
    {
      label: 'PRECISION // 02',
      title: 'Sub-millimetre tolerance',
      icon: Compass,
      specs: [
        { key: 'CNC Accuracy', value: 'CNC turned to +/- 0.05 mm' },
        { key: 'Endurance', value: 'Tested to 200,000 cycles' },
        { key: 'Compliance', value: 'EN 1906 Grade 4 certified' },
      ],
      description: 'Precision internal spring cassettes and machined roses eliminate lever sag and backlash over decades of high-traffic use.',
    },
    {
      label: 'DATA // 03',
      title: 'Complete documentation',
      icon: FileText,
      specs: [
        { key: 'BIM Standard', value: 'Revit / IFC parameter families' },
        { key: 'CAD Formats', value: '2D DXF & DWG elevations' },
        { key: 'Specification', value: 'MasterFormat schedule templates' },
      ],
      description: 'Ready-to-drop drafting assets and editable door schedule spreadsheets. No registration walls or friction for specifying architects.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#0E0E10] border-b border-[#2D2D33] py-16 md:py-24"
    >
      <div className="spec-container">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-12 border-b border-[#2D2D33] mb-12">
          <div>
            <div className="mono-label text-[#F2B418] mb-2">
              ENGINEERING INTEGRITY // SYSTEM OVERVIEW
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#F1F0EC]">
              Built for commercial specifications.
            </h2>
          </div>
          <p className="text-sm text-[#A4A4AA] max-w-md leading-relaxed">
            Every SIDDI reference is engineered to structural trade requirements. Exact metallurgy, tested cycle counts, and native BIM assets.
          </p>
        </div>

        {/* 3-Column Specification Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.label}
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                className="group relative bg-[#151518] border border-[#2D2D33] rounded-[8px] p-6 sm:p-8 flex flex-col justify-between transition-colors duration-200 hover:border-[#F2B418]"
              >
                <div>
                  {/* Top Header: Mono Label + Phosphor Icon */}
                  <div className="flex items-center justify-between pb-4 border-b border-[#2D2D33] mb-6">
                    <span className="mono-label text-[11px] text-[#F2B418]">
                      {feature.label}
                    </span>
                    <Icon
                      size={20}
                      weight="regular"
                      className="text-[#A4A4AA] group-hover:text-[#F2B418] transition-colors duration-200"
                    />
                  </div>

                  {/* Card Title */}
                  <h3 className="text-xl font-bold tracking-tight text-[#F1F0EC] mb-3">
                    {feature.title}
                  </h3>

                  {/* Narrative Body */}
                  <p className="text-sm text-[#A4A4AA] leading-relaxed mb-6 font-normal">
                    {feature.description}
                  </p>
                </div>

                {/* Technical Specifications Table */}
                <div className="border-t border-[#2D2D33] pt-4 flex flex-col gap-2.5">
                  {feature.specs.map((item) => (
                    <div
                      key={item.key}
                      className="flex items-baseline justify-between text-xs gap-3"
                    >
                      <span className="mono-label text-[11px] text-[#5B5B61]">
                        {item.key}
                      </span>
                      <span className="text-[#F1F0EC] font-mono text-[11px] tabular-nums text-right">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
