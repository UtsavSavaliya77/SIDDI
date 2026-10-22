import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from '@phosphor-icons/react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { EnquiryCTA } from '../components/common/EnquiryCTA';
import { Meta } from '../components/common/Meta';
import { RollLabel } from '../components/common/Button';

const Section: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className = '' }) => (
  <section className={`w-full px-4 sm:px-6 md:px-10 lg:px-16 ${className}`}>{children}</section>
);

export const AboutPage: React.FC = () => (
  <main className="about-page min-h-screen bg-[#F4F3EF] text-[#171719]">
    <Meta title="About SIDDI — Architectural Hardware" description="Learn about SIDDI, an architectural hardware business based in Rajkot, India." />
    <Section className="page-hero border-b border-black/10">
      <Breadcrumbs items={[{ label: 'About SIDDI' }]} className="mb-8 text-gray-400 [&_span]:text-[#F2B705]" />
      <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl">Hardware for considered spaces.</h1>
      <p className="mt-6 max-w-2xl text-base leading-7 text-[#5B5B61] sm:text-lg">SIDDI supplies architectural door hardware and bathroom fittings from Rajkot, India. We help project teams compare products, finishes, and requirements for their schedules.</p>
      <Link to="/catalogue" className="roll-action mt-8 inline-flex items-center gap-2 rounded-md bg-[#F2B705] px-5 py-3 font-semibold text-black"><RollLabel>Explore the catalogue</RollLabel><ArrowRight size={17} /></Link>
    </Section>

    <Section className="py-16 sm:py-24">
      <div className="grid gap-10 md:grid-cols-2 md:gap-16">
        <div><h2 className="text-3xl font-semibold">Clear choices, from selection to schedule.</h2></div>
        <div className="space-y-5 text-sm leading-7 text-[#5B5B61] sm:text-base">
          <p>Architectural hardware is handled across many details: product type, finish, door or room use, and project quantities. We make those choices easier to discuss in one place.</p>
          <p>Browse the catalogue, identify the products that suit your project, then share a door schedule or enquiry with the trade desk. Product-specific dimensions and performance should be confirmed against current documentation before specification.</p>
        </div>
      </div>
    </Section>

    <Section className="pb-16 sm:pb-24">
      <div className="border-t border-black/10 pt-8">
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            ['01', 'Choose products', 'Browse hardware by category and review available product information.'],
            ['02', 'Confirm requirements', 'Share your schedule and confirm suitability, finish, and quantities with the team.'],
            ['03', 'Coordinate the details', 'Discuss samples, project requirements, and current documentation through the trade desk.'],
          ].map(([number, title, copy]) => <article key={number} className="rounded-lg border border-black/10 bg-white p-6"><span className="font-mono text-sm text-[#8A6400]">{number}</span><h3 className="mt-5 text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-[#5B5B61]">{copy}</p></article>)}
        </div>
      </div>
    </Section>
    <EnquiryCTA title="Discuss a project with SIDDI" description="Share your project requirements with the trade desk." buttonText="Contact the trade desk" />
  </main>
);
