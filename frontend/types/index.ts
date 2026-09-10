export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  count?: number;
  relatedPosts?: BlogPost[];
}

export interface CaseStudyItem {
  _id: string;
  title: string;
  slug: string;
  clientName: string;
  clientLogo?: string;
  coverImage?: string;
  industry?: string;
  problem: string;
  solution: string;
  results: string;
  technologies: string[];
  projectUrl?: string;
  testimonial?: string;
  testimonialAuthor?: string;
  testimonialRole?: string;
  gallery?: string[];
  featured?: boolean;
  sortOrder?: number;
  active?: boolean;
  seo?: { title?: string; description?: string; keywords?: string[] };
  createdAt?: string;
  updatedAt?: string;
}

export interface TechnologyItem {
  _id: string;
  name: string;
  category: string;
  icon?: string;
  color?: string;
  sortOrder?: number;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProcessStepItem {
  _id: string;
  number: number;
  title: string;
  description: string;
  icon?: string;
  sortOrder?: number;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface WhyChooseUsItem {
  _id: string;
  title: string;
  description: string;
  icon?: string;
  sortOrder?: number;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface HomeSectionItem {
  _id: string;
  sectionKey: string;
  title: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  buttonText2?: string;
  buttonUrl2?: string;
  image?: string;
  content?: Record<string, unknown>;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ServiceItem {
  _id: string;
  title: string;
  description: string;
  longDescription?: string;
  slug: string;
  icon: string;
  image?: string;
  features?: string[];
  technologies?: string[];
  seo?: {
    title?: string;
    description?: string;
  };
  featured?: boolean;
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
  longDescription?: string;
  slug: string;
  features: string[];
  benefits?: string[];
  technologies?: string[];
  gallery?: string[];
  websiteUrl?: string;
  demoUrl?: string;
  featured?: boolean;
  image?: string;
  seo?: {
    title?: string;
    description?: string;
  };
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectItem {
  _id: string;
  name: string;
  slug: string;
  client?: string;
  industry?: string;
  category: string;
  description: string;
  image?: string;
  coverImage?: string;
  gallery?: string[];
  technologies: string[];
  websiteUrl?: string;
  githubUrl?: string;
  challenges?: string;
  solution?: string;
  results?: string;
  isDemo?: boolean;
  isFeatured?: boolean;
  sortOrder?: number;
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
  deadline?: string;
  active?: boolean;
  createdAt?: string;
}

export interface TeamMember {
  _id: string;
  name: string;
  slug: string;
  position: string;
  bio?: string;
  photo?: string;
  skills?: string[];
  social?: {
    linkedin?: string;
    github?: string;
    facebook?: string;
    instagram?: string;
    website?: string;
    email?: string;
  };
  featured?: boolean;
  order?: number;
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface MediaItem {
  _id: string;
  name: string;
  url: string;
  alt?: string;
  title?: string;
  category?: string;
  featured?: boolean;
  sortOrder?: number;
  createdAt?: string;
  updatedAt?: string;
}

export type FieldWithIcon = 'facebook' | 'instagram' | 'linkedin' | 'github' | 'youtube' | 'tiktok';

export interface SiteSettings {
  _id?: string;
  companyName?: string;
  tagline?: string;
  description?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  address?: string;
  location?: string;
  googleMapsUrl?: string;
  websiteUrl?: string;
  supportEmail?: string;
  salesEmail?: string;
  social?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    github?: string;
    youtube?: string;
    tiktok?: string;
  };
  stats?: {
    projectsDelivered?: number;
    businessesServed?: number;
    yearsExperience?: number;
    support?: string;
  };
  businessHours?: string;
  footerText?: string;
  copyrightText?: string;
  branding?: {
    logo?: string;
    favicon?: string;
    heroImage?: string;
    aboutImage?: string;
    ogImage?: string;
    primaryColor?: string;
  };
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  links?: {
    productWebsite?: string;
    productDemo?: string;
    documentation?: string;
    calendly?: string;
    googleMaps?: string;
  };
}

export interface ContactInfo extends SiteSettings {}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

export type UserRole = 'admin' | 'editor';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Enquiry {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
  status: 'new' | 'contacted' | 'closed';
  createdAt: string;
}

export interface Subscriber {
  _id: string;
  email: string;
  createdAt: string;
}

export interface DashboardStats {
  counts: {
    services: number;
    products: number;
    projects: number;
    blogs: number;
    testimonials: number;
    teamMembers: number;
    jobs: number;
    contacts: number;
    subscribers: number;
    media: number;
    caseStudies: number;
    technologies: number;
    processSteps: number;
    whyChooseUs: number;
  };
  recentContacts: Enquiry[];
}