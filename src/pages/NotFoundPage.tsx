import React from 'react';
import { Link } from 'react-router-dom';
import { Meta } from '../components/common/Meta';

export const NotFoundPage: React.FC = () => {
  return (
    <>
      <Meta
        title="404 — Specification Not Found | SIDDI"
        description="The requested hardware specification or page does not exist. Browse the SIDDI architectural catalogue."
      />
      <div className="not-found min-h-[70vh] w-full bg-[#F4F3EF] text-[#171719] flex flex-col items-center justify-center py-16 sm:py-24">
        <div className="spec-container flex justify-center">
          <div className="w-full max-w-lg border border-[#D7D6D0] p-6 sm:p-12 bg-white">
            <div className="mono-label text-[#F2B418] mb-3">
              Error 404 // File Not Found
            </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#171719] mb-4">
            Specification not found.
          </h1>
          <p className="text-sm text-[#66666D] leading-relaxed mb-8">
            The requested drawing, product URL or schedule reference is not in the system. Check the catalogue index or return to the trade desk.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-4 border-t border-[#D7D6D0]">
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-4 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#F2B418] text-[#171719] rounded-[6px] hover:bg-[#FFC83A] transition-colors"
            >
              Browse catalogue
            </Link>
            <Link
              to="/trade-desk"
              className="inline-flex items-center justify-center px-4 py-2.5 text-xs font-semibold uppercase tracking-wider border border-[#D7D6D0] text-[#171719] rounded-[6px] hover:border-[#F2B418] transition-colors"
            >
              Contact trade desk
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
