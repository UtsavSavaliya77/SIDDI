import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { CaretLeft, CaretRight, ArrowRight } from "@phosphor-icons/react";
import { ArrowUpRight } from "lucide-react";
import { APPLICATION_AREAS } from "../../data/products";

interface EnvironmentSpec {
  metric1: { value: string; label: string };
  metric2: { value: string; label: string };
  metric3: { value: string; label: string };
  tag: string;
}

const ENVIRONMENT_SPECS: Record<string, EnvironmentSpec> = {
  "residential-bathrooms": {
    tag: "RESIDENTIAL ENSUITE",
    metric1: { value: "+10-Yr", label: "Warranty Protection" },
    metric2: { value: "Grade 316", label: "Marine Stainless" },
    metric3: { value: "100%", label: "PVD Moisture Shield" },
  },
  "master-suites-doors": {
    tag: "INTERIOR PASSAGE",
    metric1: { value: "0 dB", label: "Acoustic Magnetic Latch" },
    metric2: { value: "200k", label: "Cycles Endurance" },
    metric3: { value: "3D", label: "Concealed Flush Fit" },
  },
  "hospitality-hotels": {
    tag: "BOUTIQUE HOSPITALITY",
    metric1: { value: "Grade 4", label: "EN 1906 Commercial" },
    metric2: { value: "Multi-PVD", label: "Scratch Resistant" },
    metric3: { value: "Tamper", label: "Concealed Security" },
  },
  "commercial-interiors": {
    tag: "EXECUTIVE SUITES",
    metric1: { value: "90°", label: "Hold-Open Pivots" },
    metric2: { value: "Full-Height", label: "Oversized Pulls" },
    metric3: { value: "ADA", label: "Compliance Certified" },
  },
  "bespoke-renovations": {
    tag: "CUSTOM MILLWORK",
    metric1: { value: "100%", label: "Coordinated Finishes" },
    metric2: { value: "Universal", label: "Standard Bore Fit" },
    metric3: { value: "Bespoke", label: "CAD Integration" },
  },
};

