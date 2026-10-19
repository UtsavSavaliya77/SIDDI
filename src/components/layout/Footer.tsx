import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CATEGORIES } from "../../data/categories";
import {
  InstagramLogo,
  LinkedinLogo,
  EnvelopeSimple,
  Check,
} from "@phosphor-icons/react";
import { ParticleText } from "../ui/ParticleText";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail("");
    }
  };

  return (
    <footer className="relative bg-[#FAF9F6] pt-2">
      {/* Dark Rounded Island Container with Architectural Drafting Corner Brackets */}
      <div className="mx-auto bg-[#111111] text-white pt-12 sm:pt-16 px-6 sm:px-10 md:px-10 border border-[#222222] shadow-2xl relative overflow-hidden">
        {/* Precision Architectural Drafting Corner Brackets (Pure Solid Gold #F2B705) */}
        <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#F2B705] pointer-events-none z-20" />
        <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#F2B705] pointer-events-none z-20" />
        <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#F2B705] pointer-events-none z-20" />
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#F2B705] pointer-events-none z-20" />

        {/* Top Navigation & Brand Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/10 relative z-10">
          {/* Brand & Newsletter Column (Top Left) */}
          <div className="lg:col-span-5 space-y-5">
            <Link
              to="/"
              className="flex items-center gap-3"
            >
              <img
                src="/siddi-logo.png"
                alt="SIDDI Architectural Hardware"
                className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-102"
              />
            </Link>

            <p className="text-xs text-gray-400 leading-relaxed max-w-sm font-light">
              Architectural door hardware, precision lever systems, and luxury
              bath fittings engineered with mechanical integrity.
            </p>

            {/* Newsletter Input + Solid Yellow/Gold Button */}
            <form
              onSubmit={handleSubscribe}
              className="flex flex-wrap items-center gap-2 max-w-sm pt-1"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="trade@architect.com"
                required
                className="bg-[#1A1A1A] border border-white/15 px-3.5 py-2.5 rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#F2B705] flex-1 transition-colors"
              />
              <button
                type="submit"
                className="bg-[#F2B705] hover:bg-[#dfa703] text-[#111111] font-semibold text-xs px-4 py-2.5 rounded-lg transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
              >
                {subscribed ? (
                  <>
                    <Check className="w-3.5 h-3.5" weight="bold" />
                    <span>Joined</span>
                  </>
                ) : (
                  <span>Join Trade Desk</span>
                )}
              </button>
            </form>

            {/* Round Social Icon Buttons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-gray-300 hover:text-[#F2B705] hover:border-[#F2B705] transition-colors"
              >
                <InstagramLogo className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-gray-300 hover:text-[#F2B705] hover:border-[#F2B705] transition-colors"
              >
                <LinkedinLogo className="w-4 h-4" />
              </a>
              <Link
                to="/contact"
                aria-label="Contact Desk"
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-gray-300 hover:text-[#F2B705] hover:border-[#F2B705] transition-colors"
              >
                <EnvelopeSimple className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Product Categories Column */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#F2B705] font-semibold">
              Product Categories
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/products/${cat.slug}`}
                    className="hover:text-[#F2B705] transition-colors"
                  >
                    {cat.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Architectural Information Column */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#F2B705] font-semibold">
              Information
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <Link
                  to="/about"
                  className="hover:text-[#F2B705] transition-colors"
                >
                  About SIDDI
                </Link>
              </li>
              <li>
                <Link
                  to="/applications"
                  className="hover:text-[#F2B705] transition-colors"
                >
                  Applications & Spaces
                </Link>
              </li>
              <li>
                <Link
                  to="/resources"
                  className="hover:text-[#F2B705] transition-colors"
                >
                  Resources & Specs
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-[#F2B705] transition-colors"
                >
                  Trade Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Support Column */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#F2B705] font-semibold">
              Company
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <Link
                  to="/contact"
                  className="hover:text-[#F2B705] transition-colors"
                >
                  Trade Inquiries
                </Link>
              </li>
              <li>
                <Link
                  to="/resources"
                  className="hover:text-[#F2B705] transition-colors"
                >
                  CAD & Master Specs
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-[#F2B705] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Interactive ParticleText Company Typography with Architectural CAD Schematics & Drafting Accents */}
        <div className="w-full pt-6 sm:pt-8 pb-4 sm:pb-6 border-t border-white/10 select-none relative overflow-hidden">
          {/* Subtle Background CAD Coordinate Grid (Pure Solid Colors) */}
          <div className="absolute inset-0 pointer-events-none opacity-30">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="footerCadGrid"
                  width="60"
                  height="60"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 60 0 L 0 0 0 60"
                    fill="none"
                    stroke="#262626"
                    strokeWidth="0.5"
                  />
                  <circle cx="0" cy="0" r="1" fill="#444444" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#footerCadGrid)" />
            </svg>
          </div>

          {/* Millimeter Drafting Ruler Ticks Along Top Border */}
          <div className="absolute top-0 left-0 right-0 h-1.5 flex justify-between overflow-hidden opacity-30 pointer-events-none px-4">
            {[...Array(30)].map((_, i) => (
              <span
                key={i}
                className={`w-[1px] bg-white ${i % 5 === 0 ? "h-2 bg-[#F2B705]" : "h-1"}`}
              />
            ))}
          </div>

          {/* Center ParticleText */}
          <div className="w-full h-[220px] sm:h-[240px] md:h-[270px] lg:h-[300px] flex items-center justify-center relative z-10">
            <ParticleText
              text="siddi hardware"
              particleSize={2.2}
              density={2}
              color="#ffffff"
              highlightColor="#F2B705"
              scatter={160}
              gatherDuration={1500}
              stagger={380}
              pointerRepel={45}
              repelRadius={130}
              idleDrift={0.4}
              trigger="mount"
              fontSize="clamp(3.8rem, 14vw, 14rem)"
              fontWeight={800}
              fontFamily="inherit"
              glow={false}
              className="w-full h-full"
            />
          </div>

          {/* Millimeter Drafting Ruler Ticks Along Bottom Border */}
          <div className="absolute bottom-0 left-0 right-0 h-1.5 flex justify-between overflow-hidden opacity-30 pointer-events-none px-4">
            {[...Array(30)].map((_, i) => (
              <span
                key={i}
                className={`w-[1px] bg-white ${i % 5 === 0 ? "h-2 bg-[#F2B705]" : "h-1"}`}
              />
            ))}
          </div>
        </div>

        {/* Sub-bar: Copyright & Assurance (Positioned after Company Big Text) */}
        <div className="pt-6 pb-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-[11px] font-mono text-gray-500 gap-3 relative z-10">
          <div>
            &copy; {new Date().getFullYear()} SIDDI Architectural Hardware. All
            rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/privacy"
              className="hover:text-gray-300 transition-colors"
            >
              Privacy Policy
            </Link>
            <span>&bull;</span>
            <Link
              to="/contact"
              className="hover:text-gray-300 transition-colors"
            >
              Trade Enquiries
            </Link>
            <span>&bull;</span>
            <span className="text-gray-400">
              Manufactured for Architectural Excellence
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
