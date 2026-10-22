import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from '@phosphor-icons/react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { EnquiryCTA } from '../components/common/EnquiryCTA';
import { Meta } from '../components/common/Meta';
import { RollLabel } from '../components/common/Button';

const applications = [
  { title: 'Bathrooms', copy: 'Explore bathroom fittings and accessories for residential and project spaces.', image: '/bathroom-kit.jpg', categories: 'Bathroom accessories · Towel rails · Hooks' },
  { title: 'Interior doors', copy: 'Browse door handles, knobs, and related hardware for interior doors.', image: '/Handles.jpg', categories: 'Door handles & knobs · Door hardware' },
  { title: 'Hospitality projects', copy: 'Review the catalogue and confirm product suitability and quantities for your project.', image: '/brass-door-handle.jpg', categories: 'Door hardware · Bathroom accessories' },
  { title: 'Commercial interiors', copy: 'Coordinate hardware selections with the project schedule and intended application.', image: '/Handle.jpg', categories: 'Architectural hardware · Door handles' },
  { title: 'Renovation & joinery', copy: 'Compare available styles and finishes when updating doors, cabinetry, or fittings.', image: '/Knobs.jpg', categories: 'Cabinet hardware · Bathroom fittings' },
];

export const ApplicationsPage: React.FC = () => (
  <main className="min-h-screen bg-[#F4F3EF] text-[#171719]">
    <Meta title="Applications — SIDDI Architectural Hardware" description="Browse architectural hardware applications for bathrooms, interior doors, hospitality, and commercial projects." />
    <section className="page-hero w-full px-4 sm:px-6 md:px-10 lg:px-16 border-b border-black/10">
      <Breadcrumbs items={[{ label: 'Applications' }]} className="mb-8 text-gray-400 [&_span]:text-[#F2B705]" />
      <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">Hardware by space and project.</h1>
      <p className="mt-5 max-w-2xl text-base leading-7 text-[#5B5B61]">Explore common settings for SIDDI architectural hardware. Product suitability, dimensions, and availability should be confirmed for each project.</p>
    </section>
    <section className="w-full px-4 py-12 sm:px-6 sm:py-16 md:px-10 lg:px-16 lg:py-20">
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {applications.map((item) => <article key={item.title} className="overflow-hidden rounded-lg border border-black/10 bg-white">
          <div className="aspect-[16/9] bg-[#EBEAE5]"><img src={item.image} alt="" className="h-full w-full object-cover" loading="lazy" /></div>
          <div className="p-5 sm:p-6">
            <h2 className="mt-3 text-xl font-semibold">{item.title}</h2>
            <p className="mt-3 min-h-12 text-sm leading-6 text-[#5B5B61]">{item.copy}</p>
            <p className="mt-5 border-t border-black/10 pt-4 text-xs leading-5 text-[#66666D]">Explore: {item.categories}</p>
            <Link to="/catalogue" className="roll-action mt-5 inline-flex items-center gap-2 text-sm font-semibold hover:text-[#F2B705]"><RollLabel>Browse catalogue</RollLabel><ArrowRight size={16} /></Link>
          </div>
        </article>)}
      </div>
    </section>
    <EnquiryCTA title="Planning a project?" description="Share your schedule and discuss product selection with the SIDDI trade desk." buttonText="Send a door schedule" />
  </main>
);
