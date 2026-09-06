'use client';

import { useState, type FormEvent } from 'react';
import { CheckCircle2, Loader2, Send } from 'lucide-react';
import { FormInput, Select, Textarea } from '@/components/ui/Form';
import Button from '@/components/ui/Button';
import { api } from '@/lib/api';
import { siteConfig } from '@/config/site';
import type { ContactFormData } from '@/types';

interface ContactFormProps {
  defaultService?: string;
}

type FormErrors = Partial<Record<keyof ContactFormData, string>>;

const emptyForm: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  company: '',
  service: '',
  message: '',
};

function validate(form: ContactFormData): FormErrors {
  const errors: FormErrors = {};

  if (!form.name.trim() || form.name.trim().length < 2) {
    errors.name = 'Please enter your name.';
  }
  if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  if (form.phone && !/^[0-9+\-\s()]{6,20}$/.test(form.phone.trim())) {
    errors.phone = 'Please enter a valid phone number.';
  }
  if (form.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  }

  return errors;
}

const serviceOptions = siteConfig.services.options.map((s) => ({ value: s, label: s }));

export default function ContactForm({ defaultService }: ContactFormProps) {
  const [form, setForm] = useState<ContactFormData>(() => ({
    ...emptyForm,
    service: defaultService || '',
  }));
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [serverMessage, setServerMessage] = useState('');

  const updateField = (field: keyof ContactFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setServerMessage('');

    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus('loading');
    const result = await api.sendContact(form);

    if (result.success) {
      setStatus('success');
      setForm(emptyForm);
    } else {
      setStatus('error');
      setServerMessage(result.error || 'Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 px-6 py-16 text-center">
        <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle2 className="h-7 w-7 text-emerald-600" aria-hidden="true" />
        </span>
        <h3 className="text-xl font-bold text-slate-900">Message Sent</h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-600">
          Thank you for reaching out. We have received your message and will get
          back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormInput
          label="Your Name"
          id="contact-name"
          name="name"
          autoComplete="name"
          required
          value={form.name}
          onChange={(e) => updateField('name', e.target.value)}
          error={errors.name}
          placeholder="Ram Sharma"
        />
        <FormInput
          label="Email Address"
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={form.email}
          onChange={(e) => updateField('email', e.target.value)}
          error={errors.email}
          placeholder="you@business.com"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormInput
          label="Phone (optional)"
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={form.phone}
          onChange={(e) => updateField('phone', e.target.value)}
          error={errors.phone}
          placeholder="+977 9XXXXXXXX"
        />
        <FormInput
          label="Company (optional)"
          id="contact-company"
          name="company"
          autoComplete="organization"
          value={form.company}
          onChange={(e) => updateField('company', e.target.value)}
          placeholder="Your company name"
        />
      </div>

      <Select
        label="Service You're Interested In"
        id="contact-service"
        name="service"
        options={serviceOptions}
        value={form.service}
        onChange={(e) => updateField('service', e.target.value)}
        placeholder="Select a service"
      />

      <Textarea
        label="Your Message"
        id="contact-message"
        name="message"
        required
        value={form.message}
        onChange={(e) => updateField('message', e.target.value)}
        error={errors.message}
        placeholder="Tell us a bit about your project or what you need help with..."
      />

      {status === 'error' && serverMessage && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {serverMessage}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full sm:w-auto"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden="true" />
            Send Message
          </>
        )}
      </Button>
    </form>
  );
}