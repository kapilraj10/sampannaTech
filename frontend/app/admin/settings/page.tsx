'use client';

import { useEffect, useState, type FormEvent } from 'react';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import Button from '@/components/ui/Button';
import { Field, NumberInput, TextArea, TextInput } from '@/components/admin/inputs';
import { useToast } from '@/components/admin/Toast';
import { adminApi } from '@/lib/admin';
import type { SiteSettings } from '@/types';

interface SettingsForm {
  companyName: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  location: string;
  googleMapsUrl: string;
  websiteUrl: string;
  supportEmail: string;
  salesEmail: string;
  businessHours: string;
  footerText: string;
  copyrightText: string;
  socialFacebook: string;
  socialInstagram: string;
  socialLinkedin: string;
  socialGithub: string;
  socialYoutube: string;
  socialTiktok: string;
  statsProjectsDelivered: number;
  statsBusinessesServed: number;
  statsYearsExperience: number;
  statsSupport: string;
  brandingLogo: string;
  brandingFavicon: string;
  brandingHeroImage: string;
  brandingAboutImage: string;
  brandingOgImage: string;
  brandingPrimaryColor: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  linksProductWebsite: string;
  linksProductDemo: string;
  linksDocumentation: string;
  linksCalendly: string;
  linksGoogleMaps: string;
}

const emptyForm: SettingsForm = {
  companyName: '',
  tagline: '',
  description: '',
  email: '',
  phone: '',
  whatsapp: '',
  address: '',
  location: '',
  googleMapsUrl: '',
  websiteUrl: '',
  supportEmail: '',
  salesEmail: '',
  businessHours: '',
  footerText: '',
  copyrightText: '',
  socialFacebook: '',
  socialInstagram: '',
  socialLinkedin: '',
  socialGithub: '',
  socialYoutube: '',
  socialTiktok: '',
  statsProjectsDelivered: 0,
  statsBusinessesServed: 0,
  statsYearsExperience: 0,
  statsSupport: '',
  brandingLogo: '',
  brandingFavicon: '',
  brandingHeroImage: '',
  brandingAboutImage: '',
  brandingOgImage: '',
  brandingPrimaryColor: '',
  seoTitle: '',
  seoDescription: '',
  seoKeywords: '',
  linksProductWebsite: '',
  linksProductDemo: '',
  linksDocumentation: '',
  linksCalendly: '',
  linksGoogleMaps: '',
};

function toForm(s: SiteSettings | undefined): SettingsForm {
  if (!s) return emptyForm;
  return {
    companyName: s.companyName || '',
    tagline: s.tagline || '',
    description: s.description || '',
    email: s.email || '',
    phone: s.phone || '',
    whatsapp: s.whatsapp || '',
    address: s.address || '',
    location: s.location || '',
    googleMapsUrl: s.googleMapsUrl || '',
    websiteUrl: s.websiteUrl || '',
    supportEmail: s.supportEmail || '',
    salesEmail: s.salesEmail || '',
    businessHours: s.businessHours || '',
    footerText: s.footerText || '',
    copyrightText: s.copyrightText || '',
    socialFacebook: s.social?.facebook || '',
    socialInstagram: s.social?.instagram || '',
    socialLinkedin: s.social?.linkedin || '',
    socialGithub: s.social?.github || '',
    socialYoutube: s.social?.youtube || '',
    socialTiktok: s.social?.tiktok || '',
    statsProjectsDelivered: s.stats?.projectsDelivered || 0,
    statsBusinessesServed: s.stats?.businessesServed || 0,
    statsYearsExperience: s.stats?.yearsExperience || 0,
    statsSupport: s.stats?.support || '',
    brandingLogo: s.branding?.logo || '',
    brandingFavicon: s.branding?.favicon || '',
    brandingHeroImage: s.branding?.heroImage || '',
    brandingAboutImage: s.branding?.aboutImage || '',
    brandingOgImage: s.branding?.ogImage || '',
    brandingPrimaryColor: s.branding?.primaryColor || '',
    seoTitle: s.seo?.title || '',
    seoDescription: s.seo?.description || '',
    seoKeywords: (s.seo?.keywords || []).join(', '),
    linksProductWebsite: s.links?.productWebsite || '',
    linksProductDemo: s.links?.productDemo || '',
    linksDocumentation: s.links?.documentation || '',
    linksCalendly: s.links?.calendly || '',
    linksGoogleMaps: s.links?.googleMaps || '',
  };
}

