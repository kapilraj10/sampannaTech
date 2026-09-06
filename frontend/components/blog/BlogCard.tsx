import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { formatDate, readTime } from '@/lib/utils';
import type { BlogPost } from '@/types';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card">
      <div className="flex items-center justify-between">
        <span className="inline-flex rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700">
          {post.category}
        </span>
        <span className="inline-flex items-center gap-1 text-xs text-slate-500">
          <Clock className="h-3.5 w-3.5" />
          {readTime(post.content)} min read
        </span>
      </div>

      <h2 className="mt-4 text-lg font-semibold text-slate-900">
        <Link href={`/blog/${post.slug}`} className="hover:text-brand-600">
          {post.title}
        </Link>
      </h2>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{post.excerpt}</p>

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <div className="text-xs text-slate-500">
          <p className="font-medium text-slate-700">{post.author}</p>
          <p>{formatDate(post.publishedAt || post.createdAt)}</p>
        </div>
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700"
        >
          Read
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}