export const SpatialEnvironmentsCoverflow: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const total = APPLICATION_AREAS.length;

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-scroll effect: advances every 5 seconds, pauses on hover / touch
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;
      if (diff > 50) {
        nextSlide();
      } else if (diff < -50) {
        prevSlide();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
    setTimeout(() => setIsPaused(false), 3000);
  };

  return (
    <div
      className="relative select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 3D Coverflow Container with Left/Right Peek Cards */}
      <div className="relative overflow-hidden py-8 px-2 sm:px-6">
        {/* Navigation Arrow Left */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous Environment"
          className="absolute left-2 sm:left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#111111]/90 text-white flex items-center justify-center shadow-xl hover:bg-[#F2B705] hover:text-black hover:scale-105 transition-all duration-300 cursor-pointer backdrop-blur-md"
        >
          <CaretLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Navigation Arrow Right */}
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next Environment"
          className="absolute right-2 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#111111]/90 text-white flex items-center justify-center shadow-xl hover:bg-[#F2B705] hover:text-black hover:scale-105 transition-all duration-300 cursor-pointer backdrop-blur-md"
        >
          <CaretRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Slides Track */}
        <div className="relative min-h-[580px] sm:min-h-[520px] md:min-h-[480px] max-w-5xl mx-auto flex items-center justify-center">
          {APPLICATION_AREAS.map((area, index) => {
            const spec = ENVIRONMENT_SPECS[area.slug] || {
              tag: "ARCHITECTURAL",
              metric1: { value: "+10-Yr", label: "Warranty Protection" },
              metric2: { value: "Grade 316", label: "Marine Stainless" },
              metric3: { value: "100%", label: "PVD Moisture Shield" },
            };

            // Calculate distance relative to active index: -1 (prev), 0 (active), 1 (next), etc.
            let diff = index - activeIndex;
            if (diff < -Math.floor(total / 2)) diff += total;
            if (diff > Math.floor(total / 2)) diff -= total;

            const isActive = diff === 0;
            const isPrev = diff === -1;
            const isNext = diff === 1;

            let transformStyle = "";
            let opacityStyle = "opacity-0 pointer-events-none scale-75";
            let zIndexStyle = "z-0";

            if (isActive) {
              transformStyle = "translate-x-0 scale-100";
              opacityStyle = "opacity-100 z-20 pointer-events-auto";
              zIndexStyle = "z-20";
            } else if (isPrev) {
              transformStyle = "-translate-x-[75%] sm:-translate-x-[85%] md:-translate-x-[92%] scale-[0.88]";
              opacityStyle = "opacity-35 hover:opacity-70 z-10 cursor-pointer pointer-events-auto";
              zIndexStyle = "z-10";
            } else if (isNext) {
              transformStyle = "translate-x-[75%] sm:translate-x-[85%] md:translate-x-[92%] scale-[0.88]";
              opacityStyle = "opacity-35 hover:opacity-70 z-10 cursor-pointer pointer-events-auto";
              zIndexStyle = "z-10";
            }

            return (
              <div
                key={area.id}
                onClick={() => {
                  if (isPrev) prevSlide();
                  if (isNext) nextSlide();
                }}
                className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out ${transformStyle} ${opacityStyle} ${zIndexStyle}`}
              >
                {/* Horizontal Modern Pill Card Container */}
                <div className="w-full bg-white border border-black/8 rounded-[36px] sm:rounded-[44px] p-6 sm:p-8 md:p-10 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.12)]">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 md:gap-10 items-center">
                    {/* Left Column: Dark Squircle Hardware Visual */}
                    <div className="md:col-span-5 flex items-center justify-center">
                      <div className="w-full aspect-square max-w-[340px] sm:max-w-[380px] rounded-[28px] sm:rounded-[36px] bg-[#141414] border border-black/10 overflow-hidden relative shadow-2xl group/squircle">
                        <img
                          src={area.image}
                          alt={area.title}
                          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover/squircle:scale-106"
                        />
                        <div className="absolute inset-0 bg-black/50 pointer-events-none" />

                        {/* Top Badges */}
                        <div className="pointer-events-none absolute inset-x-4 top-4 flex items-center justify-between">
                          <span className="rounded-full border border-white/25 bg-black/60 px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-white backdrop-blur-md">
                            SPACE 0{index + 1}
                          </span>
                          <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-neutral-200 backdrop-blur-md">
                            {spec.tag}
                          </span>
                        </div>

                        {/* Floating Action Disc */}
                        <Link
                          to="/applications"
                          className="absolute bottom-4 right-4 w-11 h-11 rounded-full bg-white/95 text-[#111111] shadow-xl flex items-center justify-center transition-all duration-300 group-hover/squircle:scale-110 group-hover/squircle:bg-[#F2B705] group-hover/squircle:text-black border border-black/5"
                          aria-label={`View ${area.title}`}
                        >
                          <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover/squircle:-translate-y-0.5 group-hover/squircle:translate-x-0.5" />
                        </Link>
                      </div>
                    </div>

                    {/* Right Column: Editorial Details & 3 Stats Metrics */}
                    <div className="md:col-span-7 flex flex-col justify-between">
                      <div>
                        {/* Brand / System Mark */}
                        <div className="flex items-center gap-2.5 mb-3.5">
                          <div className="w-6 h-6 rounded-md bg-[#111111] text-[#F2B705] flex items-center justify-center text-xs font-bold font-mono">
                            S
                          </div>
                          <span className="text-xs uppercase tracking-[0.25em] font-mono font-semibold text-[#111111]">
                            SIDDI SPECIFICATION
                          </span>
                        </div>

                        {/* Main Title */}
                        <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-normal text-[#111111] tracking-tight leading-tight">
                          {area.title}
                        </h3>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-[#666666] leading-relaxed mt-3 font-light line-clamp-3">
                          {area.description}
                        </p>

                        {/* Read More Link */}
                        <Link
                          to="/applications"
                          className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#111111] hover:text-[#F2B705] transition-colors mt-4 sm:mt-5 group"
                        >
                          <span className="underline underline-offset-4 decoration-[#111111]/30 hover:decoration-[#F2B705]">
                            Explore Space Systems
                          </span>
                          <span className="w-6 h-6 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-[#F2B705] transition-colors">
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </Link>
                      </div>

                      {/* Bottom 3-Metrics Row */}
                      <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-black/8 grid grid-cols-3 gap-3 sm:gap-4">
                        <div>
                          <div className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#111111] tracking-tight font-mono">
                            {spec.metric1.value}
                          </div>
                          <div className="text-[11px] sm:text-xs text-[#777777] font-medium leading-snug mt-1">
                            {spec.metric1.label}
                          </div>
                        </div>
                        <div>
                          <div className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#111111] tracking-tight font-mono">
                            {spec.metric2.value}
                          </div>
                          <div className="text-[11px] sm:text-xs text-[#777777] font-medium leading-snug mt-1">
                            {spec.metric2.label}
                          </div>
                        </div>
                        <div>
                          <div className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#111111] tracking-tight font-mono">
                            {spec.metric3.value}
                          </div>
                          <div className="text-[11px] sm:text-xs text-[#777777] font-medium leading-snug mt-1">
                            {spec.metric3.label}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination Pill Indicators */}
      <div className="flex items-center justify-center gap-2.5 mt-4">
        {APPLICATION_AREAS.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiveIndex(i)}
            aria-label={`Go to environment ${i + 1}`}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              activeIndex === i
                ? "w-8 h-2.5 bg-[#F2B705] shadow-sm"
                : "w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
