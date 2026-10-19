"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MagnifyingGlassPlus,
  X,
} from "@phosphor-icons/react";
import { TextReveal } from "../common/ScrollReveal";

interface Certificate {
  id: string;
  name: string;
  authority: string;
  standardCode: string;
  image: string;
}

const CERTIFICATES: Certificate[] = [
  {
    id: "en-1906",
    name: "EN 1906:2012 Grade 4 Commercial Durability",
    authority: "IFT Rosenheim • Germany",
    standardCode: "DIN 18251 / EN 1906:2012",
    image: "/certificate-en1906.svg",
  },
  {
    id: "fire-fd120",
    name: "EN 1634-1 / BS 476 FD120 Fire Door Integrity",
    authority: "Warringtonfire • United Kingdom",
    standardCode: "BS 476 Part 22 / EN 1634-1",
    image: "/certificate-fire-fd120.svg",
  },
  {
    id: "salt-spray",
    name: "ASTM B117 / ISO 9227 500-Hour Corrosion Resistance",
    authority: "Bureau Veritas • France",
    standardCode: "ASTM B117 / ISO 9227 NSS",
    image: "/certificate-salt-spray.svg",
  },
  {
    id: "iso-rohs",
    name: "ISO 9001 & EU RoHS Virgin Alloy Certification",
    authority: "TÜV SÜD • Germany",
    standardCode: "ISO 9001:2015 / RoHS Directive",
    image: "/certificate-iso-rohs.svg",
  },
];

export function OfficialCertificatesVault() {
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveCert(null);
      }
    };
    if (activeCert) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [activeCert]);

  return (
    <section className="relative w-full my-20">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <span className="inline-block px-3.5 py-1 rounded-full bg-[#B8871B]/10 border border-[#B8871B]/30 text-[#9A6E0E] dark:text-[#F2B705] text-[11px] font-mono uppercase tracking-[0.2em] font-semibold">
          Accreditations & Compliance
        </span>
        <TextReveal
          as="h2"
          text="Official Certificates"
          className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#111111] tracking-tight"
        />
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-light">
          Independently certified and tested by accredited international laboratory institutes.
        </p>
      </div>

      {/* Grid: Certificate Image + Certificate Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {CERTIFICATES.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 'some', margin: '0px 0px 60px 0px' }}
            transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="group flex flex-col cursor-pointer"
            onClick={() => setActiveCert(cert)}
          >
            {/* Certificate Image Frame */}
            <div className="relative aspect-[1/1.414] w-full rounded-2xl overflow-hidden bg-[#FDFBF7] dark:bg-[#181920] border border-neutral-200 dark:border-white/10 group-hover:border-[#B8871B] dark:group-hover:border-[#F2B705] transition-all duration-500 shadow-md group-hover:shadow-[0_12px_32px_rgba(184,135,27,0.18)]">
              {/* Actual Certificate Document Image */}
              <img
                src={cert.image}
                alt={cert.name}
                loading="lazy"
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Gentle Glass Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900/90 text-white backdrop-blur-md border border-[#B8871B]/50 text-xs font-mono tracking-wider shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <MagnifyingGlassPlus className="w-4 h-4 text-[#F2B705]" />
                  <span>Click to Inspect</span>
                </div>
              </div>

            </div>

            {/* Certificate Name & Authority */}
            <div className="mt-4 space-y-1 text-center sm:text-left">
              <span className="block text-[11px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-medium">
                {cert.authority}
              </span>
              <h3 className="text-sm sm:text-base font-serif font-bold text-neutral-900 dark:text-[#111111] group-hover:text-[#B8871B] dark:group-hover:text-[#F2B705] transition-colors leading-snug">
                {cert.name}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox / Zoom Modal on Click (without download option) */}
      <AnimatePresence>
        {activeCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCert(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative z-10 max-w-2xl w-full max-h-[90vh] flex flex-col bg-[#0e0f14] border border-white/20 rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Header */}
              <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between gap-4">
                <div className="truncate">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#F2B705] block font-semibold">
                    {activeCert.authority}
                  </span>
                  <h4 className="text-sm sm:text-base font-serif font-bold text-white truncate">
                    {activeCert.name}
                  </h4>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setActiveCert(null)}
                    className="p-2.5 rounded-[11px] bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                    title="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Certificate Image View */}
              <div className="flex-1 overflow-auto p-4 sm:p-6 flex items-center justify-center bg-[#07080a]">
                <img
                  src={activeCert.image}
                  alt={activeCert.name}
                  className="max-h-[72vh] w-auto rounded-lg shadow-2xl object-contain border border-white/10"
                />
              </div>

              {/* Modal Footer */}
              <div className="p-3.5 sm:p-4 border-t border-white/10 bg-[#121319] flex items-center justify-between text-xs font-mono text-gray-400">
                <span className="text-[11px] truncate">{activeCert.standardCode}</span>
                
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default OfficialCertificatesVault;
