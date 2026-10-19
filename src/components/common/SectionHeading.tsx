import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { TextReveal } from './ScrollReveal';

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
  const shouldReduceMotion = useReducedMotion();

  if (align === 'split') {
    return (
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 border-b pb-8 ${isDark ? 'border-white/10' : 'border-[#111111]/10'} ${className}`}>
        <div className="lg:col-span-7">
          {eyebrow && (
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, x: -16 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 'some', margin: '0px 0px 60px 0px' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 mb-3"
            >
              <motion.span
                initial={shouldReduceMotion ? {} : { width: 0 }}
                whileInView={shouldReduceMotion ? {} : { width: 24 }}
                viewport={{ once: true, amount: 'some', margin: '0px 0px 60px 0px' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="h-[1.5px] bg-[#F2B705] block"
              />
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#F2B705]">
                {eyebrow}
              </span>
            </motion.div>
          )}
          <TextReveal
            as="h2"
            text={title}
            className={`text-3xl md:text-5xl font-normal leading-[1.15] ${isDark ? 'text-white' : 'text-[#111111]'}`}
          />
        </div>
        {description && (
          <div className="lg:col-span-5">
            <motion.p
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 'some', margin: '0px 0px 60px 0px' }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className={`text-base md:text-lg leading-relaxed ${isDark ? 'text-gray-400' : 'text-[#777777]'}`}
            >
              {description}
            </motion.p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`mb-14 ${align === 'center' ? 'text-center max-w-3xl mx-auto' : 'max-w-3xl'} ${className}`}>
      {eyebrow && (
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'some', margin: '0px 0px 60px 0px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={`flex items-center gap-3 mb-3 ${align === 'center' ? 'justify-center' : ''}`}
        >
          <motion.span
            initial={shouldReduceMotion ? {} : { width: 0 }}
            whileInView={shouldReduceMotion ? {} : { width: 20 }}
            viewport={{ once: true, amount: 'some', margin: '0px 0px 60px 0px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="h-[1.5px] bg-[#F2B705] block"
          />
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#F2B705]">
            {eyebrow}
          </span>
          {align === 'center' && (
            <motion.span
              initial={shouldReduceMotion ? {} : { width: 0 }}
              whileInView={shouldReduceMotion ? {} : { width: 20 }}
              viewport={{ once: true, amount: 'some', margin: '0px 0px 60px 0px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="h-[1.5px] bg-[#F2B705] block"
            />
          )}
        </motion.div>
      )}
      <TextReveal
        as="h2"
        text={title}
        className={`text-3xl md:text-5xl font-normal leading-[1.15] mb-4 ${isDark ? 'text-white' : 'text-[#111111]'}`}
      />
      {description && (
        <motion.p
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 14 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'some', margin: '0px 0px 60px 0px' }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className={`text-base md:text-lg leading-relaxed ${isDark ? 'text-gray-400' : 'text-[#777777]'}`}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};
