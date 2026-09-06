import mongoose, { Schema, Document } from 'mongoose';

export interface ISiteSettings extends Document {
  companyName: string;
  tagline: string;
  description: string;
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
    address: {
      type: String,
    },
    location: {
      type: String,
      default: 'Kathmandu, Nepal',
    },
    social: {
      facebook: String,
      instagram: String,
      linkedin: String,
      github: String,
    },
    stats: {
      projectsDelivered: { type: Number, default: 50 },
      businessesServed: { type: Number, default: 20 },
      yearsExperience: { type: Number, default: 5 },
      support: { type: String, default: '24/7' },
    },
  },
  {
    timestamps: true,
  }
);

const SiteSettings = mongoose.model<ISiteSettings>('SiteSettings', siteSettingsSchema);
export default SiteSettings;