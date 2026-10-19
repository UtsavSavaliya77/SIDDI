import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './Button';
import { TextReveal } from './ScrollReveal';
import './HeroAutoExpand.css';

interface HeroAutoExpandProps {
  src: string;
  alt?: string;
}

export const HeroAutoExpand: React.FC<HeroAutoExpandProps> = ({
  src,
  alt = 'SIDDI Hardware Masterpiece'
}) => {
  // isExpanded state starts false on site load, then transitions to true
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Start auto animation shortly after page mount
    const timer = setTimeout(() => {
      setIsExpanded(true);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero-auto-expand">
      {/* Stage viewport */}
      <div className="hero-auto-expand__stage">
        
        {/* Animated Frame that smoothly zooms to full screen */}
        <div className={`hero-auto-expand__frame ${isExpanded ? 'hero-auto-expand__frame--expanded' : ''}`}>
          <img
            src={src}
            alt={alt}
            className={`hero-auto-expand__media ${isExpanded ? 'hero-auto-expand__media--expanded' : ''}`}
          />
          {/* Subtle dark vignette overlay for text legibility */}
          <div className={`hero-auto-expand__scrim ${isExpanded ? 'hero-auto-expand__scrim--active' : ''}`} />
        </div>

        {/* Initial Centered Title - Fades out as image expands */}
        <div className={`hero-auto-expand__title ${isExpanded ? 'hero-auto-expand__title--hidden' : ''}`}>
          <h2>Engineered Excellence.</h2>
        </div>

        {/* Initial bottom cue */}
        <div className={`hero-auto-expand__hint ${isExpanded ? 'hero-auto-expand__hint--hidden' : ''}`}>
          SIDDI ARCHITECTURAL HARDWARE
        </div>

        {/* Final Full-Screen Overlay Content - Fades in automatically */}
        <div className={`hero-auto-expand__overlay ${isExpanded ? 'hero-auto-expand__overlay--visible' : ''}`}>
          <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={isExpanded ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-3"
            >
              <span className="w-8 h-[2px] bg-[#F2B705]" />
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#F2B705]">
                Architectural Integrity
              </span>
              <span className="w-8 h-[2px] bg-[#F2B705]" />
            </motion.div>

            {isExpanded ? (
              <TextReveal
                as="h1"
                text="Every curve calibrated for enduring tactile luxury."
                delay={0.4}
                className="text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.12] text-white"
              />
            ) : (
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.12] text-white opacity-0">
                Every curve calibrated for enduring tactile luxury.
              </h1>
            )}

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isExpanded ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed font-light"
            >
              Solid forged brass billets, silent magnetic mortise locks, and multi-layer PVD finishes formulated for flawless architectural harmony.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={isExpanded ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.7, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button to="/products" variant="secondary" size="lg" withArrow>
                Explore Hardware Catalogue
              </Button>
              <Button to="/contact" variant="dark" size="lg">
                Trade Consultation
              </Button>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
};
