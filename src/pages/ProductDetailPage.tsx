import React, { useMemo, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ProductGallery } from '../components/products/ProductGallery';
import { RelatedProducts } from '../components/products/RelatedProducts';
import { EnquiryCTA } from '../components/common/EnquiryCTA';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { DEMO_PRODUCTS } from '../data/products';
import type { ProductFinish } from '../types';
import {
  Check,
  FileText,
  Download,
  Ruler,
  ShieldCheck,
  Box,
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const product = useMemo(() => {
    return DEMO_PRODUCTS.find((p) => p.slug === slug);
  }, [slug]);

  // State for interactive finish selection
  const [selectedFinish, setSelectedFinish] = useState<ProductFinish>(() => {
    return product?.finishes[0] || { id: 'matte-black', name: 'Matte Black', hex: '#1E1E1E' };
  });

  // State for active tab in technical dossier (3 tabs)
  const [activeTab, setActiveTab] = useState<'specs' | 'installation' | 'takeoff'>('specs');

  // Related products from same category or general collection
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return DEMO_PRODUCTS.filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id);
  }, [product]);

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  return (
    <div className="min-h-screen pt-28 md:pt-36 bg-[#FAF9F6] text-[#111111]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pb-24">
        
        {/* Top Breadcrumb & Quick Reference Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-[#111111]/10">
          <Breadcrumbs
            items={[
              { label: 'Products', to: '/products' },
              { label: product.category, to: `/products/${product.categorySlug}` },
              { label: product.name }
            ]}
          />

          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-[#777777]">SKU:</span>
            <span className="font-semibold text-[#111111] bg-white border border-[#111111]/15 px-2 py-0.5">
              {product.id.toUpperCase()}
            </span>
            <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 font-sans font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              <span>Specification Ready</span>
            </span>
          </div>
        </div>

        {/* Product Overview Layout: Gallery (Left) + Technical Specifications (Right) */}
        <ScrollReveal className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start mb-20">
          
          {/* Left Column: Premium Gallery & Blueprint Dimension Card */}
          <div className="lg:col-span-7 space-y-6">
            <ProductGallery
              images={product.images}
              productName={product.name}
              selectedFinishName={selectedFinish?.name}
            />

            {/* Architectural Blueprint & Dimensions Card */}
            <div className="bg-white border border-[#111111]/15 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#111111]/10">
                <div className="flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-[#F2B705]" />
                  <span className="text-xs font-bold uppercase tracking-widest font-mono text-[#111111]">
                    Architectural Dimensional Profile
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#777777] uppercase">
                  Scale 1:1 Engineering
                </span>
              </div>

              {/* Dimension Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-[#FAF9F6] border border-[#111111]/10">
                  <span className="block text-[10px] font-mono uppercase tracking-wider text-[#777777] mb-1">
                    Overall Length
                  </span>
                  <span className="text-sm font-semibold text-[#111111] font-mono">
                    {product.specifications.find((s) => s.label.toLowerCase().includes('length'))?.value || '138mm'}
                  </span>
                </div>
                <div className="p-3 bg-[#FAF9F6] border border-[#111111]/10">
                  <span className="block text-[10px] font-mono uppercase tracking-wider text-[#777777] mb-1">
                    Projection
                  </span>
                  <span className="text-sm font-semibold text-[#111111] font-mono">
                    {product.dimensions?.split('×')[1]?.trim() || '60mm'}
                  </span>
                </div>
                <div className="p-3 bg-[#FAF9F6] border border-[#111111]/10">
                  <span className="block text-[10px] font-mono uppercase tracking-wider text-[#777777] mb-1">
                    Rose Diameter
                  </span>
                  <span className="text-sm font-semibold text-[#111111] font-mono">
                    {product.specifications.find((s) => s.label.toLowerCase().includes('rose'))?.value?.split('×')[0] || '52mm'}
                  </span>
                </div>
                <div className="p-3 bg-[#FAF9F6] border border-[#111111]/10">
                  <span className="block text-[10px] font-mono uppercase tracking-wider text-[#777777] mb-1">
                    Spindle Size
                  </span>
                  <span className="text-sm font-semibold text-[#111111] font-mono">
                    {product.specifications.find((s) => s.label.toLowerCase().includes('spindle'))?.value?.split(' ')[0] || '8mm Steel'}
                  </span>
                </div>
              </div>

              {/* Subtext info */}
              <div className="text-xs text-[#777777] flex items-center justify-between pt-1">
                <span className="font-mono text-[11px]">
                  Standard Door Leaf: 38mm to 54mm thick (Extended spindles available)
                </span>
                <Link
                  to="/resources"
                  className="text-xs font-semibold uppercase tracking-wider text-[#111111] hover:text-[#F2B705] transition-colors inline-flex items-center gap-1"
                >
                  <span>CAD Template</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Interactive Finish Selector, Specs & CTAs */}
          <div className="lg:col-span-5 space-y-7">
            
            {/* Header / Series / Title */}
            <div>
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="inline-block px-2.5 py-1 bg-[#111111] text-[#F2B705] text-[10px] font-mono uppercase tracking-[0.2em] font-semibold">
                  {product.series}
                </span>
                <span className="text-[#777777] text-xs font-mono">&bull;</span>
                <span className="text-xs uppercase tracking-wider font-semibold text-[#777777]">
                  {product.category}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-4xl font-serif font-normal text-[#111111] tracking-tight leading-tight mb-4">
                {product.name}
              </h1>

              <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Interactive Finish Configuration Selector */}
            <div className="bg-white border border-[#111111]/15 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-[#777777]">
                  Selected Finish:
                </span>
                <span className="text-xs font-bold text-[#111111] flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full border border-black/30 shadow-xs"
                    style={{ backgroundColor: selectedFinish.hex }}
                  />
                  <span>{selectedFinish.name}</span>
                </span>
              </div>

              {/* Clickable Swatches Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                {product.finishes.map((finish) => {
                  const isSelected = selectedFinish.id === finish.id;
                  return (
                    <button
                      key={finish.id}
                      type="button"
                      onClick={() => setSelectedFinish(finish)}
                      className={`flex items-center justify-between p-3 border transition-all text-left cursor-pointer ${
                        isSelected
                          ? 'border-[#111111] bg-[#111111] text-white shadow-xs'
                          : 'border-[#111111]/15 bg-[#FAF9F6] text-[#333333] hover:border-[#111111]/50 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-1">
                        <span
                          className={`w-4 h-4 rounded-full border shrink-0 ${
                            isSelected ? 'border-white ring-1 ring-white/50' : 'border-black/30'
                          }`}
                          style={{ backgroundColor: finish.hex }}
                        />
                        <span className="text-xs font-medium truncate">{finish.name}</span>
                      </div>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-[#F2B705] shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 text-[11px] text-[#777777] flex items-center gap-1.5 border-t border-[#111111]/10">
                <Sparkles className="w-3.5 h-3.5 text-[#F2B705] shrink-0" />
                <span>Multi-layer PVD finish treatment ensures scratch & corrosion resistance.</span>
              </div>
            </div>

            {/* Primary & Secondary Action CTAs */}
            <div className="space-y-3 pt-1">
              <Link
                to={`/contact?product=${encodeURIComponent(product.name)}&series=${encodeURIComponent(
                  product.series
                )}&finish=${encodeURIComponent(selectedFinish.name)}`}
                className="w-full py-4 px-6 bg-[#111111] hover:bg-[#F2B705] text-white hover:text-[#111111] transition-all text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-3 shadow-md cursor-pointer group"
              >
                <span>Inquire About Hardware Specification</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Architectural Highlights List */}
            <div className="p-5 bg-white border border-[#111111]/15 space-y-3">
              <h3 className="text-xs uppercase tracking-widest font-bold text-[#111111] font-mono flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#F2B705]" />
                <span>Architectural Highlights & Engineering</span>
              </h3>
              <ul className="space-y-2.5">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-[#555555] leading-relaxed">
                    <span className="w-4 h-4 rounded-full bg-[#111111] text-[#F2B705] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Notice banner for specification items */}
            {product.isDemonstrationItem && (
              <div className="p-4 bg-[#FAF9F6] border border-[#111111]/15 border-l-3 border-l-[#F2B705] text-xs text-[#555555] flex items-start gap-3">
                <Info className="w-4 h-4 text-[#F2B705] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <span className="font-semibold text-[#111111]">Architectural Takeoffs:</span> Custom spindle lengths, master-keyed cylinders, and project-specific PVD finish matching are available for multi-residential and commercial schemes.
                </p>
              </div>
            )}

          </div>

        </ScrollReveal>

        {/* Tabbed Technical Dossier Section */}
        <ScrollReveal className="mb-20 bg-white border border-[#111111]/15 shadow-xs overflow-hidden">
          
          {/* Tab Navigation: Desktop Horizontal Tabs + Mobile 3-Column Equal Grid */}
          <div className="border-b border-[#111111]/15 bg-[#FAF9F6] grid grid-cols-3 md:flex md:items-center">
            <button
              type="button"
              onClick={() => setActiveTab('specs')}
              className={`py-3.5 px-2 sm:px-4 md:px-6 md:py-4 text-xs font-mono uppercase tracking-wider font-semibold transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-center md:justify-start gap-1 sm:gap-2 text-center md:text-left border-b-2 ${
                activeTab === 'specs'
                  ? 'border-[#111111] bg-white text-[#111111]'
                  : 'border-transparent text-[#777777] hover:text-[#111111] hover:bg-white/60'
              }`}
            >
              <FileText className="w-4 h-4 text-[#F2B705] shrink-0" />
              <span className="hidden md:inline">Engineering &amp; Dimensional Specs</span>
              <span className="hidden sm:inline md:hidden">Engineering Specs</span>
              <span className="sm:hidden text-[11px] leading-tight">Specs</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('installation')}
              className={`py-3.5 px-2 sm:px-4 md:px-6 md:py-4 text-xs font-mono uppercase tracking-wider font-semibold transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-center md:justify-start gap-1 sm:gap-2 text-center md:text-left border-b-2 ${
                activeTab === 'installation'
                  ? 'border-[#111111] bg-white text-[#111111]'
                  : 'border-transparent text-[#777777] hover:text-[#111111] hover:bg-white/60'
              }`}
            >
              <Box className="w-4 h-4 text-[#F2B705] shrink-0" />
              <span className="hidden md:inline">Box Contents &amp; Installation</span>
              <span className="hidden sm:inline md:hidden">Box Contents</span>
              <span className="sm:hidden text-[11px] leading-tight">Inclusions</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('takeoff')}
              className={`py-3.5 px-2 sm:px-4 md:px-6 md:py-4 text-xs font-mono uppercase tracking-wider font-semibold transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-center md:justify-start gap-1 sm:gap-2 text-center md:text-left border-b-2 ${
                activeTab === 'takeoff'
                  ? 'border-[#111111] bg-white text-[#111111]'
                  : 'border-transparent text-[#777777] hover:text-[#111111] hover:bg-white/60'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-[#F2B705] shrink-0" />
              <span className="hidden md:inline">Specification &amp; Warranty</span>
              <span className="hidden sm:inline md:hidden">Warranty &amp; Takeoff</span>
              <span className="sm:hidden text-[11px] leading-tight">Warranty</span>
            </button>
          </div>

          {/* Tab 1: Engineering Specifications Matrix */}
          {activeTab === 'specs' && (
            <div className="p-5 sm:p-7 md:p-8 space-y-6">
              {/* Header inside Tab */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#111111]/10">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F2B705]" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#F2B705] font-semibold">
                      Engineering Dossier
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-normal text-[#111111]">
                    Complete Engineering Matrix
                  </h3>
                  <p className="text-xs text-[#777777] font-mono mt-0.5">
                    Model: {product.name} ({product.id.toUpperCase()})
                  </p>
                </div>

                <Link
                  to="/resources"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#111111] hover:text-[#F2B705] transition-colors self-start sm:self-auto bg-[#FAF9F6] border border-[#111111]/15 px-3 py-2"
                >
                  <Download className="w-3.5 h-3.5 text-[#F2B705]" />
                  <span>Download Spec Sheet (PDF)</span>
                </Link>
              </div>

              {/* Architectural Spec Cards Grid (Mobile 1-2 Col, Desktop 3-4 Col) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {product.specifications.map((spec, i) => (
                  <div
                    key={i}
                    className="p-4 bg-[#FAF9F6] border border-[#111111]/12 hover:border-[#111111] transition-all flex flex-col justify-between group"
                  >
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#777777] mb-2 flex items-center justify-between">
                      <span className="truncate pr-1">{spec.label}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#111111]/20 group-hover:bg-[#F2B705] transition-colors shrink-0" />
                    </div>
                    <div className="text-sm font-bold text-[#111111] font-mono leading-tight">
                      {spec.value}
                    </div>
                  </div>
                ))}

                {product.dimensions && (
                  <div className="p-4 bg-[#FAF9F6] border border-[#111111]/12 hover:border-[#111111] transition-all flex flex-col justify-between group">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#777777] mb-2 flex items-center justify-between">
                      <span>Overall Dimensions</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#111111]/20 group-hover:bg-[#F2B705] transition-colors shrink-0" />
                    </div>
                    <div className="text-sm font-bold text-[#111111] font-mono leading-tight">
                      {product.dimensions}
                    </div>
                  </div>
                )}

                <div className="p-4 bg-[#FAF9F6] border border-[#111111]/12 hover:border-[#111111] transition-all flex flex-col justify-between group">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#777777] mb-2 flex items-center justify-between">
                    <span>Handing Orientation</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#111111]/20 group-hover:bg-[#F2B705] transition-colors shrink-0" />
                  </div>
                  <div className="text-sm font-bold text-[#111111] font-mono leading-tight">
                    Universal Reversible (L/R)
                  </div>
                </div>

                <div className="p-4 bg-[#FAF9F6] border border-[#111111]/12 hover:border-[#111111] transition-all flex flex-col justify-between group">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#777777] mb-2 flex items-center justify-between">
                    <span>Finish Treatment</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#111111]/20 group-hover:bg-[#F2B705] transition-colors shrink-0" />
                  </div>
                  <div className="text-sm font-bold text-[#111111] font-mono leading-tight">
                    Multi-Layer Vacuum PVD
                  </div>
                </div>
              </div>

              {/* Key Parameters Blueprint Banner */}
              <div className="mt-4 p-4 bg-white border border-[#111111]/15 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono divide-y sm:divide-y-0 sm:divide-x divide-[#111111]/10">
                <div className="flex items-center gap-2.5 pt-2 sm:pt-0 sm:pr-3">
                  <Check className="w-4 h-4 text-[#F2B705] shrink-0" />
                  <div>
                    <span className="block text-[10px] text-[#777777] uppercase">Handing Orientation</span>
                    <span className="font-semibold text-[#111111]">Universal Reversible (Left / Right)</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 pt-2 sm:pt-0 sm:px-3">
                  <Check className="w-4 h-4 text-[#F2B705] shrink-0" />
                  <div>
                    <span className="block text-[10px] text-[#777777] uppercase">Door Compatibility</span>
                    <span className="font-semibold text-[#111111]">38mm to 54mm Standard Leaves</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 pt-2 sm:pt-0 sm:pl-3">
                  <Check className="w-4 h-4 text-[#F2B705] shrink-0" />
                  <div>
                    <span className="block text-[10px] text-[#777777] uppercase">Mortise Standards</span>
                    <span className="font-semibold text-[#111111]">DIN 85mm & Euro Latches</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Box Contents & Installation */}
          {activeTab === 'installation' && (
            <div className="p-5 sm:p-7 md:p-8 space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-serif font-normal text-[#111111]">
                  What's Included in the Box
                </h3>
                <p className="text-xs text-[#777777] font-mono mt-0.5">
                  Supplied complete with full commercial installation fixing kit
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 sm:p-5 bg-[#FAF9F6] border border-[#111111]/15 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#111111] font-mono block border-b border-[#111111]/10 pb-2">
                    Core Architectural Components:
                  </span>
                  <ul className="text-xs text-[#555555] space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#F2B705] shrink-0" />
                      <span>1× Pair of Ergonomic Operating Lever Handles</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#F2B705] shrink-0" />
                      <span>2× Low-Profile 5mm Bayonet Concealed Rosettes</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#F2B705] shrink-0" />
                      <span>1× 8mm Solid Steel Square Spindle (110mm standard)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#F2B705] shrink-0" />
                      <span>1× 1:1 Scale Paper Door Boring & Drill Guide Template</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 sm:p-5 bg-[#FAF9F6] border border-[#111111]/15 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#111111] font-mono block border-b border-[#111111]/10 pb-2">
                    Fixings & Fasteners Included:
                  </span>
                  <ul className="text-xs text-[#555555] space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#F2B705] shrink-0" />
                      <span>2× M4 Stainless Steel Through-Bolts & Sleeve Nuts</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#F2B705] shrink-0" />
                      <span>8× High-Tensile Matching Cross-Recess Wood Screws</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#F2B705] shrink-0" />
                      <span>2× High-Grade Grub Screws for Spindle Clamping</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#F2B705] shrink-0" />
                      <span>1× Precision Hex Allen Key for Rapid Installation</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Specification & Warranty */}
          {activeTab === 'takeoff' && (
            <div className="p-5 sm:p-7 md:p-8 space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-serif font-normal text-[#111111]">
                  Specification Takeoff & Warranty Assurance
                </h3>
                <p className="text-xs text-[#777777] leading-relaxed mt-1 max-w-2xl">
                  SIDDI provides complete door-by-door hardware schedule scheduling, keying master charts, and finish boards for architects, interior designers, and main contractors.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="p-4 bg-[#FAF9F6] border border-[#111111]/15">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#111111] font-mono block mb-1">
                    10-Year Mechanical
                  </span>
                  <p className="text-xs text-[#666666] leading-relaxed">
                    Covers internal dual torsion return springs and bearing mechanics against defects.
                  </p>
                </div>

                <div className="p-4 bg-[#FAF9F6] border border-[#111111]/15">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#111111] font-mono block mb-1">
                    5-Year PVD Finish
                  </span>
                  <p className="text-xs text-[#666666] leading-relaxed">
                    Guarantees against peeling, flaking, or discoloration under normal interior conditions.
                  </p>
                </div>

                <div className="p-4 bg-[#FAF9F6] border border-[#111111]/15">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#111111] font-mono block mb-1">
                    Takeoff Support
                  </span>
                  <p className="text-xs text-[#666666] leading-relaxed">
                    Send your architectural floor plans and door schedule for rapid itemized quotation.
                  </p>
                </div>
              </div>
            </div>
          )}

        </ScrollReveal>

        {/* Related Complementary Hardware Section */}
        <ScrollReveal>
          <RelatedProducts
            products={relatedProducts.length > 0 ? relatedProducts : DEMO_PRODUCTS}
            currentProductId={product.id}
          />
        </ScrollReveal>

      </div>

      {/* Enquiry Consultation CTA */}
      <EnquiryCTA
        title={`Specify ${product.name} for Your Scheme`}
        description="Ready to incorporate this hardware into your door schedules? Connect with our architectural specification team for samples, CAD files, and schedule takeoffs."
        categoryInterest={product.name}
      />
    </div>
  );
};
