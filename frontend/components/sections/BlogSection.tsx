import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import LoadingCard from '@/components/ui/LoadingCard';
import ErrorMessage from '@/components/ui/ErrorMessage';
import EmptyState from '@/components/ui/EmptyState';
import { formatDate, readTime } from '@/lib/utils';
import type { BlogPost } from '@/types';

interface BlogSectionProps {
  posts: BlogPost[];
  loading?: boolean;
  error?: string;
}

export default function BlogSection({ posts, loading, error }: BlogSectionProps) {
  const visible = posts.slice(0, 3);
  const featured = visible[0];
  const rest = visible.slice(1);

  return (
    <section className="bg-white py-20 lg:py-28" id="insights">
      <Container>
        <SectionHeading
          eyebrow="Insights"
          title="From Our Blog"
          description="Practical ideas on technology, business and digital transformation."
        />

        {loading && (
          <div className="grid gap-6 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <LoadingCard key={i} className="min-h-[220px]" />
            ))}
          </div>
        )}

        {error && !loading && <ErrorMessage message={error} />}

        {!loading && !error && posts.length === 0 && (
          <EmptyState
            title="No articles yet"
            description="We are working on useful content about technology and business. Please check back soon."
          />
        )}

        {!loading && !error && posts.length > 0 && (
          <>
            <div className="grid gap-6 lg:grid-cols-3">
              {featured && (
                <article className="group flex flex-col rounded-2xl border border-slate-200 bg-slate-50 p-7 shadow-soft transition-shadow hover:shadow-card lg:row-span-2">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="inline-flex rounded-full bg-brand-50 px-2.5 py-1 font-medium text-brand-700">
                      {featured.category}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {readTime(featured.content)} min read
                    </span>
                  </div>
                  <h3 className="mt-4 text-2xl font-bold text-slate-900">
                    <Link href={`/blog/${featured.slug}`} className="hover:text-brand-600">
                      {featured.title}
                    </Link>
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                    {featured.excerpt}
                  </p>
                  <div className="mt-5 border-t border-slate-200 pt-4 text-xs text-slate-500">
                    {formatDate(featured.publishedAt || featured.createdAt)} · {featured.author}
                  </div>
                </article>
              )}

              {rest.map((post) => (
                <article
                  key={post._id}
                  className="group flex flex-col rounded-2xl border border-slate-200 p-7 shadow-soft transition-shadow hover:shadow-card"
                >
                  <span className="inline-flex w-fit rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700">
                    {post.category}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-brand-600"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 text-xs text-slate-500">
                    {formatDate(post.publishedAt || post.createdAt)}
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-10">
              <Button href="/blog" variant="outline">
                View All Articles
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </>
        )}
      </Container>
    </section>
  );
}