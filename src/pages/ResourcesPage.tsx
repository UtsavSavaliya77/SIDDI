import React, { useState } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { FileText, DownloadSimple, WarningCircle } from '@phosphor-icons/react';

interface ResourceDoc {
  id: string;
  title: string;
  category: string;
  description: string;
  fileFormat: string;
  fileSize: string;
  downloadUrl?: string; // only if real file exists
  isAvailable: boolean;
}

export const ResourcesPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const resources: ResourceDoc[] = [
    {
      id: 'res-cat-2026',
      title: 'SIDDI Architectural Hardware Master Catalogue',
      category: 'Catalogues',
      description: 'Comprehensive overview of door handles, mortise locksets, bathroom fittings, and dimensional diagrams.',
      fileFormat: 'PDF',
      fileSize: '14.2 MB',
      isAvailable: false // Honest: requires actual company upload
    },
    {
      id: 'res-fin-pvd',
      title: 'Physical Vapor Deposition (PVD) Finish Specification Guide',
      category: 'Finishes & Materials',
      description: 'Detailed spectral analysis, salt spray testing data, and care guidelines for Matte Black, Brushed Brass, and Satin Steel finishes.',
      fileFormat: 'PDF',
      fileSize: '3.8 MB',
      isAvailable: false
    },
    {
      id: 'res-inst-mortise',
      title: 'Magnetic Mortise Lockset Installation & Mortise Rebate Template',
      category: 'Installation & CAD',
      description: 'Architectural routing cutouts and door prep templates for silent magnetic latches and Euro-profile cylinders.',
      fileFormat: 'PDF / CAD',
      fileSize: '2.1 MB',
      isAvailable: false
    },
    {
      id: 'res-inst-hinge',
      title: 'Concealed 3D Hinge Weight Table & Frame Rebate Drawings',
      category: 'Installation & CAD',
      description: 'Milling schematics for timber and aluminium flush door systems, weight load calculators, and gap adjustments.',
      fileFormat: 'PDF / DWG',
      fileSize: '5.4 MB',
      isAvailable: false
    },
    {
      id: 'res-bath-care',
      title: 'Bathroom Accessories Concealed Wall Mounting & Gasket Guide',
      category: 'Installation & CAD',
      description: 'Recommended screw anchor depths for masonry, porcelain tiles, and drywall installations with silicone gaskets.',
      fileFormat: 'PDF',
      fileSize: '1.9 MB',
      isAvailable: false
    }
  ];

  const categories = ['all', 'Catalogues', 'Finishes & Materials', 'Installation & CAD'];

  const filteredResources = activeCategory === 'all'
    ? resources
    : resources.filter((r) => r.category === activeCategory);

  return (
    <div className="min-h-screen pt-28 md:pt-36 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={[{ label: 'Resources & Specifications' }]} className="mb-8" />

        {/* Page Heading */}
        <SectionHeading
          eyebrow="Technical Documentation"
          title="Architectural Resources, Templates & Catalogues"
          description="Access technical specification guides, door prep routing diagrams, and finish maintenance literature for SIDDI hardware systems."
        />

        {/* Honest Disclosure Banner */}
        <div className="mb-10 p-5 bg-white border border-[#111111]/10 flex items-start gap-4">
          <WarningCircle className="w-5 h-5 text-[#F2B705] shrink-0 mt-0.5" />
          <div className="text-xs text-[#777777] leading-relaxed">
            <span className="font-semibold text-[#111111] uppercase tracking-wider block mb-1">
              Document Portal Notice:
            </span>
            To maintain strict technical accuracy, official production PDF brochures and DWG architectural blocks are dispatched directly by our technical specification desk to match the exact revision of your door schedules. Request documents below to receive the latest release.
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold border transition-colors cursor-pointer whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-[#111111] text-white border-[#111111]'
                  : 'bg-white text-[#777777] border-[#111111]/10 hover:border-[#111111]/30'
              }`}
            >
              {cat === 'all' ? 'All Documentation' : cat}
            </button>
          ))}
        </div>

        {/* Documents List */}
        <div className="space-y-4">
          {filteredResources.map((doc) => (
            <div
              key={doc.id}
              className="p-6 bg-white border border-[#111111]/10 hover:border-[#111111] transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#FAF9F6] border border-[#111111]/10 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-[#111111]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#F2B705] font-semibold">
                      {doc.category}
                    </span>
                    <span className="text-gray-300">&bull;</span>
                    <span className="text-[10px] font-mono text-[#777777]">
                      {doc.fileFormat} ({doc.fileSize})
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-[#111111] mb-1">
                    {doc.title}
                  </h3>
                  <p className="text-xs text-[#777777] max-w-2xl leading-relaxed">
                    {doc.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {doc.isAvailable ? (
                  <a
                    href={doc.downloadUrl}
                    download
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#111111] text-white hover:bg-[#222222] text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    <DownloadSimple className="w-4 h-4 text-[#F2B705]" />
                    <span>Download</span>
                  </a>
                ) : (
                  <Button
                    to={`/contact?interest=Document%20Request:%20${encodeURIComponent(doc.title)}`}
                    variant="outline"
                    size="sm"
                  >
                    Request Document Copy
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Custom Specification CAD Request */}
        <div className="mt-16 p-8 bg-[#111111] text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-normal text-white mb-2">
              Require Bespoke CAD Blocks or Door Schedule Takeoffs?
            </h3>
            <p className="text-xs text-gray-400 max-w-xl leading-relaxed">
              Our engineering office provides 2D/3D BIM drawings (.dwg, .rvt) and customized hardware schedules aligned with architectural master specifications.
            </p>
          </div>
          <Button to="/contact?interest=Custom%20CAD%20Schedule" variant="secondary" size="md" className="shrink-0">
            Submit Schedule Inquiry
          </Button>
        </div>

      </div>
    </div>
  );
};
