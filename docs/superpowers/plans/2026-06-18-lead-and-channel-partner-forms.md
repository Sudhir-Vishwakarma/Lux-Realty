# Lead & Channel Partner Forms — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add two modal forms to the LuxeRealty landing page — a Lead Generation Form (single-step, 12 fields) and a Channel Partner Registration Form (4-step wizard with file uploads), both wired for Google Sheets API submission.

**Architecture:** Shared `Modal.tsx` wrapper + reusable `FileUploadField.tsx` component. `lib/api.ts` handles all API calls with placeholder env vars. Modal open/close state lives locally in `Navbar.tsx` and `Footer.tsx`. No global state or external libraries needed.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, TypeScript 5. No additional dependencies required.

## Global Constraints

- Framework: Next.js 16.2.9 with App Router — read `node_modules/next/dist/docs/` before using any Next.js API
- Styling: Tailwind CSS 4 utility classes only — no custom CSS files
- All form components must have `'use client'` directive (they use `useState`)
- Modal header: `bg-blue-900` text white. Primary buttons: `bg-amber-500 hover:bg-amber-600` text white
- Error messages: `text-red-500 text-sm` below each invalid field
- File uploads: accept PDF, JPG, PNG only — max 2MB — validated client-side
- API calls use `fetch` to env var URLs; on success show success UI; on error show inline message, preserve form data
- `NEXT_PUBLIC_` prefix on all env vars (browser-side fetch)

---

## File Map

| Action | Path | Responsibility |
|---|---|---|
| Create | `.env.local` | API endpoint placeholders |
| Create | `lib/api.ts` | `submitLeadForm()` + `submitChannelPartnerForm()` |
| Create | `components/Modal.tsx` | Reusable modal wrapper (backdrop, ESC, scroll lock) |
| Create | `components/forms/FileUploadField.tsx` | Reusable file input with validation |
| Create | `components/forms/LeadForm.tsx` | Lead Generation Form (12 fields, single step) |
| Create | `components/forms/ChannelPartnerForm.tsx` | Channel Partner Registration (4-step wizard) |
| Modify | `components/Navbar.tsx` | Add modal state + trigger buttons |
| Modify | `components/Footer.tsx` | Add "Become a Partner" button + modal trigger |

---

## Task 1: Environment Setup + API Layer

**Files:**
- Create: `.env.local`
- Create: `lib/api.ts`

**Interfaces:**
- Produces:
  - `submitLeadForm(data: Record<string, string>): Promise<{ success: boolean; message: string }>`
  - `submitChannelPartnerForm(data: FormData): Promise<{ success: boolean; message: string }>`

- [ ] **Step 1: Create `.env.local` with placeholder API URLs**

Create `.env.local` at the project root:

```
NEXT_PUBLIC_LEAD_API_URL=https://your-google-sheets-lead-api-endpoint
NEXT_PUBLIC_CP_API_URL=https://your-google-sheets-cp-api-endpoint
```

- [ ] **Step 2: Create `lib/api.ts`**

```typescript
export async function submitLeadForm(
  data: Record<string, string>
): Promise<{ success: boolean; message: string }> {
  const url = process.env.NEXT_PUBLIC_LEAD_API_URL;
  if (!url) return { success: false, message: 'API URL not configured.' };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return { success: true, message: 'Lead submitted successfully.' };
  } catch {
    return { success: false, message: 'Submission failed. Please try again.' };
  }
}

export async function submitChannelPartnerForm(
  data: FormData
): Promise<{ success: boolean; message: string }> {
  const url = process.env.NEXT_PUBLIC_CP_API_URL;
  if (!url) return { success: false, message: 'API URL not configured.' };

  try {
    const res = await fetch(url, { method: 'POST', body: data });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return { success: true, message: 'Registration submitted successfully.' };
  } catch {
    return { success: false, message: 'Submission failed. Please try again.' };
  }
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
cd "/home/sudhirvishwakarma/Documents/Landing Pages/real-estate"
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add lib/api.ts .env.local
git commit -m "feat: add API layer for lead and channel partner form submissions"
```

---

## Task 2: Modal Wrapper Component

**Files:**
- Create: `components/Modal.tsx`

**Interfaces:**
- Consumes: nothing
- Produces:
  ```typescript
  interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
  }
  export default function Modal(props: ModalProps): JSX.Element
  ```

- [ ] **Step 1: Create `components/Modal.tsx`**

