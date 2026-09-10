import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import LoadingCard from '@/components/ui/LoadingCard';
import ErrorMessage from '@/components/ui/ErrorMessage';
import EmptyState from '@/components/ui/EmptyState';
import Reveal from '@/components/ui/Reveal';
import { placeholderImage } from '@/lib/utils';
import type { ProjectItem } from '@/types';

interface ProjectsSectionProps {
  projects: ProjectItem[];
  loading?: boolean;
  error?: string;
}

export default function ProjectsSection({ projects, loading, error }: ProjectsSectionProps) {
  const visible = projects.filter((p) => p.isFeatured).slice(0, 3);
  const display = visible.length >= 3 ? visible : projects.slice(0, 3);

  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 lg:py-28" id="projects">
      <Container>
        <SectionHeading
          eyebrow="Portfolio"
          title="Software We Have Built"
          description="A selection of products and platforms we have designed, built and shipped for real businesses."
        />

        {loading && (
          <div className="grid gap-6 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <LoadingCard key={i} className="min-h-[320px]" />
            ))}
          </div>
        )}

        {error && !loading && <ErrorMessage message={error} />}

        {!loading && !error && display.length === 0 && (
          <EmptyState
            title="Our project showcase is being prepared"
            description="We are curating our latest work. Please check back soon to see what we have built."
          />
        )}

        {!loading && !error && display.length > 0 && (
          <>
            <div className="grid gap-6 lg:grid-cols-3">
              {display.map((project, i) => (
                <Reveal key={project._id} delay={(i % 3) as 0 | 1 | 2}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card"
                  >
                    <div className="img-zoom relative aspect-[16/10] overflow-hidden bg-slate-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.coverImage || project.image || placeholderImage}
                        alt={project.name}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <span className="absolute left-4 top-4 inline-flex rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-slate-700 shadow-soft backdrop-blur">
                        {project.category}
                      </span>
                      {project.isFeatured && (
                        <span className="absolute right-4 top-4 inline-flex rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white shadow-brand-sm">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-lg font-semibold text-slate-900 transition-colors group-hover:text-brand-700">
                        {project.name}
                      </h3>
                      {project.client && (
                        <p className="mt-0.5 text-xs font-medium text-slate-500">Client: {project.client}</p>
                      )}
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 line-clamp-2">
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
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                        View Project
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button href="/projects" variant="outline">
                View All Projects
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </>
        )}
      </Container>
    </section>
  );
}