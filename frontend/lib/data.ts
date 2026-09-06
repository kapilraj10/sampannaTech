import { api } from '@/lib/api';
import { siteConfig } from '@/config/site';
import type {
  BlogPost,
  ContactInfo,
  Job,
  ProductItem,
  ProjectItem,
  ServiceItem,
  TeamMember,
  Testimonial,
} from '@/types';
import { slugify } from '@/lib/utils';

const defaultServices: ServiceItem[] = [
  {
    _id: 's1',
    title: 'Website Development',
    slug: 'website-development',
    description:
      'Fast, responsive and professional websites designed to represent your brand and convert visitors into customers.',
    icon: 'Globe',
    order: 1,
  },
  {
    _id: 's2',
    title: 'Mobile App Development',
    slug: 'mobile-app-development',
    description:
      'Modern Android and iOS applications built for performance, usability and scalability.',
    icon: 'Smartphone',
    order: 2,
  },
  {
    _id: 's3',
    title: 'Custom Software Development',
    slug: 'custom-software-development',
    description:
      'Business-specific software designed around your workflow, operations and goals.',
    icon: 'Code',
    order: 3,
  },
  {
    _id: 's4',
    title: 'POS & Business Management Systems',
    slug: 'pos-and-business-management-systems',
    description:
      'Powerful solutions for billing, inventory, sales, reports and day-to-day business operations.',
    icon: 'LayoutDashboard',
    order: 4,
  },
  {
    _id: 's5',
    title: 'UI/UX Design',
    slug: 'ui-ux-design',
    description:
      'Simple, intuitive and modern interfaces that make digital products easier to use.',
    icon: 'PenTool',
    order: 5,
  },
  {
    _id: 's6',
    title: 'IT Consulting',
    slug: 'it-consulting',
    description:
      'Technology guidance to help businesses choose the right tools, architecture and digital strategy.',
    icon: 'Lightbulb',
    order: 6,
  },
  {
    _id: 's7',
    title: 'Digital Solutions',
    slug: 'digital-solutions',
    description:
      'Integrated digital solutions that connect your business, customers and operations.',
    icon: 'Network',
    order: 7,
  },
  {
    _id: 's8',
    title: 'Maintenance & Support',
    slug: 'maintenance-and-support',
    description:
      'Reliable technical support, updates, improvements and long-term maintenance.',
    icon: 'LifeBuoy',
    order: 8,
  },
];

const defaultProduct: ProductItem[] = [
  {
    _id: 'p1',
    name: 'Sampanna POS',
    slug: 'sampanna-pos',
    tagline: 'Modern point-of-sale and business management for growing businesses.',
    description:
      'Sampanna POS is a modern point-of-sale and business management solution designed to simplify billing, inventory, sales tracking and business operations.',
    features: [
      'Billing',
      'Inventory Management',
      'Sales Reports',
      'Product Management',
      'Customer Management',
      'Order Management',
      'Multi-branch support',
      'Business insights',
    ],
    featured: true,
  },
];

export const defaultSiteInfo: ContactInfo = {
  _id: 'settings-default',
  companyName: siteConfig.name,
  tagline: siteConfig.tagline,
  description: siteConfig.shortDescription,
  location: siteConfig.location,
  email: siteConfig.email,
  phone: siteConfig.phone,
  social: siteConfig.social,
  stats: siteConfig.stats,
};

export async function getSiteInfo(): Promise<ContactInfo> {
  try {
    const result = await api.getSiteSettings();
    if (result.success && result.data) {
      return {
        ...defaultSiteInfo,
        ...result.data,
        stats: { ...defaultSiteInfo.stats, ...(result.data.stats || {}) },
      };
    }
  } catch {
    // fall through to default
  }
  return defaultSiteInfo;
}

export async function getServicesData(): Promise<ServiceItem[]> {
  try {
    const result = await api.getServices();
    if (result.success && result.data) {
      return result.data;
    }
  } catch {
    // fall through
  }
  return defaultServices;
}

export async function getProductsData(): Promise<ProductItem[]> {
  try {
    const result = await api.getProducts();
    if (result.success && result.data && result.data.length > 0) {
      return result.data;
    }
  } catch {
    // fall through
  }
  return defaultProduct;
}

export async function getProjectsData(): Promise<ProjectItem[]> {
  try {
    const result = await api.getProjects();
    if (result.success && result.data) {
      return result.data;
    }
  } catch {
    // fall through
  }
  return [];
}

export async function getBlogsData(category?: string): Promise<BlogPost[]> {
  try {
    const result = await api.getBlogs(category);
    if (result.success && result.data) {
      return result.data;
    }
  } catch {
    // fall through
  }
  return [];
}

export async function getBlogData(slug: string): Promise<{
  post: BlogPost | null;
  related: BlogPost[];
}> {
  try {
    const result = await api.getBlog(slug);
    if (result.success && result.data) {
      return { post: result.data, related: result.relatedPosts || [] };
    }
  } catch {
    // fall through
  }
  return { post: null, related: [] };
}

export async function getTestimonialsData(): Promise<Testimonial[]> {
  try {
    const result = await api.getTestimonials();
    if (result.success && result.data) {
      return result.data;
    }
  } catch {
    // fall through
  }
  return [];
}

export async function getJobsData(): Promise<Job[]> {
  try {
    const result = await api.getJobs();
    if (result.success && result.data) {
      return result.data;
    }
  } catch {
    // fall through
  }
  return [];
}

export async function getTeamData(): Promise<TeamMember[]> {
  try {
    const result = await api.getTeam();
    if (result.success && result.data) {
      return result.data;
    }
  } catch {
    // fall through
  }
  return [];
}

export async function getProjectData(slug: string): Promise<ProjectItem> {
  try {
    const result = await api.getProject(slug);
    if (result.success && result.data) {
      return result.data;
    }
  } catch {
    // fall through
  }
  throw new Error('Project not found');
}

export const getServiceBySlug = (services: ServiceItem[], slug: string) =>
  services.find((s) => s.slug === slug || slugify(s.title) === slug);

export { defaultServices, defaultProduct };