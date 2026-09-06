import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  ArrowUpRight,
  CalendarDays,
  ExternalLink,
  Github,
  Layers,
  Link2,
} from 'lucide-react';
import Container from '@/components/ui/Container';
import CTASection from '@/components/sections/CTASection';
import { getProjectData } from '@/lib/data';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const project = await getProjectData(slug);
    return {
      title: project.name,
      description:
        project.description || `${project.name} — a project by ${siteConfig.name}.`,
      alternates: { canonical: `${siteConfig.url}/projects/${project.slug}` },
    };
  } catch {
    return {
      title: 'Project Not Found',
    };
  }
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  let project;
  try {
    project = await getProjectData(slug);
  } catch {
    notFound();
  }

  const caseSections = [
    { title: 'Challenge', content: project.challenges },
    { title: 'Solution', content: project.solution },
    { title: 'Results', content: project.results },
  ].filter((s) => s.content);

  return (
    <>
      <section className="border-b border-slate-200 bg-white pb-12 pt-28 lg:pt-32">
        <Container>
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
                {project.category}
              </span>
              {project.client && (
                <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  {project.client}
                </span>
              )}
              {project.industry && (
                <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  {project.industry}
                </span>
              )}
              {project.isDemo && (
                <span className="inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                  Demo
                </span>
              )}
            </div>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              {project.name}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              {project.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {project.link || project.websiteUrl ? (
                <a
                  href={project.websiteUrl || project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
                >
                  Visit Project
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              ) : null}
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-300"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  View Code
                </a>
              ) : null}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="mx-auto max-w-4xl">
            {project.coverImage ? (
              <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-soft">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.coverImage}
                  alt={project.name}
                  className="aspect-video w-full object-cover"
                />
              </div>
            ) : null}
          </div>
        </Container>
      </section>

      {caseSections.length > 0 ? (
        <section className="pb-16">
          <Container>
            <div className="mx-auto max-w-4xl space-y-10">
              {caseSections.map((section) => (
                <div
                  key={section.title}
                  className="rounded-2xl border border-slate-200 bg-white p-8 shadow-soft"
                >
                  <h2 className="text-xl font-semibold text-slate-900">
                    {section.title}
                  </h2>
                  <p className="mt-3 leading-relaxed text-slate-600">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {project.gallery && project.gallery.length > 0 ? (
        <section className="pb-16">
          <Container>
            <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
              {project.gallery.map((image, index) => (
                <div
                  key={image}
                  className="overflow-hidden rounded-2xl border border-slate-200"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image}
                    alt={`${project.name} — screenshot ${index + 1}`}
                    className="aspect-video w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <section className="pb-20">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <Layers className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h2 className="font-semibold text-slate-900">Technologies</h2>
                </div>
                {project.technologies.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="mt-3 text-sm text-slate-500">—</p>
                )}
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <CalendarDays className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h2 className="font-semibold text-slate-900">Project Details</h2>
                </div>
                <dl className="mt-4 space-y-2.5 text-sm">
                  {project.client && (
                    <div className="flex justify-between gap-4">
                      <dt className="text-slate-500">Client</dt>
                      <dd className="font-medium text-slate-900">{project.client}</dd>
                    </div>
                  )}
                  {project.industry && (
                    <div className="flex justify-between gap-4">
                      <dt className="text-slate-500">Industry</dt>
                      <dd className="font-medium text-slate-900">{project.industry}</dd>
                    </div>
                  )}
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-500">Category</dt>
                    <dd className="font-medium text-slate-900">{project.category}</dd>
                  </div>
                  {project.websiteUrl && (
                    <div className="flex justify-between gap-4">
                      <dt className="flex items-center gap-1.5 text-slate-500">
                        <Link2 className="h-3.5 w-3.5" aria-hidden="true" />
                        Website
                      </dt>
                      <dd>
                        <a
                          href={project.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            'inline-flex items-center gap-1 font-medium text-brand-600 hover:text-brand-700'
                          )}
                        >
                          Visit
                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}