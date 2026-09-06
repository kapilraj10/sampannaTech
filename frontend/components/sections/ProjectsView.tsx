'use client';

import { useMemo, useState } from 'react';
import { useApiData, api } from '@/hooks/useApiData';
import Container from '@/components/ui/Container';
import LoadingCard from '@/components/ui/LoadingCard';
import ErrorMessage from '@/components/ui/ErrorMessage';
import EmptyState from '@/components/ui/EmptyState';
import ProjectCard from '@/components/sections/ProjectCard';
import { cn } from '@/lib/utils';

const categories = ['All', 'Business Software', 'POS System', 'Website', 'Mobile App', 'E-commerce'];

export default function ProjectsView() {
  const projects = useApiData(() => api.getProjects());
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return projects.data;
    return projects.data.filter((p) => p.category === activeCategory);
  }, [projects.data, activeCategory]);

  return (
    <section className="bg-slate-50 py-20 lg:py-24">
      <Container>
        {!projects.loading && !projects.error && (
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  activeCategory === category
                    ? 'bg-brand-600 text-white'
                    : 'border border-slate-300 bg-white text-slate-600 hover:border-brand-300 hover:text-brand-600'
                )}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {projects.loading && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <LoadingCard key={i} className="min-h-[280px]" />
            ))}
          </div>
        )}

        {projects.error && !projects.loading && (
          <ErrorMessage message={projects.error} onRetry={projects.refetch} />
        )}

        {!projects.loading && !projects.error && filtered.length === 0 && (
          <EmptyState
            title={activeCategory === 'All' ? 'No projects yet' : `No ${activeCategory} projects yet`}
            description={
              activeCategory === 'All'
                ? 'Our project showcase is being prepared. Please check back soon.'
                : 'We have not published projects in this category yet.'
            }
          />
        )}

        {!projects.loading && !projects.error && filtered.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}