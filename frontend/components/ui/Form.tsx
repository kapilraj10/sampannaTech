import { cn } from '@/lib/utils';
import {
  useId,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react';

interface FieldWrapperProps {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}

const inputClasses =
  'w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 disabled:bg-slate-50 disabled:text-slate-500';

const errorClasses = 'border-red-300 focus:border-red-500 focus:ring-red-500/20';

function FieldWrapper({ label, htmlFor, error, required, children }: FieldWrapperProps) {
  const id = useId();
  return (
    <div>
      <label
        htmlFor={htmlFor || id}
        className="mb-1.5 block text-sm font-medium text-slate-700"
      >
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}

interface FormInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label: string;
  error?: string;
  required?: boolean;
  id?: string;
  className?: string;
}

export function FormInput({
  label,
  error,
  required,
  id,
  className,
  ...props
}: FormInputProps) {
  return (
    <FieldWrapper label={label} htmlFor={id || ''} error={error} required={required}>
      <input
        id={id}
        className={cn(inputClasses, error && errorClasses, className)}
        aria-invalid={!!error}
        {...props}
      />
    </FieldWrapper>
  );
}

interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> {
  label: string;
  error?: string;
  required?: boolean;
  id?: string;
  className?: string;
}

export function Textarea({ label, error, required, id, className, ...props }: TextareaProps) {
  return (
    <FieldWrapper label={label} htmlFor={id || ''} error={error} required={required}>
      <textarea
        id={id}
        className={cn(inputClasses, 'min-h-[140px] resize-y', error && errorClasses, className)}
        aria-invalid={!!error}
        {...props}
      />
    </FieldWrapper>
  );
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'className'> {
  label: string;
  options: { value: string; label: string }[];
  error?: string;
  required?: boolean;
  placeholder?: string;
  id?: string;
  className?: string;
}

export function Select({
  label,
  options,
  error,
  required,
  placeholder,
  id,
  className,
  ...props
}: SelectProps) {
  return (
    <FieldWrapper label={label} htmlFor={id || ''} error={error} required={required}>
      <select
        id={id}
        className={cn(inputClasses, error && errorClasses, className)}
        aria-invalid={!!error}
        defaultValue=""
        {...props}
      >
        <option value="" disabled>
          {placeholder || 'Select an option'}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
}