import React, { useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, CheckCircle, FileArrowUp, X } from '@phosphor-icons/react';
import { Meta } from '../components/common/Meta';
import { BouncyAccordion } from '../components/ui/be-ui-bouncy-accordion';

type EnquiryType = 'door-takeoff' | 'sample-box' | 'contract-supply' | 'custom-milling';
type FormStatus = 'idle' | 'submitting' | 'success' | 'unconfigured' | 'error';
type FormValues = { fullName: string; email: string; phone: string; productFocus: string; notes: string; enquiryType: EnquiryType; consent: boolean };

const enquiryTypes: { id: EnquiryType; label: string }[] = [
  { id: 'door-takeoff', label: 'Door takeoff' },
  { id: 'sample-box', label: 'Sample box' },
  { id: 'contract-supply', label: 'Contract supply' },
  { id: 'custom-milling', label: 'Custom milling' },
];
const acceptedFileTypes = ['pdf', 'dwg', 'xlsx'];
const maxFileSize = 25 * 1024 * 1024;

export const TradeDeskPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get('type');
  const validInitialType = enquiryTypes.find((item) => item.id === initialType)?.id ?? 'door-takeoff';
  const initialFocus = searchParams.get('product') ?? searchParams.get('finish') ?? searchParams.get('interest') ?? '';
  const [values, setValues] = useState<FormValues>({ fullName: '', email: '', phone: '', productFocus: initialFocus, notes: '', enquiryType: validInitialType, consent: false });
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [fileError, setFileError] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const update = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: '' }));
    if (status !== 'idle') setStatus('idle');
  };

  const addFiles = (incoming: FileList | File[]) => {
    const next = Array.from(incoming);
    const invalid = next.find((file) => {
      const extension = file.name.split('.').pop()?.toLowerCase() ?? '';
      return !acceptedFileTypes.includes(extension) || file.size > maxFileSize;
    });
    if (invalid) {
      const extension = invalid.name.split('.').pop()?.toLowerCase() ?? '';
      setFileError(!acceptedFileTypes.includes(extension) ? 'Use a PDF, DWG or XLSX file.' : 'Each file must be 25 MB or smaller.');
      return;
    }
    setFileError('');
    setFiles((current) => [...current, ...next.filter((file) => !current.some((item) => item.name === file.name && item.size === file.size))]);
    setStatus('idle');
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!values.fullName.trim()) next.fullName = 'Enter your name.';
    if (!values.email.trim()) next.email = 'Enter your work email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = 'Enter a valid email address.';
    if (!values.phone.trim()) next.phone = 'Enter a phone number.';
    if (!values.notes.trim()) next.notes = 'Add a short note about your project.';
    if (!values.consent) next.consent = 'Consent is required to send this enquiry.';
    setErrors(next);
    return Object.keys(next).length === 0 && !fileError;
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    const endpoint = import.meta.env.VITE_TRADE_DESK_ENDPOINT as string | undefined;
    if (!endpoint) {
      setStatus('unconfigured');
      return;
    }

    setStatus('submitting');
    try {
      const payload = new FormData();
      Object.entries(values).forEach(([key, value]) => payload.append(key, String(value)));
      files.forEach((file) => payload.append('files', file));
      const response = await fetch(endpoint, { method: 'POST', body: payload });
      if (!response.ok) throw new Error('The enquiry could not be sent. Try again.');
      setStatus('success');
      setValues({ fullName: '', email: '', phone: '', productFocus: '', notes: '', enquiryType: 'door-takeoff', consent: false });
      setFiles([]);
      setErrors({});
    } catch {
      setStatus('error');
    }
  };

  return <div className="trade-desk-page">
    <Meta title="Trade Desk — SIDDI" description="Send a door schedule, request samples or discuss a trade supply project with SIDDI." />
    <section className="page-hero trade-desk-hero">
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16">
        <nav className="catalogue__breadcrumb mono-label" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><span aria-current="page">Trade desk</span></nav>
        <div className="trade-desk-hero__content"><h1>Send us your door schedule.</h1><p>We return a door-by-door hardware takeoff within 48 hours.</p></div>
      </div>
    </section>

    <main>
      <section className="trade-desk-main">
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16">
          <div className="trade-desk-main__grid">
            <div className="trade-desk-form-panel">
              <div className="trade-desk-section-heading"><h2>Tell us what you need.</h2></div>
              <form className="trade-desk-form" onSubmit={submit} noValidate>
                <fieldset className="trade-desk-types"><legend className="mono-label">Enquiry type</legend><div>{enquiryTypes.map((item) => <button key={item.id} type="button" className={values.enquiryType === item.id ? 'is-selected' : ''} aria-pressed={values.enquiryType === item.id} onClick={() => update('enquiryType', item.id)}>{item.label}</button>)}</div></fieldset>

                <div className="trade-desk-form__fields">
                  <label className="trade-desk-field"><span>Name <b aria-hidden="true">*</b></span><input autoComplete="name" value={values.fullName} onChange={(event) => update('fullName', event.target.value)} aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? 'trade-name-error' : undefined} />{errors.fullName && <small id="trade-name-error">{errors.fullName}</small>}</label>
                  <label className="trade-desk-field"><span>Work email <b aria-hidden="true">*</b></span><input type="email" autoComplete="email" value={values.email} onChange={(event) => update('email', event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'trade-email-error' : undefined} />{errors.email && <small id="trade-email-error">{errors.email}</small>}</label>
                  <label className="trade-desk-field"><span>Phone <b aria-hidden="true">*</b></span><input type="tel" autoComplete="tel" value={values.phone} onChange={(event) => update('phone', event.target.value)} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'trade-phone-error' : undefined} />{errors.phone && <small id="trade-phone-error">{errors.phone}</small>}</label>
                  <label className="trade-desk-field"><span>Product focus <em>Optional</em></span><input value={values.productFocus} onChange={(event) => update('productFocus', event.target.value)} /></label>
                  <label className="trade-desk-field trade-desk-field--wide"><span>Project notes <b aria-hidden="true">*</b></span><textarea rows={5} value={values.notes} onChange={(event) => update('notes', event.target.value)} aria-invalid={Boolean(errors.notes)} aria-describedby={errors.notes ? 'trade-notes-error' : undefined} placeholder="Project location, door quantities, finish requirements or timing" />{errors.notes && <small id="trade-notes-error">{errors.notes}</small>}</label>
                </div>

                <div className="trade-desk-upload">
                  <span className="mono-label">Project files</span>
                  <input ref={inputRef} className="trade-desk-upload__input" type="file" accept=".pdf,.dwg,.xlsx,application/pdf,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" multiple onChange={(event) => { if (event.target.files) addFiles(event.target.files); event.target.value = ''; }} />
                  <button type="button" className={`trade-desk-upload__drop${isDragging ? ' is-dragging' : ''}`} onClick={() => inputRef.current?.click()} onDragOver={(event) => { event.preventDefault(); setIsDragging(true); }} onDragLeave={() => setIsDragging(false)} onDrop={(event) => { event.preventDefault(); setIsDragging(false); addFiles(event.dataTransfer.files); }}><FileArrowUp size={24} weight="regular" aria-hidden="true"/><span>Drop files here or <u>browse</u></span><small>PDF, DWG or XLSX · up to 25 MB per file</small></button>
                  {fileError && <p className="trade-desk-error" role="alert">{fileError}</p>}
                  {files.length > 0 && <ul className="trade-desk-upload__files">{files.map((file, index) => <li key={`${file.name}-${file.size}`}><span>{file.name} <small>{(file.size / (1024 * 1024)).toFixed(1)} MB</small></span><button type="button" aria-label={`Remove ${file.name}`} onClick={() => setFiles((current) => current.filter((_, fileIndex) => fileIndex !== index))}><X size={16} /></button></li>)}</ul>}
                </div>

                <label className="trade-desk-consent"><input type="checkbox" checked={values.consent} onChange={(event) => update('consent', event.target.checked)} aria-invalid={Boolean(errors.consent)} /><span>I agree that SIDDI may use these details to respond to my enquiry. <Link to="/privacy">Privacy policy</Link>.</span></label>
                {errors.consent && <small className="trade-desk-error">{errors.consent}</small>}
                {status === 'unconfigured' && <p className="trade-desk-status trade-desk-status--notice" role="status">Your details are valid, but online submission is not connected yet. No information has been sent. Please contact SIDDI to continue.</p>}
                {status === 'success' && <p className="trade-desk-status trade-desk-status--success" role="status"><CheckCircle size={18} weight="fill" /> Your enquiry has been sent. The trade desk will follow up.</p>}
                {status === 'error' && <p className="trade-desk-status trade-desk-status--error" role="alert">We could not send your enquiry. Please try again.</p>}
                <button className="btn-roll btn-primary trade-desk-submit" type="submit" disabled={status === 'submitting'}><span className="roll-wrapper"><span className="roll-label">{status === 'submitting' ? 'Sending enquiry…' : 'Send enquiry'}</span><span className="roll-clone" aria-hidden="true">Send enquiry</span></span><ArrowRight size={16} aria-hidden="true" /></button>
              </form>
            </div>

            <aside className="trade-desk-aside" aria-label="Trade desk information">
              <section className="trade-desk-aside__card"><span className="mono-label">Desk location</span><h2>Rajkot, India</h2><p>Contact details and office hours are pending confirmation.</p></section>
              <section className="trade-desk-aside__card"><span className="mono-label">Accepted schedules</span><h2>PDF, DWG, XLSX</h2><p>Attach files up to 25 MB each. You can also describe your project in the form.</p></section>
              <section className="trade-desk-aside__card trade-desk-aside__next"><span className="mono-label">What happens next</span><ol><li><span>01</span><p>We review your enquiry and schedule.</p></li><li><span>02</span><p>We confirm product and finish requirements.</p></li><li><span>03</span><p>We return the takeoff or follow up about samples and supply.</p></li></ol></section>
            </aside>
          </div>
        </div>
      </section>

      <section className="trade-desk-faq" aria-labelledby="trade-faq-title"><div className="w-full px-4 sm:px-6 md:px-10 lg:px-16"><div className="trade-desk-faq__inner"><div><h2 id="trade-faq-title">Before you send a schedule.</h2><p className="trade-desk-faq__intro">A few details to help you prepare your enquiry.</p></div><BouncyAccordion className="trade-desk-faq__list" items={[
        { id: 'file-types', title: 'Which file types can I attach?', description: 'PDF, DWG and XLSX files are accepted, up to 25 MB per file.' },
        { id: 'samples', title: 'Can I ask for samples without a door schedule?', description: 'Yes. Select “Sample box” and describe the finishes or products you would like to review.' },
        { id: 'takeoff', title: 'What information helps with a takeoff?', description: 'Include the project location, door quantities, hardware requirements and any relevant timing.' },
      ]} defaultValue="takeoff" /></div></div></section>
    </main>
  </div>;
};
