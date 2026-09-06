import { Quote, Star } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import EmptyState from '@/components/ui/EmptyState';
import LoadingCard from '@/components/ui/LoadingCard';
import ErrorMessage from '@/components/ui/ErrorMessage';
import type { Testimonial } from '@/types';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  loading?: boolean;
  error?: string;
}

export default function TestimonialsSection({
  testimonials,
  loading,
  error,
}: TestimonialsSectionProps) {
  if (!loading && !error && testimonials.length === 0) {
    return null;
  }

  return (
    <section className="bg-slate-50 py-20 lg:py-28" id="testimonials">
      <Container>
        <SectionHeading
          eyebrow="Testimonials"
          title="What Clients Say"
          description="Feedback from businesses we have worked with."
        />

        {loading && (
          <div className="grid gap-6 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <LoadingCard key={i} className="min-h-[200px]" />
            ))}
          </div>
        )}

        {error && !loading && <ErrorMessage message={error} />}

        {!loading && !error && testimonials.length === 0 && (
          <EmptyState
            title="Client feedback is on its way"
            description="We will share real feedback from the businesses we work with here."
          />
        )}

        {!loading && !error && testimonials.length > 0 && (
          <div className="grid gap-6 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <figure
                key={testimonial._id}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-soft"
              >
                <Quote className="h-6 w-6 text-brand-200" aria-hidden="true" />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-700">
                  {testimonial.message}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-sm font-semibold text-brand-700">
                    {testimonial.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900">{testimonial.name}</p>
                    <p className="text-xs text-slate-500">
                      {[testimonial.role, testimonial.company].filter(Boolean).join(' · ') || 'Client'}
                    </p>
                  </div>
                  <div className="flex" aria-label={`${testimonial.rating} out of 5 stars`}>
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}