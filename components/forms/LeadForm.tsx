'use client';

import { useState } from 'react';
import { submitLeadForm } from '@/lib/api';

const STATUS_OPTIONS = ['New', 'Contacted', 'Interested', 'Not Interested', 'Qualified', 'Site Visit Scheduled', 'Site Visit Done', 'Negotiation', 'Converted', 'Lost'];
const SOURCE_OPTIONS = ['Website', 'Social Media', 'Google Ads', 'Referral', 'Walk-in', 'Channel Partner', 'IVR / Call', 'Exhibition', 'Newspaper', 'Hoarding'];
const SUBSOURCE_OPTIONS = ['Facebook', 'Instagram', 'YouTube', 'Google Search', 'WhatsApp', '99acres', 'MagicBricks', 'Housing.com', 'NoBroker'];
const BUDGET_OPTIONS = ['Under 30L', '30L - 50L', '50L - 75L', '75L - 1Cr', '1Cr - 1.5Cr', '1.5Cr - 2Cr', '2Cr - 3Cr', 'Above 3Cr'];
const TIMELINE_OPTIONS = ['Immediate (0-1 Month)', '1-3 Months', '3-6 Months', '6-12 Months', 'More than 1 Year'];
const INTEREST_OPTIONS = ['Project A', 'Project B', 'Project C'];
const OWNER_OPTIONS = ['Sales Person 1', 'Sales Person 2', 'Sales Person 3'];

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
    try {
      const result = await submitLeadForm({
        name: form.name,
        phone: form.phone,
        alternate_phone: form.altPhone,
        email: form.email,
        status: form.status,
        source: form.source,
        sub_source: form.subSource,
        budget: form.budget,
        buying_timeline: form.buyingTimeline,
        project_interest: form.projectInterest,
        owner: form.owner,
        channel_partner: form.channelPartner,
      });
      if (result.success) setSubmitted(true);
      else setApiError(result.message);
    } finally {
      setLoading(false);
    }
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
        <p className="text-gray-500 text-sm">We&apos;ll follow up with this lead shortly.</p>
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
            className={inputCls(!!errors.altPhone)} placeholder="+91 XXXXX XXXXX" />
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
          <select value={form.subSource} onChange={e => set('subSource', e.target.value)} className={selectCls(!!errors.subSource)}>
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
          <select value={form.projectInterest} onChange={e => set('projectInterest', e.target.value)} className={selectCls(!!errors.projectInterest)}>
            <option value="">Select interest</option>
            {INTEREST_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </Field>
      </div>

      {/* Row: Owner + Channel Partner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Owner" error={errors.owner}>
          <select value={form.owner} onChange={e => set('owner', e.target.value)} className={selectCls(!!errors.owner)}>
            <option value="">Select owner</option>
            {OWNER_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </Field>
        <Field label="Channel Partner" error={errors.channelPartner}>
          <input type="text" value={form.channelPartner} onChange={e => set('channelPartner', e.target.value)}
            className={inputCls(!!errors.channelPartner)} placeholder="Partner name" />
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
  return `w-full border rounded-lg px-3 py-2 text-sm text-gray-900 bg-white outline-none focus:ring-2 focus:ring-blue-500 transition ${
    hasError ? 'border-red-400 bg-red-50' : 'border-gray-300'
  }`;
}

function selectCls(hasError: boolean) {
  return `w-full border rounded-lg px-3 py-2 text-sm text-gray-900 bg-white outline-none focus:ring-2 focus:ring-blue-500 transition ${
    hasError ? 'border-red-400 bg-red-50' : 'border-gray-300'
  }`;
}
