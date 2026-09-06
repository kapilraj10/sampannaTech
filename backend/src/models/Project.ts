import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
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
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    name: {
      type: String,
      required: [true, 'Project name is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    client: {
      type: String,
      trim: true,
    },
    industry: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Project category is required'],
      trim: true,
      default: 'Business Software',
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
    },
    image: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    gallery: {
      type: [String],
      default: [],
    },
    technologies: {
      type: [String],
      default: [],
    },
    websiteUrl: {
      type: String,
    },
    githubUrl: {
      type: String,
    },
    challenges: {
      type: String,
    },
    solution: {
      type: String,
    },
    results: {
      type: String,
    },
    isDemo: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
    link: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

projectSchema.index({ active: 1, isFeatured: 1, sortOrder: 1 });

const Project = mongoose.model<IProject>('Project', projectSchema);
export default Project;
