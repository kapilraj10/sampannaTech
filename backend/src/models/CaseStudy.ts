import mongoose, { Schema, Document } from 'mongoose';

export interface ICaseStudy extends Document {
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
  active: boolean;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const caseStudySchema = new Schema<ICaseStudy>(
  {
    title: {
      type: String,
      required: [true, 'Case study title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    clientName: {
      type: String,
      required: [true, 'Client name is required'],
      trim: true,
    },
    clientLogo: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    industry: {
      type: String,
      trim: true,
    },
    problem: {
      type: String,
      required: [true, 'Problem statement is required'],
    },
    solution: {
      type: String,
      required: [true, 'Solution description is required'],
    },
    results: {
      type: String,
      required: [true, 'Results description is required'],
    },
    technologies: {
      type: [String],
      default: [],
    },
    projectUrl: {
      type: String,
    },
    testimonial: {
      type: String,
    },
    testimonialAuthor: {
      type: String,
    },
    testimonialRole: {
      type: String,
    },
    gallery: {
      type: [String],
      default: [],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
    seo: {
      title: String,
      description: String,
      keywords: [String],
    },
  },
  {
    timestamps: true,
  }
);

caseStudySchema.index({ active: 1, sortOrder: 1 });

const CaseStudy = mongoose.model<ICaseStudy>('CaseStudy', caseStudySchema);
export default CaseStudy;
