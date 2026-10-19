"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  Play,
  Pause,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface PhaseItem {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  phaseLabel: string;
  timeline: string;
  description: string;
  image: string;
  color: string;
  deliverables: string[];
  ctaText: string;
  ctaLink: string;
}

const COLLABORATION_PHASES: PhaseItem[] = [
  {
    id: "schedule",
    step: "01",
    title: "Specification Schedule",
    subtitle: "Door-by-Door Hardware Takeoffs & Egress Mapping",
    phaseLabel: "Phase 01 // Schematic",
    timeline: "48-Hour Turnaround",
    description:
      "Send your architectural floorplans and door schedules. Our specification engineers deliver comprehensive door-by-door master hardware schedules mapped to CSI Division 08 71 00 with complete fire and egress ratings.",
    image: "/brass-door-handle.jpg",
    color: "#F2B705",
    deliverables: [
      "Door-by-door master schedules (Excel / PDF)",
      "CSI Div 08 71 00 compliant hardware sets",
      "Fire & egress code compliance mapping",
      "Itemized trade budget takeoffs",
    ],
    ctaText: "Request Specification Takeoff",
    ctaLink: "/contact?interest=Specification%20Schedule",
  },
  {
    id: "sample-kit",
    step: "02",
    title: "48h Physical Sample Kit",
    subtitle: "Solid Brass Blocks for Client Presentation Boards",
    phaseLabel: "Phase 02 // Sampling",
    timeline: "Overnight Studio Dispatch",
    description:
      "Curated presentation boxes with solid forged brass billets and custom PVD finish ingots delivered directly to your studio for client mood-boards and tactile sign-off.",
    image: "/bathroom-accessory-kit.jpg",
    color: "#C5A880",
    deliverables: [
      "100% solid forged virgin brass blocks",
      "PVD spectral match palette (ΔE < 0.5)",
      "Bespoke walnut studio presentation tray",
      "Complimentary return label included",
    ],
    ctaText: "Order Studio Sample Box",
    ctaLink: "/contact?interest=Sample%20Kit",
  },
  {
    id: "bim-cad",
    step: "03",
    title: "CAD & LOD 400 BIM",
    subtitle: "Revit Families & 1:1 CNC Mortise Pocket Cuts",
    phaseLabel: "Phase 03 // Documentation",
    timeline: "Instant Cloud Access",
    description:
      "Parametric Autodesk Revit RFA and IFC 4x3 families, complete with clearance bounding boxes, 1:1 CNC mortise pocket cut sheets, and comprehensive technical submittal binders.",
    image: "/Handles.jpg",
    color: "#10b981",
    deliverables: [
      "Revit 2024–2027 RFA & IFC 3D families",
      "1:1 CNC mortise pocket prep DWG vectors",
      "MEP clearance & swing bounding boxes",
      "Comprehensive submittal data sheets",
    ],
    ctaText: "Access LOD 400 BIM Library",
    ctaLink: "/resources#bim",
  },
  {
    id: "warranty",
    step: "04",
    title: "15-Yr Site Warranty",
    subtitle: "Pre-Handover Torque Audit & Mechanical Guarantee",
    phaseLabel: "Phase 04 // Handover",
    timeline: "15-Year Commercial Bond",
    description:
      "Pre-handover torque inspection audits and a comprehensive commercial mechanical warranty bond issued upon site handover for absolute client and specifier peace of mind.",
    image: "/Knobs.jpg",
    color: "#38bdf8",
    deliverables: [
      "Site torque & alignment inspection audit",
      "15-year mechanical warranty bond",
      "Dedicated studio specifier liaison",
      "Zero vendor-dispute commercial guarantee",
    ],
    ctaText: "Review Warranty Terms & Bond",
    ctaLink: "/resources#warranty",
  },
];

