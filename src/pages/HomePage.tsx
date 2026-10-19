import React from 'react';
import { Link } from 'react-router-dom';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { HeroAutoExpand } from '../components/common/HeroAutoExpand';
import { CategoryCarousel } from '../components/home/CategoryCarousel';
import { ProductGrid } from '../components/products/ProductGrid';
import { FinishesShowcase } from '../components/home/FinishesShowcase';
import { EnquiryCTA } from '../components/common/EnquiryCTA';
import { DEMO_PRODUCTS, APPLICATION_AREAS } from '../data/products';
import { ElegantCarousel, type SlideData } from '../components/ui/elegant-carousel';
import { EditorialPillars } from '../components/home/EditorialPillars';
import { ScrollReveal } from '../components/common/ScrollReveal';

export const HomePage: React.FC = () => {
  const featuredProducts = DEMO_PRODUCTS.filter((p) => p.featured).slice(0, 6);

  const environmentSlides: SlideData[] = APPLICATION_AREAS.map((area) => {
    const accents: Record<string, string> = {
      'residential-bathrooms': '#F2B705',
      'master-suites-doors': '#C4956A',
      'hospitality-hotels': '#D4AF37',
      'commercial-interiors': '#8BA7B8',
      'bespoke-renovations': '#A8A9AD',
    };
    const conciseDescriptions: Record<string, string> = {
      'residential-bathrooms':
        'High-humidity environments demand pure metallurgy. Solid forged brass and multi-layer PVD plating ensure spotless performance and zero corrosion.',
      'master-suites-doors':
        'Internal doors are primary tactile transition points. SIDDI lever handles and magnetic latches eliminate harsh clicks for whisper-quiet transitions.',
      'hospitality-hotels':
        'Combining architectural purity with extreme longevity. Cycle-tested across hundreds of thousands of actuations to exceed luxury contract standards.',
      'commercial-interiors':
        'Hardware communicating intentionality. Oversized entrance pulls, heavy-duty floor pivots, and minimalist fittings tailored for executive suites.',
      'bespoke-renovations':
        'Unifying finishes across bespoke joinery. Coordinated metallic palettes across door levers, cabinet hardware, and bathroom accessories.',
    };
    return {
      title: area.title,
      subtitle: area.subtitle,
      description: conciseDescriptions[area.id] || area.description,
      accent: accents[area.id] || '#F2B705',
      imageUrl: area.image,
    };
  });

  return (
    <div className="min-h-screen">
            {/* HERO SECTION - Auto Zoom Full-Screen Animation on Site Load */}
      <HeroAutoExpand
        src="https://images.unsplash.com/photo-1595844730298-b960ff98fee0?auto=format&fit=crop&w=2400&q=85"
        alt="SIDDI Architectural Hardware Masterpiece"
      />

      {/* 2. BRAND INTRODUCTION - Authentic Editorial Layout */}
      <ScrollReveal as="section" className="py-20 md:py-32 bg-[#FAF9F6] border-b border-[#111111]/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative mx-auto max-w-md lg:max-w-none py-6 px-3 group select-none">
                
                {/* Asymmetric Golden Pebble Wireframe Offset Behind */}
                <div className="organic-pebble-wireframe absolute inset-0 translate-x-3 translate-y-3 pointer-events-none" />

                {/* Main Organic Fluid Pebble Curve Image Container */}
                <div className="organic-pebble-frame relative aspect-4/5 sm:aspect-square lg:aspect-4/5 shadow-2xl border border-[#111111]/15 bg-[#111111]">
                  <img
                    src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1400&q=85"
                    alt="SIDDI Architectural Bathroom Hardware"
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-108"
                  />
                  {/* Subtle inner dark vignette overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-6 h-[1.5px] bg-[#F2B705]" />
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#F2B705]">
                  The SIDDI Hardware Philosophy
                </span>
              </div>

              <h2 className="text-3xl md:text-5xl font-normal leading-tight text-[#111111]">
                Hardware is the first tactile touchpoint of every interior space.
              </h2>

              <p className="text-base md:text-lg text-[#777777] leading-relaxed">
                Before you observe the proportions of a room or experience the daylight streaming through a window, your hand touches the hardware. At SIDDI, we design and produce architectural hardware and bathroom accessories that make this micro-interaction feel deliberate, weighted, and effortless.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="p-5 bg-white border border-[#111111]/10">
                  <h4 className="text-sm font-semibold text-[#111111] uppercase tracking-wider mb-2">
                    Architectural Proportions
                  </h4>
                  <p className="text-xs text-[#777777] leading-relaxed">
                    Every bevel angle, rosette thickness, and tube diameter is proportioned to align with contemporary interior millwork.
                  </p>
                </div>
                <div className="p-5 bg-white border border-[#111111]/10">
                  <h4 className="text-sm font-semibold text-[#111111] uppercase tracking-wider mb-2">
                    Coordinated Finishes
                  </h4>
                  <p className="text-xs text-[#777777] leading-relaxed">
                    Achieve uniform metallic harmony across door handles, towel rails, hooks, and cabinet accessories.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Button to="/about" variant="outline" size="md" withArrow>
                  Read Our Full Story
                </Button>
              </div>

            </div>

          </div>
        </div>
      </ScrollReveal>

      {/* 3. PRODUCT CATEGORY SHOWCASE - 3D Tilt Parallax Carousel */}
      <ScrollReveal as="section" className="py-20 md:py-32 bg-[#FAF9F6] border-b border-[#111111]/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <CategoryCarousel />
        </div>
      </ScrollReveal>

      {/* 4. FEATURED PRODUCTS SECTION */}
      <ScrollReveal as="section" className="py-20 md:py-32 bg-[#FAF9F6] border-y border-[#111111]/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-14">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-6 h-[1.5px] bg-[#F2B705]" />
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#F2B705]">
                  Representative Portfolio
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-normal text-[#111111]">
                Featured Hardware Specifications
              </h2>
            </div>

            <Button to="/products" variant="outline" size="sm" withArrow className="mt-4 md:mt-0">
              View All Catalogue Items
            </Button>
          </div>

          <ProductGrid products={featuredProducts} columns={3} />

        </div>
      </ScrollReveal>

      {/* 5. MATERIALS & FINISHES - Architectural Swatches */}
      <ScrollReveal as="section" className="py-20 md:py-32 bg-[#0D0D0D] text-white relative overflow-hidden border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          <SectionHeading
            align="split"
            theme="dark"
            eyebrow="Metallurgy & Surface Finishes"
            title="Unified Metallic Tones Across Every Fitting"
            description="Eliminate the common frustration of mismatched hardware. SIDDI offers a coordinated palette of durable surface treatments calibrated across levers, hinges, towel rails, and accessories."
          />

          <FinishesShowcase />

          <div className="mt-12 p-6 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
            <div>
              <span className="text-[#F2B705] font-semibold">Note on Finishes:</span> Swatches are illustrative digital representations. Physical sample finish blocks are available for registered architectural practices.
            </div>
            <Link to="/contact?interest=Finish%20Samples" className="text-white hover:text-[#F2B705] underline whitespace-nowrap">
              Request Finish Sample Box &rarr;
            </Link>
          </div>

        </div>
      </ScrollReveal>

      {/* 6. APPLICATIONS PREVIEW */}
      <ScrollReveal as="section" className="py-20 md:py-32 bg-[#FAF9F6] border-y border-[#111111]/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-14">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-6 h-[1.5px] bg-[#F2B705]" />
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#F2B705]">
                  Architectural Environments
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-normal text-[#111111]">
                Engineered for Diverse Spatial Contexts
              </h2>
              <p className="text-base sm:text-lg text-[#777777] max-w-2xl leading-relaxed mt-4 font-light">
                From master bathroom ensuites to five-star hotel corridors and private corporate suites, explore how SIDDI hardware elevates every project.
              </p>
            </div>

            <Button to="/applications" variant="outline" size="sm" withArrow className="self-start md:self-auto shrink-0">
              Explore All Environments
            </Button>
          </div>

          {/* Elegant Carousel Showcase */}
          <ElegantCarousel slides={environmentSlides} />

        </div>
      </ScrollReveal>

      {/* 7. BRAND DIFFERENTIATORS - Architectural Pillars */}
      <ScrollReveal as="section" className="py-20 md:py-28 bg-[#FAF9F6] border-y border-[#111111]/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <SectionHeading
            align="center"
            eyebrow="The SIDDI Standard"
            title="Editorial Design Pillars"
            description="Our core commitments to architects, builders, and interior designers."
          />

          <EditorialPillars />

        </div>
      </ScrollReveal>

      {/* 8. ENQUIRY SECTION */}
      <EnquiryCTA />

    </div>
  );
};
