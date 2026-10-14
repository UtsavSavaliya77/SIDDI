import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { CheckCircle, Buildings, Clock, ShieldCheck } from '@phosphor-icons/react';

export const ContactPage: React.FC = () => {
  const [searchParams] = useSearchParams();

  const initialInterest = searchParams.get('interest') || searchParams.get('product') || searchParams.get('category') || '';

  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    enquiryType: 'trade-specification',
    interestedProduct: initialInterest ? decodeURIComponent(initialInterest) : '',
    message: '',
    consent: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'backend-required'>('idle');

  // Update interestedProduct if URL parameter changes
  useEffect(() => {
    if (initialInterest) {
      setFormData((prev) => ({
        ...prev,
        interestedProduct: decodeURIComponent(initialInterest)
      }));
    }
  }, [initialInterest]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid corporate or personal email address.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required for specification coordination.';
    }

    if (!formData.message.trim() || formData.message.length < 15) {
      newErrors.message = 'Please provide a brief description of your project requirement (minimum 15 characters).';
    }

    if (!formData.consent) {
      newErrors.consent = 'You must confirm that you consent to our team reviewing your project enquiry.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate network submission and honest backend requirement indication
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionStatus('backend-required');
    }, 1200);
  };

  return (
    <div className="min-h-screen pt-28 md:pt-36 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={[{ label: 'Contact & Project Enquiries' }]} className="mb-8" />

        {/* Page Heading */}
        <SectionHeading
          eyebrow="Trade Consultation"
          title="Discuss Your Hardware Specification"
          description="Direct engineering collaboration for architects, interior design practices, developers, and wholesale dealers. Submit your project schedule or specification questions below."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-12">
          
          {/* Left Column: Architectural Enquiry Form */}
          <div className="lg:col-span-7 bg-white border border-[#111111]/10 p-8 sm:p-10 shadow-sm">
            
            {submissionStatus === 'backend-required' ? (
              <div className="py-8 space-y-6">
                <div className="w-14 h-14 bg-[#111111] text-[#F2B705] flex items-center justify-center">
                  <CheckCircle className="w-8 h-8" />
                </div>
                
                <h3 className="text-2xl font-normal text-[#111111]">
                  Enquiry Form Validated Successfully
                </h3>

                <p className="text-sm text-[#777777] leading-relaxed">
                  Thank you, <strong className="text-black">{formData.fullName}</strong>. Your project specification details for <strong className="text-black">{formData.company || 'your project'}</strong> have passed client-side validation.
                </p>

                {/* Honest backend disclosure */}
                <div className="p-4 bg-amber-500/10 border-l-4 border-[#F2B705] text-xs text-[#111111] space-y-2">
                  <div className="font-semibold uppercase tracking-wider font-mono">
                    System Architecture Note:
                  </div>
                  <div>
                    This frontend is configured with complete validation and API-ready schema. To transmit actual customer emails directly to SIDDI's inbox, connect your preferred email endpoint (e.g. Resend, SendGrid, or custom REST API).
                  </div>
                </div>

                <div className="p-4 bg-[#FAF9F6] border border-[#111111]/10 text-xs font-mono text-[#777777] space-y-1">
                  <div><strong>Full Name:</strong> {formData.fullName}</div>
                  <div><strong>Email:</strong> {formData.email}</div>
                  <div><strong>Phone:</strong> {formData.phone}</div>
                  <div><strong>Enquiry Type:</strong> {formData.enquiryType}</div>
                  {formData.interestedProduct && <div><strong>Subject/Product:</strong> {formData.interestedProduct}</div>}
                </div>

                <Button
                  onClick={() => {
                    setSubmissionStatus('idle');
                    setFormData({
                      fullName: '',
                      company: '',
                      email: '',
                      phone: '',
                      enquiryType: 'trade-specification',
                      interestedProduct: '',
                      message: '',
                      consent: false,
                    });
                  }}
                  variant="outline"
                  size="sm"
                >
                  Submit Another Project Enquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-xs uppercase tracking-wider font-semibold text-[#111111] mb-2">
                      Full Name <span className="text-[#F2B705]">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. David Sterling"
                      className={`w-full px-4 py-3 bg-[#FAF9F6] border text-sm text-[#111111] focus:outline-none transition-colors ${
                        errors.fullName ? 'border-red-500 ring-1 ring-red-500' : 'border-[#111111]/20 focus:border-[#111111]'
                      }`}
                    />
                    {errors.fullName && <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>}
                  </div>

                  {/* Company / Architectural Practice */}
                  <div>
                    <label htmlFor="company" className="block text-xs uppercase tracking-wider font-semibold text-[#111111] mb-2">
                      Practice / Company / Firm
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Sterling Architecture Ltd"
                      className="w-full px-4 py-3 bg-[#FAF9F6] border border-[#111111]/20 text-sm text-[#111111] focus:outline-none focus:border-[#111111] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-xs uppercase tracking-wider font-semibold text-[#111111] mb-2">
                      Email Address <span className="text-[#F2B705]">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="david@sterling-arch.com"
                      className={`w-full px-4 py-3 bg-[#FAF9F6] border text-sm text-[#111111] focus:outline-none transition-colors ${
                        errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-[#111111]/20 focus:border-[#111111]'
                      }`}
                    />
                    {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-xs uppercase tracking-wider font-semibold text-[#111111] mb-2">
                      Phone Number <span className="text-[#F2B705]">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+44 20 7946 0912"
                      className={`w-full px-4 py-3 bg-[#FAF9F6] border text-sm text-[#111111] focus:outline-none transition-colors ${
                        errors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-[#111111]/20 focus:border-[#111111]'
                      }`}
                    />
                    {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
                  </div>
                </div>

                {/* Enquiry Type & Product Interest */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="enquiryType" className="block text-xs uppercase tracking-wider font-semibold text-[#111111] mb-2">
                      Enquiry Typology
                    </label>
                    <select
                      id="enquiryType"
                      name="enquiryType"
                      value={formData.enquiryType}
                      onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FAF9F6] border border-[#111111]/20 text-xs uppercase tracking-wider text-[#111111] focus:outline-none focus:border-[#111111] cursor-pointer"
                    >
                      <option value="trade-specification">Architectural Takeoff / Specification</option>
                      <option value="sample-request">Finish Sample Box Request</option>
                      <option value="contract-dealer">Wholesale & Dealership Enquiry</option>
                      <option value="custom-milling">Custom Milling / Bespoke Joinery</option>
                      <option value="general-inquiry">General Hardware Enquiry</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="interestedProduct" className="block text-xs uppercase tracking-wider font-semibold text-[#111111] mb-2">
                      Interested Product / Category
                    </label>
                    <input
                      type="text"
                      id="interestedProduct"
                      name="interestedProduct"
                      value={formData.interestedProduct}
                      onChange={(e) => setFormData({ ...formData, interestedProduct: e.target.value })}
                      placeholder="e.g. Verona Lever or Bathroom Set"
                      className="w-full px-4 py-3 bg-[#FAF9F6] border border-[#111111]/20 text-sm text-[#111111] focus:outline-none focus:border-[#111111] transition-colors"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs uppercase tracking-wider font-semibold text-[#111111] mb-2">
                    Project Details & Hardware Schedule <span className="text-[#F2B705]">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Please specify door quantities, required finishes, rebate details, project location, or questions regarding our catalogue..."
                    className={`w-full px-4 py-3 bg-[#FAF9F6] border text-sm text-[#111111] focus:outline-none transition-colors ${
                      errors.message ? 'border-red-500 ring-1 ring-red-500' : 'border-[#111111]/20 focus:border-[#111111]'
                    }`}
                  />
                  {errors.message && <p className="text-[11px] text-red-500 mt-1">{errors.message}</p>}
                </div>

                {/* Consent checkbox */}
                <div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="mt-1 h-4 w-4 rounded-none border-[#111111]/30 text-[#111111] focus:ring-[#F2B705]"
                    />
                    <span className="text-xs text-[#777777] leading-relaxed">
                      I confirm that the details provided are accurate and consent to SIDDI contacting me regarding this architectural hardware requirement in accordance with the privacy policy.
                    </span>
                  </label>
                  {errors.consent && <p className="text-[11px] text-red-500 mt-1">{errors.consent}</p>}
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-[#111111] text-white hover:bg-[#222222] text-xs font-semibold uppercase tracking-widest transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? 'Validating Specification...' : 'Transmit Hardware Enquiry'}
                  </button>
                </div>

              </form>
            )}

          </div>

          {/* Right Column: Trade Coordination Details & Disclosures */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-8 bg-[#111111] text-white space-y-4">
              <span className="text-xs uppercase tracking-[0.25em] text-[#F2B705] font-semibold block">
                Trade Desk
              </span>
              <h3 className="text-2xl font-normal text-white">
                Dedicated Architectural Support
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                We work directly with architects, interior designers, contractors, and regional distributors to provide technical door schedules, masterkeying consultations, and finish samples.
              </p>
              
              <div className="pt-4 border-t border-white/10 space-y-3 text-xs text-gray-400">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#F2B705]" />
                  <span>Response Time: Within 24-48 business hours</span>
                </div>
                <div className="flex items-center gap-3">
                  <Buildings className="w-4 h-4 text-[#F2B705]" />
                  <span>Door schedules accepted in PDF, Excel or DWG format</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-[#F2B705]" />
                  <span>Confidential specification review for tender projects</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white border border-[#111111]/10 space-y-4 text-xs text-[#777777]">
              <h4 className="font-semibold text-black uppercase tracking-wider">
                Physical Sample Boxes
              </h4>
              <p className="leading-relaxed">
                Architectural practices working on active commercial, hotel, or multi-residential developments can request a curated physical sample box containing solid brass lever swatches and PVD finish coupons.
              </p>
              <div className="text-[11px] font-mono text-[#111111]">
                Select &ldquo;Finish Sample Box Request&rdquo; in the form to arrange courier dispatch.
              </div>
            </div>

            {/* Authentic data notice */}
            <div className="p-4 bg-white border border-dashed border-[#111111]/20 text-[11px] text-[#777777] font-mono">
              <span className="font-semibold text-black uppercase">Notice:</span> Official office locations and direct telephone contacts are coordinated through our technical sales representatives upon schedule registration.
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
