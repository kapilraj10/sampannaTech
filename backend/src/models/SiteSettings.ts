import mongoose, { Schema, Document } from 'mongoose';

export interface ISiteSettings extends Document {
  companyName: string;
  tagline: string;
  description: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  address?: string;
  location?: string;
  googleMapsUrl?: string;
  websiteUrl?: string;
  supportEmail?: string;
  salesEmail?: string;
  businessHours?: string;
  footerText?: string;
  copyrightText?: string;
  social?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    github?: string;
    tiktok?: string;
    youtube?: string;
  };
  branding?: {
    logo?: string;
    favicon?: string;
    heroImage?: string;
    aboutImage?: string;
    ogImage?: string;
    primaryColor?: string;
  };
  seo?: {
    siteTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    ogTitle?: string;
    ogDescription?: string;
  };
  links?: {
    productWebsite?: string;
    productDemo?: string;
    documentation?: string;
    calendly?: string;
    googleMaps?: string;
  };
  stats?: {
    projectsDelivered: number;
    businessesServed: number;
    yearsExperience: number;
    support: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const siteSettingsSchema = new Schema<ISiteSettings>(
  {
    companyName: {
      type: String,
      default: 'Sampanna Tech',
    },
    tagline: {
      type: String,
      default: 'Technology That Helps Your Business Grow.',
    },
    description: {
      type: String,
      default: 'Sampanna Tech builds modern websites, mobile applications, business software and digital solutions designed to help businesses work smarter, grow faster and operate efficiently.',
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    whatsapp: {
      type: String,
    },
    address: {
      type: String,
    },
    location: {
      type: String,
      default: 'Kathmandu, Nepal',
    },
    googleMapsUrl: {
      type: String,
    },
    websiteUrl: {
      type: String,
      default: 'https://sampannatech.online',
    },
    supportEmail: {
      type: String,
    },
    salesEmail: {
      type: String,
    },
    businessHours: {
      type: String,
    },
    footerText: {
      type: String,
    },
    copyrightText: {
      type: String,
    },
    social: {
      facebook: String,
      instagram: String,
      linkedin: String,
      github: String,
      tiktok: String,
      youtube: String,
    },
    branding: {
      logo: String,
      favicon: String,
      heroImage: String,
      aboutImage: String,
      ogImage: String,
      primaryColor: String,
    },
    seo: {
      siteTitle: String,
      metaDescription: String,
      keywords: [String],
      ogTitle: String,
      ogDescription: String,
    },
    links: {
      productWebsite: String,
      productDemo: String,
      documentation: String,
      calendly: String,
      googleMaps: String,
    },
    stats: {
      projectsDelivered: { type: Number, default: 0 },
      businessesServed: { type: Number, default: 0 },
      yearsExperience: { type: Number, default: 0 },
      support: { type: String, default: 'Mon–Sat' },
    },
  },
  {
    timestamps: true,
  }
);

const SiteSettings = mongoose.model<ISiteSettings>('SiteSettings', siteSettingsSchema);
export default SiteSettings;