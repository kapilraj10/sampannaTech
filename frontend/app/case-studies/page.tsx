import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import CaseStudiesView from '@/components/sections/CaseStudiesView';
import CTASection from '@/components/sections/CTASection';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Case Studies',
  description:
    'Real business problems, practical technology solutions and measurable results from Sampanna Tech.',
  alternates: { canonical: `${siteConfig.url}/case-studies` },
};

export default function CaseStudiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Case Studies"
        title="Built for Real Businesses"
        description="Explore how we partner with businesses to solve real challenges with modern technology and deliver measurable results."
      />
      <CaseStudiesView />
      <CTASection />
    </>
  );
}