```typescript
'use client';

import { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handler);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] flex flex-col bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-blue-900">
          <h2 className="text-white font-bold text-lg">{title}</h2>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/Modal.tsx
git commit -m "feat: add reusable Modal wrapper component"
```

---

## Task 3: FileUploadField Component

**Files:**
- Create: `components/forms/FileUploadField.tsx`

**Interfaces:**
- Consumes: nothing
- Produces:
  ```typescript
  interface FileUploadFieldProps {
    label: string;
    required?: boolean;
    onChange: (file: File | null) => void;
    error?: string;
  }
  export default function FileUploadField(props: FileUploadFieldProps): JSX.Element
  ```

- [ ] **Step 1: Create `components/forms/` directory and `FileUploadField.tsx`**

```bash
mkdir -p "/home/sudhirvishwakarma/Documents/Landing Pages/real-estate/components/forms"
```

Create `components/forms/FileUploadField.tsx`:

```typescript
'use client';

import { useRef, useState } from 'react';

interface FileUploadFieldProps {
  label: string;
  required?: boolean;
  onChange: (file: File | null) => void;
  error?: string;
}

const ACCEPTED = ['application/pdf', 'image/jpeg', 'image/png'];
const MAX_BYTES = 2 * 1024 * 1024; // 2MB

export default function FileUploadField({ label, required, onChange, error }: FileUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>('No file chosen');
  const [localError, setLocalError] = useState<string>('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setLocalError('');
    if (!file) { setFileName('No file chosen'); onChange(null); return; }

    if (!ACCEPTED.includes(file.type)) {
      setLocalError('Only PDF, JPG, or PNG files are allowed.');
      setFileName('No file chosen');
      onChange(null);
      e.target.value = '';
      return;
    }
    if (file.size > MAX_BYTES) {
      setLocalError('File must be under 2MB.');
      setFileName('No file chosen');
      onChange(null);
      e.target.value = '';
      return;
    }
    setFileName(file.name);
    onChange(file);
  }

  const displayError = error || localError;

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div
        onClick={() => inputRef.current?.click()}
        className={`flex items-center gap-3 border-2 border-dashed rounded-lg px-4 py-3 cursor-pointer bg-blue-50 hover:bg-blue-100 transition-colors ${
          displayError ? 'border-red-400' : 'border-blue-200'
        }`}
      >
        <svg className="w-5 h-5 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
        <span className="text-sm text-gray-500 truncate">{fileName}</span>
        <span className="ml-auto text-xs text-blue-600 font-medium shrink-0">Browse</span>
      </div>
      <p className="text-xs text-gray-400">PDF, JPG, PNG — Max 2MB</p>
      {displayError && <p className="text-red-500 text-sm">{displayError}</p>}
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/forms/FileUploadField.tsx
git commit -m "feat: add reusable FileUploadField with type and size validation"
```

---

## Task 4: Lead Generation Form

**Files:**
- Create: `components/forms/LeadForm.tsx`

**Interfaces:**
- Consumes:
  - `submitLeadForm(data: Record<string, string>): Promise<{ success: boolean; message: string }>` from `lib/api.ts`
- Produces:
  ```typescript
  export default function LeadForm(): JSX.Element
  ```

- [ ] **Step 1: Create `components/forms/LeadForm.tsx`**

