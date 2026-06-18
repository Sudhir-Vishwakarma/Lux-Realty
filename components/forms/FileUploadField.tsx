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
