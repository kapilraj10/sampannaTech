import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { ProjectItem } from '@/types';

interface ProjectCardProps {
  project: ProjectItem;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
          {project.category}
        </span>
        <div className="flex gap-2">
          {project.isDemo && (
            <span className="inline-flex rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-medium text-amber-700">
              Demo
            </span>
          )}
          {project.isFeatured && (
            <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
              Featured
            </span>
          )}
        </div>
      </div>

      <h2 className="mt-4 text-lg font-semibold text-slate-900">{project.name}</h2>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
        {project.description}
      </p>

      {project.technologies.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      <Link
        href={project.link || '/projects'}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 transition-colors hover:text-brand-700"
      >
        View Project
        <ArrowUpRight className="h-4 w-4" />
      </Link>
    </article>
  );
}