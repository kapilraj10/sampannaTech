import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import DynamicIcon from '@/components/ui/DynamicIcon';
import LoadingCard from '@/components/ui/LoadingCard';
import ErrorMessage from '@/components/ui/ErrorMessage';
import EmptyState from '@/components/ui/EmptyState';
import Reveal from '@/components/ui/Reveal';
import type { ProcessStepItem } from '@/types';

interface ProcessSectionProps {
  steps: ProcessStepItem[];
  loading?: boolean;
  error?: string;
}

export default function ProcessSection({ steps, loading, error }: ProcessSectionProps) {
  return (
    <section className="relative bg-white py-20 lg:py-28" id="process">
      <Container>
        <SectionHeading
          eyebrow="Our Process"
          title="A Clear Path From Idea to Launch"
          description="A transparent, step-by-step process that keeps you informed and in control at every stage."
        />

        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 7 }).map((_, i) => (
              <LoadingCard key={i} />
            ))}
          </div>
        )}

        {error && !loading && <ErrorMessage message={error} />}

        {!loading && !error && steps.length === 0 && (
          <EmptyState
            title="No process steps yet"
            description="Add your development process from the admin panel."
          />
        )}

        {!loading && !error && steps.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal key={step._id} delay={(i % 4) as 0 | 1 | 2 | 3}>
                <div className="group relative h-full rounded-2xl border border-slate-200 bg-slate-50/60 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:bg-white hover:shadow-card">
                  <span className="absolute right-6 top-6 text-4xl font-extrabold tracking-tight text-slate-200 transition-colors group-hover:text-brand-100">
                    {String(step.number).padStart(2, '0')}
                  </span>
                  <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-brand-600 shadow-soft ring-1 ring-slate-100 transition-all duration-300 group-hover:bg-brand-600 group-hover:text-white">
                    <DynamicIcon name={step.icon || 'Search'} className="h-5 w-5" />
                  </span>
                  <h3 className="relative text-base font-semibold text-slate-900">{step.title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-slate-600">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}