import { ArrowUpRight } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import LoadingCard from '@/components/ui/LoadingCard';
import ErrorMessage from '@/components/ui/ErrorMessage';
import EmptyState from '@/components/ui/EmptyState';
import type { ProjectItem } from '@/types';

interface ProjectsSectionProps {
  projects: ProjectItem[];
  loading?: boolean;
  error?: string;
}

export default function ProjectsSection({ projects, loading, error }: ProjectsSectionProps) {
  const visible = projects.slice(0, 3);

  return (
    <section className="bg-white py-20 lg:py-28" id="projects">
      <Container>
        <SectionHeading
          eyebrow="Portfolio"
          title="Built for Real Businesses"
          description="Practical projects across websites, apps, POS systems and business software."
        />

        {loading && (
          <div className="grid gap-6 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <LoadingCard key={i} className="min-h-[280px]" />
            ))}
          </div>
        )}

        {error && !loading && <ErrorMessage message={error} />}

        {!loading && !error && projects.length === 0 && (
          <EmptyState
            title="Our project showcase is being prepared"
            description="We are curating our latest work. Please check back soon to see what we have built."
          />
        )}

        {!loading && !error && projects.length > 0 && (
          <>
            <div className="grid gap-6 lg:grid-cols-3">
              {visible.map((project) => (
                <article
                  key={project._id}
                  className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
                      {project.category}
                    </span>
                    {project.isDemo && (
                      <span className="inline-flex rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-medium text-amber-700">
                        Demo
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{project.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link || '/projects'}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700"
                  >
                    View Project
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </article>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button href="/projects" variant="outline">
                View All Projects
              </Button>
            </div>
          </>
        )}
      </Container>
    </section>
  );
}