export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  count?: number;
  relatedPosts?: BlogPost[];
}

export interface ServiceItem {
  _id: string;
  title: string;
  description: string;
  slug: string;
  icon: string;
  order: number;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductItem {
  _id: string;
  name: string;
  tagline?: string;
  description: string;
  slug: string;
  features: string[];
  featured?: boolean;
  image?: string;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectItem {
  _id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  image?: string;
  technologies: string[];
  isDemo?: boolean;
  isFeatured?: boolean;
  link?: string;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  category: string;
  author: string;
  tags: string[];
  published?: boolean;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Testimonial {
  _id: string;
  name: string;
  company?: string;
  role?: string;
  message: string;
  rating: number;
  image?: string;
  published?: boolean;
  createdAt?: string;
}

export interface Job {
  _id: string;
  title: string;
  department: string;
  location: string;
  employmentType: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  salaryRange?: string;
  active?: boolean;
  createdAt?: string;
}

export interface ContactInfo {
  _id: string;
  companyName?: string;
  tagline?: string;
  description?: string;
  email?: string;
  phone?: string;
  address?: string;
  location?: string;
  social?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    github?: string;
  };
  stats?: {
    projectsDelivered?: number;
    businessesServed?: number;
    yearsExperience?: number;
    support?: string;
  };
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}