export function ArchitecturalPartnershipConsole() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [cycleCount, setCycleCount] = useState(0);

  // Auto-cycle through the 4 phases every 5 seconds unless hovered
  useEffect(() => {
    if (!isAutoPlay) return;

    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % COLLABORATION_PHASES.length);
      setCycleCount((c) => c + 1);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlay]);

  const handleSelect = (index: number) => {
    setActiveIdx(index);
    setCycleCount((c) => c + 1);
  };

  return (
    <div
      className="relative bg-white border border-[#111111]/12 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl overflow-hidden mb-28"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      {/* Precision CAD Drafting Coordinate Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="archAccordionGrid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#111111" strokeWidth="0.35" strokeOpacity="0.1" />
              <circle cx="0" cy="0" r="0.75" fill="#111111" fillOpacity="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#archAccordionGrid)" />
        </svg>
      </div>

      {/* Gold Precision CAD Corner Brackets */}
      <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#B8871B] pointer-events-none opacity-70" />
      <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#B8871B] pointer-events-none opacity-70" />
      <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#B8871B] pointer-events-none opacity-70" />
      <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#B8871B] pointer-events-none opacity-70" />

      {/* Header Bar */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 mb-8 border-b border-[#111111]/10">
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B8871B] animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#B8871B] font-bold">
              Studio Collaboration // CSI Div 08 71 00 Workflow
            </span>
          </div>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#111111] tracking-tight">
            How We Partner With Architectural Practices
          </h3>
          <p className="text-xs sm:text-sm text-[#666666] font-light leading-relaxed max-w-2xl">
            A kinetic four-phase collaboration pipeline engineered to accelerate your studio's Revit BIM documentation, expedite master hardware schedules, and guarantee zero-defect site commissioning.
          </p>
        </div>

        {/* Global Action & Auto-Cycle Control */}
        <div className="shrink-0 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF9F6] border border-[#111111]/12 text-[10px] font-mono text-[#555555] hover:text-[#111111] transition-colors cursor-pointer shadow-2xs"
            title={isAutoPlay ? "Pause auto-advance" : "Resume auto-advance"}
          >
            {isAutoPlay ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <Pause className="w-2.5 h-2.5 text-[#555555]" weight="fill" />
                <span>Auto-Cycling (5s)</span>
              </>
            ) : (
              <>
                <Play className="w-2.5 h-2.5 text-[#B8871B]" weight="fill" />
                <span>Paused</span>
              </>
            )}
          </button>

          <Link
            to="/contact?interest=Studio%20Partnership"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111111] hover:bg-[#222222] text-white text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-300 shadow-sm hover:shadow-md group"
          >
            <span>Initiate Partnership</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#F2B705] transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* 1. MOBILE VIEW (< md): 4 STACKED PHOTOGRAPHIC CARDS */}
      <div className="grid grid-cols-1 gap-5 md:hidden w-full relative z-10">
        {COLLABORATION_PHASES.map((phase) => (
          <div
            key={`mob-${phase.id}`}
            className="relative rounded-2xl overflow-hidden bg-neutral-900 border border-white/15 p-6 min-h-[340px] flex flex-col justify-between shadow-lg"
          >
            <img
              src={phase.image}
              alt={phase.title}
              className="absolute inset-0 w-full h-full object-cover filter brightness-[0.4] contrast-[1.1]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/35 pointer-events-none" />

            {/* Corner CAD Brackets */}
            <div
              className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 pointer-events-none opacity-80"
              style={{ borderColor: phase.color }}
            />
            <div
              className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 pointer-events-none opacity-80"
              style={{ borderColor: phase.color }}
            />
            <div
              className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 pointer-events-none opacity-80"
              style={{ borderColor: phase.color }}
            />
            <div
              className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 pointer-events-none opacity-80"
              style={{ borderColor: phase.color }}
            />

            {/* Top Row */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono text-2xl font-bold" style={{ color: phase.color }}>
                  {phase.step}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold text-white/90">
                  {phase.phaseLabel}
                </span>
              </div>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-white/10 border border-white/20 text-[#EAE5DC]">
                {phase.timeline}
              </span>
            </div>

            {/* Middle Content */}
            <div className="relative z-10 pt-4 space-y-2">
              <h4 className="text-xl font-serif text-white tracking-tight leading-snug">
                {phase.title}
              </h4>
              <p className="text-xs text-neutral-300 font-light leading-relaxed">
                {phase.description}
              </p>

              <div className="pt-2 border-t border-white/10 space-y-1 text-[11px] font-mono text-neutral-300">
                {phase.deliverables.slice(0, 3).map((item, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" weight="fill" />
                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Button */}
            <div className="relative z-10 pt-4 border-t border-white/10">
              <Link
                to={phase.ctaLink}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-white text-xs font-mono uppercase tracking-wider font-semibold transition-colors"
              >
                <span>{phase.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#F2B705]" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* 2. DESKTOP VIEW (>= md): KINETIC HORIZONTAL EXPANDING ACCORDION */}
      <div className="hidden md:flex gap-4 w-full h-[520px] lg:h-[560px] relative z-10 select-none">
        {COLLABORATION_PHASES.map((phase, idx) => {
          const isSelected = activeIdx === idx;

          return (
            <motion.div
              key={phase.id}
              onClick={() => handleSelect(idx)}
              onMouseEnter={() => handleSelect(idx)}
              className={cn(
                "relative rounded-3xl overflow-hidden cursor-pointer shadow-lg transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col justify-between group",
                isSelected
                  ? "flex-[4] lg:flex-[4.5] border-2 border-white/30 shadow-2xl"
                  : "flex-1 border border-[#111111]/15 hover:border-white/40 hover:brightness-110"
              )}
            >
              {/* Background Macro Photography with Dynamic Scrim */}
              <img
                src={phase.image}
                alt={phase.title}
                className={cn(
                  "absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out filter contrast-[1.1]",
                  isSelected
                    ? "brightness-[0.45] scale-100 group-hover:scale-105"
                    : "brightness-[0.28] scale-100 group-hover:brightness-[0.38] group-hover:scale-105"
                )}
              />
              <div
                className={cn(
                  "absolute inset-0 transition-colors duration-500 pointer-events-none",
                  isSelected
                    ? "bg-gradient-to-t from-black/95 via-black/55 to-black/35"
                    : "bg-gradient-to-t from-black/95 via-black/70 to-black/50"
                )}
              />

              {/* Precision CAD Drafting Brackets */}
              <div
                className={cn(
                  "absolute top-4 left-4 border-t-2 border-l-2 pointer-events-none z-20 transition-all duration-300",
                  isSelected ? "w-4 h-4 opacity-90" : "w-3 h-3 opacity-40 group-hover:opacity-80"
                )}
                style={{ borderColor: phase.color }}
              />
              <div
                className={cn(
                  "absolute top-4 right-4 border-t-2 border-r-2 pointer-events-none z-20 transition-all duration-300",
                  isSelected ? "w-4 h-4 opacity-90" : "w-3 h-3 opacity-40 group-hover:opacity-80"
                )}
                style={{ borderColor: phase.color }}
              />
              <div
                className={cn(
                  "absolute bottom-4 left-4 border-b-2 border-l-2 pointer-events-none z-20 transition-all duration-300",
                  isSelected ? "w-4 h-4 opacity-90" : "w-3 h-3 opacity-40 group-hover:opacity-80"
                )}
                style={{ borderColor: phase.color }}
              />
              <div
                className={cn(
                  "absolute bottom-4 right-4 border-b-2 border-r-2 pointer-events-none z-20 transition-all duration-300",
                  isSelected ? "w-4 h-4 opacity-90" : "w-3 h-3 opacity-40 group-hover:opacity-80"
                )}
                style={{ borderColor: phase.color }}
              />

              {/* EXPANDED CONTENT VIEW */}
              {isSelected ? (
                <div className="relative z-10 p-8 lg:p-10 flex flex-col justify-between h-full">
                  {/* Top Header Row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className="font-mono text-3xl lg:text-4xl font-bold"
                        style={{ color: phase.color }}
                      >
                        {phase.step}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-[11px] font-mono uppercase tracking-[0.25em] font-semibold text-white/95">
                          {phase.phaseLabel}
                        </span>
                        <span className="text-[9px] font-mono text-neutral-400">
                          {phase.timeline}
                        </span>
                      </div>
                    </div>

                    <span className="text-[9px] font-mono px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white font-medium flex items-center gap-1.5 shadow-2xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Active Phase
                    </span>
                  </div>

                  {/* Middle Content */}
                  <div className="my-auto py-4 max-w-2xl">
                    <span
                      className="text-xs font-mono uppercase tracking-widest font-semibold block mb-1"
                      style={{ color: phase.color }}
                    >
                      {phase.subtitle}
                    </span>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal text-white tracking-tight leading-tight mb-3">
                      {phase.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-200 font-light leading-relaxed mb-6">
                      {phase.description}
                    </p>

                    {/* Studio Deliverables Checklist */}
                    <div className="bg-black/40 backdrop-blur-md rounded-2xl p-4 border border-white/10 space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-white/60 block">
                        Guaranteed Studio Deliverables:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-white/90">
                        {phase.deliverables.map((item, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" weight="fill" />
                            <span className="truncate">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Row */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <Link
                      to={phase.ctaLink}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white hover:bg-neutral-100 text-[#111111] text-xs font-mono uppercase tracking-wider font-semibold transition-all shadow-md group/cta cursor-pointer"
                    >
                      <span>{phase.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#B8871B] transition-transform group-hover/cta:translate-x-1" />
                    </Link>

                    <span className="text-[10px] text-white/50 hidden lg:inline font-mono">
                      HOVER ANY PANEL TO EXPAND
                    </span>
                  </div>

                  {/* Bottom Auto-Cycle Progress Indicator Line */}
                  {isAutoPlay && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/15 overflow-hidden">
                      <motion.div
                        key={`prog-accordion-${phase.id}-${cycleCount}`}
                        className="h-full bg-gradient-to-r from-[#F2B705] to-[#E5A800]"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 5, ease: "linear" }}
                      />
                    </div>
                  )}
                </div>
              ) : (
                /* COLLAPSED COLUMN VIEW */
                <div className="relative z-10 p-5 sm:p-6 flex flex-col justify-between items-center h-full">
                  {/* Top Step Number */}
                  <span
                    className="font-mono text-2xl lg:text-3xl font-bold transition-transform group-hover:scale-110"
                    style={{ color: phase.color }}
                  >
                    {phase.step}
                  </span>

                  {/* Rotated / Stacked Title in Collapsed Panel */}
                  <div className="my-auto py-4">
                    <span className="[writing-mode:vertical-rl] rotate-180 text-xs sm:text-sm font-serif text-white/80 group-hover:text-white tracking-wider uppercase transition-colors whitespace-nowrap">
                      {phase.title}
                    </span>
                  </div>

                  {/* Bottom Expand Pill */}
                  <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-white/70 group-hover:bg-[#F2B705] group-hover:text-black transition-colors font-medium">
                    Expand
                  </span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Architectural Service Trust Ribbon */}
      <div className="relative z-10 mt-10 pt-6 border-t border-[#111111]/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-3">
          <span className="w-2 h-2 rounded-full bg-[#B8871B]" />
          <span className="text-xs font-mono text-[#555555]">
            <strong className="text-[#111111]">48-Hour</strong> Turnaround On Master Takeoffs
          </span>
        </div>
        <div className="flex items-center justify-center sm:justify-start gap-3">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-xs font-mono text-[#555555]">
            <strong className="text-[#111111]">180+</strong> Architectural Practices Supported
          </span>
        </div>
        <div className="flex items-center justify-center sm:justify-start gap-3">
          <span className="w-2 h-2 rounded-full bg-[#B8871B]" />
          <span className="text-xs font-mono text-[#555555]">
            <strong className="text-[#111111]">100% Solid Billet</strong> Zero Diecast Shortcuts
          </span>
        </div>
      </div>
    </div>
  );
}

export default ArchitecturalPartnershipConsole;
