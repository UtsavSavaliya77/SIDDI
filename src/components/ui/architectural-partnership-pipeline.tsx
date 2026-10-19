"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface Milestone {
  id: string;
  step: string;
  phaseCode: string;
  title: string;
  category: string;
  leadTime: string;
  description: string;
  deliverablePill: string;
  linkText: string;
  linkHref: string;
  blueprintType: "door-schedule" | "sample-ingot" | "bim-wireframe" | "warranty-seal";
}

const MILESTONES: Milestone[] = [
  {
    id: "schedule",
    step: "01",
    phaseCode: "PHASE 01 // SCHEMATIC",
    title: "Specification Schedule",
    category: "01 // SCHEMATIC",
    leadTime: "48h Turnaround",
    description:
      "Send floorplans or door schedules. We return door-by-door master takeoffs with full code compliance.",
    deliverablePill: "48h Door Schedules • CSI Div 08",
    linkText: "Request Takeoff",
    linkHref: "/contact?interest=Specification%20Schedule",
    blueprintType: "door-schedule",
  },
  {
    id: "sample-kit",
    step: "02",
    phaseCode: "PHASE 02 // SAMPLING",
    title: "48h Physical Sample Kit",
    category: "02 // SAMPLING",
    leadTime: "Overnight Dispatch",
    description:
      "Curated solid brass billets and PVD finish swatches dispatched overnight for client presentations.",
    deliverablePill: "Solid Brass Billets • Walnut Box",
    linkText: "Order Sample Box",
    linkHref: "/contact?interest=Sample%20Kit",
    blueprintType: "sample-ingot",
  },
  {
    id: "bim-cad",
    step: "03",
    phaseCode: "PHASE 03 // BIM & CAD",
    title: "CAD & LOD 400 BIM",
    category: "03 // BIM & CAD",
    leadTime: "Instant Access",
    description:
      "Parametric Revit RFA & IFC families with 1:1 CNC mortise cutouts and submittal binders.",
    deliverablePill: "Revit .RFA • 1:1 CNC Cutouts",
    linkText: "Access BIM Library",
    linkHref: "/resources#bim",
    blueprintType: "bim-wireframe",
  },
  {
    id: "warranty",
    step: "04",
    phaseCode: "PHASE 04 // HANDOVER",
    title: "15-Yr Site Warranty",
    category: "04 // HANDOVER",
    leadTime: "15-Year Bond",
    description:
      "Pre-handover torque audits and a 15-year commercial mechanical warranty bond upon site handover.",
    deliverablePill: "Torque Audit • 15-Yr Warranty Bond",
    linkText: "View Warranty Terms",
    linkHref: "/resources#warranty",
    blueprintType: "warranty-seal",
  },
];

