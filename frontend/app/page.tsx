import type { Metadata } from 'next';
import HomeLive from '@/components/sections/HomeLive';
import { siteConfig } from '@/config/site';
import { getHomeSectionData, getSiteInfo } from '@/lib/data';

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.shortDescription,
  alternates: { canonical: `${siteConfig.url}/` },
};

export default async function HomePage() {
  const [siteInfo, hero, cta] = await Promise.all([
    getSiteInfo(),
    getHomeSectionData('hero'),
    getHomeSectionData('cta'),
  ]);

  return (
    <HomeLive initialSiteInfo={siteInfo} initialHero={hero} initialCta={cta} />
  );
}