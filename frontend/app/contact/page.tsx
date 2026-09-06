import type { Metadata } from 'next';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import Container from '@/components/ui/Container';
import PageHeader from '@/components/ui/PageHeader';
import ContactForm from '@/components/contact/ContactForm';
import { siteConfig } from '@/config/site';
import { getSiteInfo } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Sampanna Tech. Tell us about your project and we will help you build the right technology solution.',
  alternates: { canonical: `${siteConfig.url}/contact` },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;
  const siteInfo = await getSiteInfo();

  const contactDetails = [
    {
      icon: Mail,
      label: 'Email',
      value: siteInfo.email || siteConfig.email || 'hello@sampannatech.com',
      href: siteInfo.email || siteConfig.email ? `mailto:${siteInfo.email || siteConfig.email}` : undefined,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: siteInfo.phone || siteConfig.phone || 'Configured via environment',
      href: siteInfo.phone || siteConfig.phone ? `tel:${siteInfo.phone || siteConfig.phone}` : undefined,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: siteInfo.location || siteConfig.location,
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's Build Something Together"
        description="Tell us what you need and we will get back to you with honest advice on the right technology for your business."
      />

      <section className="bg-slate-50 py-16 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-soft sm:p-10">
                <h2 className="text-2xl font-bold text-slate-900">Send us a message</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Fields marked with * are required.
                </p>
                <div className="mt-8">
                  <ContactForm defaultService={service} />
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="space-y-6">
                {contactDetails.map((detail) => (
                  <div
                    key={detail.label}
                    className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                      <detail.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">{detail.label}</h3>
                      {detail.href ? (
                        <a
                          href={detail.href}
                          className="mt-1 block break-all text-sm text-slate-600 hover:text-brand-600"
                        >
                          {detail.value}
                        </a>
                      ) : (
                        <p className="mt-1 break-all text-sm text-slate-600">{detail.value}</p>
                      )}
                    </div>
                  </div>
                ))}

                <div className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-900 p-6 text-white shadow-soft">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-brand-300">
                    <Clock className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold">Typical response time</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-300">
                      We usually respond to messages within one business day during working hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}