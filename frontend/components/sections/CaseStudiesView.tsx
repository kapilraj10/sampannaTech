'use client';

import { useMemo, useState } from 'react';
import { useApiData, api } from '@/hooks/useApiData';
import Container from '@/components/ui/Container';
import LoadingCard from '@/components/ui/LoadingCard';
import ErrorMessage from '@/components/ui/ErrorMessage';
import EmptyState from '@/components/ui/EmptyState';
import CaseStudyCard from '@/components/sections/CaseStudyCard';
import { cn } from '@/lib/utils';

export default function CaseStudiesView() {
  const studies = useApiData(() => api.getCaseStudies());
  const [activeIndustry, setActiveIndustry] = useState('All');

  const industries = useMemo(() => {
    const set = new Set<string>();
    studies.data.forEach((s) => {
      if (s.industry) set.add(s.industry);
    });
    return ['All', ...Array.from(set)];
  }, [studies.data]);

  const filtered = useMemo(() => {
    if (activeIndustry === 'All') return studies.data;
    return studies.data.filter((s) => s.industry === activeIndustry);
  }, [studies.data, activeIndustry]);

  return (
    <section className="bg-slate-50 py-20 lg:py-24">
      <Container>
        {!studies.loading && !studies.error && industries.length > 1 && (
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {industries.map((industry) => (
              <button
                key={industry}
                type="button"
                onClick={() => setActiveIndustry(industry)}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  activeIndustry === industry
                    ? 'bg-brand-600 text-white'
                    : 'border border-slate-300 bg-white text-slate-600 hover:border-brand-300 hover:text-brand-600'
                )}
              >
                {industry}
              </button>
            ))}
          </div>
        )}

        {studies.loading && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <LoadingCard key={i} className="min-h-[340px]" />
            ))}
          </div>
        )}

        {studies.error && !studies.loading && (
          <ErrorMessage message={studies.error} onRetry={studies.refetch} />
        )}

        {!studies.loading && !studies.error && filtered.length === 0 && (
          <EmptyState
            title={activeIndustry === 'All' ? 'No case studies yet' : `No ${activeIndustry} case studies`}
            description="We are documenting how we help businesses succeed. Please check back soon."
          />
        )}

        {!studies.loading && !studies.error && filtered.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((study) => (
              <CaseStudyCard key={study._id} study={study} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}