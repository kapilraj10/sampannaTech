import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import ProjectsView from '@/components/sections/ProjectsView';
import CTASection from '@/components/sections/CTASection';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Explore projects built by Sampanna Tech across business software, POS systems, websites, mobile apps and e-commerce.',
  alternates: { canonical: `${siteConfig.url}/projects` },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title="Built for Real Businesses"
        description="A selection of projects across websites, mobile apps, POS systems and business software. Projects marked as demos are examples we use to illustrate what we build."
      />
      <ProjectsView />
      <CTASection />
    </>
  );
}