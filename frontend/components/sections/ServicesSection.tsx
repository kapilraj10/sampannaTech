import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import DynamicIcon from '@/components/ui/DynamicIcon';
import LoadingCard from '@/components/ui/LoadingCard';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { slugify } from '@/lib/utils';
import type { ServiceItem } from '@/types';

interface ServicesSectionProps {
  services: ServiceItem[];
  loading?: boolean;
  error?: string;
}

export default function ServicesSection({ services, loading, error }: ServicesSectionProps) {
  return (
    <section className="bg-white py-20 lg:py-28" id="services">
      <Container>
        <SectionHeading
          eyebrow="Services"
          title="What We Build For You"
          description="Practical digital services designed around how your business actually works."
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
            {services.map((service) => (
              <Link
                key={service._id}
                href={`/services#${slugify(service.title)}`}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-card"
              >
                <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                  <DynamicIcon name={service.icon} className="h-5 w-5" />
                </span>
                <h3 className="text-base font-semibold text-slate-900">{service.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                  {service.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600">
                  Learn More
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Button href="/services" variant="outline">
            View All Services
          </Button>
        </div>
      </Container>
    </section>
  );
}