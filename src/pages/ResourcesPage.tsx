import React from 'react';
import { FileText, Cube, Ruler } from '@phosphor-icons/react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { EnquiryCTA } from '../components/common/EnquiryCTA';
import { Meta } from '../components/common/Meta';

const resources = [
  { title: 'Product information', copy: 'Review the product catalogue for currently published product names, categories, and finish options.', icon: FileText },
  { title: 'CAD drawings', copy: 'Request current product drawings for the specific items in your project schedule.', icon: Ruler },
  { title: 'BIM files', copy: 'Ask the team whether a BIM file is available for the product you are considering.', icon: Cube },
];

export const ResourcesPage: React.FC = () => (
  <main className="min-h-screen bg-[#F4F3EF] text-[#171719]">
    <Meta title="Resources — SIDDI Architectural Hardware" description="Find product information and request current technical documents from SIDDI." />
    <section className="page-hero w-full px-4 sm:px-6 md:px-10 lg:px-16 border-b border-black/10">
      <Breadcrumbs items={[{ label: 'Resources' }]} className="mb-8 text-gray-400 [&_span]:text-[#F2B705]" />
      <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">Product information and project documents.</h1>
      <p className="mt-5 max-w-2xl text-base leading-7 text-[#5B5B61]">Use the catalogue to explore products. For technical files, ask the trade desk for the latest document for your selected product.</p>
    </section>
    <section className="w-full px-4 py-12 sm:px-6 sm:py-16 md:px-10 lg:px-16 lg:py-20">
      <div className="grid gap-5 md:grid-cols-3">
        {resources.map(({ title, copy, icon: Icon }, index) => <article key={title} className="flex min-h-64 flex-col rounded-lg border border-black/10 bg-white p-6 sm:p-8">
          <div className="flex items-center justify-between"><Icon size={28} weight="regular" className="text-[#8A6400]" /><span className="font-mono text-xs text-[#777777]">0{index + 1}</span></div>
          <h2 className="mt-8 text-xl font-semibold">{title}</h2>
          <p className="mt-3 flex-1 text-sm leading-6 text-[#5B5B61]">{copy}</p>
        </article>)}
      </div>
    </section>
    <EnquiryCTA title="Need help with a project?" description="Send a schedule or ask the trade desk about product documentation." buttonText="Contact the trade desk" />
  </main>
);
