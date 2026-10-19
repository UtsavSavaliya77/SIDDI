import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export const PageLoader: React.FC = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(25);
  const prevPathRef = useRef(location.pathname + location.search);

  useEffect(() => {
    const currentPath = location.pathname + location.search;

    // Trigger on every route/page change
    if (prevPathRef.current !== currentPath) {
      prevPathRef.current = currentPath;

      // Start loader immediately with solid background & initial 25%
      setIsLoading(true);
      setProgress(25);

      // Smooth progression stepping through 25 -> 65 -> 85 -> 100
      const t1 = setTimeout(() => setProgress(65), 320);
      const t2 = setTimeout(() => setProgress(85), 680);
      const t3 = setTimeout(() => setProgress(100), 1020);

      // Smooth exit after completing 100%
      const t4 = setTimeout(() => {
        setIsLoading(false);
        setProgress(25);
      }, 1380);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
      };
    }
  }, [location.pathname, location.search]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="luxury-page-loader"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.55, ease: [0.77, 0, 0.175, 1] }}
          className="fixed inset-0 z-[999999] bg-[#0A0A0B] flex flex-col items-center justify-center select-none shadow-[0_25px_60px_rgba(0,0,0,0.9)]"
        >
          {/* Ambient Warm Golden Aura (Solid Dark Core) */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
            <div className="w-[500px] h-[500px] rounded-full bg-[#F2B705]/[0.05] blur-3xl" />
          </div>

          {/* Central Prestigious Brand Composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col items-center text-center px-4 w-full max-w-md mx-auto"
          >
            {/* Brand Logo Presentation with Subtle Glow */}
            <div className="relative mb-3 sm:mb-4">
              <img
                src="/siddi-logo.png"
                alt="SIDDI Architectural Hardware"
                className="h-12 sm:h-16 md:h-20 w-auto object-contain filter drop-shadow-[0_4px_24px_rgba(242,183,5,0.28)]"
              />
            </div>

            {/* Refined Subtitle */}
            <div className="text-[9.5px] sm:text-[11px] font-sans font-medium uppercase tracking-[0.24em] sm:tracking-[0.36em] text-[#F2B705] mb-5 sm:mb-6 whitespace-nowrap">
              ARCHITECTURAL HARDWARE
            </div>

            {/* Premium Smooth Capsule Loading Bar (Fluid Responsive Width) */}
            <div className="w-[78vw] max-w-[280px] sm:max-w-[320px] h-2.5 sm:h-3 bg-[#141417] rounded-full p-[2px] border border-white/15 shadow-[inset_0_2px_4px_rgba(0,0,0,0.85),0_0_18px_rgba(242,183,5,0.12)] relative overflow-hidden mb-4 sm:mb-5">
              {/* Fluid Active Golden Bar */}
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#C99700] via-[#F2B705] to-[#FFF099] relative overflow-hidden shadow-[0_0_14px_rgba(242,183,5,0.75)]"
                style={{
                  width: `${progress}%`,
                  transition: 'width 0.42s cubic-bezier(0.33, 1, 0.68, 1)',
                }}
              >
                {/* Continuous Smooth Liquid Shimmer Wave */}
                <motion.div
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ repeat: Infinity, duration: 1.25, ease: 'linear' }}
                  className="absolute inset-0 w-3/4 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-20deg]"
                />

                {/* Glowing Tip at Leading Edge */}
                <span className="absolute right-0.5 top-1/2 -translate-y-1/2 w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-white shadow-[0_0_8px_#FFFFFF,0_0_12px_#F2B705]" />
              </motion.div>
            </div>

            {/* Editorial Quality Statement (Fluid single-line responsive typography) */}
            <div className="text-[8.5px] sm:text-[10px] font-mono uppercase tracking-[0.14em] sm:tracking-[0.25em] text-gray-400 font-light max-w-full whitespace-nowrap">
              SOLID FORGED BRASS • LUXURY ARCHITECTURAL FINISH
            </div>
          </motion.div>

          {/* Minimalist Bottom Brand Mark (Responsive Single Line) */}
          <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 px-4 flex items-center justify-center gap-2 text-[8.5px] sm:text-[10px] font-mono tracking-[0.16em] sm:tracking-[0.26em] text-gray-400 uppercase whitespace-nowrap">
            <span>EST. 2026</span>
            <span className="text-[#F2B705]/50">•</span>
            <span>ARCHITECTURAL STANDARD</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};