```typescript
'use client';

import { useState } from 'react';
import { submitLeadForm } from '@/lib/api';

const STATUS_OPTIONS = ['New', 'Interested', 'Not Interested', 'Follow Up', 'Converted', 'Lost'];
const SOURCE_OPTIONS = ['Website', 'Walk-in', 'Referral', 'Social Media', 'Advertisement', 'Other'];
const SUBSOURCE_OPTIONS = ['Facebook', 'Instagram', 'Google Ads', 'YouTube', 'Newspaper', 'Hoarding', 'Other'];
const BUDGET_OPTIONS = ['Under ₹25L', '₹25L–₹50L', '₹50L–₹1Cr', '₹1Cr–₹2Cr', 'Above ₹2Cr'];
const TIMELINE_OPTIONS = ['Immediate', 'Within 3 Months', '3–6 Months', '6–12 Months', 'No Fixed Timeline'];
const INTEREST_OPTIONS = ['Residential', 'Commercial', 'Plots', 'Villas', 'Luxury Apartments'];
const OWNER_OPTIONS = ['Admin', 'Agent 1', 'Agent 2', 'Agent 3'];

const REQUIRED_FIELDS = ['name', 'phone', 'email', 'status', 'source', 'budget', 'buyingTimeline'];

type FormData = {
  name: string; phone: string; altPhone: string; email: string;
  status: string; source: string; subSource: string; budget: string;
  buyingTimeline: string; projectInterest: string; owner: string; channelPartner: string;
};

const EMPTY: FormData = {
  name: '', phone: '', altPhone: '', email: '',
  status: '', source: '', subSource: '', budget: '',
  buyingTimeline: '', projectInterest: '', owner: '', channelPartner: '',
};

export default function LeadForm() {
  const [form, setForm] = useState<FormData>(EMPTY);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError] = useState('');

  function set(field: keyof FormData, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  }

  function validate(): boolean {
    const next: Partial<FormData> = {};
    if (!form.name.trim()) next.name = 'Name is required.';
    if (!form.phone.trim()) next.phone = 'Phone is required.';
    if (!form.email.trim()) next.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email.';
    if (!form.status) next.status = 'Status is required.';
    if (!form.source) next.source = 'Source is required.';
    if (!form.budget) next.budget = 'Budget is required.';
    if (!form.buyingTimeline) next.buyingTimeline = 'Buying timeline is required.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setApiError('');
    const result = await submitLeadForm({
      Name: form.name, Phone: form.phone, 'Alternate Phone': form.altPhone,
      Email: form.email, Status: form.status, Source: form.source,
      'Sub-source': form.subSource, Budget: form.budget,
      'Buying Timeline': form.buyingTimeline, 'Project Interest': form.projectInterest,
      Owner: form.owner, 'Channel Partner': form.channelPartner,
    });
    setLoading(false);
    if (result.success) setSubmitted(true);
    else setApiError(result.message);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-800">Lead Submitted!</h3>
        <p className="text-gray-500 text-sm">We'll follow up with this lead shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      {/* Row: Name + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Name" required error={errors.name}>
          <input type="text" value={form.name} onChange={e => set('name', e.target.value)}
            className={inputCls(!!errors.name)} placeholder="Full name" />
        </Field>
        <Field label="Phone" required error={errors.phone}>
          <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)}
            className={inputCls(!!errors.phone)} placeholder="+91 XXXXX XXXXX" />
        </Field>
      </div>

      {/* Row: Alt Phone + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Alternate Phone" error={errors.altPhone}>
          <input type="tel" value={form.altPhone} onChange={e => set('altPhone', e.target.value)}
            className={inputCls(false)} placeholder="+91 XXXXX XXXXX" />
        </Field>
        <Field label="Email" required error={errors.email}>
          <input type="email" value={form.email} onChange={e => set('email', e.target.value)}
            className={inputCls(!!errors.email)} placeholder="you@example.com" />
        </Field>
      </div>

      {/* Row: Status + Source */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Status" required error={errors.status}>
          <select value={form.status} onChange={e => set('status', e.target.value)} className={selectCls(!!errors.status)}>
            <option value="">Select status</option>
            {STATUS_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </Field>
        <Field label="Source" required error={errors.source}>
          <select value={form.source} onChange={e => set('source', e.target.value)} className={selectCls(!!errors.source)}>
            <option value="">Select source</option>
            {SOURCE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </Field>
      </div>

      {/* Row: Sub-source + Budget */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Sub-source" error={errors.subSource}>
          <select value={form.subSource} onChange={e => set('subSource', e.target.value)} className={selectCls(false)}>
            <option value="">Select sub-source</option>
            {SUBSOURCE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </Field>
        <Field label="Budget" required error={errors.budget}>
          <select value={form.budget} onChange={e => set('budget', e.target.value)} className={selectCls(!!errors.budget)}>
            <option value="">Select budget</option>
            {BUDGET_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </Field>
      </div>

      {/* Row: Buying Timeline + Project Interest */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Buying Timeline" required error={errors.buyingTimeline}>
          <select value={form.buyingTimeline} onChange={e => set('buyingTimeline', e.target.value)} className={selectCls(!!errors.buyingTimeline)}>
            <option value="">Select timeline</option>
            {TIMELINE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </Field>
        <Field label="Project Interest" error={errors.projectInterest}>
          <select value={form.projectInterest} onChange={e => set('projectInterest', e.target.value)} className={selectCls(false)}>
            <option value="">Select interest</option>
            {INTEREST_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </Field>
      </div>

      {/* Row: Owner + Channel Partner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Owner" error={errors.owner}>
          <select value={form.owner} onChange={e => set('owner', e.target.value)} className={selectCls(false)}>
            <option value="">Select owner</option>
            {OWNER_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </Field>
        <Field label="Channel Partner" error={errors.channelPartner}>
          <input type="text" value={form.channelPartner} onChange={e => set('channelPartner', e.target.value)}
            className={inputCls(false)} placeholder="Partner name" />
        </Field>
      </div>

      {apiError && <p className="text-red-500 text-sm text-center">{apiError}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-semibold py-3 rounded-lg transition-colors mt-2"
      >
        {loading ? 'Submitting…' : 'Submit Lead'}
      </button>
    </form>
  );
}

function Field({ label, required, error, children }: {
  label: string; required?: boolean; error?: string; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

function inputCls(hasError: boolean) {
  return `border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition ${
    hasError ? 'border-red-400 bg-red-50' : 'border-gray-300'
  }`;
}

function selectCls(hasError: boolean) {
  return `border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition bg-white ${
    hasError ? 'border-red-400 bg-red-50' : 'border-gray-300'
  }`;
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/forms/LeadForm.tsx
git commit -m "feat: add Lead Generation Form with validation and API integration"
```

