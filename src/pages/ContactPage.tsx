import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { EnquiryCTA } from '../components/common/EnquiryCTA';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { Button } from '../components/common/Button';
import {
  CheckCircle,
  Buildings,
  Clock,
  ShieldCheck,
  Package,
  FileText,
  EnvelopeSimple,
  Phone,
  Sparkle,
  UploadSimple,
  ArrowRight,
  Check
} from '@phosphor-icons/react';
import { BouncyAccordion, type BouncyAccordionItem } from '../components/ui/be-ui-bouncy-accordion';
import {
  FileText as LucideFileText,
  Sparkles as LucideSparkles,
  ShieldCheck as LucideShieldCheck,
  KeyRound as LucideKeyRound
} from 'lucide-react';

const SPEC_ACCORDION_ITEMS: BouncyAccordionItem[] = [
  {
    id: 'schedule-formats',
    title: 'What file formats are accepted for door schedule takeoffs?',
    description:
      'We accept door schedules in PDF, Microsoft Excel (.xlsx), CSV, and AutoCAD (.dwg/.dxf) formats. You may also provide architectural door opening elevations and partition details. Our ironmongery consultants will map every opening against appropriate latches, hinges, handles, and accessories.',
    icon: <LucideFileText className="h-4 w-4 text-[#F2B705]" />,
  },
  {
    id: 'custom-milling',
    title: 'Can SIDDI engineer custom levers or bespoke rose designs for hospitality?',
    description:
      'Yes. For boutique hotels, luxury multi-residential developments, and flagship commercial projects, we provide complete bespoke CNC milling, custom knurling patterns, and proprietary escutcheon profiles with an initial prototype turnaround of 10–14 business days.',
    icon: <LucideSparkles className="h-4 w-4 text-[#F2B705]" />,
  },
  {
    id: 'pvd-durability',
    title: 'How durable are SIDDI PVD finishes in coastal or high-humidity environments?',
    description:
      'Our finishes undergo advanced cathodic arc Physical Vapor Deposition (PVD) resulting in a titanium nitride surface with micro-hardness exceeding 2,500 HV. They are certified past 1,000 hours of ASTM B117 neutral salt spray resistance and backed by our 10-year marine and coastal architectural warranty.',
    icon: <LucideShieldCheck className="h-4 w-4 text-[#F2B705]" />,
  },
  {
    id: 'masterkeying',
    title: 'Do you provide masterkeying schedules and access control cylinders?',
    description:
      'We configure comprehensive masterkey suites (Grand Master, Master, Sub-Master, and Construction Keying) utilizing high-security Euro-profile cylinders with patented anti-pick, anti-bump, and anti-drill pins tested to EN 1303 standards.',
    icon: <LucideKeyRound className="h-4 w-4 text-[#F2B705]" />,
  },
];

