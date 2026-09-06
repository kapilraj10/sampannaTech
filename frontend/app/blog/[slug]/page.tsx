import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { ArrowLeft, CalendarDays, Clock, User } from 'lucide-react';
import Container from '@/components/ui/Container';
import BlogCard from '@/components/blog/BlogCard';
import Markdown from '@/components/blog/Markdown';
import { getBlogData } from '@/lib/data';
import { formatDateLong, readTime } from '@/lib/utils';
import { siteConfig } from '@/config/site';
import type { BlogPost } from '@/types';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { post } = await getBlogData(slug);

  if (!post) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `${siteConfig.url}/blog/${post.slug}`,
    },
    openGraph: {
      type: 'article',
      url: `${siteConfig.url}/blog/${post.slug}`,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

function BlogJsonLd({ post }: { post: BlogPost }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt || post.createdAt,
    author: {
      '@type': 'Organization',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
  };

  return (
    <Script
      id={`blog-jsonld-${post.slug}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const { post, related } = await getBlogData(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <BlogJsonLd post={post} />

      <section className="border-b border-slate-200 bg-white pb-14 pt-28 lg:pt-36">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-brand-600"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            <div className="mt-6 flex items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
                {post.category}
              </span>
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
              {post.title}
            </h1>

            <p className="mt-4 text-lg leading-relaxed text-slate-600">{post.excerpt}</p>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-slate-100 pt-6 text-sm text-slate-500">
              <span className="inline-flex items-center gap-2">
                <User className="h-4 w-4" />
                {post.author}
              </span>
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                {formatDateLong(post.publishedAt || post.createdAt)}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {readTime(post.content)} min read
              </span>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 py-16 lg:py-20">
        <Container>
          <article className="mx-auto max-w-3xl">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-soft sm:p-12">
              <Markdown content={post.content} />
            </div>
          </article>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="bg-white py-16 lg:py-20">
          <Container>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900">Related Articles</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((relatedPost) => (
                <BlogCard key={relatedPost._id} post={relatedPost} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}