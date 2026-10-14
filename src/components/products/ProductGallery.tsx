import React, { useState } from 'react';
import { ArrowsOut, X, CaretLeft, CaretRight } from '@phosphor-icons/react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images, productName }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeImage = images[selectedIndex] || images[0];

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      {/* Main Large Display with subtle hover zoom and expand action */}
      <div className="relative aspect-[4/3] bg-white border border-[#111111]/10 overflow-hidden group">
        <img
          src={activeImage}
          alt={`${productName} view ${selectedIndex + 1}`}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-102 cursor-zoom-in"
          onClick={() => setIsModalOpen(true)}
        />

        {/* Expand trigger button */}
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="absolute bottom-4 right-4 p-2.5 bg-black/75 hover:bg-black text-white backdrop-blur-sm transition-colors rounded-none focus:outline-none focus:ring-2 focus:ring-[#F2B705]"
          title="Enlarge product photograph"
          aria-label="Enlarge image"
        >
          <ArrowsOut className="w-4 h-4 text-[#F2B705]" />
        </button>

        {images.length > 1 && (
          <div className="absolute top-4 right-4 bg-black/75 backdrop-blur-sm text-white text-[10px] uppercase font-mono px-2 py-1">
            {selectedIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnails Navigation */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={`relative w-20 h-16 shrink-0 border overflow-hidden transition-all focus:outline-none cursor-pointer ${
                selectedIndex === idx
                  ? 'border-[#111111] ring-2 ring-[#F2B705]'
                  : 'border-[#111111]/10 opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                className="w-full h-full object-cover object-center"
              />
            </button>
          ))}
        </div>
      )}

      {/* Modal / Enlarged Image Viewer */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="absolute top-6 right-6 p-2 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Close zoomed view"
          >
            <X className="w-6 h-6" />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-6 top-1/2 -translate-y-1/2 p-3 text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Previous image"
              >
                <CaretLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-3 text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Next image"
              >
                <CaretRight className="w-6 h-6" />
              </button>
            </>
          )}

          <div className="max-w-4xl max-h-[85vh] flex flex-col items-center">
            <img
              src={activeImage}
              alt={productName}
              className="max-w-full max-h-[75vh] object-contain shadow-2xl"
            />
            <div className="mt-4 text-center text-white">
              <h4 className="text-base font-semibold">{productName}</h4>
              <p className="text-xs text-gray-400 mt-1 font-mono">
                Image {selectedIndex + 1} of {images.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
