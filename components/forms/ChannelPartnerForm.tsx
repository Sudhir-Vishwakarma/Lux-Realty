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
