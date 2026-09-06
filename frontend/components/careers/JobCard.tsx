import { useState } from 'react';
import { Briefcase, ChevronDown, MapPin, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Job } from '@/types';

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 px-6 py-6 text-left"
        aria-expanded={open}
      >
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{job.title}</h3>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-slate-600">
            <span className="inline-flex items-center gap-1.5">
              <Tag className="h-4 w-4 text-slate-400" aria-hidden="true" />
              {job.department}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-slate-400" aria-hidden="true" />
              {job.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Briefcase className="h-4 w-4 text-slate-400" aria-hidden="true" />
              {job.employmentType}
            </span>
          </div>
        </div>
        <ChevronDown
          className={cn(
            'h-5 w-5 shrink-0 text-slate-400 transition-transform',
            open && 'rotate-180'
          )}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div className="border-t border-slate-100 px-6 py-6">
          <p className="leading-relaxed text-slate-600">{job.description}</p>

          {job.requirements.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-slate-900">Requirements</h4>
              <ul className="mt-3 space-y-2">
                {job.requirements.map((req) => (
                  <li key={req} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {job.responsibilities.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-slate-900">What you&apos;ll do</h4>
              <ul className="mt-3 space-y-2">
                {job.responsibilities.map((resp) => (
                  <li key={resp} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                    {resp}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {job.salaryRange && (
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-slate-900">Salary range</h4>
              <p className="mt-1 text-sm text-slate-600">{job.salaryRange}</p>
            </div>
          )}

          <div className="mt-6">
            <a
              href="/contact?subject=career"
              className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800"
            >
              Apply for this position
            </a>
          </div>
        </div>
      )}
    </article>
  );
}