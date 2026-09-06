'use client';

import { useMemo, useState } from 'react';
import { useApiData, api } from '@/hooks/useApiData';
import Container from '@/components/ui/Container';
import LoadingCard from '@/components/ui/LoadingCard';
import ErrorMessage from '@/components/ui/ErrorMessage';
import EmptyState from '@/components/ui/EmptyState';
import BlogCard from '@/components/blog/BlogCard';
import { cn } from '@/lib/utils';

const categories = [
  'All',
  'Technology',
  'Business',
  'Software',
  'Digital Transformation',
  'Company Updates',
];

export default function BlogView() {
  const blogs = useApiData(() => api.getBlogs());
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return blogs.data;
    return blogs.data.filter((b) => b.category === activeCategory);
  }, [blogs.data, activeCategory]);

  return (
    <section className="bg-slate-50 py-20 lg:py-24">
      <Container>
        {!blogs.loading && !blogs.error && (
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

        {blogs.loading && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <LoadingCard key={i} className="min-h-[240px]" />
            ))}
          </div>
        )}

        {blogs.error && !blogs.loading && (
          <ErrorMessage message={blogs.error} onRetry={blogs.refetch} />
        )}

        {!blogs.loading && !blogs.error && filtered.length === 0 && (
          <EmptyState
            title={
              activeCategory === 'All'
                ? 'No articles yet'
                : `No articles under ${activeCategory} yet`
            }
            description="We are working on useful content about technology and business. Please check back soon."
          />
        )}

        {!blogs.loading && !blogs.error && filtered.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}