function toPayload(f: SettingsForm): Record<string, unknown> {
  return {
    companyName: f.companyName,
    tagline: f.tagline,
    description: f.description,
    email: f.email,
    phone: f.phone,
    whatsapp: f.whatsapp,
    address: f.address,
    location: f.location,
    googleMapsUrl: f.googleMapsUrl,
    websiteUrl: f.websiteUrl,
    supportEmail: f.supportEmail,
    salesEmail: f.salesEmail,
    businessHours: f.businessHours,
    footerText: f.footerText,
    copyrightText: f.copyrightText,
    social: {
      facebook: f.socialFacebook,
      instagram: f.socialInstagram,
      linkedin: f.socialLinkedin,
      github: f.socialGithub,
      youtube: f.socialYoutube,
      tiktok: f.socialTiktok,
    },
    stats: {
      projectsDelivered: f.statsProjectsDelivered,
      businessesServed: f.statsBusinessesServed,
      yearsExperience: f.statsYearsExperience,
      support: f.statsSupport,
    },
    branding: {
      logo: f.brandingLogo,
      favicon: f.brandingFavicon,
      heroImage: f.brandingHeroImage,
      aboutImage: f.brandingAboutImage,
      ogImage: f.brandingOgImage,
      primaryColor: f.brandingPrimaryColor,
    },
    seo: {
      title: f.seoTitle,
      description: f.seoDescription,
      keywords: f.seoKeywords.split(',').map((k) => k.trim()).filter(Boolean),
    },
    links: {
      productWebsite: f.linksProductWebsite,
      productDemo: f.linksProductDemo,
      documentation: f.linksDocumentation,
      calendly: f.linksCalendly,
      googleMaps: f.linksGoogleMaps,
    },
  };
}

