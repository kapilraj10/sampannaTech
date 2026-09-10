'use client';

import { useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { adminApi } from '@/lib/admin';

const inputBase =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100';

export function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-slate-500">{hint}</span>}
    </label>
  );
}

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

export function TextInput({ value, onChange, placeholder, required }: TextInputProps) {
  return (
    <input
      type="text"
      className={inputBase}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
    />
  );
}

interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
  required?: boolean;
}

export function TextArea({ value, onChange, rows = 4, placeholder, required }: TextAreaProps) {
  return (
    <textarea
      className={cn(inputBase, 'resize-y')}
      rows={rows}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
    />
  );
}

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
}

export function NumberInput({ value, onChange }: NumberInputProps) {
  return (
    <input
      type="number"
      className={inputBase}
      value={Number.isNaN(value) ? '' : value}
      onChange={(e) => onChange(e.target.value === '' ? 0 : Number(e.target.value))}
    />
  );
}

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

export function Toggle({ checked, onChange, label }: ToggleProps) {
  return (
    <label className="flex cursor-pointer items-center gap-3">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors',
          checked ? 'bg-brand-600' : 'bg-slate-300'
        )}
      >
        <span
          className={cn(
            'inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform',
            checked ? 'translate-x-6' : 'translate-x-1'
          )}
        />
      </button>
      <span className="text-sm font-medium text-slate-700">{label}</span>
    </label>
  );
}

interface TagInputProps {
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}

export function TagInput({ values, onChange, placeholder = 'Add and press Enter' }: TagInputProps) {
  const addTag = (raw: string) => {
    const value = raw.trim();
    if (!value) return;
    if (values.includes(value)) return;
    onChange([...values, value]);
  };

  return (
    <div className={cn(inputBase, 'flex flex-wrap items-center gap-1.5 pb-2 pt-2')}>
      {values.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 rounded-md bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700"
        >
          {tag}
          <button
            type="button"
            onClick={() => onChange(values.filter((t) => t !== tag))}
            className="text-brand-400 hover:text-brand-700"
            aria-label={`Remove ${tag}`}
          >
            ×
          </button>
        </span>
      ))}
      <input
        type="text"
        className="min-w-[120px] flex-1 border-0 bg-transparent p-0 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-0"
        placeholder={placeholder}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addTag((e.target as HTMLInputElement).value);
            (e.target as HTMLInputElement).value = '';
          }
        }}
        onBlur={(e) => {
          if (e.target.value.trim()) {
            addTag(e.target.value);
            e.target.value = '';
          }
        }}
      />
    </div>
  );
}

interface ImageInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function ImageInput({ value, onChange, placeholder }: ImageInputProps) {
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setUploading(true);
    try {
      const { url } = await adminApi.upload(file);
      onChange(url);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Upload failed.');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          type="text"
          className={inputBase}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || 'https://...'}
        />
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/svg+xml"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="shrink-0 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {uploading ? 'Uploading…' : 'Upload'}
        </button>
      </div>
      {value ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={value}
          alt="Preview"
          className="h-20 w-32 rounded-lg border border-slate-200 object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
          onLoad={(e) => {
            (e.target as HTMLImageElement).style.display = 'block';
          }}
        />
      ) : null}
    </div>
  );
}

interface SelectInputProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
}

export function SelectInput({ value, onChange, options, placeholder }: SelectInputProps) {
  return (
    <select
      className={inputBase}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}