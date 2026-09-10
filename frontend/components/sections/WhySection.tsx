import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import DynamicIcon from '@/components/ui/DynamicIcon';
import LoadingCard from '@/components/ui/LoadingCard';
import ErrorMessage from '@/components/ui/ErrorMessage';
import EmptyState from '@/components/ui/EmptyState';
import Reveal from '@/components/ui/Reveal';
import type { WhyChooseUsItem } from '@/types';

interface WhySectionProps {
  items: WhyChooseUsItem[];
  loading?: boolean;
  error?: string;
}

export default function WhySection({ items, loading, error }: WhySectionProps) {
  return (
    <section className="bg-slate-50 py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Why Us"
          title="Why Businesses Choose Sampanna Tech"
          description="We combine technical reliability with a clear understanding of how real companies operate."
        />

        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <LoadingCard key={i} />
            ))}
          </div>
        )}

        {error && !loading && <ErrorMessage message={error} />}

        {!loading && !error && items.length === 0 && (
          <EmptyState
            title="No reasons added yet"
            description="Add reasons why customers choose you from the admin panel."
          />
        )}

        {!loading && !error && items.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, i) => (
              <Reveal key={item._id} delay={(i % 3) as 0 | 1 | 2}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-card">
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background:
                        'radial-gradient(400px circle at 50% 0%, rgba(27,111,245,0.05), transparent 60%)',
                    }}
                    aria-hidden="true"
                  />
                  <span className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white">
                    <DynamicIcon name={item.icon || 'BadgeCheck'} className="h-5 w-5" />
                  </span>
                  <h3 className="relative text-base font-semibold text-slate-900">{item.title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-slate-600">
                    {item.description}
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