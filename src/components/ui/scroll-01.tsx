"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "motion/react";
import { useRef, useState, type Dispatch, type SetStateAction } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export type Scroll01Item = {
  title: string;
  description: string;
  media: string;
  subtitle?: string;
  code?: string;
  environmentTag?: string;
  specs?: { label: string; value: string }[];
  categoryLinks?: { slug: string; name: string }[];
};

export interface Scroll01Props {
  items: Scroll01Item[];
}

function ScrollItem({
  item,
  index,
  setActive,
}: {
  item: Scroll01Item;
  index: number;
  setActive: Dispatch<SetStateAction<number>>;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 20%"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const opacityValues = index === 0 ? [1, 0.85, 1, 0.15] : [0.15, 0.85, 1, 0.15];
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    opacityValues,
  );

  const isActive = useTransform(scrollYProgress, (v) => v > 0.35 && v < 0.7);

  useMotionValueEvent(isActive, "change", (v) => {
    if (v) {
      setActive((prev) => (prev === index ? prev : index));
    }
  });

  return (
    <motion.article
      ref={ref}
      style={{ opacity, y }}
      className="flex flex-col justify-center min-h-[55vh] py-8"
    >
      <div className="bg-[#FAF9F6] border border-[#111111]/12 p-6 sm:p-8 lg:p-10 shadow-lg space-y-5 rounded-2xl">
        {/* Typology Code & Eyebrow */}
        <div className="flex items-center justify-between pb-3 border-b border-[#111111]/10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#F2B705]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#F2B705] font-semibold">
              {item.code || `Space // 0${index + 1}`}
            </span>
          </div>
          <span className="font-serif text-2xl text-[#111111]/25 font-light italic">
            № 0{index + 1}
          </span>
        </div>

        <div>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal text-[#111111] leading-tight mb-2">
            {item.title}
          </h3>
          {item.subtitle && (
            <p className="text-xs font-mono uppercase tracking-wider text-[#777777]">
              {item.subtitle}
            </p>
          )}
        </div>

        <p className="text-sm sm:text-base text-[#444444] font-light leading-relaxed">
          {item.description}
        </p>

        {/* Minimalist Specs Grid if provided */}
        {item.specs && item.specs.length > 0 && (
          <div className="pt-4 border-t border-[#111111]/10">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#888888] block mb-2.5 font-semibold">
              Calibrated Engineering Specifications
            </span>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {item.specs.map((spec, sIdx) => (
                <div key={sIdx} className="space-y-0.5">
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-[#888888]">
                    {spec.label}
                  </span>
                  <span className="block text-xs font-semibold text-[#111111] leading-tight truncate">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category Links if provided */}
        {item.categoryLinks && item.categoryLinks.length > 0 && (
          <div className="pt-4 border-t border-[#111111]/10 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[#777777]">Systems:</span>
              {item.categoryLinks.map((cat) => (
                <Link
                  key={cat.slug}
                  to={`/products/${cat.slug}`}
                  className="font-medium uppercase tracking-wider text-[#111111] hover:text-[#F2B705] border-b border-[#111111]/25 hover:border-[#F2B705] transition-colors pb-0.5"
                >
                  {cat.name}
                </Link>
              ))}
            </div>

            <Link
              to={`/contact?interest=${encodeURIComponent(item.title)}`}
              className="inline-flex items-center gap-1.5 font-mono uppercase tracking-wider font-semibold text-[#111111] hover:text-[#F2B705] transition-colors group/cta shrink-0"
            >
              <span>Schedule</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/cta:translate-x-1" />
            </Link>
          </div>
        )}
      </div>
    </motion.article>
  );
}

export function Scroll01({ items }: Readonly<Scroll01Props>) {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <>
      {/* Mobile Stack: Card + Image for each item */}
      <div className="space-y-14 md:hidden">
        {items.map((item, index) => (
          <article
            key={`${item.title}-${index}`}
            className="flex flex-col items-start space-y-4"
          >
            <div className="w-full relative aspect-4/3 overflow-hidden rounded-2xl border border-[#111111]/15 shadow-md">
              <img
                src={item.media}
                alt={item.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-black/80 px-2.5 py-1 text-[10px] font-mono text-[#F2B705] uppercase tracking-wider rounded">
                Space 0{index + 1}
              </div>
            </div>

            <div className="bg-[#FAF9F6] border border-[#111111]/12 p-6 rounded-2xl w-full space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#F2B705] font-semibold">
                  {item.code || `Space // 0${index + 1}`}
                </span>
                <span className="font-serif text-xl text-[#111111]/30 font-light italic">
                  № 0{index + 1}
                </span>
              </div>

              <h3 className="text-2xl font-serif font-normal text-[#111111]">
                {item.title}
              </h3>
              {item.subtitle && (
                <p className="text-xs font-mono uppercase tracking-wider text-[#777777]">
                  {item.subtitle}
                </p>
              )}
              <p className="text-xs sm:text-sm text-[#555555] font-light leading-relaxed">
                {item.description}
              </p>

              {item.categoryLinks && (
                <div className="pt-3 border-t border-[#111111]/10 flex flex-wrap gap-2 text-xs">
                  {item.categoryLinks.map((cat) => (
                    <Link
                      key={cat.slug}
                      to={`/products/${cat.slug}`}
                      className="text-xs font-medium uppercase tracking-wider text-[#111111] hover:text-[#F2B705] border-b border-[#111111]/25"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Desktop Sticky Scroll Grid: Left sticky image, Right scrolling text */}
      <div className="hidden gap-12 lg:gap-16 md:grid md:grid-cols-2 items-start">
        {/* Sticky Left Window */}
        <div className="sticky top-28 h-[65vh] max-h-[620px] overflow-hidden rounded-2xl border border-[#111111]/15 shadow-2xl bg-[#141414]">
          {items.map((item, index) => (
            <motion.img
              key={`${item.title}-${index}`}
              src={item.media}
              alt={item.title}
              className="absolute inset-0 h-full w-full object-cover"
              initial={{ opacity: index === 0 ? 1 : 0 }}
              animate={{
                opacity: activeIndex === index ? 1 : 0,
                willChange: "opacity",
              }}
              transition={{
                duration: 0.35,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Sticky Overlay Indicator */}
          <div className="absolute top-4 left-4 z-10 pointer-events-none">
            <span className="bg-black/80 backdrop-blur-md px-3 py-1.5 rounded text-[11px] font-mono text-[#F2B705] uppercase tracking-wider border border-white/10 shadow-sm">
              {items[activeIndex]?.code || `Space 0${activeIndex + 1}`} // 0{activeIndex + 1} OF 0{items.length}
            </span>
          </div>

          {/* Precision Solid Gold Drafting Corner Brackets */}
          <div className="absolute top-3 left-3 w-3.5 h-3.5 border-t-2 border-l-2 border-[#F2B705] pointer-events-none z-10" />
          <div className="absolute top-3 right-3 w-3.5 h-3.5 border-t-2 border-r-2 border-[#F2B705] pointer-events-none z-10" />
          <div className="absolute bottom-3 left-3 w-3.5 h-3.5 border-b-2 border-l-2 border-[#F2B705] pointer-events-none z-10" />
          <div className="absolute bottom-3 right-3 w-3.5 h-3.5 border-b-2 border-r-2 border-[#F2B705] pointer-events-none z-10" />
        </div>

        {/* Right Scrolling Articles */}
        <div className="py-[10vh]">
          <div className="space-y-[18vh]">
            {items.map((item, index) => (
              <ScrollItem
                key={`${item.title}-${index}`}
                item={item}
                index={index}
                setActive={setActiveIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Scroll01;
