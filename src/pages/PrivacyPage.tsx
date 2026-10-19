import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SectionHeading } from '../components/common/SectionHeading';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { Link } from 'react-router-dom';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-28 md:pt-36 bg-[#FAF9F6]">
      <div className="max-w-4xl mx-auto px-6 md:px-12 pb-24">
        
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={[{ label: 'Privacy Policy' }]} className="mb-8" />

        <SectionHeading
          eyebrow="Legal & Governance"
          title="Privacy Policy & Data Handling"
          description="How SIDDI collects, manages, and safeguards project enquiry and client information."
        />

        {/* Legal Disclaimer */}
        <div className="p-4 bg-white border border-[#111111]/10 text-xs text-[#777777] font-mono mb-12">
          <span className="font-semibold text-black uppercase">Disclosure Notice:</span> This privacy policy is an operational template structured for SIDDI&apos;s architectural hardware website. Specific entity details and regional legal review placeholders should be verified by the company&apos;s appointed legal counsel.
        </div>

        {/* Policy Content */}
        <ScrollReveal className="space-y-8 text-sm text-[#777777] leading-relaxed bg-white border border-[#111111]/10 p-8 sm:p-12">
          
          <section className="space-y-3">
            <h3 className="text-lg font-semibold text-[#111111]">1. Information We Collect</h3>
            <p>
              When you submit a project enquiry, schedule takeoff, sample request, or communicate with our technical desk, we may collect professional identification details including:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Full Name and Professional Title</li>
              <li>Practice, Architectural Firm, or Construction Company Name</li>
              <li>Corporate Email Address and Telephone Contact</li>
              <li>Project Location, Architectural Drawings, and Hardware Schedule Specifications</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-semibold text-[#111111]">2. How We Utilize Your Information</h3>
            <p>
              Information gathered through this website is strictly utilized to:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Review, price, and generate tailored architectural hardware schedules.</li>
              <li>Dispatch physical finish sample boxes and technical literature upon verified trade request.</li>
              <li>Communicate engineering feasibility notes regarding custom joinery or mortise requirements.</li>
            </ul>
            <p>
              We do not sell, rent, or trade your contact or project specification data to third-party marketing entities.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-semibold text-[#111111]">3. Data Storage & Security</h3>
            <p>
              We employ standard transport-layer encryption (TLS/HTTPS) across all web transmission points. Project schedules and tender documents shared with SIDDI are treated as confidential trade materials.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-semibold text-[#111111]">4. Cookies & Analytics</h3>
            <p>
              This website operates with minimal, privacy-conscious session controls. We do not inject invasive cross-site tracking pixels or aggressive advertising beacons.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-semibold text-[#111111]">5. Contact Regarding Your Data</h3>
            <p>
              To request a copy of your submitted project information, update your practice details, or request deletion of correspondence, please submit a request via our <Link to="/contact" className="text-[#111111] underline hover:text-[#F2B705]">Contact Desk</Link>.
            </p>
          </section>

          <div className="pt-6 border-t border-[#111111]/10 text-xs text-gray-400 font-mono">
            Document Version: 1.0 &bull; Last Revised: October 2026 &bull; SIDDI Architectural Hardware
          </div>

        </ScrollReveal>

      </div>
    </div>
  );
};
