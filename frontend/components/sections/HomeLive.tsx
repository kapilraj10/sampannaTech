'use client';

import { useEffect, useState } from 'react';
import { useApiData, api } from '@/hooks/useApiData';
import Stats from '@/components/sections/Stats';
import Hero from '@/components/sections/Hero';
import ServicesSection from '@/components/sections/ServicesSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import CaseStudiesSection from '@/components/sections/CaseStudiesSection';
import TechnologiesSection from '@/components/sections/TechnologiesSection';
import WhySection from '@/components/sections/WhySection';
import ProcessSection from '@/components/sections/ProcessSection';
import CTASection from '@/components/sections/CTASection';
import BlogSection from '@/components/sections/BlogSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import type {
  BlogPost,
  CaseStudyItem,
  ContactInfo,
  HomeSectionItem,
  ProcessStepItem,
  ProjectItem,
  ServiceItem,
  TechnologyItem,
  Testimonial,
  WhyChooseUsItem,
} from '@/types';
import { defaultSiteInfo } from '@/lib/data';

interface HomeLiveProps {
  initialSiteInfo?: ContactInfo;
  initialHero?: HomeSectionItem | null;
  initialCta?: HomeSectionItem | null;
}

export default function HomeLive({
  initialSiteInfo,
  initialHero,
  initialCta,
}: HomeLiveProps) {
  const services = useApiData<ServiceItem>(() => api.getServices());
  const projects = useApiData<ProjectItem>(() => api.getProjects());
  const caseStudies = useApiData<CaseStudyItem>(() => api.getCaseStudies());
  const testimonials = useApiData<Testimonial>(() => api.getTestimonials());
  const blogs = useApiData<BlogPost>(() => api.getBlogs());
  const technologies = useApiData<TechnologyItem>(() => api.getTechnologies());
  const processSteps = useApiData<ProcessStepItem>(() => api.getProcessSteps());
  const whyChooseUs = useApiData<WhyChooseUsItem>(() => api.getWhyChooseUs());

  const [siteInfo, setSiteInfo] = useState<ContactInfo>(initialSiteInfo || defaultSiteInfo);
  const [hero, setHero] = useState<HomeSectionItem | null>(initialHero || null);
  const [cta, setCta] = useState<HomeSectionItem | null>(initialCta || null);

  useEffect(() => {
    let active = true;
    api
      .getSiteSettings()
      .then((result) => {
        if (active && result.success && result.data) {
          setSiteInfo({
            ...defaultSiteInfo,
            ...result.data,
            stats: { ...defaultSiteInfo.stats, ...(result.data.stats || {}) },
          });
        }
      })
      .catch(() => {
        // keep default
      });

    api
      .getHomeSection('hero')
      .then((result) => {
        if (active && result.success && result.data) setHero(result.data);
      })
      .catch(() => {});

    api
      .getHomeSection('cta')
      .then((result) => {
        if (active && result.success && result.data) setCta(result.data);
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <HeroSectionWrapper hero={hero} />
      <Stats siteInfo={siteInfo} />
      <ServicesSection
        services={services.data}
        loading={services.loading}
        error={services.error ?? undefined}
      />
      <ProjectsSection
        projects={projects.data}
        loading={projects.loading}
        error={projects.error ?? undefined}
      />
      <CaseStudiesSection
        studies={caseStudies.data}
        loading={caseStudies.loading}
        error={caseStudies.error ?? undefined}
      />
      <WhySection
        items={whyChooseUs.data}
        loading={whyChooseUs.loading}
        error={whyChooseUs.error ?? undefined}
      />
      <TechnologiesSection
        technologies={technologies.data}
        loading={technologies.loading}
        error={technologies.error ?? undefined}
      />
      <ProcessSection
        steps={processSteps.data}
        loading={processSteps.loading}
        error={processSteps.error ?? undefined}
      />
      <BlogSection posts={blogs.data} loading={blogs.loading} error={blogs.error ?? undefined} />
      <TestimonialsSection
        testimonials={testimonials.data}
        loading={testimonials.loading}
        error={testimonials.error ?? undefined}
      />
      <CTASection cta={cta} />
    </>
  );
}

function HeroSectionWrapper({ hero }: { hero: HomeSectionItem | null }) {
  return <Hero hero={hero} />;
}