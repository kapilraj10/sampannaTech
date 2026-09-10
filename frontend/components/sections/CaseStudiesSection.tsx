import Link from 'next/link';
import { ArrowRight, Quote } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import LoadingCard from '@/components/ui/LoadingCard';
import ErrorMessage from '@/components/ui/ErrorMessage';
import EmptyState from '@/components/ui/EmptyState';
import Reveal from '@/components/ui/Reveal';
import { placeholderImage } from '@/lib/utils';
import type { CaseStudyItem } from '@/types';

interface CaseStudiesSectionProps {
  studies: CaseStudyItem[];
  loading?: boolean;
  error?: string;
}

export default function CaseStudiesSection({ studies, loading, error }: CaseStudiesSectionProps) {
  const visible = studies.filter((s) => s.featured).slice(0, 3);
  const display = visible.length >= 3 ? visible : studies.slice(0, 3);

  return (
    <section className="relative bg-white py-20 lg:py-28" id="case-studies">
      <Container>
        <SectionHeading
          eyebrow="Case Studies"
          title="Built for Real Businesses"
          description="See how we solve real business problems with practical, measurable technology outcomes."
        />

        {loading && (
          <div className="grid gap-6 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <LoadingCard key={i} className="min-h-[340px]" />
            ))}
          </div>
        )}

        {error && !loading && <ErrorMessage message={error} />}

        {!loading && !error && display.length === 0 && (
          <EmptyState
            title="Case studies coming soon"
            description="We are documenting how we help businesses succeed. Please check back soon."
          />
        )}

        {!loading && !error && display.length > 0 && (
          <>
            <div className="grid gap-6 lg:grid-cols-3">
              {display.map((study, i) => (
                <Reveal key={study._id} delay={(i % 3) as 0 | 1 | 2}>
                  <Link
                    href={`/case-studies/${study.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card"
                  >
                    <div className="img-zoom relative aspect-[16/9] overflow-hidden bg-slate-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={study.coverImage || placeholderImage}
                        alt={study.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute left-4 top-4 inline-flex rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-slate-700 shadow-soft backdrop-blur">
                        {study.industry || 'Case Study'}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                        {study.clientName}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold leading-snug text-slate-900 transition-colors group-hover:text-brand-700">
                        {study.title}
                      </h3>
                      {study.testimonial && (
                        <div className="mt-4 rounded-xl bg-slate-50 p-4">
                          <Quote className="h-4 w-4 text-brand-500" aria-hidden="true" />
                          <p className="mt-1 line-clamp-3 text-sm italic leading-relaxed text-slate-600">
                            {study.testimonial}
                          </p>
                        </div>
                      )}
                      <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-brand-600">
                        Read Case Study
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button href="/case-studies" variant="outline">
                View All Case Studies
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </>
        )}
      </Container>
    </section>
  );
}