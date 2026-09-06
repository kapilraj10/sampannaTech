import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import TeamView from '@/components/sections/TeamView';
import CTASection from '@/components/sections/CTASection';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Our Team',
  description:
    'Meet the team behind Sampanna Tech — the developers, designers and consultants who build and support our digital solutions.',
  alternates: { canonical: `${siteConfig.url}/team` },
};

export default function TeamPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Team"
        title="The People Behind Sampanna Tech"
        description="A team of developers, designers and technology consultants focused on building reliable digital solutions for businesses."
      />
      <TeamView />
      <CTASection />
    </>
  );
}