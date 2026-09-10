import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import DynamicIcon from '@/components/ui/DynamicIcon';
import LoadingCard from '@/components/ui/LoadingCard';
import ErrorMessage from '@/components/ui/ErrorMessage';
import Reveal from '@/components/ui/Reveal';
import { slugify } from '@/lib/utils';
import type { ServiceItem } from '@/types';

interface ServicesSectionProps {
  services: ServiceItem[];
  loading?: boolean;
  error?: string;
}

export default function ServicesSection({ services, loading, error }: ServicesSectionProps) {
  return (
    <section className="relative bg-white py-20 lg:py-28" id="services">
      <Container>
        <SectionHeading
          eyebrow="What We Do"
          title="What We Build For You"
          description="From products to platforms, we design, build and scale digital solutions tailored to real business needs."
        />

        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <LoadingCard key={i} />
            ))}
          </div>
        )}

        {error && !loading && <ErrorMessage message={error} />}

        {!loading && !error && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, i) => (
              <Reveal key={service._id} delay={(i % 4) as 0 | 1 | 2 | 3}>
                <Link
                  href={`/services#${slugify(service.title)}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-card"
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background:
                        'radial-gradient(400px circle at 50% 0%, rgba(27,111,245,0.05), transparent 60%)',
                    }}
                    aria-hidden="true"
                  />
                  <span className="relative mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white group-hover:shadow-brand-sm">
                    <DynamicIcon name={service.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="relative text-base font-semibold text-slate-900">{service.title}</h3>
                  <p className="relative mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                    {service.description}
                  </p>
                  <span className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                    Learn More
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Button href="/services" variant="outline">
            View All Services
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Container>
    </section>
  );
}