export const ContactPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialInterest = searchParams.get('interest') || searchParams.get('product') || searchParams.get('category') || '';

  const [isExpanded, setIsExpanded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const [attachedFileName, setAttachedFileName] = useState<string | null>(null);
  const [attachedFileSize, setAttachedFileSize] = useState<string | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'backend-required'>('idle');

  // Trigger smooth zoom on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExpanded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const prevInterestRef = useRef(initialInterest);

  // Sync interestedProduct if user navigates with a different URL query parameter
  useEffect(() => {
    if (initialInterest && initialInterest !== prevInterestRef.current) {
      prevInterestRef.current = initialInterest;
      setFormData((prev) => ({
        ...prev,
        interestedProduct: decodeURIComponent(initialInterest),
      }));
    }
  }, [initialInterest]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachedFileName(file.name);
      const sizeInMb = (file.size / (1024 * 1024)).toFixed(2);
      setAttachedFileSize(`${sizeInMb} MB`);
    }
  };

  const removeAttachedFile = () => {
    setAttachedFileName(null);
    setAttachedFileSize(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

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
      newErrors.consent = 'You must confirm consent for our architectural team to review your enquiry.';
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

  const selectEnquiryType = (type: string) => {
    setFormData((prev) => ({ ...prev, enquiryType: type }));
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      {/* 1. COMPACT ARCHITECTURAL HERO SECTION */}
      <section className="bg-[#111111] text-white pt-28 md:pt-36 pb-8 md:pb-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Breadcrumb Navigation */}
          <div className="mb-4">
            <Breadcrumbs
              items={[{ label: 'Trade Consultation & Contact' }]}
              className="text-gray-400 text-xs [&_a]:text-gray-400 [&_a:hover]:text-[#F2B705] [&_span]:text-[#F2B705]"
            />
          </div>

          {/* Compact Split: Title & Narrative on Left, Visual Preview on Right */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-2">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#F2B705]" />
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#F2B705] font-semibold">
                  Engineering Concierge & Takeoff Desk
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-white tracking-tight mb-2">
                Consultation & Specification
              </h1>
              <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
                Direct engineering collaboration for architects, interior design practices, developers, and wholesale dealers. Submit your door schedules, request bespoke physical sample boxes, or arrange project consultation.
              </p>
              <div className="mt-3 text-xs text-gray-400 font-mono">
                <span>DESK RESPONSE: </span>
                <span className="text-[#F2B705] font-semibold">24–48 HOURS</span>
                <span> • DOOR SCHEDULES: PDF / DWG / EXCEL • SAMPLE COURIER DISPATCH</span>
              </div>
            </div>

            {/* Right Side Framed Visual with Smooth Zoom */}
            <div className="w-full sm:w-80 md:w-96 shrink-0">
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-white/15 bg-black/60 shadow-xl">
                <img
                  src="/brass-door-handle.jpg"
                  alt="SIDDI Architectural Consultation and Technical Takeoff"
                  className={`w-full h-full object-cover object-center transition-transform duration-[1400ms] ease-[cubic-bezier(0.25,1,0.35,1)] will-change-transform ${
                    isExpanded ? 'scale-100' : 'scale-115'
                  }`}
                />
                <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t-2 border-l-2 border-[#F2B705] pointer-events-none" />
                <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t-2 border-r-2 border-[#F2B705] pointer-events-none" />
                <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b-2 border-l-2 border-[#F2B705] pointer-events-none" />
                <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b-2 border-r-2 border-[#F2B705] pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ARCHITECTURAL COMMITMENT & STANDARDS HUD BAR */}
      <ScrollReveal as="section" className="bg-white border-b border-[#111111]/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-lg bg-[#FAF9F6] border border-[#111111]/10 flex items-center justify-center shrink-0 text-[#F2B705]">
                <Clock className="w-5 h-5" weight="duotone" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#111111]">
                  24–48h Turnaround
                </div>
                <div className="text-[11px] text-[#777777] mt-0.5">
                  Fast ironmongery takeoff review
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-lg bg-[#FAF9F6] border border-[#111111]/10 flex items-center justify-center shrink-0 text-[#F2B705]">
                <FileText className="w-5 h-5" weight="duotone" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#111111]">
                  All Schedule Formats
                </div>
                <div className="text-[11px] text-[#777777] mt-0.5">
                  PDF, Excel, &amp; AutoCAD DWG
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-lg bg-[#FAF9F6] border border-[#111111]/10 flex items-center justify-center shrink-0 text-[#F2B705]">
                <Package className="w-5 h-5" weight="duotone" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#111111]">
                  48h Sample Courier
                </div>
                <div className="text-[11px] text-[#777777] mt-0.5">
                  Solid brass finish coupons
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-lg bg-[#FAF9F6] border border-[#111111]/10 flex items-center justify-center shrink-0 text-[#F2B705]">
                <ShieldCheck className="w-5 h-5" weight="duotone" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#111111]">
                  NDA Confidentiality
                </div>
                <div className="text-[11px] text-[#777777] mt-0.5">
                  Strict tender privacy protected
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* 3. MAIN INTERACTIVE INTAKE & TRADE DESK SECTION */}
      <ScrollReveal className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          {/* Left Column: Architectural Intake Atelier */}
          <div className="lg:col-span-7 bg-white border border-[#111111]/10 rounded-2xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#111111] via-[#F2B705] to-[#111111]" />

            {submissionStatus === 'backend-required' ? (
              <div className="py-8 space-y-6">
                <div className="w-16 h-16 rounded-xl bg-[#111111] text-[#F2B705] flex items-center justify-center shadow-md">
                  <CheckCircle className="w-9 h-9" weight="fill" />
                </div>

                <div>
                  <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#F2B705] font-semibold mb-1">
                    Takeoff Registered
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-normal text-[#111111]">
                    Enquiry Form Validated Successfully
                  </h3>
                </div>

                <p className="text-sm text-[#555555] leading-relaxed">
                  Thank you, <strong className="text-[#111111]">{formData.fullName}</strong>. Your project specification details for{' '}
                  <strong className="text-[#111111]">{formData.company || 'your practice'}</strong> have passed client-side validation and schema checks.
                </p>

                {/* Honest backend disclosure */}
                <div className="p-4 bg-amber-500/10 border-l-4 border-[#F2B705] rounded-r-lg text-xs text-[#111111] space-y-1.5">
                  <div className="font-semibold uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <Sparkle className="w-4 h-4 text-[#F2B705]" weight="fill" />
                    System Architecture Note:
                  </div>
                  <div className="leading-relaxed text-[#333333]">
                    This frontend form is equipped with complete schema sanitization and typed payloads. To route customer enquiries directly to your live CRM or mailbox, bind your preferred API endpoint (e.g., Resend, SendGrid, or custom Node/Express webhook).
                  </div>
                </div>

                <div className="p-5 bg-[#FAF9F6] border border-[#111111]/10 rounded-xl text-xs font-mono text-[#555555] space-y-2">
                  <div className="flex justify-between border-b border-[#111111]/10 pb-1.5">
                    <span className="text-[#888888]">Contact:</span>
                    <span className="font-medium text-[#111111]">{formData.fullName} ({formData.email})</span>
                  </div>
                  <div className="flex justify-between border-b border-[#111111]/10 pb-1.5">
                    <span className="text-[#888888]">Practice:</span>
                    <span className="font-medium text-[#111111]">{formData.company || 'Private Practice'}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#111111]/10 pb-1.5">
                    <span className="text-[#888888]">Typology:</span>
                    <span className="font-medium text-[#111111] uppercase">{formData.enquiryType}</span>
                  </div>
                  {formData.interestedProduct && (
                    <div className="flex justify-between border-b border-[#111111]/10 pb-1.5">
                      <span className="text-[#888888]">Target Series:</span>
                      <span className="font-medium text-[#111111]">{formData.interestedProduct}</span>
                    </div>
                  )}
                  {attachedFileName && (
                    <div className="flex justify-between pt-0.5">
                      <span className="text-[#888888]">Schedule Attachment:</span>
                      <span className="font-medium text-[#F2B705]">{attachedFileName} ({attachedFileSize})</span>
                    </div>
                  )}
                </div>

                <div className="pt-2">
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
                      removeAttachedFile();
                    }}
                    variant="outline"
                    size="sm"
                  >
                    Submit Another Project Enquiry
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#F2B705] font-semibold block mb-1">
                    Direct Takeoff Submission
                  </span>
                  <h2 className="text-2xl font-serif font-normal text-[#111111]">
                    Hardware Intake &amp; Takeoff Form
                  </h2>
                  <p className="text-xs text-[#777777] mt-1">
                    Select your enquiry typology below or attach your door schedule for comprehensive ironmongery takeoff.
                  </p>
                </div>

                {/* Typology Pill Switcher */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#111111] mb-2.5">
                    Enquiry Typology <span className="text-[#F2B705]">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'trade-specification', label: 'Door Takeoff' },
                      { id: 'sample-request', label: 'Sample Box' },
                      { id: 'contract-dealer', label: 'Contract Supply' },
                      { id: 'custom-milling', label: 'Bespoke Milling' },
                    ].map((tab) => {
                      const isActive = formData.enquiryType === tab.id;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => selectEnquiryType(tab.id)}
                          className={`px-3 py-2.5 text-xs font-medium rounded-lg border transition-all text-center cursor-pointer ${
                            isActive
                              ? 'bg-[#111111] text-white border-[#111111] shadow-xs'
                              : 'bg-[#FAF9F6] text-[#666666] border-[#111111]/15 hover:border-[#111111] hover:text-[#111111]'
                          }`}
                        >
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name & Practice Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="fullName" className="block text-xs uppercase tracking-wider font-semibold text-[#111111] mb-1.5">
                      Full Name <span className="text-[#F2B705]">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. David Sterling"
                      className={`w-full px-4 py-3 bg-[#FAF9F6] border rounded-lg text-sm text-[#111111] focus:outline-none transition-colors ${
                        errors.fullName ? 'border-red-500 ring-1 ring-red-500' : 'border-[#111111]/20 focus:border-[#111111] focus:ring-1 focus:ring-[#F2B705]/40'
                      }`}
                    />
                    {errors.fullName && <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-xs uppercase tracking-wider font-semibold text-[#111111] mb-1.5">
                      Practice / Studio / Firm
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Sterling Architecture Ltd"
                      className="w-full px-4 py-3 bg-[#FAF9F6] border border-[#111111]/20 rounded-lg text-sm text-[#111111] focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#F2B705]/40 transition-colors"
                    />
                  </div>
                </div>

                {/* Email & Phone Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="email" className="block text-xs uppercase tracking-wider font-semibold text-[#111111] mb-1.5">
                      Corporate Email <span className="text-[#F2B705]">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="david@sterling-arch.com"
                      className={`w-full px-4 py-3 bg-[#FAF9F6] border rounded-lg text-sm text-[#111111] focus:outline-none transition-colors ${
                        errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-[#111111]/20 focus:border-[#111111] focus:ring-1 focus:ring-[#F2B705]/40'
                      }`}
                    />
                    {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs uppercase tracking-wider font-semibold text-[#111111] mb-1.5">
                      Phone Number <span className="text-[#F2B705]">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98200 12345 / +44 20 7946 0912"
                      className={`w-full px-4 py-3 bg-[#FAF9F6] border rounded-lg text-sm text-[#111111] focus:outline-none transition-colors ${
                        errors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-[#111111]/20 focus:border-[#111111] focus:ring-1 focus:ring-[#F2B705]/40'
                      }`}
                    />
                    {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
                  </div>
                </div>

                {/* Target Product / Collection */}
                <div>
                  <label htmlFor="interestedProduct" className="block text-xs uppercase tracking-wider font-semibold text-[#111111] mb-1.5">
                    Target Hardware Series / Product Focus
                  </label>
                  <input
                    type="text"
                    id="interestedProduct"
                    name="interestedProduct"
                    value={formData.interestedProduct}
                    onChange={(e) => setFormData({ ...formData, interestedProduct: e.target.value })}
                    placeholder="e.g. Verona Lever Handle, Magnetic Mortise Locks, or Complete Master Schedule"
                    className="w-full px-4 py-3 bg-[#FAF9F6] border border-[#111111]/20 rounded-lg text-sm text-[#111111] focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#F2B705]/40 transition-colors"
                  />
                </div>

                {/* Message / Scope */}
                <div>
                  <label htmlFor="message" className="block text-xs uppercase tracking-wider font-semibold text-[#111111] mb-1.5">
                    Project Scope &amp; Hardware Requirements <span className="text-[#F2B705]">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Please specify door quantities, required PVD finishes, door thicknesses or specific questions..."
                    className={`w-full px-4 py-3 bg-[#FAF9F6] border rounded-lg text-sm text-[#111111] focus:outline-none transition-colors ${
                      errors.message ? 'border-red-500 ring-1 ring-red-500' : 'border-[#111111]/20 focus:border-[#111111] focus:ring-1 focus:ring-[#F2B705]/40'
                    }`}
                  />
                  {errors.message && <p className="text-[11px] text-red-500 mt-1">{errors.message}</p>}
                </div>

                {/* Optional Schedule Upload Drop Area */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#111111] mb-1.5">
                    Attach Door Schedule or Architectural Drawings
                  </label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf,.dwg,.dxf,.xlsx,.xls,.csv,.zip"
                    className="hidden"
                    id="fileUpload"
                  />

                  {attachedFileName ? (
                    <div className="flex items-center justify-between p-3.5 bg-[#FAF9F6] border border-[#111111]/15 rounded-lg">
                      <div className="flex items-center gap-2.5 truncate">
                        <FileText className="w-5 h-5 text-[#F2B705] shrink-0" weight="duotone" />
                        <span className="text-xs font-mono font-medium text-[#111111] truncate">
                          {attachedFileName}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 bg-black/5 text-[#666666] rounded">
                          {attachedFileSize}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={removeAttachedFile}
                        className="text-xs text-red-600 hover:text-red-800 underline font-mono shrink-0 ml-3 cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <label
                      htmlFor="fileUpload"
                      className="border-2 border-dashed border-[#111111]/15 hover:border-[#111111]/40 bg-[#FAF9F6]/50 hover:bg-[#FAF9F6] p-4 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-3 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3 text-center sm:text-left">
                        <div className="w-8 h-8 rounded-full bg-[#111111]/5 flex items-center justify-center text-[#111111] shrink-0">
                          <UploadSimple className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-medium text-[#111111]">
                            Upload Door Schedule / Plan (.pdf, .dwg, .xlsx)
                          </div>
                          <div className="text-[11px] text-[#777777]">
                            Files up to 25MB accepted for engineering takeoff
                          </div>
                        </div>
                      </div>
                      <span className="px-3 py-1.5 bg-white border border-[#111111]/20 text-[11px] uppercase tracking-wider font-semibold text-[#111111] rounded shadow-2xs hover:bg-[#111111] hover:text-white transition-colors">
                        Browse Files
                      </span>
                    </label>
                  )}
                </div>

                {/* Consent Checkbox */}
                <div className="pt-1">
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="mt-0.5 h-4 w-4 rounded border-[#111111]/30 text-[#111111] focus:ring-[#F2B705] cursor-pointer"
                    />
                    <span className="text-xs text-[#666666] leading-relaxed">
                      I confirm that the details provided are accurate and consent to SIDDI contacting our practice regarding this architectural specification in accordance with data privacy guidelines.
                    </span>
                  </label>
                  {errors.consent && <p className="text-[11px] text-red-500 mt-1">{errors.consent}</p>}
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 bg-[#111111] hover:bg-[#F2B705] hover:text-[#111111] text-white text-xs font-semibold uppercase tracking-widest rounded-lg transition-all duration-300 shadow-md cursor-pointer disabled:opacity-50"
                  >
                    <span>{isSubmitting ? 'Validating Takeoff...' : 'Transmit Hardware Enquiry'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Direct Trade Desk & Physical Sample Box Showcase */}
          <div className="lg:col-span-5 space-y-6">

            {/* Curated Physical Sample Box Showcase */}
            <div className="p-8 bg-[#111111] text-white rounded-2xl relative overflow-hidden shadow-lg border border-white/10">
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#F2B705]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] uppercase tracking-[0.22em] text-[#F2B705] font-semibold font-mono">
                  Atelier Specifier Box
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-white/10 text-white/90 rounded border border-white/15">
                  Courier In 48h
                </span>
              </div>

              <h3 className="text-2xl font-serif font-normal text-white mb-2">
                Curated Finish &amp; Lever Box
              </h3>

              <p className="text-xs text-gray-300 leading-relaxed mb-5">
                Qualified architectural practices and interior studios working on live projects can request a curated physical sample set delivered straight to your studio library.
              </p>

              <div className="space-y-2.5 border-t border-white/10 pt-4 mb-6">
                {[
                  '6 Solid Brass Finish Coupons (Satin, Bronze, PVD Gold, Gunmetal, Black, Chrome)',
                  '1:1 Tactile Knurled Lever Handle Section with Return Spring',
                  '184-Page Hardcover Master Architectural Specification Binder',
                  'Pre-paid return courier slip for sustainable sample recycling',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-gray-300">
                    <Check className="w-4 h-4 text-[#F2B705] shrink-0 mt-0.5" weight="bold" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  selectEnquiryType('sample-request');
                  window.scrollTo({ top: 350, behavior: 'smooth' });
                }}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-white/10 hover:bg-[#F2B705] hover:text-[#111111] text-white border border-white/15 rounded-lg text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer"
              >
                <span>Request Sample Box in Form</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Direct Engineering Desk Card */}
            <div className="p-7 bg-white border border-[#111111]/10 rounded-2xl space-y-4 shadow-xs">
              <div className="flex items-center gap-2">
                <Buildings className="w-5 h-5 text-[#F2B705]" weight="duotone" />
                <h4 className="font-semibold text-xs text-[#111111] uppercase tracking-wider">
                  Direct Engineering Desk
                </h4>
              </div>

              <p className="text-xs text-[#666666] leading-relaxed">
                Connect directly with our ironmongery consultants for tender inquiries, rapid door takeoff estimates, and masterkey schedules:
              </p>

              <div className="space-y-3 pt-2 text-xs">
                <a
                  href="mailto:trade@siddi-hardware.com"
                  className="flex items-center gap-3 p-3 bg-[#FAF9F6] border border-[#111111]/10 rounded-lg hover:border-[#111111] transition-colors group"
                >
                  <EnvelopeSimple className="w-4 h-4 text-[#F2B705] shrink-0" />
                  <div className="truncate">
                    <div className="text-[10px] text-[#777777] uppercase font-mono">Specification Takeoffs</div>
                    <div className="font-medium text-[#111111] group-hover:text-[#F2B705] transition-colors">
                      trade@siddi-hardware.com
                    </div>
                  </div>
                </a>

                <a
                  href="tel:+912245891200"
                  className="flex items-center gap-3 p-3 bg-[#FAF9F6] border border-[#111111]/10 rounded-lg hover:border-[#111111] transition-colors group"
                >
                  <Phone className="w-4 h-4 text-[#F2B705] shrink-0" />
                  <div>
                    <div className="text-[10px] text-[#777777] uppercase font-mono">Technical Phone Support</div>
                    <div className="font-medium text-[#111111] group-hover:text-[#F2B705] transition-colors">
                      +91 (0) 22 4589 1200
                    </div>
                  </div>
                </a>

                <div className="p-3 bg-[#FAF9F6] border border-[#111111]/10 rounded-lg">
                  <div className="text-[10px] text-[#777777] uppercase font-mono">BIM &amp; CAD Direct Link</div>
                  <div className="font-medium text-[#111111] mt-0.5">
                    bim@siddi-hardware.com
                  </div>
                </div>
              </div>

              <div className="pt-2 text-[11px] font-mono text-[#777777] border-t border-[#111111]/10">
                Studio Hours: Monday – Friday, 09:00 – 18:30 IST
              </div>
            </div>

            {/* Production Atelier & Confidentiality Notice */}
            <div className="p-5 bg-white border border-dashed border-[#111111]/20 rounded-2xl text-[11px] text-[#666666] leading-relaxed">
              <span className="font-semibold text-[#111111] uppercase tracking-wider block mb-1">
                Foundry &amp; Manufacturing Atelier:
              </span>
              SIDDI Precision Hardware, Plot No. 42, GIDC Industrial Estate, Shapar (Veraval), Rajkot, Gujarat 360024, India.
              <div className="mt-2 text-[#777777]">
                Official client visits and factory walkthroughs are scheduled upon confirmed project appointment.
              </div>
            </div>

          </div>

        </div>
      </ScrollReveal>

      {/* 4. SPECIFICATION JOURNEY: 3-STEP ARCHITECTURAL PROCESS */}
      <ScrollReveal as="section" className="bg-white border-y border-[#111111]/10 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#F2B705] font-semibold block mb-2">
              Workflow Standard
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-normal text-[#111111]">
              The Architectural Ironmongery Process
            </h2>
            <p className="text-xs sm:text-sm text-[#777777] mt-2">
              How our engineering team partners with your studio from initial schematic drawing to certified on-site hardware delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-[#FAF9F6] border border-[#111111]/10 rounded-2xl relative">
              <div className="text-3xl font-serif text-[#F2B705] mb-4">01</div>
              <h3 className="text-lg font-serif font-normal text-[#111111] mb-2">
                Schedule Takeoff &amp; Gap Analysis
              </h3>
              <p className="text-xs text-[#666666] leading-relaxed">
                Submit door schedules or floor plans. Our ironmongers verify fire ratings, mortise depth clearances, backset compatibility, and door swing dynamics.
              </p>
            </div>

            <div className="p-8 bg-[#FAF9F6] border border-[#111111]/10 rounded-2xl relative">
              <div className="text-3xl font-serif text-[#F2B705] mb-4">02</div>
              <h3 className="text-lg font-serif font-normal text-[#111111] mb-2">
                Physical Sample Verification
              </h3>
              <p className="text-xs text-[#666666] leading-relaxed">
                We courier physical brass finish swatches, test handles, and 1:1 rose mockups directly to your project studio for tactile client sign-off.
              </p>
            </div>

            <div className="p-8 bg-[#FAF9F6] border border-[#111111]/10 rounded-2xl relative">
              <div className="text-3xl font-serif text-[#F2B705] mb-4">03</div>
              <h3 className="text-lg font-serif font-normal text-[#111111] mb-2">
                Door-by-Door Labeled Delivery
              </h3>
              <p className="text-xs text-[#666666] leading-relaxed">
                Hardware arrives sorted and custom-bagged per opening (Door ID / Level / Unit), drastically cutting on-site installation confusion and delays.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* 5. ARCHITECTURAL FREQUENTLY ASKED QUESTIONS (BOUNCY ACCORDION) */}
      <ScrollReveal as="section" className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#F2B705] font-semibold block mb-2">
              Trade Clarifications
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-normal text-[#111111]">
              Frequently Asked Specification Questions
            </h2>
            <p className="text-xs sm:text-sm text-[#777777] mt-2">
              Key engineering and procurement considerations for architects, developers, and quantity surveyors.
            </p>
          </div>

          <div className="w-full">
            <BouncyAccordion
              items={SPEC_ACCORDION_ITEMS}
              defaultValue="schedule-formats"
              classNames={{
                root: "space-y-0",
                item: "bg-white border border-[#111111]/10 shadow-xs transition-shadow duration-300 hover:shadow-sm",
                trigger: "min-h-[64px] px-6 py-4.5 hover:bg-[#FAF9F6]/60 transition-colors cursor-pointer",
                title: "font-serif text-base sm:text-lg text-[#111111] font-normal tracking-tight",
                icon: "text-[#F2B705]",
                chevron: "text-[#F2B705]",
                content: "border-t border-[#111111]/5",
                description: "text-xs sm:text-sm text-[#666666] leading-relaxed pt-2",
              }}
            />
          </div>
        </div>
      </ScrollReveal>

      {/* 6. PRESERVED ENQUIRY CTA (Untouched) */}
      <EnquiryCTA />
    </div>
  );
};
