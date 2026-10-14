import React, { useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Button } from '../components/common/Button';
import { ProductGallery } from '../components/products/ProductGallery';
import { RelatedProducts } from '../components/products/RelatedProducts';
import { EnquiryCTA } from '../components/common/EnquiryCTA';
import { DEMO_PRODUCTS } from '../data/products';
import { Check, FileText } from '@phosphor-icons/react';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const product = useMemo(() => {
    return DEMO_PRODUCTS.find((p) => p.slug === slug);
  }, [slug]);

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  // Related products from same category or general collection
  const relatedProducts = useMemo(() => {
    return DEMO_PRODUCTS.filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id);
  }, [product]);

  return (
    <div className="min-h-screen pt-28 md:pt-36 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: 'Products', to: '/products' },
            { label: product.category, to: `/products/${product.categorySlug}` },
            { label: product.name }
          ]}
          className="mb-8"
        />

        {/* Product Overview Layout: Gallery + Specifications */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          
          {/* Left: Gallery & Zoom */}
          <div className="lg:col-span-7">
            <ProductGallery images={product.images} productName={product.name} />

            {/* Dimension Blueprint Callout */}
            {product.dimensions && (
              <div className="mt-8 p-4 bg-white border border-[#111111]/10 flex items-center justify-between text-xs font-mono text-[#111111]">
                <span className="uppercase tracking-wider text-[#777777]">Standard Overall Dimensions:</span>
                <span className="font-semibold">{product.dimensions}</span>
              </div>
            )}
          </div>

          {/* Right: Technical Information & Order Specification */}
          <div className="lg:col-span-5 space-y-6">
            
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#F2B705]">
                  {product.series}
                </span>
                <span className="text-gray-300">&bull;</span>
                <span className="text-xs font-mono text-[#777777]">
                  {product.category}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-normal leading-tight text-[#111111] mb-4">
                {product.name}
              </h1>

              <p className="text-sm sm:text-base text-[#777777] leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Finishes */}
            <div className="p-5 bg-white border border-[#111111]/10 space-y-3">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#111111] block">
                Available Finish Configurations:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {product.finishes.map((finish) => (
                  <div key={finish.id} className="flex items-center gap-2 text-xs text-[#111111]">
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/20 shrink-0"
                      style={{ backgroundColor: finish.hex }}
                    />
                    <span>{finish.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <Button
                to={`/contact?product=${encodeURIComponent(product.name)}&series=${encodeURIComponent(product.series)}`}
                variant="secondary"
                size="lg"
                className="w-full text-center"
              >
                Inquire About This Hardware Spec
              </Button>
              <Button
                to="/resources"
                variant="outline"
                size="md"
                className="w-full text-center"
              >
                Download Technical Data Sheets
              </Button>
            </div>

            {/* Key Features List */}
            <div className="pt-4 border-t border-[#111111]/10">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-[#111111] mb-3">
                Architectural Highlights:
              </h3>
              <ul className="space-y-2">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-[#777777] leading-relaxed">
                    <Check className="w-4 h-4 text-[#F2B705] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Demonstration notice */}
            {product.isDemonstrationItem && (
              <div className="p-3 bg-white border border-dashed border-[#111111]/20 text-[11px] text-[#777777] font-mono">
                <span className="font-semibold text-black uppercase">Demo Specification:</span> Dimensions and finishes shown are illustrative of SIDDI design standards. Custom milling and finishes available upon project takeoff.
              </div>
            )}

          </div>

        </div>

        {/* Technical Specification Table */}
        <div className="mb-20 bg-white border border-[#111111]/10 p-8">
          <h2 className="text-xl font-normal text-[#111111] mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#F2B705]" />
            <span>Engineering & Dimensional Specifications</span>
          </h2>

          <div className="divide-y divide-[#111111]/10">
            {product.specifications.map((spec, index) => (
              <div key={index} className="py-3.5 grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
                <span className="md:col-span-4 uppercase tracking-wider font-semibold text-[#777777] font-mono">
                  {spec.label}
                </span>
                <span className="md:col-span-8 text-[#111111] font-medium">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products Section */}
        <RelatedProducts products={relatedProducts.length > 0 ? relatedProducts : DEMO_PRODUCTS} currentProductId={product.id} />

      </div>

      {/* Enquiry CTA */}
      <EnquiryCTA
        title={`Specify ${product.name}`}
        description="Ready to incorporate this hardware into your drawings? Contact our specification engineers for samples and door schedules."
        categoryInterest={product.name}
      />
    </div>
  );
};
