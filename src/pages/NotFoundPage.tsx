import React from 'react';
import { Button } from '../components/common/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#FAF9F6] flex items-center justify-center">
      <div className="max-w-xl mx-auto px-6 text-center space-y-6">
        
        <div className="text-8xl font-mono font-semibold text-[#111111]/15 tracking-widest">
          404
        </div>

        <div className="inline-flex items-center gap-3">
          <span className="w-6 h-[1.5px] bg-[#F2B705]" />
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#F2B705]">
            Hardware Specification Not Found
          </span>
          <span className="w-6 h-[1.5px] bg-[#F2B705]" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-normal text-[#111111]">
          The Requested Page or Catalogue Link Does Not Exist
        </h1>

        <p className="text-sm text-[#777777] leading-relaxed max-w-md mx-auto">
          The architectural hardware catalogue item or resource URL may have moved, been updated, or had its reference modified.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button to="/" variant="primary" size="md" withArrow>
            Return to Homepage
          </Button>
          <Button to="/products" variant="outline" size="md">
            Browse All Products
          </Button>
        </div>

      </div>
    </div>
  );
};
