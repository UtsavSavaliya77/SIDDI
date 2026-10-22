import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { EnquiryCTA } from '../components/common/EnquiryCTA';
import { ScrollReveal, TextReveal, ScrollRevealStagger, ScrollRevealItem } from '../components/common/ScrollReveal';
import { Button, RollLabel } from '../components/common/Button';
import {
  CheckCircle,
  Buildings,
  Clock,
  ShieldCheck,
  Package,
  FileText,
  EnvelopeSimple,
  Phone,
  UploadSimple,
  ArrowRight,
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
      <section className="page-hero bg-[#F4F3EF] text-[#171719] border-b border-black/10">
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16">
          {/* Breadcrumb Navigation */}
          <div className="mb-4">
            <Breadcrumbs
              items={[{ label: 'Trade Consultation & Contact' }]}
              className="text-gray-600 text-xs [&_a]:text-gray-600 [&_a:hover]:text-[#805C00] [&_span]:text-[#805C00]"
            />
          </div>

          {/* Compact Split: Title & Narrative on Left, Visual Preview on Right */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-2">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#F2B705]" />
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#805C00] font-semibold">
                  Engineering Concierge & Takeoff Desk
                </span>
              </div>
              <TextReveal
                as="h1"
                text="Consultation & Specification"
                className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#171719] tracking-tight mb-2"
              />
              <p className="text-xs sm:text-sm text-[#5B5B61] font-sans leading-relaxed">
                Direct engineering collaboration for architects, interior design practices, developers, and wholesale dealers. Submit your door schedules, request bespoke physical sample boxes, or arrange project consultation.
              </p>
              <div className="mt-3 text-xs text-gray-600 font-mono">
                <span>DESK RESPONSE: </span>
                <span className="text-[#F2B705] font-semibold">24–48 HOURS</span>
                <span> • DOOR SCHEDULES: PDF / DWG / EXCEL • SAMPLE COURIER DISPATCH</span>
              </div>
            </div>

            {/* Right Side Framed Visual with Smooth Zoom */}
            <div className="w-full sm:w-80 md:w-96 shrink-0">
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-black/15 bg-white shadow-xl">
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
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 py-6">
          <ScrollRevealStagger className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8" staggerDelay={0.08} once={true}>
            <ScrollRevealItem className="flex items-start gap-3.5">
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
            </ScrollRevealItem>

            <ScrollRevealItem className="flex items-start gap-3.5">
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
            </ScrollRevealItem>

            <ScrollRevealItem className="flex items-start gap-3.5">
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
            </ScrollRevealItem>

            <ScrollRevealItem className="flex items-start gap-3.5">
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
            </ScrollRevealItem>
          </ScrollRevealStagger>
        </div>
      </ScrollReveal>

      {/* 3. MAIN INTAKE & TRADE DESK SECTION */}
      <ScrollReveal className="w-full px-4 sm:px-6 md:px-10 lg:px-16 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

          {/* Left Column: Proper Clean Form */}
          <div className="lg:col-span-8 bg-white border border-[#111111]/10 rounded-2xl p-6 sm:p-10 shadow-xs">
            {submissionStatus === 'backend-required' ? (
              <div className="py-6 space-y-5">
                <div className="w-12 h-12 rounded-full bg-[#111111] text-[#F2B705] flex items-center justify-center">
                  <CheckCircle className="w-6 h-6" weight="fill" />
                </div>

                <div>
                  <h3 className="text-2xl font-serif font-normal text-[#111111]">
                    Inquiry Received
                  </h3>
                  <p className="text-sm text-[#666666] mt-1 font-light">
                    Thank you, <strong className="font-medium text-[#111111]">{formData.fullName}</strong>. We have received your project details and will be in touch shortly.
                  </p>
                </div>

                <div className="p-4 bg-[#FAF9F6] border border-[#111111]/10 rounded-xl text-xs space-y-2">
                  <div className="flex justify-between border-b border-[#111111]/10 pb-2">
                    <span className="text-[#777777]">Contact</span>
                    <span className="font-medium text-[#111111]">{formData.fullName} ({formData.email})</span>
                  </div>
                  <div className="flex justify-between border-b border-[#111111]/10 pb-2">
                    <span className="text-[#777777]">Typology</span>
                    <span className="font-medium text-[#111111] uppercase font-mono text-[11px]">{formData.enquiryType}</span>
                  </div>
                  {attachedFileName && (
                    <div className="flex justify-between pt-0.5">
                      <span className="text-[#777777]">Attachment</span>
                      <span className="font-medium text-[#111111]">{attachedFileName}</span>
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
                    Submit Another Inquiry
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* Form Header */}
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#F2B705] font-semibold block mb-1">
                    Specification Intake
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-normal text-[#111111] tracking-tight">
                    Project Takeoff &amp; Consultation
                  </h2>
                  <p className="text-xs text-[#777777] mt-1 font-light">
                    Select your scope below or upload a door schedule for ironmongery estimation.
                  </p>
                </div>

                {/* Typology Switcher */}
                <div>
                  <label className="block text-xs font-semibold text-[#111111] uppercase tracking-wider mb-2">
                    Inquiry Type <span className="text-[#F2B705]">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'trade-specification', label: 'Door Takeoff' },
                      { id: 'sample-request', label: 'Sample Box' },
                      { id: 'contract-dealer', label: 'Contract Supply' },
                      { id: 'custom-milling', label: 'Custom Milling' },
                    ].map((tab) => {
                      const isActive = formData.enquiryType === tab.id;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => selectEnquiryType(tab.id)}
                          className={`py-2.5 px-3 text-xs font-medium rounded-lg border text-center transition-all cursor-pointer ${
                            isActive
                              ? 'bg-[#F2B418] text-[#171719] border-[#946B00] shadow-xs'
                              : 'bg-[#FAF9F6] text-[#666666] border-[#111111]/15 hover:border-[#111111] hover:text-[#111111]'
                          }`}
                        >
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-xs font-medium text-[#222222] mb-1.5">
                    Full Name <span className="text-[#F2B705]">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. David Sterling"
                    className={`w-full px-3.5 py-2.5 bg-[#FAF9F6] border rounded-lg text-sm text-[#111111] placeholder:text-[#999999] focus:outline-none transition-colors ${
                      errors.fullName ? 'border-red-500 ring-1 ring-red-500' : 'border-[#111111]/15 focus:border-[#111111] focus:ring-1 focus:ring-[#111111]'
                    }`}
                  />
                  {errors.fullName && <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>}
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-[#222222] mb-1.5">
                      Work Email <span className="text-[#F2B705]">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="david@sterling-arch.com"
                      className={`w-full px-3.5 py-2.5 bg-[#FAF9F6] border rounded-lg text-sm text-[#111111] placeholder:text-[#999999] focus:outline-none transition-colors ${
                        errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-[#111111]/15 focus:border-[#111111] focus:ring-1 focus:ring-[#111111]'
                      }`}
                    />
                    {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs font-medium text-[#222222] mb-1.5">
                      Phone Number <span className="text-[#F2B705]">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98200 12345"
                      className={`w-full px-3.5 py-2.5 bg-[#FAF9F6] border rounded-lg text-sm text-[#111111] placeholder:text-[#999999] focus:outline-none transition-colors ${
                        errors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-[#111111]/15 focus:border-[#111111] focus:ring-1 focus:ring-[#111111]'
                      }`}
                    />
                    {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
                  </div>
                </div>

                {/* Target Hardware Series */}
                <div>
                  <label htmlFor="interestedProduct" className="block text-xs font-medium text-[#222222] mb-1.5">
                    Hardware Series / Product Focus <span className="text-[#888888] font-normal text-[11px]">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    id="interestedProduct"
                    name="interestedProduct"
                    value={formData.interestedProduct}
                    onChange={(e) => setFormData({ ...formData, interestedProduct: e.target.value })}
                    placeholder="e.g. Verona Lever Handle, Magnetic Mortise Locks, or Full Schedule"
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#111111]/15 rounded-lg text-sm text-[#111111] placeholder:text-[#999999] focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111] transition-colors"
                  />
                </div>

                {/* Project Scope / Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-[#222222] mb-1.5">
                    Project Scope &amp; Notes <span className="text-[#F2B705]">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Door counts, finishes (PVD Gold, Matte Black, etc.), door leaf thicknesses, or custom specifications..."
                    className={`w-full px-3.5 py-2.5 bg-[#FAF9F6] border rounded-lg text-sm text-[#111111] placeholder:text-[#999999] focus:outline-none transition-colors ${
                      errors.message ? 'border-red-500 ring-1 ring-red-500' : 'border-[#111111]/15 focus:border-[#111111] focus:ring-1 focus:ring-[#111111]'
                    }`}
                  />
                  {errors.message && <p className="text-[11px] text-red-500 mt-1">{errors.message}</p>}
                </div>

                {/* Compact Door Schedule Dropzone */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-medium text-[#222222]">
                      Attach Door Schedule / Plans
                    </label>
                    <span className="text-[10px] text-[#888888] font-mono">PDF, DWG, XLSX (Up to 25MB)</span>
                  </div>

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf,.dwg,.dxf,.xlsx,.xls,.csv,.zip"
                    className="hidden"
                    id="fileUpload"
                  />

                  {attachedFileName ? (
                    <div className="flex items-center justify-between p-3 bg-[#FAF9F6] border border-[#111111]/15 rounded-lg">
                      <div className="flex items-center gap-2.5 truncate">
                        <FileText className="w-4 h-4 text-[#F2B705] shrink-0" weight="duotone" />
                        <span className="text-xs font-medium text-[#111111] truncate">{attachedFileName}</span>
                        <span className="text-[10px] text-[#888888] font-mono">({attachedFileSize})</span>
                      </div>
                      <button
                        type="button"
                        onClick={removeAttachedFile}
                        className="text-xs text-red-600 hover:text-red-800 font-medium shrink-0 ml-3 cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <label
                      htmlFor="fileUpload"
                      className="border border-dashed border-[#111111]/20 hover:border-[#111111] bg-[#FAF9F6] hover:bg-white p-3.5 rounded-lg flex items-center justify-between gap-3 cursor-pointer transition-colors group"
                    >
                      <div className="flex items-center gap-2.5">
                        <UploadSimple className="w-4 h-4 text-[#777777] group-hover:text-[#111111] transition-colors" />
                        <span className="text-xs text-[#555555] group-hover:text-[#111111] transition-colors">
                          Click to attach architectural drawings or door schedule
                        </span>
                      </div>
                      <span className="shrink-0 px-2.5 py-1 bg-white group-hover:bg-[#111111] group-hover:text-white border border-[#111111]/15 text-[11px] font-medium text-[#111111] rounded transition-colors shadow-2xs">
                        Browse
                      </span>
                    </label>
                  )}
                </div>

                {/* Consent & Submit */}
                <div className="pt-2 border-t border-[#111111]/10 space-y-4">
                  <label className="flex items-start gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="mt-0.5 h-3.5 w-3.5 rounded border-[#111111]/30 text-[#111111] focus:ring-[#F2B705] cursor-pointer"
                    />
                    <span className="text-xs text-[#666666] leading-relaxed">
                      I confirm these project details and consent to SIDDI contacting our studio regarding this specification.
                    </span>
                  </label>
                  {errors.consent && <p className="text-[11px] text-red-500">{errors.consent}</p>}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="roll-action inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#F2B418] hover:bg-[#FFC83A] text-[#171719] text-xs font-semibold uppercase tracking-wider rounded-[11px] transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <RollLabel>{isSubmitting ? 'Validating...' : 'Submit Inquiry'}</RollLabel>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Clean, Low-Text Information Cards */}
          <div className="lg:col-span-4 space-y-5">

            {/* Curated Sample Box (Minimal Text) */}
            <div className="p-6 bg-white text-[#171719] border border-black/10 rounded-2xl relative overflow-hidden shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#F2B705] font-semibold">
                  Sample Box
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-[#F4F3EF] rounded text-gray-600">
                  48h Dispatch
                </span>
              </div>

              <h3 className="text-xl font-serif font-normal text-[#171719] mb-1.5">
                Physical Finish Box
              </h3>
              <p className="text-xs text-gray-600 font-light mb-4">
                Curated solid brass finish coupons &amp; sample lever for qualified studios.
              </p>

              <button
                type="button"
                onClick={() => {
                  selectEnquiryType('sample-request');
                  window.scrollTo({ top: 350, behavior: 'smooth' });
                }}
                className="roll-action w-full inline-flex items-center justify-center gap-1.5 py-3.5 px-6 bg-[#F4F3EF] hover:bg-[#F2B418] hover:text-[#171719] text-[#171719] rounded-[11px] text-xs font-medium transition-colors cursor-pointer"
              >
                <RollLabel>Request Sample Set</RollLabel>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Direct Contact (Ultra Compact) */}
            <div className="p-6 bg-white border border-[#111111]/10 rounded-2xl space-y-3 shadow-2xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#111111]/10">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#111111]">
                  Direct Desk
                </span>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Mon–Fri • 09:00–18:30
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <a
                  href="mailto:trade@siddi-hardware.com"
                  className="flex items-center gap-2.5 p-2.5 bg-[#FAF9F6] border border-[#111111]/10 rounded-lg hover:border-[#111111] transition-colors group"
                >
                  <EnvelopeSimple className="w-4 h-4 text-[#F2B705] shrink-0" />
                  <div className="truncate">
                    <div className="text-[10px] text-[#777777] font-mono uppercase">Takeoffs</div>
                    <div className="font-medium text-[#111111] group-hover:text-[#F2B705] transition-colors truncate">
                      trade@siddi-hardware.com
                    </div>
                  </div>
                </a>

                <a
                  href="tel:+912245891200"
                  className="flex items-center gap-2.5 p-2.5 bg-[#FAF9F6] border border-[#111111]/10 rounded-lg hover:border-[#111111] transition-colors group"
                >
                  <Phone className="w-4 h-4 text-[#F2B705] shrink-0" />
                  <div>
                    <div className="text-[10px] text-[#777777] font-mono uppercase">Phone</div>
                    <div className="font-medium text-[#111111] group-hover:text-[#F2B705] transition-colors">
                      +91 (0) 22 4589 1200
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Atelier Location (Compact 2 Lines) */}
            <div className="p-4 bg-white border border-[#111111]/10 rounded-xl text-xs text-[#666666] flex items-start gap-2.5">
              <Buildings className="w-4 h-4 text-[#F2B705] shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-[#111111]">Foundry &amp; Manufacturing Atelier</div>
                <div className="text-[11px] text-[#777777] mt-0.5 font-light">
                  Plot 42, GIDC Shapar, Rajkot, Gujarat 360024
                </div>
              </div>
            </div>

          </div>

        </div>
      </ScrollReveal>


      {/* 4. SPECIFICATION JOURNEY: 3-STEP ARCHITECTURAL PROCESS */}
      <ScrollReveal as="section" className="bg-white border-y border-[#111111]/10 py-16 md:py-20">
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#F2B705] font-semibold block mb-2">
              Workflow Standard
            </span>
            <TextReveal
              as="h2"
              text="The Architectural Ironmongery Process"
              className="text-3xl md:text-4xl font-serif font-normal text-[#111111]"
            />
            <p className="text-xs sm:text-sm text-[#777777] mt-2">
              How our engineering team partners with your studio from initial schematic drawing to certified on-site hardware delivery.
            </p>
          </div>

          <ScrollRevealStagger className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.1} once={true}>
            <ScrollRevealItem className="p-8 bg-[#FAF9F6] border border-[#111111]/10 rounded-2xl relative">
              <div className="text-3xl font-serif text-[#F2B705] mb-4">01</div>
              <h3 className="text-lg font-serif font-normal text-[#111111] mb-2">
                Schedule Takeoff &amp; Gap Analysis
              </h3>
              <p className="text-xs text-[#666666] leading-relaxed">
                Submit door schedules or floor plans. Our ironmongers verify fire ratings, mortise depth clearances, backset compatibility, and door swing dynamics.
              </p>
            </ScrollRevealItem>

            <ScrollRevealItem className="p-8 bg-[#FAF9F6] border border-[#111111]/10 rounded-2xl relative">
              <div className="text-3xl font-serif text-[#F2B705] mb-4">02</div>
              <h3 className="text-lg font-serif font-normal text-[#111111] mb-2">
                Physical Sample Verification
              </h3>
              <p className="text-xs text-[#666666] leading-relaxed">
                We courier physical brass finish swatches, test handles, and 1:1 rose mockups directly to your project studio for tactile client sign-off.
              </p>
            </ScrollRevealItem>

            <ScrollRevealItem className="p-8 bg-[#FAF9F6] border border-[#111111]/10 rounded-2xl relative">
              <div className="text-3xl font-serif text-[#F2B705] mb-4">03</div>
              <h3 className="text-lg font-serif font-normal text-[#111111] mb-2">
                Door-by-Door Labeled Delivery
              </h3>
              <p className="text-xs text-[#666666] leading-relaxed">
                Hardware arrives sorted and custom-bagged per opening (Door ID / Level / Unit), drastically cutting on-site installation confusion and delays.
              </p>
            </ScrollRevealItem>
          </ScrollRevealStagger>
        </div>
      </ScrollReveal>

      {/* 5. ARCHITECTURAL FREQUENTLY ASKED QUESTIONS (BOUNCY ACCORDION) */}
      <ScrollReveal as="section" className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
          <div className="text-center mb-12">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#F2B705] font-semibold block mb-2">
              Trade Clarifications
            </span>
            <TextReveal
              as="h2"
              text="Frequently Asked Specification Questions"
              className="text-3xl md:text-4xl font-serif font-normal text-[#111111]"
            />
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
