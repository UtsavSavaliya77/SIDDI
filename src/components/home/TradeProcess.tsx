import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ProcessStep {
  num: string;
  label: string;
  title: string;
  description: string;
}

const STEPS: ProcessStep[] = [
  {
    num: '01',
    label: 'SPECIFICATION',
    title: 'Send your door schedule',
    description: 'Share a PDF, DWG or spreadsheet with the trade desk for a prompt takeoff.',
  },
  {
    num: '02',
    label: 'SAMPLING',
    title: 'Check physical samples',
    description: 'Review product and finish samples for your project directly in your studio.',
  },
  {
    num: '03',
    label: 'ESTIMATION',
    title: 'Receive a door-by-door takeoff',
    description: 'Review the proposed hardware schedule itemized door-by-door with lead times.',
  },
];

export const TradeProcess: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    // Only pin on desktop (>= 1024px) and when user has not requested reduced motion
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isDesktop || prefersReducedMotion || !containerRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'center center',
        end: '+=150%',
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress < 0.33) {
            setActiveStep(0);
          } else if (progress < 0.66) {
            setActiveStep(1);
          } else {
            setActiveStep(2);
          }
        },
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="home-section home-process"
      aria-labelledby="home-process-title"
    >
      <div className="home-container w-full px-4 sm:px-6 md:px-10 lg:px-16">
        <header className="home-section__header">
          <div>
            <span className="mono-label" style={{ color: 'var(--yellow)', display: 'block', marginBottom: '8px' }}>
              HOW IT WORKS
            </span>
            <h2 id="home-process-title">From schedule to specification.</h2>
          </div>
        </header>
        <ol className="home-process__steps">
          {STEPS.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <li
                key={step.num}
                className={`home-process__step ${isActive ? 'is-active' : ''}`}
                data-step-index={idx}
              >
                <div className="home-process__step-header">
                  <span className="mono-label">
                    {step.num} // {step.label}
                  </span>
                  <span className="home-process__step-marker" aria-hidden="true" />
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};
