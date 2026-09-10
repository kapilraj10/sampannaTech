import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowRight,
  ExternalLink,
  Layers,
  MapPin,
  Quote,
  Target,
  Wrench,
  TrendingUp,
} from 'lucide-react';
import Container from '@/components/ui/Container';
import CTASection from '@/components/sections/CTASection';
import Button from '@/components/ui/Button';
import { getCaseStudyData } from '@/lib/data';
import { siteConfig } from '@/config/site';
import { placeholderImage } from '@/lib/utils';
import type { CaseStudyItem } from '@/types';

interface CaseStudyDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: CaseStudyDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const study = await getCaseStudyData(slug);
    return {
      title: study.title,
      description:
        study.solution || `${study.clientName} — a case study by ${siteConfig.name}.`,
      alternates: { canonical: `${siteConfig.url}/case-studies/${study.slug}` },
    };
  } catch {
    return { title: 'Case Study Not Found' };
  }
}

export default async function CaseStudyDetailPage({ params }: CaseStudyDetailPageProps) {
const { slug } = await params;
  let study: CaseStudyItem;
  try {
    study = await getCaseStudyData(slug);
  } catch {
    notFound();
  }

  return (
    <>
      <section className="border-b border-slate-200 bg-white pb-12 pt-28 lg:pt-32">
        <Container>
          <nav className="mb-5 flex flex-wrap items-center gap-2 text-sm text-slate-500" aria-label="Breadcrumb">
            <Link href="/" className="transition-colors hover:text-brand-600">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/case-studies" className="transition-colors hover:text-brand-600">
              Case Studies
            </Link>
            <span aria-hidden="true">/</span>
            <span className="font-medium text-slate-700">{study.clientName}</span>
          </nav>

          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              {study.industry && (
                <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
                  {study.industry}
                </span>
              )}
              {study.featured && (
                <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                  Featured Case Study
                </span>
              )}
            </div>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              {study.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">{study.solution}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {study.projectUrl && (
                <Button href={study.projectUrl}>
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  Visit Project
                </Button>
              )}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-slate-200 shadow-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={study.coverImage || placeholderImage}
              alt={study.title}
              className="aspect-video w-full object-cover"
            />
          </div>
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-6 md:grid-cols-3">
              {[
                { label: 'Client', value: study.clientName, icon: MapPin },
                { label: 'Industry', value: study.industry || '—', icon: Target },
                { label: 'Project Status', value: 'Delivered & Live', icon: TrendingUp },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-medium text-slate-500">{item.label}</p>
                    <p className="mt-0.5 font-semibold text-slate-900">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <div className="mx-auto max-w-5xl space-y-8">
            {[
              {
                title: 'The Challenge',
                icon: Target,
                content: study.problem,
              },
              {
                title: 'Our Solution',
                icon: Wrench,
                content: study.solution,
              },
              {
                title: 'The Results',
                icon: TrendingUp,
                content: study.results,
              },
            ].map((section) => (
              <div
                key={section.title}
                className="rounded-2xl border border-slate-200 bg-white p-8 shadow-soft transition-shadow hover:shadow-card"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <section.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h2 className="text-xl font-semibold text-slate-900">{section.title}</h2>
                </div>
                <p className="mt-4 leading-relaxed text-slate-600">{section.content}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {study.technologies.length > 0 && (
        <section className="pb-16">
          <Container>
            <div className="mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white p-8 shadow-soft">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Layers className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="text-xl font-semibold text-slate-900">Technology Stack</h2>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {study.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-brand-300 hover:text-brand-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {study.gallery && study.gallery.length > 0 && (
        <section className="pb-16">
          <Container>
            <h2 className="mx-auto mb-8 max-w-5xl text-xl font-semibold text-slate-900">
              Project Gallery
            </h2>
            <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2">
              {study.gallery.map((image, index) => (
                <div key={image} className="img-zoom overflow-hidden rounded-2xl border border-slate-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image}
                    alt={`${study.clientName} — screenshot ${index + 1}`}
                    className="aspect-video w-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {study.testimonial && (
        <section className="pb-16">
          <Container>
            <div className="mx-auto max-w-4xl rounded-2xl bg-slate-950 p-10 text-center">
              <Quote className="mx-auto h-8 w-8 text-brand-400" aria-hidden="true" />
              <blockquote className="mx-auto mt-5 max-w-2xl text-xl font-medium leading-relaxed text-white sm:text-2xl">
                &ldquo;{study.testimonial}&rdquo;
              </blockquote>
              <p className="mt-6 font-semibold text-brand-300">{study.testimonialAuthor}</p>
              {study.testimonialRole && (
                <p className="mt-1 text-sm text-slate-400">{study.testimonialRole}</p>
              )}
            </div>
          </Container>
        </section>
      )}

      <section className="pb-20">
        <Container>
          <div className="mx-auto flex max-w-5xl flex-col justify-between gap-6 rounded-2xl border border-slate-200 bg-slate-50 p-8 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Have a similar project in mind?
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Let&apos;s discuss how we can help you achieve results like these.
              </p>
            </div>
            <Button href="/contact">
              Start a Project
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}