---

## Task 5: Channel Partner Registration Form (4-step wizard)

**Files:**
- Create: `components/forms/ChannelPartnerForm.tsx`

**Interfaces:**
- Consumes:
  - `submitChannelPartnerForm(data: FormData): Promise<{ success: boolean; message: string }>` from `lib/api.ts`
  - `FileUploadField` from `components/forms/FileUploadField.tsx`
- Produces:
  ```typescript
  export default function ChannelPartnerForm(): JSX.Element
  ```

- [ ] **Step 1: Create `components/forms/ChannelPartnerForm.tsx`**

```typescript
'use client';

import { useState } from 'react';
import FileUploadField from './FileUploadField';
import { submitChannelPartnerForm } from '@/lib/api';

type Step1 = { applicantName: string; companyName: string; mobile: string; email: string; address: string; };
type Step2 = { panNumber: string; panDoc: File | null; reraNumber: string; reraDoc: File | null; gstNumber: string; gstDoc: File | null; experience: string; };
type Step3 = { accountHolder: string; bankName: string; accountNumber: string; ifsc: string; beneficiary: string; cheque: File | null; };
type Step4 = { idType: string; idNumber: string; idDoc: File | null; remarks: string; };

const ID_TYPES = ['Aadhaar', 'PAN', 'Passport', 'Driving Licence', 'Voter ID'];

const EMPTY1: Step1 = { applicantName: '', companyName: '', mobile: '', email: '', address: '' };
const EMPTY2: Step2 = { panNumber: '', panDoc: null, reraNumber: '', reraDoc: null, gstNumber: '', gstDoc: null, experience: '' };
const EMPTY3: Step3 = { accountHolder: '', bankName: '', accountNumber: '', ifsc: '', beneficiary: '', cheque: null };
const EMPTY4: Step4 = { idType: '', idNumber: '', idDoc: null, remarks: '' };

const STEP_LABELS = ['Personal & Business', 'Documents', 'Bank Details', 'Identity & Submit'];

export default function ChannelPartnerForm() {
  const [step, setStep] = useState(1);
  const [s1, setS1] = useState<Step1>(EMPTY1);
  const [s2, setS2] = useState<Step2>(EMPTY2);
  const [s3, setS3] = useState<Step3>(EMPTY3);
  const [s4, setS4] = useState<Step4>(EMPTY4);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError] = useState('');

  function clearError(key: string) {
    setErrors(prev => { const n = { ...prev }; delete n[key]; return n; });
  }

  function validateStep1(): boolean {
    const e: Record<string, string> = {};
    if (!s1.applicantName.trim()) e.applicantName = 'Applicant name is required.';
    if (!s1.mobile.trim()) e.mobile = 'Mobile number is required.';
    if (!s1.email.trim()) e.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s1.email)) e.email = 'Enter a valid email.';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validateStep2(): boolean {
    const e: Record<string, string> = {};
    if (!s2.panNumber.trim()) e.panNumber = 'PAN number is required.';
    if (!s2.panDoc) e.panDoc = 'PAN document is required.';
    if (!s2.experience.trim()) e.experience = 'Experience is required.';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validateStep3(): boolean {
    const e: Record<string, string> = {};
    if (!s3.accountHolder.trim()) e.accountHolder = 'Account holder name is required.';
    if (!s3.bankName.trim()) e.bankName = 'Bank name is required.';
    if (!s3.accountNumber.trim()) e.accountNumber = 'Account number is required.';
    if (!s3.ifsc.trim()) e.ifsc = 'IFSC code is required.';
    if (!s3.beneficiary.trim()) e.beneficiary = 'Beneficiary name is required.';
    if (!s3.cheque) e.cheque = 'Cancelled cheque is required.';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validateStep4(): boolean {
    const e: Record<string, string> = {};
    if (!s4.idType) e.idType = 'ID proof type is required.';
    if (!s4.idNumber.trim()) e.idNumber = 'ID proof number is required.';
    if (!s4.idDoc) e.idDoc = 'ID proof document is required.';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleNext() {
    setErrors({});
    const valid = step === 1 ? validateStep1() : step === 2 ? validateStep2() : validateStep3();
    if (valid) setStep(s => s + 1);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateStep4()) return;
    setLoading(true);
    setApiError('');

    const fd = new FormData();
    fd.append('Applicant Name', s1.applicantName);
    fd.append('Company Name', s1.companyName);
    fd.append('Mobile', s1.mobile);
    fd.append('Email', s1.email);
    fd.append('Address', s1.address);
    fd.append('PAN Number', s2.panNumber);
    if (s2.panDoc) fd.append('PAN Document', s2.panDoc);
    fd.append('RERA Number', s2.reraNumber);
    if (s2.reraDoc) fd.append('RERA Document', s2.reraDoc);
    fd.append('GST Number', s2.gstNumber);
    if (s2.gstDoc) fd.append('GST Document', s2.gstDoc);
    fd.append('Experience (Years)', s2.experience);
    fd.append('Account Holder', s3.accountHolder);
    fd.append('Bank Name', s3.bankName);
    fd.append('Account Number', s3.accountNumber);
    fd.append('IFSC Code', s3.ifsc);
    fd.append('Beneficiary', s3.beneficiary);
    if (s3.cheque) fd.append('Cancelled Cheque', s3.cheque);
    fd.append('ID Type', s4.idType);
    fd.append('ID Number', s4.idNumber);
    if (s4.idDoc) fd.append('ID Document', s4.idDoc);
    fd.append('Remarks', s4.remarks);

    const result = await submitChannelPartnerForm(fd);
    setLoading(false);
    if (result.success) setSubmitted(true);
    else setApiError(result.message);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-800">Registration Submitted!</h3>
        <p className="text-gray-500 text-sm">Our team will review your application and get in touch soon.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Progress bar */}
      <div>
        <div className="flex justify-between mb-2">
          {STEP_LABELS.map((label, i) => (
            <span key={label} className={`text-xs font-medium ${i + 1 <= step ? 'text-blue-900' : 'text-gray-400'}`}>
              {i + 1}. {label}
            </span>
          ))}
        </div>
        <div className="w-full h-2 bg-blue-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-500 rounded-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1 text-right">Step {step} of 4</p>
      </div>

      {/* Step content */}
      {step === 1 && <Step1Fields s={s1} setS={setS1} errors={errors} clearError={clearError} />}
      {step === 2 && <Step2Fields s={s2} setS={setS2} errors={errors} clearError={clearError} />}
      {step === 3 && <Step3Fields s={s3} setS={setS3} errors={errors} clearError={clearError} />}
      {step === 4 && (
        <form onSubmit={handleSubmit}>
          <Step4Fields s={s4} setS={setS4} errors={errors} clearError={clearError} />
          {apiError && <p className="text-red-500 text-sm text-center mt-2">{apiError}</p>}
          <div className="flex gap-3 mt-6">
            <button type="button" onClick={() => setStep(3)}
              className="flex-1 border-2 border-blue-900 text-blue-900 font-semibold py-3 rounded-lg hover:bg-blue-50 transition-colors">
              Back
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-semibold py-3 rounded-lg transition-colors">
              {loading ? 'Submitting…' : 'Submit Registration'}
            </button>
          </div>
        </form>
      )}

      {/* Navigation for steps 1-3 */}
      {step < 4 && (
        <div className="flex gap-3">
          {step > 1 && (
            <button type="button" onClick={() => setStep(s => s - 1)}
              className="flex-1 border-2 border-blue-900 text-blue-900 font-semibold py-3 rounded-lg hover:bg-blue-50 transition-colors">
              Back
            </button>
          )}
          <button type="button" onClick={handleNext}
            className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-lg transition-colors">
            Next
          </button>
        </div>
      )}
    </div>
  );
}

/* ── Sub-components for each step ── */

function Step1Fields({ s, setS, errors, clearError }: {
  s: Step1; setS: React.Dispatch<React.SetStateAction<Step1>>;
  errors: Record<string, string>; clearError: (k: string) => void;
}) {
  function set(k: keyof Step1, v: string) { setS(p => ({ ...p, [k]: v })); clearError(k); }
  return (
    <div className="flex flex-col gap-4">
      <Field label="Applicant Name" required error={errors.applicantName}>
        <input type="text" value={s.applicantName} onChange={e => set('applicantName', e.target.value)}
          className={inputCls(!!errors.applicantName)} placeholder="Full legal name" />
      </Field>
      <Field label="Company / Business Name" error={errors.companyName}>
        <input type="text" value={s.companyName} onChange={e => set('companyName', e.target.value)}
          className={inputCls(false)} placeholder="Company or business name" />
      </Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Mobile Number" required error={errors.mobile}>
          <input type="tel" value={s.mobile} onChange={e => set('mobile', e.target.value)}
            className={inputCls(!!errors.mobile)} placeholder="+91 XXXXX XXXXX" />
        </Field>
        <Field label="Personal Email" required error={errors.email}>
          <input type="email" value={s.email} onChange={e => set('email', e.target.value)}
            className={inputCls(!!errors.email)} placeholder="you@example.com" />
        </Field>
      </div>
      <Field label="Company Address" error={errors.address}>
        <textarea value={s.address} onChange={e => set('address', e.target.value)} rows={3}
          className={inputCls(false) + ' resize-none'} placeholder="Full business address" />
      </Field>
    </div>
  );
}

function Step2Fields({ s, setS, errors, clearError }: {
  s: Step2; setS: React.Dispatch<React.SetStateAction<Step2>>;
  errors: Record<string, string>; clearError: (k: string) => void;
}) {
  function set(k: keyof Step2, v: string | File | null) { setS(p => ({ ...p, [k]: v })); clearError(k); }
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="PAN Number" required error={errors.panNumber}>
          <input type="text" value={s.panNumber} onChange={e => set('panNumber', e.target.value.toUpperCase())}
            className={inputCls(!!errors.panNumber)} placeholder="ABCDE1234F" maxLength={10} />
        </Field>
        <FileUploadField label="PAN Document" required onChange={f => set('panDoc', f)} error={errors.panDoc} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="RERA Number" error={errors.reraNumber}>
          <input type="text" value={s.reraNumber} onChange={e => set('reraNumber', e.target.value)}
            className={inputCls(false)} placeholder="RERA registration number" />
        </Field>
        <FileUploadField label="RERA Document" onChange={f => set('reraDoc', f)} error={errors.reraDoc} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="GST Number" error={errors.gstNumber}>
          <input type="text" value={s.gstNumber} onChange={e => set('gstNumber', e.target.value.toUpperCase())}
            className={inputCls(false)} placeholder="22AAAAA0000A1Z5" />
        </Field>
        <FileUploadField label="GST Document" onChange={f => set('gstDoc', f)} error={errors.gstDoc} />
      </div>
      <Field label="Experience in Real Estate (Years)" required error={errors.experience}>
        <input type="number" min="0" max="60" value={s.experience} onChange={e => set('experience', e.target.value)}
          className={inputCls(!!errors.experience)} placeholder="e.g. 5" />
      </Field>
    </div>
  );
}

function Step3Fields({ s, setS, errors, clearError }: {
  s: Step3; setS: React.Dispatch<React.SetStateAction<Step3>>;
  errors: Record<string, string>; clearError: (k: string) => void;
}) {
  function set(k: keyof Step3, v: string | File | null) { setS(p => ({ ...p, [k]: v })); clearError(k); }
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Bank Account Holder Name" required error={errors.accountHolder}>
          <input type="text" value={s.accountHolder} onChange={e => set('accountHolder', e.target.value)}
            className={inputCls(!!errors.accountHolder)} placeholder="As per bank records" />
        </Field>
        <Field label="Bank Name" required error={errors.bankName}>
          <input type="text" value={s.bankName} onChange={e => set('bankName', e.target.value)}
            className={inputCls(!!errors.bankName)} placeholder="e.g. HDFC Bank" />
        </Field>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Account Number" required error={errors.accountNumber}>
          <input type="text" value={s.accountNumber} onChange={e => set('accountNumber', e.target.value)}
            className={inputCls(!!errors.accountNumber)} placeholder="Bank account number" />
        </Field>
        <Field label="IFSC Code" required error={errors.ifsc}>
          <input type="text" value={s.ifsc} onChange={e => set('ifsc', e.target.value.toUpperCase())}
            className={inputCls(!!errors.ifsc)} placeholder="e.g. HDFC0001234" maxLength={11} />
        </Field>
      </div>
      <Field label="Beneficiary Name" required error={errors.beneficiary}>
        <input type="text" value={s.beneficiary} onChange={e => set('beneficiary', e.target.value)}
          className={inputCls(!!errors.beneficiary)} placeholder="Beneficiary name" />
      </Field>
      <FileUploadField label="Cancelled Cheque" required onChange={f => set('cheque', f)} error={errors.cheque} />
    </div>
  );
}

function Step4Fields({ s, setS, errors, clearError }: {
  s: Step4; setS: React.Dispatch<React.SetStateAction<Step4>>;
  errors: Record<string, string>; clearError: (k: string) => void;
}) {
  function set(k: keyof Step4, v: string | File | null) { setS(p => ({ ...p, [k]: v })); clearError(k); }
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Personal ID Proof Type" required error={errors.idType}>
          <select value={s.idType} onChange={e => set('idType', e.target.value)} className={selectCls(!!errors.idType)}>
            <option value="">Select ID type</option>
            {ID_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </Field>
        <Field label="Personal ID Proof Number" required error={errors.idNumber}>
          <input type="text" value={s.idNumber} onChange={e => set('idNumber', e.target.value)}
            className={inputCls(!!errors.idNumber)} placeholder="ID number" />
        </Field>
      </div>
      <FileUploadField label="ID Proof Upload" required onChange={f => set('idDoc', f)} error={errors.idDoc} />
      <Field label="Remarks / Additional Information" error={errors.remarks}>
        <textarea value={s.remarks} onChange={e => set('remarks', e.target.value)} rows={3}
          className={inputCls(false) + ' resize-none'} placeholder="Any additional notes..." />
      </Field>
    </div>
  );
}

function Field({ label, required, error, children }: {
  label: string; required?: boolean; error?: string; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

function inputCls(hasError: boolean) {
  return `border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition ${
    hasError ? 'border-red-400 bg-red-50' : 'border-gray-300'
  }`;
}

function selectCls(hasError: boolean) {
  return `border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition bg-white ${
    hasError ? 'border-red-400 bg-red-50' : 'border-gray-300'
  }`;
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/forms/ChannelPartnerForm.tsx
git commit -m "feat: add 4-step Channel Partner Registration Form wizard"
```

