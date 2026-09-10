import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import LoadingCard from '@/components/ui/LoadingCard';
import ErrorMessage from '@/components/ui/ErrorMessage';
import EmptyState from '@/components/ui/EmptyState';
import Reveal from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';
import type { TechnologyItem } from '@/types';

interface TechnologiesSectionProps {
  technologies: TechnologyItem[];
  loading?: boolean;
  error?: string;
}

export default function TechnologiesSection({
  technologies,
  loading,
  error,
}: TechnologiesSectionProps) {
  const grouped = technologies.reduce<Record<string, TechnologyItem[]>>((acc, tech) => {
    if (!acc[tech.category]) acc[tech.category] = [];
    acc[tech.category].push(tech);
    return acc;
  }, {});

  return (
    <section className="relative overflow-hidden bg-slate-950 py-20 lg:py-28">
      <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-brand-600/10 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative">
        <SectionHeading
          eyebrow="Our Stack"
          title="Building Technology With Purpose"
          description="We work with modern, battle-tested technologies to build fast, scalable and reliable products."
          dark
        />

        {loading && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <LoadingCard key={i} className="min-h-[120px] bg-white/5" />
            ))}
          </div>
        )}

        {error && !loading && <ErrorMessage message={error} />}

        {!loading && !error && technologies.length === 0 && (
          <EmptyState
            title="No technologies added yet"
            description="Check back soon to see the technologies we work with."
          />
        )}

        {!loading && !error && technologies.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(grouped).map(([category, techs], catIndex) => (
              <Reveal key={category} delay={(catIndex % 3) as 0 | 1 | 2}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm transition-colors duration-300 hover:border-brand-500/30 hover:bg-white/[0.07]">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-brand-300">
                    {category}
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {techs.map((tech) => (
                      <span
                        key={tech._id}
                        className={cn(
                          'inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-slate-800/80 px-3.5 py-2 text-sm font-medium text-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-400/40 hover:text-white',
                          tech.color ? `hover:${tech.color}` : 'hover:shadow-brand-sm'
                        )}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                        {tech.name}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}