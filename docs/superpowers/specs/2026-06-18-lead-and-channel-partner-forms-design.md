# Lead Generation & Channel Partner Registration Forms

**Date:** 2026-06-18
**Project:** LuxeRealty Real Estate Landing Page

---

## Overview

Two modal forms added to the existing LuxeRealty landing page:
1. **Lead Generation Form** — single-step modal, 12 fields
2. **Channel Partner Registration Form** — 4-step wizard modal, 20+ fields with file uploads

Both forms POST to Google Sheets API endpoints (credentials to be provided by developer).

---

## Triggers

| Form | Trigger |
|---|---|
| Lead Generation | "List Property" button in Navbar |
| Channel Partner Registration | New "Become a Partner" button in Navbar + Footer |

---

## Shared Infrastructure

### `components/Modal.tsx`
- Reusable modal wrapper
- Dark backdrop overlay
- Close button (top-right X)
- ESC key closes modal
- Scroll lock on body when open
- Scrollable content area for long forms

### `lib/api.ts`
- `submitLeadForm(data)` — POST to `NEXT_PUBLIC_LEAD_API_URL`
- `submitChannelPartnerForm(data)` — POST to `NEXT_PUBLIC_CP_API_URL`
- Both functions use `fetch`, return `{ success: boolean, message: string }`
- File fields submitted as `FormData` (multipart)

### `.env.local` (placeholders)
```
NEXT_PUBLIC_LEAD_API_URL=https://your-google-sheets-api-endpoint
NEXT_PUBLIC_CP_API_URL=https://your-google-sheets-api-endpoint
```

---

## Form 1: Lead Generation Form

**Component:** `components/forms/LeadForm.tsx`
**Type:** Single-step, client component

### Fields

| Field | Type | Required | Options |
|---|---|---|---|
| Name | Text | Yes | — |
| Phone | Tel | Yes | — |
| Alternate Phone | Tel | No | — |
| Email | Email | Yes | — |
| Status | Select | Yes | New, Interested, Not Interested, Follow Up, Converted, Lost |
| Source | Select | Yes | Website, Walk-in, Referral, Social Media, Advertisement, Other |
| Sub-source | Select | No | Facebook, Instagram, Google Ads, YouTube, Newspaper, Hoarding, Other |
| Budget | Select | Yes | Under ₹25L, ₹25L–₹50L, ₹50L–₹1Cr, ₹1Cr–₹2Cr, Above ₹2Cr |
| Buying Timeline | Select | Yes | Immediate, Within 3 Months, 3–6 Months, 6–12 Months, No Fixed Timeline |
| Project Interest | Select | No | Residential, Commercial, Plots, Villas, Luxury Apartments |
| Owner | Select | No | Admin, Agent 1, Agent 2, Agent 3 |
| Channel Partner | Text | No | — |

### Behavior
- Validate required fields on submit
- Show inline red error messages below invalid fields
- On submit: call `submitLeadForm()`, show loading spinner on button
- On success: show success message inside modal with "Close" button
- On error: show error toast, keep form data intact

---

## Form 2: Channel Partner Registration Form

**Component:** `components/forms/ChannelPartnerForm.tsx`
**Type:** 4-step wizard, client component

### Step 1 — Personal & Business Info

| Field | Type | Required |
|---|---|---|
| Applicant Name | Text | Yes |
| Company / Business Name | Text | No |
| Mobile Number | Tel | Yes |
| Personal Email | Email | Yes |
| Company Address | Textarea | No |

### Step 2 — Documents

| Field | Type | Required | Notes |
|---|---|---|---|
| PAN Number | Text | Yes | |
| PAN Document | File Upload | Yes | PDF, JPG, PNG — max 2MB |
| RERA Number | Text | No | |
| RERA Document | File Upload | No | PDF, JPG, PNG — max 2MB |
| GST Number | Text | No | |
| GST Document | File Upload | No | PDF, JPG, PNG — max 2MB |
| Experience in Real Estate (Years) | Number | Yes | |

### Step 3 — Bank Details

| Field | Type | Required |
|---|---|---|
| Bank Account Holder Name | Text | Yes |
| Bank Name | Text | Yes |
| Account Number | Text | Yes |
| IFSC Code | Text | Yes |
| Beneficiary Name | Text | Yes |
| Cancelled Cheque | File Upload | Yes — PDF, JPG, PNG — max 2MB |

### Step 4 — Identity & Submit

| Field | Type | Required | Options |
|---|---|---|---|
| ID Proof Type | Select | Yes | Aadhaar, PAN, Passport, Driving Licence, Voter ID |
| ID Proof Number | Text | Yes | — |
| ID Proof Upload | File Upload | Yes | PDF, JPG, PNG — max 2MB |
| Remarks | Textarea | No | — |

### Wizard Behavior
- Progress bar at top showing current step (Step 1 of 4)
- "Next" validates current step fields before advancing
- "Back" goes to previous step (no validation, data preserved)
- Step 4 has "Submit" instead of "Next"
- On submit: call `submitChannelPartnerForm()` with FormData, show loading
- On success: replace form content with success screen (checkmark + message)
- On error: show error message, keep data intact

### File Upload Component
- Custom styled upload zone (click to browse)
- Shows file name after selection
- Client-side validation: file type (PDF/JPG/PNG) and size (max 2MB)
- Error shown inline if invalid file selected

---

## Styling

- Modal header: `bg-blue-900` text white — matches LuxeRealty brand
- Primary buttons (Next/Submit): `bg-amber-500 hover:bg-amber-600` text white
- Secondary buttons (Back/Close): outline style, blue border
- Error messages: `text-red-500 text-sm` below field
- Progress bar: amber fill on blue-100 track
- File upload zone: dashed border, blue-50 background, hover state

---

## State Management

Both forms use local `useState` — no global state needed. Modal open/close state lives in `Navbar.tsx` (for the navbar triggers) and `Footer.tsx` (for the partner button in footer).

---

## File Structure

```
components/
  Modal.tsx
  forms/
    LeadForm.tsx
    ChannelPartnerForm.tsx
    FileUploadField.tsx        ← reusable file upload input
lib/
  api.ts
.env.local                    ← API endpoint placeholders
```
