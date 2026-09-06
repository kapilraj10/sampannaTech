'use client';

import { useEffect, useState } from 'react';
import { useApiData, api } from '@/hooks/useApiData';
import Stats from '@/components/sections/Stats';
import ServicesSection from '@/components/sections/ServicesSection';
import ProductsSection from '@/components/sections/ProductsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import BlogSection from '@/components/sections/BlogSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import type { BlogPost, ContactInfo, ProductItem, ProjectItem, ServiceItem, Testimonial } from '@/types';
import { defaultSiteInfo } from '@/lib/data';

interface HomeLiveProps {
  initialSiteInfo?: ContactInfo;
}

export default function HomeLive({ initialSiteInfo }: HomeLiveProps) {
  const services = useApiData<ServiceItem>(() => api.getServices());
  const products = useApiData<ProductItem>(() => api.getProducts());
  const projects = useApiData<ProjectItem>(() => api.getProjects());
  const testimonials = useApiData<Testimonial>(() => api.getTestimonials());
  const blogs = useApiData<BlogPost>(() => api.getBlogs());

  const [siteInfo, setSiteInfo] = useState<ContactInfo>(initialSiteInfo || defaultSiteInfo);

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
    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <Stats siteInfo={siteInfo} />
      <ServicesSection
        services={services.data}
        loading={services.loading}
        error={services.error ?? undefined}
      />
      <ProductsSection
        products={products.data}
        loading={products.loading}
        error={products.error ?? undefined}
      />
      <ProjectsSection
        projects={projects.data}
        loading={projects.loading}
        error={projects.error ?? undefined}
      />
      <BlogSection posts={blogs.data} loading={blogs.loading} error={blogs.error ?? undefined} />
      <TestimonialsSection
        testimonials={testimonials.data}
        loading={testimonials.loading}
        error={testimonials.error ?? undefined}
      />
    </>
  );
}