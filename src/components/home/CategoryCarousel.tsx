import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { ArrowUpRight } from "lucide-react";
import { CATEGORIES } from "../../data/categories";
import { OptimizedTiltCard } from "../ui/optimized-tilt-card";

interface CategorySpec {
  location: string;
  subLocation: string;
  metric1: { value: string; label: string };
  metric2: { value: string; label: string };
  metric3: { value: string; label: string };
  badge: string;
}

const CATEGORY_SPECS: Record<string, CategorySpec> = {
  "door-handles-knobs": {
    location: "Verona Architectural Series",
    subLocation: "Interior & Entrance Doors",
    metric1: { value: "Solid Brass", label: "Material" },
    metric2: { value: "5mm Rose", label: "Profile" },
    metric3: { value: "10-Yr", label: "Warranty" },
    badge: "08 Models",
  },
  "door-hardware-accessories": {
    location: "Mortise & Concealed Systems",
    subLocation: "Heavy-Duty Leaf Hinges & Locks",
    metric1: { value: "Grade 304", label: "Stainless" },
    metric2: { value: "Magnetic", label: "Latching" },
    metric3: { value: "200k", label: "Cycle Test" },
    badge: "06 Systems",
  },
  "bathroom-accessories": {
    location: "Aura & Minimalist Vanity",
    subLocation: "Wall-Mounted Shower & Bath",
    metric1: { value: "PVD Coated", label: "Anti-Rust" },
    metric2: { value: "Concealed", label: "Mounting" },
    metric3: { value: "Wet-Zone", label: "Certified" },
    badge: "07 Fittings",
  },
  "towel-rails-holders": {
    location: "Linear Architectural Rails",
    subLocation: "Master Ensuites & Powder Rooms",
    metric1: { value: "600/800mm", label: "Lengths" },
    metric2: { value: "Anti-Rotate", label: "Locking" },
    metric3: { value: "Heavy Duty", label: "Chassis" },
    badge: "06 Models",
  },
  "hooks-utility": {
    location: "Precision Robe & Coat Fixtures",
    subLocation: "Flush Structural Wall Plane",
    metric1: { value: "Dual / Single", label: "Format" },
    metric2: { value: "Solid Core", label: "Forged" },
    metric3: { value: "Zero-Sag", label: "Design" },
    badge: "05 Models",
  },
  "architectural-hardware": {
    location: "Custom Millwork & Cabinetry",
    subLocation: "Specialist Edge Pulls & Brackets",
    metric1: { value: "CNC Milled", label: "Toolpath" },
    metric2: { value: "Bevel Edge", label: "Chamfer" },
    metric3: { value: "Custom", label: "On Order" },
    badge: "06 Models",
  },
};

