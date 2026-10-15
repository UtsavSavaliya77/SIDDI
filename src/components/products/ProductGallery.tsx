import React, { useState } from 'react';
import { ArrowsOut, X, CaretLeft, CaretRight, ShieldCheck, Sparkle } from '@phosphor-icons/react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
  selectedFinishName?: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  productName,
  selectedFinishName,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Fallback to local hardware image if empty or invalid
  const validImages = images && images.length > 0 ? images : ['/brass-door-handle.jpg'];
  const activeImage = validImages[selectedIndex] || validImages[0];

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? validImages.length - 1 : prev - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev === validImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4 select-none">
      {/* Main Showcase Canvas */}
      <div
        className="relative aspect-[4/3] bg-white border border-[#111111]/15 overflow-hidden group cursor-zoom-in shadow-xs"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsModalOpen(true)}
      >
        {/* Main Product Image with subtle luxury zoom */}
        <img
          src={activeImage}
          alt={`${productName} photograph ${selectedIndex + 1}`}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
        />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#111111]/90 text-white text-[10px] font-mono uppercase tracking-wider backdrop-blur-sm border border-white/10">
            <ShieldCheck className="w-3.5 h-3.5 text-[#F2B705]" />
            <span>Solid Architectural Forging</span>
          </span>
          {selectedFinishName && (
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-1 bg-white/95 text-[#111111] text-[10px] font-mono uppercase tracking-wider backdrop-blur-sm border border-[#111111]/15 font-semibold">
              <Sparkle className="w-3 h-3 text-[#F2B705]" />
              <span>{selectedFinishName}</span>
            </span>
          )}
        </div>

        {/* Counter Badge */}
        <div className="absolute top-4 right-4 bg-[#111111]/80 backdrop-blur-sm text-white text-[11px] font-mono px-2.5 py-1 border border-white/10">
          {selectedIndex + 1} / {validImages.length}
        </div>

        {/* Floating Expand Icon */}
        <div className="absolute bottom-4 right-4 p-2.5 bg-[#111111]/85 hover:bg-[#111111] text-white backdrop-blur-sm transition-all duration-300 group-hover:scale-110 border border-white/15">
          <ArrowsOut className="w-4 h-4 text-[#F2B705]" />
        </div>

        {/* Prev / Next overlay arrows on hover (if multi-image) */}
        {validImages.length > 1 && isHovered && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-[#111111]/80 hover:bg-[#111111] text-white border border-white/10 transition-transform active:scale-95 cursor-pointer z-10"
              aria-label="Previous photograph"
            >
              <CaretLeft className="w-5 h-5 text-white" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-[#111111]/80 hover:bg-[#111111] text-white border border-white/10 transition-transform active:scale-95 cursor-pointer z-10"
              aria-label="Next photograph"
            >
              <CaretRight className="w-5 h-5 text-white" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Navigation Row */}
      {validImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
          {validImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={`relative w-24 h-20 shrink-0 border transition-all overflow-hidden cursor-pointer ${
                selectedIndex === idx
                  ? 'border-[#111111] ring-2 ring-[#F2B705] shadow-sm opacity-100'
                  : 'border-[#111111]/20 opacity-60 hover:opacity-100 hover:border-[#111111]'
              }`}
            >
              <img
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                className="w-full h-full object-cover object-center"
              />
              {selectedIndex === idx && (
                <div className="absolute inset-0 border-2 border-[#111111] pointer-events-none" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#111111]/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-in fade-in-0 duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="absolute top-6 right-6 p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 transition-colors cursor-pointer z-50"
            aria-label="Close zoomed view"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous / Next buttons */}
          {validImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-6 top-1/2 -translate-y-1/2 p-3 text-white bg-white/10 hover:bg-white/25 border border-white/20 transition-all cursor-pointer z-50"
                aria-label="Previous photograph"
              >
                <CaretLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-3 text-white bg-white/10 hover:bg-white/25 border border-white/20 transition-all cursor-pointer z-50"
                aria-label="Next photograph"
              >
                <CaretRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Modal Content */}
          <div
            className="max-w-5xl max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeImage}
              alt={productName}
              className="max-w-full max-h-[75vh] object-contain shadow-2xl border border-white/15"
            />
            <div className="mt-4 text-center text-white">
              <h4 className="text-base font-medium">{productName}</h4>
              <p className="text-xs text-gray-400 mt-1 font-mono uppercase tracking-wider">
                High-Resolution Specification View • {selectedIndex + 1} of {validImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