function SettingsSection({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
      <h2 className="text-base font-semibold text-slate-900">{title}</h2>
      {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
      <div className="mt-5 grid gap-4 sm:grid-cols-2">{children}</div>
    </section>
  );
}

export default function AdminSettingsPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<SettingsForm>(emptyForm);

  useEffect(() => {
    let cancelled = false;
    adminApi
      .get('site-settings', '')
      .then((res) => {
        if (cancelled) return;
        if (res.success && res.data) {
          setForm(toForm(res.data as unknown as SiteSettings));
        } else {
          toast(res.error || 'Failed to load settings.', 'error');
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const set = <K extends keyof SettingsForm>(key: K, value: SettingsForm[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await adminApi.update('site-settings', '', toPayload(form));
    setSaving(false);
    if (res.success) {
      toast('Site settings saved.');
    } else {
      toast(res.error || 'Failed to save settings.', 'error');
    }
  };

  if (loading) {
    return (
      <div className="grid gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-48 animate-pulse rounded-2xl border border-slate-200 bg-white" />
        ))}
      </div>
    );
  }

  return (
    <>
      <AdminPageHeader
        title="Site Settings"
        description="Update company information shown across the public website."
      />

      <form
        id="settings-form"
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <SettingsSection title="Company" description="Basic company identity.">
          <Field label="Company name">
            <TextInput value={form.companyName} onChange={(v) => set('companyName', v)} />
          </Field>
          <Field label="Tagline">
            <TextInput value={form.tagline} onChange={(v) => set('tagline', v)} />
          </Field>
          <Field label="Description">
            <TextArea value={form.description} onChange={(v) => set('description', v)} rows={3} />
          </Field>
          <Field label="Location (city, country)">
            <TextInput value={form.location} onChange={(v) => set('location', v)} />
          </Field>
          <Field label="Address">
            <TextInput value={form.address} onChange={(v) => set('address', v)} />
          </Field>
          <Field label="Footer text">
            <TextInput value={form.footerText} onChange={(v) => set('footerText', v)} />
          </Field>
          <Field label="Copyright text" hint="Leave blank to use the default.">
            <TextInput value={form.copyrightText} onChange={(v) => set('copyrightText', v)} />
          </Field>
        </SettingsSection>

        <SettingsSection title="Contact information" description="Exactly the contact details your business wants published.">
          <Field label="Email">
            <TextInput value={form.email} onChange={(v) => set('email', v)} />
          </Field>
          <Field label="Phone">
            <TextInput value={form.phone} onChange={(v) => set('phone', v)} />
          </Field>
          <Field label="WhatsApp">
            <TextInput value={form.whatsapp} onChange={(v) => set('whatsapp', v)} />
          </Field>
          <Field label="Business hours">
            <TextInput value={form.businessHours} onChange={(v) => set('businessHours', v)} placeholder="e.g. Sun – Fri, 9am – 6pm" />
          </Field>
          <Field label="Support email">
            <TextInput value={form.supportEmail} onChange={(v) => set('supportEmail', v)} />
          </Field>
          <Field label="Sales email">
            <TextInput value={form.salesEmail} onChange={(v) => set('salesEmail', v)} />
          </Field>
        </SettingsSection>

        <SettingsSection title="Social media" description="Links shown in the footer. Leave blank to hide a platform.">
          <Field label="Facebook">
            <TextInput value={form.socialFacebook} onChange={(v) => set('socialFacebook', v)} placeholder="https://" />
          </Field>
          <Field label="Instagram">
            <TextInput value={form.socialInstagram} onChange={(v) => set('socialInstagram', v)} placeholder="https://" />
          </Field>
          <Field label="LinkedIn">
            <TextInput value={form.socialLinkedin} onChange={(v) => set('socialLinkedin', v)} placeholder="https://" />
          </Field>
          <Field label="GitHub">
            <TextInput value={form.socialGithub} onChange={(v) => set('socialGithub', v)} placeholder="https://" />
          </Field>
          <Field label="YouTube">
            <TextInput value={form.socialYoutube} onChange={(v) => set('socialYoutube', v)} placeholder="https://" />
          </Field>
          <Field label="TikTok">
            <TextInput value={form.socialTiktok} onChange={(v) => set('socialTiktok', v)} placeholder="https://" />
          </Field>
        </SettingsSection>

        <SettingsSection title="Statistics" description="Only show numbers you can stand behind. Values of 0 are hidden on the site.">
          <Field label="Projects delivered">
            <NumberInput value={form.statsProjectsDelivered} onChange={(v) => set('statsProjectsDelivered', v)} />
          </Field>
          <Field label="Businesses served">
            <NumberInput value={form.statsBusinessesServed} onChange={(v) => set('statsBusinessesServed', v)} />
          </Field>
          <Field label="Years of experience">
            <NumberInput value={form.statsYearsExperience} onChange={(v) => set('statsYearsExperience', v)} />
          </Field>
          <Field label="Support (e.g. 24/7)">
            <TextInput value={form.statsSupport} onChange={(v) => set('statsSupport', v)} />
          </Field>
        </SettingsSection>

        <SettingsSection title="Branding" description="Image URLs and brand color used across the site.">
          <Field label="Logo URL">
            <TextInput value={form.brandingLogo} onChange={(v) => set('brandingLogo', v)} placeholder="https://" />
          </Field>
          <Field label="Favicon URL">
            <TextInput value={form.brandingFavicon} onChange={(v) => set('brandingFavicon', v)} placeholder="https://" />
          </Field>
          <Field label="Hero image">
            <TextInput value={form.brandingHeroImage} onChange={(v) => set('brandingHeroImage', v)} placeholder="https://" />
          </Field>
          <Field label="About image">
            <TextInput value={form.brandingAboutImage} onChange={(v) => set('brandingAboutImage', v)} placeholder="https://" />
          </Field>
          <Field label="Open Graph image">
            <TextInput value={form.brandingOgImage} onChange={(v) => set('brandingOgImage', v)} placeholder="https://" />
          </Field>
          <Field label="Primary color (hex)">
            <TextInput value={form.brandingPrimaryColor} onChange={(v) => set('brandingPrimaryColor', v)} placeholder="#0f766e" />
          </Field>
        </SettingsSection>

        <SettingsSection title="SEO" description="Default search engine metadata.">
          <Field label="Default title">
            <TextInput value={form.seoTitle} onChange={(v) => set('seoTitle', v)} />
          </Field>
          <Field label="Default description">
            <TextArea value={form.seoDescription} onChange={(v) => set('seoDescription', v)} rows={2} />
          </Field>
          <Field label="Keywords" hint="Comma-separated.">
            <TextInput value={form.seoKeywords} onChange={(v) => set('seoKeywords', v)} />
          </Field>
        </SettingsSection>

        <SettingsSection title="Useful links" description="Product and map links used in the footer and contact sections.">
          <Field label="Product website">
            <TextInput value={form.linksProductWebsite} onChange={(v) => set('linksProductWebsite', v)} placeholder="https://" />
          </Field>
          <Field label="Product demo">
            <TextInput value={form.linksProductDemo} onChange={(v) => set('linksProductDemo', v)} placeholder="https://" />
          </Field>
          <Field label="Documentation">
            <TextInput value={form.linksDocumentation} onChange={(v) => set('linksDocumentation', v)} placeholder="https://" />
          </Field>
          <Field label="Calendly / scheduling">
            <TextInput value={form.linksCalendly} onChange={(v) => set('linksCalendly', v)} placeholder="https://" />
          </Field>
          <Field label="Google Maps URL">
            <TextInput value={form.linksGoogleMaps} onChange={(v) => set('linksGoogleMaps', v)} placeholder="https://maps.google.com/..." />
          </Field>
        </SettingsSection>

        <div className="flex justify-end">
          <Button type="submit" disabled={saving}>
            {saving ? 'Saving…' : 'Save changes'}
          </Button>
        </div>
      </form>
    </>
  );
}