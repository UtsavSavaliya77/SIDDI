import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from '@phosphor-icons/react';
import { ScrollReveal } from './ScrollReveal';

interface EnquiryCTAProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  categoryInterest?: string;
  className?: string;
}

export const EnquiryCTA: React.FC<EnquiryCTAProps> = ({
  eyebrow = "Specification & Trade Consultation",
  title = "Built for those who craft signature spaces.",
  description = "Schedule takeoffs, finish samples, and custom specifications tailored to your architectural plans.",
  buttonText = "Discuss Requirement",
  categoryInterest,
  className = ""
}) => {
  const targetUrl = categoryInterest 
    ? `/contact?interest=${encodeURIComponent(categoryInterest)}`
    : '/contact';

  return (
    <section className={`py-6 sm:py-8 md:py-10 px-4 sm:px-6 md:px-8 bg-[#FAF9F6] ${className}`}>
      <div className="max-w-7xl mx-auto">
        <ScrollReveal distance={28} duration={0.8}>
          {/* Compact Outer Inset Double-Frame Track */}
          <div className="border border-[#111111]/12 rounded-[2rem] p-2 sm:p-2.5 bg-[#EFEFEA]/60 shadow-xs">
          
          {/* Main Card Container */}
          <div className="relative bg-[#111111] rounded-[1.65rem] px-6 py-8 sm:px-10 sm:py-10 md:px-12 md:py-12 lg:px-14 lg:py-12 overflow-hidden">
            
            {/* Grid Layout: Left Content + Right Architectural CAD Schematic */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              {/* Left Column: Clean Minimalist Typography & Actions */}
              <div className="lg:col-span-7 max-w-xl">
                
                {/* Eyebrow Tag with Leading Dash */}
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="w-4 h-[1.5px] bg-[#F2B705]" />
                  <span className="text-[11px] font-mono tracking-[0.22em] text-[#F2B705] font-semibold uppercase">
                    {eyebrow}
                  </span>
                </div>

                {/* High-Impact Headline */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-serif font-normal text-white leading-[1.14] tracking-tight">
                  {title}
                </h2>

                {/* Crisp Short Subtitle */}
                <p className="text-white/75 text-xs sm:text-sm md:text-base leading-relaxed mt-3 font-light">
                  {description}
                </p>

                {/* Single Clean Pill CTA Button */}
                <div className="mt-6 sm:mt-7 flex items-center">
                  <Link
                    to={targetUrl}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-[11px] bg-white text-[#111111] font-semibold text-xs sm:text-sm tracking-wide hover:bg-[#F2B705] hover:text-[#111111] transition-all duration-300 shadow-md group cursor-pointer"
                  >
                    <span>{buttonText}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" weight="bold" />
                  </Link>
                </div>

              </div>

              {/* Right Column: Architectural CAD Wireframe & Elevation Schematic (100% Solid Colors, Zero Gradients) */}
              <div className="lg:col-span-5 w-full flex items-center justify-center lg:justify-end">
                <div className="w-full max-w-[440px] aspect-[16/11] bg-[#161616] border border-[#262626] rounded-xl p-3 sm:p-4 relative overflow-hidden shadow-inner">
                  
                  <svg
                    viewBox="0 0 460 300"
                    className="w-full h-full"
                    fill="none"
                  >
                    {/* Background CAD Grid Lines (Pure Solid Colors) */}
                    <line x1="40" y1="40" x2="420" y2="40" stroke="#222222" strokeWidth="0.75" />
                    <line x1="40" y1="90" x2="420" y2="90" stroke="#222222" strokeWidth="0.75" />
                    <line x1="40" y1="140" x2="420" y2="140" stroke="#222222" strokeWidth="0.75" />
                    <line x1="40" y1="190" x2="420" y2="190" stroke="#222222" strokeWidth="0.75" />
                    <line x1="40" y1="240" x2="420" y2="240" stroke="#222222" strokeWidth="0.75" />

                    <line x1="80" y1="20" x2="80" y2="260" stroke="#222222" strokeWidth="0.75" />
                    <line x1="150" y1="20" x2="150" y2="260" stroke="#222222" strokeWidth="0.75" />
                    <line x1="220" y1="20" x2="220" y2="260" stroke="#222222" strokeWidth="0.75" />
                    <line x1="290" y1="20" x2="290" y2="260" stroke="#222222" strokeWidth="0.75" />
                    <line x1="360" y1="20" x2="360" y2="260" stroke="#222222" strokeWidth="0.75" />

                    {/* Technical Grid Crosshairs */}
                    <path d="M 146 90 L 154 90 M 150 86 L 150 94" stroke="#F2B705" strokeWidth="1" />
                    <path d="M 286 90 L 294 90 M 290 86 L 290 94" stroke="#F2B705" strokeWidth="1" />
                    <path d="M 146 190 L 154 190 M 150 186 L 150 194" stroke="#F2B705" strokeWidth="1" />

                    {/* Centerlines (Axis Lines in CAD Dash-Dot Pattern) */}
                    <line x1="60" y1="140" x2="380" y2="140" stroke="#F2B705" strokeWidth="0.75" strokeDasharray="14 3 2 3" />
                    <line x1="150" y1="40" x2="150" y2="240" stroke="#F2B705" strokeWidth="0.75" strokeDasharray="14 3 2 3" />

                    {/* Escutcheon Backplate (Concentric Elevation Circles) */}
                    <circle cx="150" cy="140" r="46" fill="#1C1C1C" stroke="#333333" strokeWidth="1.5" />
                    <circle cx="150" cy="140" r="42" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3 3" />
                    <circle cx="150" cy="140" r="22" fill="#242424" stroke="#F2B705" strokeWidth="1.5" />
                    <rect x="144" y="134" width="12" height="12" fill="#111111" stroke="#F2B705" strokeWidth="1" />

                    {/* Luxury Lever Handle Arm Wireframe (Solid Fill & Crisp Outline) */}
                    <path
                      d="M 150 126 L 310 126 C 326 126, 338 132, 338 140 C 338 148, 326 154, 310 154 L 150 154 Z"
                      fill="#1E1E1E"
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                    />
                    
                    {/* Architectural Bevel Highlight Line */}
                    <line x1="165" y1="133" x2="310" y2="133" stroke="#F2B705" strokeWidth="1.2" />
                    <line x1="165" y1="147" x2="305" y2="147" stroke="#444444" strokeWidth="1" />

                    {/* Rotation Range Compass Arc */}
                    <path
                      d="M 280 140 A 130 130 0 0 1 245 215"
                      stroke="#F2B705"
                      strokeWidth="1"
                      strokeDasharray="4 3"
                    />
                    <polygon points="244,217 248,208 240,212" fill="#F2B705" />
                    <text x="256" y="200" fill="#F2B705" fontFamily="monospace" fontSize="9" fontWeight="bold">45° ROTATION</text>

                    {/* Dimension Witness Lines & Arrows: Handle Length (142.5mm) */}
                    <line x1="150" y1="110" x2="150" y2="82" stroke="#666666" strokeWidth="0.75" />
                    <line x1="338" y1="110" x2="338" y2="82" stroke="#666666" strokeWidth="0.75" />
                    <line x1="155" y1="88" x2="333" y2="88" stroke="#FFFFFF" strokeWidth="1" />
                    <polygon points="150,88 158,85 158,91" fill="#FFFFFF" />
                    <polygon points="338,88 330,85 330,91" fill="#FFFFFF" />
                    <text x="215" y="82" fill="#FFFFFF" fontFamily="monospace" fontSize="9" textAnchor="middle">142.5 mm</text>

                    {/* Dimension Witness Lines: Rose Diameter (Ø52.0mm) */}
                    <line x1="90" y1="94" x2="62" y2="94" stroke="#666666" strokeWidth="0.75" />
                    <line x1="90" y1="186" x2="62" y2="186" stroke="#666666" strokeWidth="0.75" />
                    <line x1="68" y1="98" x2="68" y2="182" stroke="#FFFFFF" strokeWidth="1" />
                    <polygon points="68,94 65,102 71,102" fill="#FFFFFF" />
                    <polygon points="68,186 65,178 71,178" fill="#FFFFFF" />
                    <text x="56" y="144" fill="#FFFFFF" fontFamily="monospace" fontSize="8" textAnchor="middle" transform="rotate(-90 56 144)">Ø 52.0 mm</text>

                    {/* Technical Title Block / Specification Stamp in Solid Charcoal */}
                    <rect x="250" y="210" width="190" height="74" rx="4" fill="#111111" stroke="#2B2B2B" strokeWidth="1" />
                    <text x="262" y="228" fill="#F2B705" fontFamily="monospace" fontSize="9" fontWeight="bold">DWG: SID-LEVER/M04</text>
                    <text x="262" y="244" fill="#FFFFFF" fontFamily="monospace" fontSize="8">SPEC: SOLID BRASS / SS316</text>
                    <text x="262" y="258" fill="#A3A3A3" fontFamily="monospace" fontSize="8">TOL: ±0.02mm • PVD COAT</text>
                    <text x="262" y="272" fill="#777777" fontFamily="monospace" fontSize="7.5">SCALE: 1:1 ARCHITECTURAL CAD</text>
                  </svg>

                  {/* Corner Accent Ticks */}
                  <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-[#F2B705]" />
                  <div className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-[#F2B705]" />
                  <div className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-[#F2B705]" />
                  <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-[#F2B705]" />
                </div>
              </div>

            </div>

          </div>

        </div>
      </ScrollReveal>

      </div>
    </section>
  );
};