export function ArchitecturalPartnershipPipeline() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="relative bg-[#FAF9F6] border border-[#111111]/12 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-lg overflow-hidden mb-28">
      {/* Precision CAD Drafting Coordinate Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="archSchematicGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#111111" strokeWidth="0.3" strokeOpacity="0.1" />
              <circle cx="0" cy="0" r="0.75" fill="#111111" fillOpacity="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#archSchematicGrid)" />
        </svg>
      </div>

      {/* Gold Precision CAD Corner Brackets */}
      <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#B8871B] pointer-events-none opacity-80" />
      <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#B8871B] pointer-events-none opacity-80" />
      <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#B8871B] pointer-events-none opacity-80" />
      <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#B8871B] pointer-events-none opacity-80" />

      {/* Header Bar */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 mb-8 border-b border-[#111111]/10">
        <div className="max-w-3xl space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B8871B] animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#B8871B] font-bold">
              Studio Collaboration // Specification Protocol
            </span>
          </div>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#111111] tracking-tight">
            How We Partner With Architectural Practices
          </h3>
          <p className="text-xs sm:text-sm text-[#666666] font-light leading-relaxed max-w-2xl">
            Four disciplined milestones connecting schematic floorplans to certified site handover.
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-3">
          <Link
            to="/contact?interest=Studio%20Partnership"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111111] hover:bg-[#222222] text-white text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-300 shadow-sm hover:shadow-md group"
          >
            <span>Initiate Partnership</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#F2B705] transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* CONTINUOUS ARCHITECTURAL DRAFTING PIPELINE */}
      <div className="relative z-10">

        {/* Desktop Horizontal Milestone Rail: 1:1 Matched 4-Column Grid Alignment */}
        <div className="hidden lg:block relative mb-8">
          {/* Continuous Connecting Line running from center of col 1 to center of col 4 */}
          <div className="absolute top-3.5 left-[12.5%] right-[12.5%] h-[2px] bg-[#111111]/12 z-0">
            {/* Animated Laser Progress Beam */}
            <motion.div
              className="h-full bg-gradient-to-r from-[#F2B705] to-[#B8871B]"
              initial={{ width: "0%" }}
              animate={{ width: `${(activeStep / (MILESTONES.length - 1)) * 100}%` }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            />
          </div>

          {/* 4 Connected Milestone Pins: In Exact Same 4-Column Grid as Cards Below */}
          <div className="grid grid-cols-4 gap-6 relative z-10">
            {MILESTONES.map((m, idx) => {
              const isPassedOrCurrent = idx <= activeStep;
              const isCurrent = idx === activeStep;

              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className="flex flex-col items-center text-center group cursor-pointer w-full focus:outline-none"
                >
                  <div
                    className={cn(
                      "w-7 h-7 rounded-full border-2 flex items-center justify-center font-mono text-[10px] font-bold transition-all duration-300 shadow-xs",
                      isCurrent
                        ? "bg-[#111111] border-[#B8871B] text-[#F2B705] scale-110 ring-4 ring-[#B8871B]/20"
                        : isPassedOrCurrent
                        ? "bg-[#FAF9F6] border-[#B8871B] text-[#111111]"
                        : "bg-[#FAF9F6] border-[#111111]/20 text-[#888888] group-hover:border-[#111111]/50"
                    )}
                  >
                    {m.step}
                  </div>
                  <span
                    className={cn(
                      "text-[10px] font-mono uppercase tracking-widest mt-2 transition-colors",
                      isCurrent
                        ? "text-[#111111] font-bold"
                        : "text-[#777777] group-hover:text-[#111111]"
                    )}
                  >
                    {m.category}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4 BESPOKE ARCHITECTURAL SCHEMATIC CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          {MILESTONES.map((milestone, idx) => {
            const isCurrent = activeStep === idx;

            return (
              <div
                key={milestone.id}
                onMouseEnter={() => setActiveStep(idx)}
                className={cn(
                  "relative rounded-2xl bg-white border p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 group shadow-xs hover:shadow-xl",
                  isCurrent
                    ? "border-[#B8871B] shadow-md ring-1 ring-[#B8871B]/30 -translate-y-1"
                    : "border-[#111111]/10 hover:border-[#111111]/25 hover:-translate-y-0.5"
                )}
              >
                {/* Precision Corner Brackets on Active/Hover */}
                <div
                  className={cn(
                    "absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t border-l border-[#B8871B] transition-opacity",
                    isCurrent ? "opacity-100" : "opacity-0 group-hover:opacity-70"
                  )}
                />
                <div
                  className={cn(
                    "absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t border-r border-[#B8871B] transition-opacity",
                    isCurrent ? "opacity-100" : "opacity-0 group-hover:opacity-70"
                  )}
                />
                <div
                  className={cn(
                    "absolute bottom-2.5 left-2.5 w-2.5 h-2.5 border-b border-l border-[#B8871B] transition-opacity",
                    isCurrent ? "opacity-100" : "opacity-0 group-hover:opacity-70"
                  )}
                />
                <div
                  className={cn(
                    "absolute bottom-2.5 right-2.5 w-2.5 h-2.5 border-b border-r border-[#B8871B] transition-opacity",
                    isCurrent ? "opacity-100" : "opacity-0 group-hover:opacity-70"
                  )}
                />

                <div className="space-y-3.5">
                  {/* Top Step Row */}
                  <div className="flex items-center justify-between pb-2.5 border-b border-[#111111]/8">
                    <span
                      className={cn(
                        "font-mono text-xl font-bold transition-colors",
                        isCurrent ? "text-[#B8871B]" : "text-[#111111]"
                      )}
                    >
                      {milestone.step}
                    </span>
                    <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FAF9F6] border border-[#111111]/10 text-[#666666]">
                      {milestone.leadTime}
                    </span>
                  </div>

                  {/* Bespoke Architectural Technical Vector Schematic */}
                  <div className="w-full h-20 rounded-xl bg-[#FAF9F6] border border-[#111111]/8 p-2 flex items-center justify-center relative overflow-hidden group-hover:border-[#B8871B]/30 transition-colors">
                    {milestone.blueprintType === "door-schedule" && (
                      <svg className="w-full h-full" viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 25 15 L 25 65 L 75 65" stroke="#111111" strokeWidth="1.2" />
                        <path d="M 25 65 A 50 50 0 0 1 75 15" stroke="#B8871B" strokeWidth="1.5" strokeDasharray="3 3" />
                        <line x1="25" y1="65" x2="75" y2="15" stroke="#B8871B" strokeWidth="1.5" />
                        <circle cx="25" cy="65" r="2.5" fill="#111111" />
                        <line x1="90" y1="25" x2="145" y2="25" stroke="#888888" strokeWidth="0.8" />
                        <text x="90" y="20" fill="#888888" fontSize="7" fontFamily="monospace">W: 900mm</text>
                        <text x="90" y="45" fill="#111111" fontSize="8" fontFamily="monospace" fontWeight="bold">D101 // ENTRY</text>
                        <text x="90" y="58" fill="#B8871B" fontSize="7" fontFamily="monospace">CSI 08 71 00</text>
                      </svg>
                    )}

                    {milestone.blueprintType === "sample-ingot" && (
                      <svg className="w-full h-full" viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <polygon points="80,18 120,32 80,48 40,32" fill="#FAF5E8" stroke="#B8871B" strokeWidth="1.2" />
                        <polygon points="40,32 80,48 80,66 40,50" fill="#F2E6C8" stroke="#B8871B" strokeWidth="1.2" />
                        <polygon points="80,48 120,32 120,50 80,66" fill="#E5D3A5" stroke="#B8871B" strokeWidth="1.2" />
                        <text x="80" y="34" fill="#B8871B" fontSize="6.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">CuZn39Pb3</text>
                        <text x="80" y="74" fill="#666666" fontSize="6.5" fontFamily="monospace" textAnchor="middle">8.5 g/cm³ SOLID</text>
                      </svg>
                    )}

                    {milestone.blueprintType === "bim-wireframe" && (
                      <svg className="w-full h-full" viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="30" y1="55" x2="30" y2="15" stroke="#111111" strokeWidth="0.8" />
                        <line x1="30" y1="55" x2="65" y2="55" stroke="#111111" strokeWidth="0.8" />
                        <line x1="30" y1="55" x2="15" y2="68" stroke="#111111" strokeWidth="0.8" />
                        <text x="28" y="12" fill="#888888" fontSize="7" fontFamily="monospace">Z</text>
                        <text x="68" y="57" fill="#888888" fontSize="7" fontFamily="monospace">X</text>
                        <text x="10" y="72" fill="#888888" fontSize="7" fontFamily="monospace">Y</text>
                        <ellipse cx="65" cy="38" rx="14" ry="8" stroke="#10b981" strokeWidth="1.2" fill="none" />
                        <rect x="65" y="34" width="60" height="8" rx="3" stroke="#10b981" strokeWidth="1.2" fill="none" strokeDasharray="3 2" />
                        <circle cx="125" cy="38" r="2" fill="#10b981" />
                        <text x="95" y="58" fill="#10b981" fontSize="7.5" fontFamily="monospace" fontWeight="bold">LOD 400 BIM</text>
                      </svg>
                    )}

                    {milestone.blueprintType === "warranty-seal" && (
                      <svg className="w-full h-full" viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="80" cy="40" r="28" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" />
                        <circle cx="80" cy="40" r="22" stroke="#111111" strokeWidth="1.2" />
                        <line x1="80" y1="14" x2="80" y2="66" stroke="#38bdf8" strokeWidth="0.8" />
                        <line x1="54" y1="40" x2="106" y2="40" stroke="#38bdf8" strokeWidth="0.8" />
                        <text x="80" y="38" fill="#111111" fontSize="9" fontFamily="serif" textAnchor="middle" fontWeight="bold">15 YR</text>
                        <text x="80" y="47" fill="#38bdf8" fontSize="6" fontFamily="monospace" textAnchor="middle" fontWeight="bold">WARRANTY</text>
                      </svg>
                    )}
                  </div>

                  {/* Title & Concise Description */}
                  <div>
                    <h4 className="text-base font-serif font-medium text-[#111111] group-hover:text-[#B8871B] transition-colors leading-snug">
                      {milestone.title}
                    </h4>
                    <p className="text-xs text-[#666666] font-light leading-relaxed mt-1.5">
                      {milestone.description}
                    </p>
                  </div>

                  {/* Deliverable Badge */}
                  <div className="pt-2 border-t border-[#111111]/8">
                    <span className="inline-block text-[10px] font-mono text-[#444444] bg-[#FAF9F6] border border-[#111111]/10 px-2 py-0.5 rounded-md">
                      ✓ {milestone.deliverablePill}
                    </span>
                  </div>
                </div>

                {/* Direct Action Link */}
                <div className="pt-3.5 mt-3 border-t border-[#111111]/8">
                  <Link
                    to={milestone.linkHref}
                    className="inline-flex items-center justify-between w-full text-xs font-mono font-medium text-[#111111] hover:text-[#B8871B] transition-colors group/link"
                  >
                    <span>{milestone.linkText}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#B8871B] transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Bottom Technical Specification Protocol Strip */}
      <div className="relative z-10 mt-8 pt-5 border-t border-[#111111]/10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#B8871B]" />
          <span className="text-xs font-mono text-[#555555]">
            <strong className="text-[#111111]">48-Hour</strong> Schedule Turnaround
          </span>
        </div>
        <div className="flex items-center justify-center sm:justify-start gap-2.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-xs font-mono text-[#555555]">
            <strong className="text-[#111111]">180+</strong> Practices Specified
          </span>
        </div>
        <div className="flex items-center justify-center sm:justify-start gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#B8871B]" />
          <span className="text-xs font-mono text-[#555555]">
            <strong className="text-[#111111]">100% Solid Brass</strong> Zero Diecast
          </span>
        </div>
      </div>
    </div>
  );
}

export default ArchitecturalPartnershipPipeline;
