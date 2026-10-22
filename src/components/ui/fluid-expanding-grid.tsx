"use client";

import React, { useState, useEffect } from "react";
import { motion, LayoutGroup } from "framer-motion";
import { cn } from "@/lib/utils";
import { Play, Pause, CaretLeft, CaretRight } from "@phosphor-icons/react";

export interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  color: string;
  tag?: string;
  spec?: string;
}

const DEFAULT_ITEMS: GalleryItem[] = [
  {
    id: "metallurgy",
    title: "Solid Metallurgy",
    subtitle: "Hot-forged at 750°C from solid virgin brass billets. 8.5 g/cm³ zero-porosity core eliminates hollow resonances.",
    image: "/brass-door-handle.jpg",
    color: "#F2B705",
    tag: "Metallurgy // Solid Billet",
    spec: "CuZn39Pb3 Virgin Alloy • +63% Heft",
  },
  {
    id: "mechanics",
    title: "Silent Mechanics",
    subtitle: "Neodymium magnetic mortise latches & self-lubricating PTFE bushings deliver whisper-quiet < 18 dB acoustic action.",
    image: "/Handles.jpg",
    color: "#10b981",
    tag: "Mechanics // Silent Action",
    spec: "1,000N Load • Magnetic Detent",
  },
  {
    id: "surfaces",
    title: "PVD Spectral Match",
    subtitle: "Multi-axis high-vacuum PVD chambers calibrate ΔE < 0.5 tonal harmony across handles, locks & sanitary hardware.",
    image: "/bathroom-accessory-kit.jpg",
    color: "#C5A880",
    tag: "Surfaces // PVD Spectral",
    spec: "2,500 HV Hardness • ΔE < 0.5",
  },
  {
    id: "endurance",
    title: "Contract Endurance",
    subtitle: "200,000+ cycle testing and 500+ hour ASTM B117 salt spray fog certification ensure decades of commercial reliability.",
    image: "/Knobs.jpg",
    color: "#38bdf8",
    tag: "Endurance // Contract Tier",
    spec: "EN 1906 Gr 4 • 15-Yr Warranty",
  },
];

export interface FluidExpandingGridProps {
  items?: GalleryItem[];
  className?: string;
  containerClassName?: string;
  id?: string;
  autoPlayInterval?: number;
}

