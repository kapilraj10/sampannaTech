import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  name: string;
  slug: string;
  category: string;
  description: string;
  image?: string;
  technologies: string[];
  isDemo?: boolean;
  isFeatured?: boolean;
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
    category: {
      type: String,
      required: [true, 'Project category is required'],
      enum: ['Business Software', 'POS System', 'Website', 'Mobile App', 'E-commerce'],
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
    },
    image: {
      type: String,
    },
    technologies: {
      type: [String],
      default: [],
    },
    isDemo: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
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

projectSchema.index({ active: 1, isFeatured: 1 });

const Project = mongoose.model<IProject>('Project', projectSchema);
export default Project;
