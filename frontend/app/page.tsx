import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import AboutSection from '@/components/sections/AboutSection';
import WhySection from '@/components/sections/WhySection';
import ProcessSection from '@/components/sections/ProcessSection';
import CTASection from '@/components/sections/CTASection';
import HomeLive from '@/components/sections/HomeLive';
import { siteConfig } from '@/config/site';
import { getSiteInfo } from '@/lib/data';

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.shortDescription,
  alternates: { canonical: `${siteConfig.url}/` },
};

export default async function HomePage() {
  const siteInfo = await getSiteInfo();

  return (
    <>
      <Hero />
      <HomeLive initialSiteInfo={siteInfo} />
      <AboutSection />
      <WhySection />
      <ProcessSection />
      <CTASection />
    </>
  );
}