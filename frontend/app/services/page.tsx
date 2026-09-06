import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import PageHeader from '@/components/ui/PageHeader';
import SectionHeading from '@/components/ui/SectionHeading';
import CTASection from '@/components/sections/CTASection';
import ServiceDetail from '@/components/sections/ServiceDetail';
import { siteConfig } from '@/config/site';
import { getServicesData } from '@/lib/data';
import { slugify } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Explore the digital services Sampanna Tech offers — website development, mobile apps, custom software, POS systems, UI/UX design, IT consulting and more.',
  alternates: { canonical: `${siteConfig.url}/services` },
};

export default async function ServicesPage() {
  const services = await getServicesData();

  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Digital Services Built Around Your Business"
        description="From websites and mobile apps to POS systems and custom business software — practical technology delivered with clear communication and reliable support."
      />

      <section className="bg-slate-50 py-20 lg:py-24">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2">
            {services.map((service) => (
              <ServiceDetail
                key={service._id}
                id={slugify(service.title)}
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow="How We Help"
            title="Every Engagement Includes"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Discovery & Planning',
                text: 'We start by understanding your business, users and goals so the solution fits your reality.',
              },
              {
                title: 'Design & Build',
                text: 'Your product is designed and developed with modern, maintainable technology.',
              },
              {
                title: 'Testing & Launch',
                text: 'We test rigorously, launch carefully and stay around to support you afterwards.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-7 shadow-soft"
              >
                <h3 className="font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}