import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from '@phosphor-icons/react';
import { HeroSection } from '../components/home/HeroSection';
import { BentoCollectionGrid } from '../components/home/BentoCollectionGrid';
import { FinishOptionsSection } from '../components/home/FinishOptionsSection';
import { TradeProcess } from '../components/home/TradeProcess';
import { ProductGrid } from '../components/products/ProductGrid';
import { Button, RollLabel } from '../components/common/Button';
import { Meta } from '../components/common/Meta';
import { DEMO_PRODUCTS } from '../data/products';

export const HomePage: React.FC = () => {
  const featuredProducts = DEMO_PRODUCTS.filter((product) => product.featured).slice(0, 4);

  return (
    <div className="home-page">
      <Meta
        title="SIDDI — Architectural Hardware for Trade"
        description="Architectural door hardware and bathroom fittings for architects, builders and dealers. Send a door schedule to request a product takeoff."
      />

      <div className="home-cinematic">
        <HeroSection />
        <div className="home-scroll-card">
          {/* Asymmetric Bento Collection Grid Section */}
          <BentoCollectionGrid />
    
          <section className="home-section home-featured" aria-labelledby="home-featured-title">
            <div className="home-container w-full px-4 sm:px-6 md:px-10 lg:px-16">
              <header className="home-section__header">
                <div><h2 id="home-featured-title">Featured products.</h2></div>
                <Button to="/products" variant="outline" withArrow>View all products</Button>
              </header>
              <ProductGrid products={featuredProducts} columns={4} className="home-featured__grid" />
            </div>
          </section>
    
      {/* Premium Finish Options Section */}
      <FinishOptionsSection />
        </div>
      </div>

      {/* Trade Process on main black background page after card */}
      <TradeProcess />

      {/* Door schedule takeoff CTA band on black background */}
      <section className="home-quote-band" aria-labelledby="home-quote-title">
        <div className="home-container w-full px-4 sm:px-6 md:px-10 lg:px-16 home-quote-band__inner">
          <div>
            <h2 id="home-quote-title">Have a door schedule?</h2>
          </div>
          <Link to="/trade-desk" className="home-quote-band__link roll-action">
            <RollLabel>Send it to the trade desk</RollLabel>
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
};
