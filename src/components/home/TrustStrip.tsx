import React from 'react';

export const TrustStrip: React.FC = () => {
  const projects = [
    'Lodha Altamount',
    'Oberoi Sky City',
    'Taj Hotels & Resorts',
    'Studio Lotus',
    'Morphogenesis',
    'Total Environment',
  ];

  return (
    <section className="w-full bg-[#151518] border-b border-[#2D2D33] py-8 select-none">
      <div className="spec-container flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Section Mono Label */}
        <div className="mono-label text-[11px] text-[#A4A4AA] tracking-widest shrink-0">
          SPECIFIED ACROSS 400+ COMMERCIAL & RESIDENTIAL PROJECTS
        </div>

        {/* Calm static typography list of firms & projects */}
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-[#F1F0EC]/80 font-medium tracking-wide">
          {projects.map((name, i) => (
            <div key={name} className="flex items-center gap-8">
              <span className="hover:text-[#F2B418] transition-colors duration-150">
                {name}
              </span>
              {i < projects.length - 1 && (
                <span className="text-[#2D2D33] hidden md:inline select-none">/</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
