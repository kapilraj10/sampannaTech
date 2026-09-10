import Link from 'next/link';
import { ArrowRight, Quote } from 'lucide-react';
import { placeholderImage } from '@/lib/utils';
import type { CaseStudyItem } from '@/types';

interface CaseStudyCardProps {
  study: CaseStudyItem;
}

export default function CaseStudyCard({ study }: CaseStudyCardProps) {
  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-card"
    >
      <div className="img-zoom relative aspect-[16/9] overflow-hidden bg-slate-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={study.coverImage || placeholderImage}
          alt={study.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        {study.industry && (
          <span className="absolute left-4 top-4 inline-flex rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-slate-700 shadow-soft backdrop-blur">
            {study.industry}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
          {study.clientName}
        </p>
        <h2 className="mt-2 text-lg font-semibold leading-snug text-slate-900 transition-colors group-hover:text-brand-700">
          {study.title}
        </h2>

        {study.testimonial && (
          <div className="mt-4 rounded-xl bg-slate-50 p-4">
            <Quote className="h-4 w-4 text-brand-500" aria-hidden="true" />
            <p className="mt-1 line-clamp-3 text-sm italic leading-relaxed text-slate-600">
              {study.testimonial}
            </p>
          </div>
        )}

        {study.technologies.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {study.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-brand-600">
          Read Case Study
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}