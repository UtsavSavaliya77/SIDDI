import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export const FloatingActions: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 320) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const whatsappNumber = '919820012345';
  const whatsappMessage = encodeURIComponent(
    'Hello SIDDI Architectural Hardware, I would like to inquire about your products.'
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-[9990] flex flex-col items-end gap-3 pointer-events-none">
      
      {/* 1. BACK TO TOP BUTTON (Visible upon scroll) */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.85 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="pointer-events-auto relative group"
          >
            {/* Tooltip */}
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-[6px] bg-[#111111] text-white text-[11px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-white/10 shadow-lg">
              Back to Top
            </span>

            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="w-12 h-12 flex items-center justify-center rounded-[11px] bg-[#111111] hover:bg-[#F2B705] text-white hover:text-black border border-white/15 hover:border-[#F2B705] shadow-[0_8px_20px_rgba(0,0,0,0.35)] transition-all duration-300 active:scale-95 cursor-pointer"
            >
              <ArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. FLOATING WHATSAPP BUTTON (Always accessible) */}
      <div className="pointer-events-auto relative group">
        {/* Tooltip */}
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-[6px] bg-[#111111] text-white text-[11px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-white/10 shadow-lg flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
          Chat on WhatsApp
        </span>

        {/* Pulsing ring indicator */}
        <span className="absolute inset-0 rounded-[11px] bg-[#25D366]/30 animate-ping pointer-events-none duration-1000" />

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="relative w-12 h-12 flex items-center justify-center rounded-[11px] bg-[#1c9d4b] hover:bg-[#20ba59] text-white shadow-[0_8px_24px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <svg
            className="w-7 h-7 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.761.815 2.796.815 3.181 0 5.767-2.587 5.768-5.766.001-3.182-2.585-5.771-5.768-5.801zm3.376 8.21c-.144.405-.837.774-1.17.824-.312.045-.634.074-1.928-.461-1.396-.576-2.316-1.99-2.385-2.081-.07-.091-.564-.75-.564-1.429 0-.679.355-1.014.482-1.152.126-.139.276-.174.368-.174.092 0 .184.001.264.005.085.004.199-.032.311.237.116.279.397.971.432 1.042.035.07.058.153.011.246-.046.092-.07.15-.139.231-.07.081-.148.181-.211.243-.07.07-.143.146-.062.285.082.139.362.598.777.968.534.476.984.623 1.124.692.14.07.222.059.305-.036.082-.095.352-.41.446-.551.094-.141.188-.117.316-.07.129.047.818.386.958.456.14.07.234.106.269.165.035.059.035.344-.109.749zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.662 1.434 5.177L2 22l4.981-1.396A9.94 9.94 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2c-1.637 0-3.167-.487-4.448-1.325l-.319-.21-2.962.83.842-2.887-.233-.338A8.156 8.156 0 0 1 3.8 12c0-4.521 3.679-8.2 8.2-8.2s8.2 3.679 8.2 8.2-3.679 8.2-8.2 8.2z" />
          </svg>
        </a>
      </div>

    </div>
  );
};