---

## Task 6: Wire Navbar

**Files:**
- Modify: `components/Navbar.tsx`

**Interfaces:**
- Consumes:
  - `Modal` from `components/Modal.tsx`
  - `LeadForm` from `components/forms/LeadForm.tsx`
  - `ChannelPartnerForm` from `components/forms/ChannelPartnerForm.tsx`

- [ ] **Step 1: Replace `components/Navbar.tsx` with wired version**

Replace the entire file with:

```typescript
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Modal from '@/components/Modal';
import LeadForm from '@/components/forms/LeadForm';
import ChannelPartnerForm from '@/components/forms/ChannelPartnerForm';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [leadOpen, setLeadOpen] = useState(false);
  const [cpOpen, setCpOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-blue-900">Luxe<span className="text-amber-500">Realty</span></span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {['Buy', 'Rent', 'Sell', 'Agents', 'Blog'].map((item) => (
                <Link key={item} href="#"
                  className="text-gray-600 hover:text-blue-900 font-medium transition-colors text-sm">
                  {item}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Link href="#" className="text-sm font-medium text-gray-600 hover:text-blue-900 transition-colors">
                Sign In
              </Link>
              <button onClick={() => setCpOpen(true)}
                className="text-sm font-semibold text-blue-900 border border-blue-900 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                Become a Partner
              </button>
              <button onClick={() => setLeadOpen(true)}
                className="bg-blue-900 text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-blue-800 transition-colors">
                List Property
              </button>
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <div className="md:hidden border-t border-gray-100 py-4 flex flex-col gap-4">
              {['Buy', 'Rent', 'Sell', 'Agents', 'Blog'].map((item) => (
                <Link key={item} href="#" className="text-gray-600 hover:text-blue-900 font-medium text-sm">{item}</Link>
              ))}
              <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
                <Link href="#" className="text-sm font-medium text-gray-600">Sign In</Link>
                <button onClick={() => { setCpOpen(true); setMenuOpen(false); }}
                  className="text-sm font-semibold text-blue-900 border border-blue-900 px-4 py-2 rounded-lg text-left">
                  Become a Partner
                </button>
                <button onClick={() => { setLeadOpen(true); setMenuOpen(false); }}
                  className="bg-blue-900 text-white text-sm font-semibold px-4 py-2 rounded-lg text-left">
                  List Property
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      <Modal isOpen={leadOpen} onClose={() => setLeadOpen(false)} title="Lead Generation">
        <LeadForm />
      </Modal>

      <Modal isOpen={cpOpen} onClose={() => setCpOpen(false)} title="Channel Partner Registration">
        <ChannelPartnerForm />
      </Modal>
    </>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/Navbar.tsx
git commit -m "feat: wire Lead and Channel Partner modals to Navbar buttons"
```

