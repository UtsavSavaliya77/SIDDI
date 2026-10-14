import React from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center' | 'split';
  theme?: 'light' | 'dark';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  align = 'left',
  theme = 'light',
  className = '',
}) => {
  const isDark = theme === 'dark';

  if (align === 'split') {
    return (
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 border-b pb-8 ${isDark ? 'border-white/10' : 'border-[#111111]/10'} ${className}`}>
        <div className="lg:col-span-7">
          {eyebrow && (
            <div className="flex items-center gap-3 mb-3">
              <span className="w-6 h-[1.5px] bg-[#F2B705]" />
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#F2B705]">
                {eyebrow}
              </span>
            </div>
          )}
          <h2 className={`text-3xl md:text-5xl font-normal leading-[1.15] ${isDark ? 'text-white' : 'text-[#111111]'}`}>
            {title}
          </h2>
        </div>
        {description && (
          <div className="lg:col-span-5">
            <p className={`text-base md:text-lg leading-relaxed ${isDark ? 'text-gray-400' : 'text-[#777777]'}`}>
              {description}
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`mb-14 ${align === 'center' ? 'text-center max-w-3xl mx-auto' : 'max-w-3xl'} ${className}`}>
      {eyebrow && (
        <div className={`flex items-center gap-3 mb-3 ${align === 'center' ? 'justify-center' : ''}`}>
          <span className="w-5 h-[1.5px] bg-[#F2B705]" />
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#F2B705]">
            {eyebrow}
          </span>
          {align === 'center' && <span className="w-5 h-[1.5px] bg-[#F2B705]" />}
        </div>
      )}
      <h2 className={`text-3xl md:text-5xl font-normal leading-[1.15] mb-4 ${isDark ? 'text-white' : 'text-[#111111]'}`}>
        {title}
      </h2>
      {description && (
        <p className={`text-base md:text-lg leading-relaxed ${isDark ? 'text-gray-400' : 'text-[#777777]'}`}>
          {description}
        </p>
      )}
    </div>
  );
};
