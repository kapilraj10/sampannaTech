import { siteConfig } from '@/config/site';
import type {
  ApiResponse,
  BlogPost,
  ContactFormData,
  Job,
  MediaItem,
  ProductItem,
  ProjectItem,
  ServiceItem,
  SiteSettings,
  TeamMember,
  Testimonial,
} from '@/types';

export async function request<T>(path: string, options?: RequestInit): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(`${siteConfig.apiUrl}${path}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
      ...options,
    });

    const data = (await res.json()) as ApiResponse<T>;

    if (!res.ok || !data.success) {
      return {
        success: false,
        error: data.error || 'Something went wrong. Please try again.',
      };
    }

    return data;
  } catch {
    return {
      success: false,
      error: 'We could not reach the server. Please try again later.',
    };
  }
}

export const api = {
  getServices: () =>
    request<ServiceItem[]>('/services'),
  getService: (slug: string) =>
    request<ServiceItem>(`/services/${slug}`),
  getProducts: () =>
    request<ProductItem[]>('/products'),
  getProduct: (slug: string) =>
    request<ProductItem>(`/products/${slug}`),
  getProjects: () =>
    request<ProjectItem[]>('/projects'),
  getProject: (slug: string) =>
    request<ProjectItem>(`/projects/${slug}`),
  getBlogs: (category?: string) =>
    request<BlogPost[]>(
      category ? `/blogs?category=${encodeURIComponent(category)}` : '/blogs'
    ),
  getBlog: (slug: string) =>
    request<BlogPost>(`/blogs/${slug}`),
  getTestimonials: () =>
    request<Testimonial[]>('/testimonials'),
  getTeam: () =>
    request<TeamMember[]>('/team'),
  getJobs: () =>
    request<Job[]>('/jobs'),
  getSiteSettings: () =>
    request<SiteSettings>('/site-settings'),
  getMedia: () =>
    request<MediaItem[]>('/media'),
  sendContact: (payload: ContactFormData) =>
    request('/contact', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  subscribe: (email: string) =>
    request('/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),
};