---

## Task 7: Wire Footer

**Files:**
- Modify: `components/Footer.tsx`

**Interfaces:**
- Consumes:
  - `Modal` from `components/Modal.tsx`
  - `ChannelPartnerForm` from `components/forms/ChannelPartnerForm.tsx`

- [ ] **Step 1: Replace `components/Footer.tsx` with wired version**

Replace the entire file with:

```typescript
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Modal from '@/components/Modal';
import ChannelPartnerForm from '@/components/forms/ChannelPartnerForm';

const links = {
  Company: ['About Us', 'Careers', 'Press', 'Blog', 'Contact'],
  Properties: ['Buy', 'Rent', 'Sell', 'Commercial', 'New Developments'],
  Resources: ['Market Reports', 'Mortgage Calculator', 'Buyer Guide', 'Seller Guide', 'FAQ'],
};

export default function Footer() {
  const [cpOpen, setCpOpen] = useState(false);

  return (
    <>
      <footer className="bg-gray-950 text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-800 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-white">Luxe<span className="text-amber-400">Realty</span></span>
              </Link>
              <p className="text-sm leading-relaxed mb-6 max-w-xs">
                Your trusted real estate partner since 2009. Helping thousands of families find their perfect home across the country.
              </p>

              {/* Contact info */}
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +1 (800) 555-LUXE
                </p>
                <p className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  hello@luxerealty.com
                </p>
                <p className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  123 Realty Ave, New York, NY 10001
                </p>
              </div>

              {/* Become a Partner CTA */}
              <button
                onClick={() => setCpOpen(true)}
                className="mt-6 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
              >
                Become a Channel Partner
              </button>
            </div>

            {/* Links */}
            {Object.entries(links).map(([category, items]) => (
              <div key={category}>
                <h4 className="text-white font-semibold mb-4 text-sm">{category}</h4>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item}>
                      <Link href="#" className="text-sm hover:text-amber-400 transition-colors">{item}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom */}
          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs">© 2024 LuxeRealty. All rights reserved.</p>
            <div className="flex gap-4">
              {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                <Link key={social} href="#"
                  className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors"
                  aria-label={social}>
                  <span className="text-xs">{social[0].toUpperCase()}</span>
                </Link>
              ))}
            </div>
            <div className="flex gap-4 text-xs">
              <Link href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-amber-400 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>

      <Modal isOpen={cpOpen} onClose={() => setCpOpen(false)} title="Channel Partner Registration">
        <ChannelPartnerForm />
      </Modal>
    </>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Start dev server and visually verify**

```bash
npm run dev
```

Open `http://localhost:3000` and verify:
- "List Property" in Navbar opens Lead Generation modal
- "Become a Partner" in Navbar opens Channel Partner Registration modal
- "Become a Channel Partner" in Footer opens Channel Partner Registration modal
- ESC key closes modals
- Clicking backdrop closes modals
- Body scroll is locked when modal is open
- Lead form: required field errors appear on submit without filling fields
- Lead form: success screen appears after filling required fields and submitting
- Channel Partner form: progress bar advances on Next, Back button preserves data
- File upload: invalid file type shows error, valid file shows filename
- File upload: file over 2MB shows error

- [ ] **Step 4: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat: add Become a Channel Partner button and modal to Footer"
```
