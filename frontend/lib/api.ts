import { siteConfig } from '@/config/site';
import type {
  ApiResponse,
  BlogPost,
  ContactFormData,
  ContactInfo,
  Job,
  ProductItem,
  ProjectItem,
  ServiceItem,
  Testimonial,
} from '@/types';

async function request<T>(path: string, options?: RequestInit): Promise<ApiResponse<T>> {
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
  getProjects: () =>
    request<ProjectItem[]>('/projects'),
  getBlogs: (category?: string) =>
    request<BlogPost[]>(
      category ? `/blogs?category=${encodeURIComponent(category)}` : '/blogs'
    ),
  getBlog: (slug: string) =>
    request<BlogPost>(`/blogs/${slug}`),
  getTestimonials: () =>
    request<Testimonial[]>('/testimonials'),
  getJobs: () =>
    request<Job[]>('/jobs'),
  getSiteSettings: () =>
    request<ContactInfo>('/site-settings'),
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