export function FluidExpandingGrid({
  items = DEFAULT_ITEMS,
  className,
  containerClassName,
  id = "fluid-expanding-grid",
  autoPlayInterval = 5000,
}: FluidExpandingGridProps) {
  const [activeId, setActiveId] = useState<string>(() => items[0]?.id || "metallurgy");
  const [isPaused, setIsPaused] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);

  // Auto-advance timer (smoothly morphs active card one by one)
  useEffect(() => {
    if (isPaused || items.length === 0) return;

    const timer = setInterval(() => {
      setActiveId((currentId) => {
        const currentIndex = items.findIndex((item) => item.id === currentId);
        const nextIndex = (currentIndex + 1) % items.length;
        return items[nextIndex].id;
      });
      setCycleCount((c) => c + 1);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [isPaused, items, autoPlayInterval]);

  const handleSelect = (itemId: string) => {
    setActiveId(itemId);
    setCycleCount((c) => c + 1);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentIndex = items.findIndex((item) => item.id === activeId);
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    setActiveId(items[prevIndex].id);
    setCycleCount((c) => c + 1);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentIndex = items.findIndex((item) => item.id === activeId);
    const nextIndex = (currentIndex + 1) % items.length;
    setActiveId(items[nextIndex].id);
    setCycleCount((c) => c + 1);
  };

  const activeIndex = items.findIndex((item) => item.id === activeId);
  const unselectedItems = items.filter((item) => item.id !== activeId);

  return (
    <div className={cn("w-full not-prose", className)}>
      <div className={cn("w-full w-full", containerClassName)}>

        {/* 1. MOBILE VIEW (< md): DIRECT ALL 4 CARDS STACKED IN 1 COLUMN */}
        <div className="grid grid-cols-1 gap-4 md:hidden w-full">
          {items.map((item, idx) => (
            <div
              key={`mobile-${item.id}`}
              className="relative rounded-2xl overflow-hidden bg-neutral-900 border border-[#111111]/15 p-6 min-h-[220px] flex flex-col justify-between shadow-md"
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover filter brightness-[0.4] contrast-[1.1]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30 pointer-events-none" />

              {/* Precision CAD Drafting Brackets */}
              <div
                className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 pointer-events-none opacity-80"
                style={{ borderColor: item.color || "#F2B705" }}
              />
              <div
                className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 pointer-events-none opacity-80"
                style={{ borderColor: item.color || "#F2B705" }}
              />
              <div
                className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 pointer-events-none opacity-80"
                style={{ borderColor: item.color || "#F2B705" }}
              />
              <div
                className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 pointer-events-none opacity-80"
                style={{ borderColor: item.color || "#F2B705" }}
              />

              {/* Header Row */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="font-mono text-xl font-bold"
                    style={{ color: item.color || "#F2B705" }}
                  >
                    0{idx + 1}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold text-white/90">
                    {item.tag || item.id}
                  </span>
                </div>
                {item.spec && (
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-white/10 border border-white/20 text-[#EAE5DC]">
                    {item.spec}
                  </span>
                )}
              </div>

              {/* Content Body */}
              <div className="relative z-10 pt-4">
                <h3 className="text-xl font-serif text-white tracking-tight leading-snug mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-300 font-light leading-relaxed">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 2. DESKTOP VIEW (>= md): FLUID EXPANDING GRID (ROW 1: 1 BIG CARD; ROW 2: 3 CARDS) */}
        <div
          className="hidden md:block w-full"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Top Control Bar: Active Status & Playback */}
          <div className="flex items-center justify-between pb-3 px-1 text-xs font-mono text-[#777777]">
            <div className="flex items-center gap-2">
              <span className="text-[#111111] font-semibold">
                ACTIVE FOCUS:
              </span>
              <span className="text-[#111111] font-bold">
                0{activeIndex + 1} // {items[activeIndex]?.title}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPaused(!isPaused)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#111111]/15 text-[#111111] hover:bg-neutral-100 text-[10px] font-mono transition-colors cursor-pointer shadow-2xs"
                title={isPaused ? "Resume auto-advance" : "Pause auto-advance"}
              >
                {isPaused ? (
                  <>
                    <Play className="w-3 h-3 text-[#B8871B]" weight="fill" />
                    <span>Paused</span>
                  </>
                ) : (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <Pause className="w-2.5 h-2.5 text-[#555555]" weight="fill" />
                    <span>Auto-Cycling (5s)</span>
                  </>
                )}
              </button>

              <div className="flex items-center rounded-full bg-white border border-[#111111]/15 overflow-hidden shadow-2xs">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="p-1.5 hover:bg-neutral-100 text-[#555555] hover:text-[#111111] transition-colors cursor-pointer"
                  title="Previous tenet"
                >
                  <CaretLeft className="w-3.5 h-3.5" />
                </button>
                <div className="w-[1px] h-3 bg-[#111111]/15" />
                <button
                  type="button"
                  onClick={handleNext}
                  className="p-1.5 hover:bg-neutral-100 text-[#555555] hover:text-[#111111] transition-colors cursor-pointer"
                  title="Next tenet"
                >
                  <CaretRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          <LayoutGroup id={id}>
            <motion.div
              layout
              className="grid grid-cols-3 gap-5 w-full"
              transition={{
                layout: {
                  type: "spring",
                  stiffness: 115,
                  damping: 22,
                  mass: 0.85,
                },
              }}
            >
              {items.map((item, originalIndex) => {
                const isSelected = item.id === activeId;
                const gridRow = isSelected ? 1 : 2;
                let gridColumn = "";

                if (isSelected) {
                  gridColumn = "1 / span 3";
                } else {
                  const colIdx = unselectedItems.findIndex((u) => u.id === item.id);
                  gridColumn = `${colIdx + 1} / span 1`;
                }

                return (
                  <motion.div
                    key={item.id}
                    layout
                    layoutId={`${id}-${item.id}`}
                    onClick={() => handleSelect(item.id)}
                    style={{ gridRow, gridColumn } as React.CSSProperties}
                    className={cn(
                      "relative cursor-pointer group w-full overflow-hidden select-none",
                      isSelected
                        ? "z-30 min-h-[380px] lg:min-h-[420px] rounded-3xl shadow-xl"
                        : "z-10 min-h-[175px] lg:min-h-[195px] rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-0.5"
                    )}
                    transition={{
                      layout: {
                        type: "spring",
                        stiffness: 115,
                        damping: 22,
                        mass: 0.85,
                      },
                    }}
                  >
                    {/* Background Image Container with Smooth Mask */}
                    <motion.div
                      layoutId={`${id}-${item.id}-mask-wrapper`}
                      className="absolute inset-0 overflow-hidden bg-neutral-900"
                      style={{ borderRadius: isSelected ? 24 : 16 }}
                    >
                      <motion.img
                        layoutId={`${id}-${item.id}-img`}
                        src={item.image}
                        alt={item.title}
                        className={cn(
                          "absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out filter contrast-[1.1]",
                          isSelected
                            ? "brightness-[0.45] object-[center_40%] group-hover:scale-105"
                            : "brightness-[0.38] object-[center_50%] group-hover:brightness-[0.48] group-hover:scale-105"
                        )}
                      />
                      <motion.div
                        layoutId={`${id}-${item.id}-mask`}
                        className={cn(
                          "absolute inset-0 transition-colors duration-500",
                          isSelected
                            ? "bg-gradient-to-t from-black/95 via-black/55 to-black/30"
                            : "bg-gradient-to-t from-black/95 via-black/65 to-black/40 group-hover:bg-black/50"
                        )}
                      />
                    </motion.div>

                    {/* Precision CAD Drafting Brackets */}
                    <div
                      className={cn(
                        "absolute top-3.5 left-3.5 border-t-2 border-l-2 pointer-events-none z-20 transition-all duration-300",
                        isSelected ? "w-4 h-4 opacity-80" : "w-3 h-3 opacity-40 group-hover:opacity-80"
                      )}
                      style={{ borderColor: item.color || "#F2B705" }}
                    />
                    <div
                      className={cn(
                        "absolute top-3.5 right-3.5 border-t-2 border-r-2 pointer-events-none z-20 transition-all duration-300",
                        isSelected ? "w-4 h-4 opacity-80" : "w-3 h-3 opacity-40 group-hover:opacity-80"
                      )}
                      style={{ borderColor: item.color || "#F2B705" }}
                    />
                    <div
                      className={cn(
                        "absolute bottom-3.5 left-3.5 border-b-2 border-l-2 pointer-events-none z-20 transition-all duration-300",
                        isSelected ? "w-4 h-4 opacity-80" : "w-3 h-3 opacity-40 group-hover:opacity-80"
                      )}
                      style={{ borderColor: item.color || "#F2B705" }}
                    />
                    <div
                      className={cn(
                        "absolute bottom-3.5 right-3.5 border-b-2 border-r-2 pointer-events-none z-20 transition-all duration-300",
                        isSelected ? "w-4 h-4 opacity-80" : "w-3 h-3 opacity-40 group-hover:opacity-80"
                      )}
                      style={{ borderColor: item.color || "#F2B705" }}
                    />

                    {/* Content Layer (Framer Motion Layout Position for Smooth Resizing) */}
                    <motion.div
                      layout="position"
                      className={cn(
                        "relative z-10 flex flex-col justify-between h-full select-none",
                        isSelected ? "p-8 lg:p-10" : "p-5"
                      )}
                    >
                      {/* Top Header Row */}
                      <motion.div layout="position" className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span
                            className={cn(
                              "font-mono font-bold transition-all duration-300",
                              isSelected ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"
                            )}
                            style={{ color: item.color || "#F2B705" }}
                          >
                            0{originalIndex + 1}
                          </span>
                          <span
                            className={cn(
                              "font-mono uppercase tracking-[0.2em] font-semibold text-white/95 transition-all duration-300",
                              isSelected ? "text-[11px]" : "text-[9px]"
                            )}
                          >
                            {item.tag || item.id}
                          </span>
                        </div>

                        <div>
                          {isSelected ? (
                            <span className="text-[9px] font-mono px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white font-medium flex items-center gap-1.5 shadow-2xs">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              Active Tenet
                            </span>
                          ) : (
                            <span className="text-[8px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-white/80 group-hover:bg-[#F2B705] group-hover:text-black transition-colors font-medium">
                              Click to Expand
                            </span>
                          )}
                        </div>
                      </motion.div>

                      {/* Title & Subtitle Area */}
                      <motion.div layout="position" className="mt-auto pt-3">
                        <motion.h3
                          layout="position"
                          className={cn(
                            "font-serif font-normal text-white tracking-tight leading-snug transition-all duration-300",
                            isSelected
                              ? "text-2xl sm:text-4xl lg:text-5xl mb-2.5"
                              : "text-base sm:text-lg mb-1 group-hover:text-[#F2B705]"
                          )}
                        >
                          {item.title}
                        </motion.h3>

                        <motion.p
                          layout="position"
                          className={cn(
                            "text-neutral-200 font-light leading-relaxed transition-all duration-300",
                            isSelected
                              ? "text-xs sm:text-sm lg:text-base max-w-2xl"
                              : "text-[11px] text-neutral-300 line-clamp-2"
                          )}
                        >
                          {item.subtitle}
                        </motion.p>

                        {/* Benchmark & Guidelines Footer (Visible when Big) */}
                        {isSelected && (
                          <motion.div
                            layout="position"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1, duration: 0.4 }}
                            className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono"
                          >
                            <div className="flex items-center gap-2 text-white/85">
                              <span className="text-[10px] text-white/50">BENCHMARK:</span>
                              <span
                                className="font-semibold px-2 py-0.5 rounded-md bg-white/10 border border-white/15"
                                style={{ color: item.color || "#F2B705" }}
                              >
                                {item.spec || "Commercial Grade 4"}
                              </span>
                            </div>
                            <span className="text-[10px] text-white/50 hidden lg:inline font-mono">
                              HOVER ANYWHERE TO PAUSE • CLICK SMALL CARDS TO EXPAND
                            </span>
                          </motion.div>
                        )}
                      </motion.div>
                    </motion.div>

                    {/* Animated Progress Line on Active Card */}
                    {isSelected && !isPaused && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/15 overflow-hidden z-20 pointer-events-none">
                        <motion.div
                          key={`progress-${item.id}-${cycleCount}`}
                          className="h-full bg-gradient-to-r from-[#F2B705] to-[#E5A800]"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{
                            duration: autoPlayInterval / 1000,
                            ease: "linear",
                          }}
                        />
                      </div>
                    )}

                    {/* Border & Glow Overlays */}
                    <motion.div
                      layoutId={`${id}-${item.id}-border`}
                      className={cn(
                        "absolute inset-0 pointer-events-none transition-colors duration-500",
                        isSelected
                          ? "border border-white/20 shadow-inner"
                          : "border border-white/10 group-hover:border-white/30"
                      )}
                      style={{ borderRadius: isSelected ? 24 : 16 }}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          </LayoutGroup>
        </div>

      </div>
    </div>
  );
}

export default FluidExpandingGrid;
