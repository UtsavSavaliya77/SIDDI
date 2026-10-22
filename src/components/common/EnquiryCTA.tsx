import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from '@phosphor-icons/react';
import { RollLabel } from './Button';

interface EnquiryCTAProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  categoryInterest?: string;
  className?: string;
}

export const EnquiryCTA: React.FC<EnquiryCTAProps> = ({
  eyebrow,
  title = "Planning a project?",
  description = "Share your schedule or product requirements with the SIDDI trade desk.",
  buttonText = "Contact the trade desk",
  categoryInterest,
  className = ""
}) => {
  const targetUrl = categoryInterest 
    ? `/contact?interest=${encodeURIComponent(categoryInterest)}`
    : '/contact';

  return (
    <section className={`w-full px-4 sm:px-6 md:px-10 lg:px-16 py-12 sm:py-16 lg:py-20 ${className}`}>
      <div className="w-full rounded-xl border border-black/10 bg-white px-6 py-8 sm:px-10 sm:py-10 lg:flex lg:items-center lg:justify-between lg:gap-12 lg:px-14 lg:py-12">
        <div className="max-w-3xl">
          {eyebrow && <p className="mb-3 font-mono text-xs uppercase tracking-[.18em] text-[#F2B705]">{eyebrow}</p>}
          <h2 className="text-2xl font-semibold leading-tight text-[#171719] sm:text-3xl lg:text-4xl">{title}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#5B5B61] sm:text-base">{description}</p>
        </div>
        <Link to={targetUrl} className="group roll-action mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#F2B705] px-5 py-3.5 text-sm font-semibold text-[#111111] transition-colors hover:bg-[#ffc61a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2B705] lg:mt-0 lg:w-auto lg:shrink-0">
          <RollLabel>{buttonText}</RollLabel><ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" weight="bold" />
        </Link>
      </div>
    </section>
  );
};
