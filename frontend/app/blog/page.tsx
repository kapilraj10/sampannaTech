import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import BlogView from '@/components/blog/BlogView';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Blog & Insights',
  description:
    'Practical insights from Sampanna Tech on technology, business, software, digital transformation and the work we do.',
  alternates: { canonical: `${siteConfig.url}/blog` },
};

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title="Blog & Insights"
        description="Practical ideas on technology, business and digital transformation — written for people running real companies."
      />
      <BlogView />
    </>
  );
}