export const CategoryCarousel: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const getCardWidth = () => {
    if (!scrollRef.current) return 414;
    const item = scrollRef.current.querySelector(".snap-start");
    return item ? item.getBoundingClientRect().width + 8 : 414;
  };

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 15);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);

      const cardWidth = getCardWidth();
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(Math.max(index, 0), CATEGORIES.length - 1));
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  // Auto-scroll effect: advances every 3.8s, pauses on hover or touch
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      if (!scrollRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const isAtEnd = scrollLeft >= scrollWidth - clientWidth - 25;

      if (isAtEnd) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        const cardWidth = getCardWidth();
        scrollRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
      }
    }, 3800);

    return () => clearInterval(timer);
  }, [isPaused]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const cardWidth = getCardWidth();
      scrollRef.current.scrollBy({
        left: direction === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollToCard = (index: number) => {
    if (scrollRef.current) {
      const cardWidth = getCardWidth();
      scrollRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => {
        setTimeout(() => setIsPaused(false), 2500);
      }}
    >
      {/* Header controls & Carousel Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-4 sm:mb-6">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-6 h-[1.5px] bg-[#F2B705]" />
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#F2B705]">
              CATALOGUE SYSTEMS
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-normal text-[#111111]">
            Engineered Collections for Complete Spaces
          </h2>
          <p className="text-base sm:text-lg text-[#777777] max-w-2xl leading-relaxed mt-4 font-light">
            Explore our core hardware categories. Each collection is developed with
            modular compatibility, matching finishes, and concealed fixing systems.
          </p>
        </div>

        {/* Carousel Arrow Controls */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <button
            type="button"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Previous collection"
            className={`w-12 h-12 rounded-[11px] border border-[#111111]/15 flex items-center justify-center transition-all duration-200 cursor-pointer ${
              canScrollLeft
                ? "bg-white hover:bg-[#111111] text-[#111111] hover:text-white hover:scale-105 shadow-sm"
                : "bg-white/40 text-gray-300 border-gray-200 cursor-not-allowed"
            }`}
          >
            <CaretLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Next collection"
            className={`w-12 h-12 rounded-[11px] border border-[#111111]/15 flex items-center justify-center transition-all duration-200 cursor-pointer ${
              canScrollRight
                ? "bg-white hover:bg-[#111111] text-[#111111] hover:text-white hover:scale-105 shadow-sm"
                : "bg-white/40 text-gray-300 border-gray-200 cursor-not-allowed"
            }`}
          >
            <CaretRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel Track - Generous clearance on all sides completely prevents 3D tilt clipping */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pt-8 pb-16 px-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {CATEGORIES.map((cat) => {
          const spec = CATEGORY_SPECS[cat.slug] || {
            location: "Architectural Hardware",
            subLocation: "Specification Grade Spec",
            metric1: { value: "Grade 304", label: "Stainless" },
            metric2: { value: "PVD Coat", label: "Finish" },
            metric3: { value: "10-Yr", label: "Warranty" },
            badge: `0${cat.itemCountDemonstration} Models`,
          };

          return (
            <div
              key={cat.id}
              className="flex-shrink-0 w-[88vw] sm:w-[380px] lg:w-[400px] snap-start p-4 flex flex-col"
            >
              <Link
                to={`/products/${cat.slug}`}
                className="flex-1 flex flex-col outline-none focus-visible:ring-2 focus-visible:ring-[#F2B705] rounded-2xl"
              >
                <OptimizedTiltCard
                  className="flex-1 rounded-2xl border border-neutral-800 bg-[#141414] p-5 hover:border-[#F2B705]/40 transition-all duration-500 backdrop-blur-xl flex flex-col justify-between group/tilt cursor-pointer text-left"
                  sheenColor="rgba(242, 183, 5, 0.35)"
                >
                  <div className="flex flex-col flex-1">
                    {/* Top Image Banner */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-[#1C1C1C]">
                      <img
                        src={cat.heroImage}
                        alt={cat.title}
                        className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover/tilt:scale-106"
                      />

                      {/* Solid Overlay for contrast */}
                      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

                      {/* Top Badges */}
                      <div className="pointer-events-none absolute inset-x-3.5 top-3.5 flex items-center justify-between">
                        <span className="rounded-md border border-white/20 bg-black/70 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-white backdrop-blur-md">
                          Collection
                        </span>

                        <span className="rounded-md border border-white/15 bg-black/60 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-neutral-200 backdrop-blur-md">
                          {spec.badge}
                        </span>
                      </div>

                      {/* Interactive Arrow Disc */}
                      <div
                        className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white shadow-md backdrop-blur-md transition-all duration-300 group-hover/tilt:scale-110 group-hover/tilt:bg-[#F2B705] group-hover/tilt:text-black border border-white/15"
                        aria-hidden="true"
                      >
                        <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover/tilt:-translate-y-0.5 group-hover/tilt:translate-x-0.5" />
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="mt-5 flex flex-1 flex-col justify-between">
                      <div>
                        <div className="mb-1 flex items-center justify-between text-[11px] font-mono uppercase tracking-widest">
                          <span className="text-[#F2B705]">{spec.location}</span>
                          <span className="text-[10px] text-neutral-400">SIDDI Spec</span>
                        </div>

                        <h3 className="text-xl font-semibold text-white transition-colors duration-200 group-hover/tilt:text-[#F2B705] line-clamp-1">
                          {cat.title}
                        </h3>

                        <p className="mt-1 text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                          {cat.subtitle} — {spec.subLocation}
                        </p>
                      </div>

                      {/* Technical Spec Box (3 Metrics) */}
                      <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl border border-neutral-800 bg-neutral-900/90 p-3 text-left">
                        <div>
                          <div className="truncate text-xs font-semibold text-white">
                            {spec.metric1.value}
                          </div>
                          <div className="text-[10px] uppercase tracking-wider text-neutral-400 font-mono mt-0.5 truncate">
                            {spec.metric1.label}
                          </div>
                        </div>
                        <div>
                          <div className="truncate text-xs font-semibold text-white">
                            {spec.metric2.value}
                          </div>
                          <div className="text-[10px] uppercase tracking-wider text-neutral-400 font-mono mt-0.5 truncate">
                            {spec.metric2.label}
                          </div>
                        </div>
                        <div>
                          <div className="truncate text-xs font-semibold text-white">
                            {spec.metric3.value}
                          </div>
                          <div className="text-[10px] uppercase tracking-wider text-neutral-400 font-mono mt-0.5 truncate">
                            {spec.metric3.label}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer link */}
                  <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs">
                    <span className="font-mono text-neutral-400 text-[11px]">
                      Hardware System
                    </span>
                    <span className="font-semibold uppercase tracking-wider text-neutral-300 group-hover/tilt:text-[#F2B705] transition-colors inline-flex items-center gap-1">
                      Explore Systems &rarr;
                    </span>
                  </div>
                </OptimizedTiltCard>
              </Link>
            </div>
          );
        })}
      </div>

      {/* Pagination Pill Indicators */}
      <div className="flex items-center justify-center gap-2 mt-2">
        {CATEGORIES.map((_, i) => {
          const responsiveClass = i === 5 ? "md:hidden" : i === 4 ? "lg:hidden" : "";
          return (
            <button
              key={i}
              type="button"
              onClick={() => scrollToCard(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${responsiveClass} ${
                activeIndex === i
                  ? "w-8 h-2 bg-[#F2B705]"
                  : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};
