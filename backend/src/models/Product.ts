import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  tagline: string;
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
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    tagline: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
    longDescription: {
      type: String,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    features: {
      type: [String],
      default: [],
    },
    benefits: {
      type: [String],
      default: [],
    },
    technologies: {
      type: [String],
      default: [],
    },
    gallery: {
      type: [String],
      default: [],
    },
    websiteUrl: {
      type: String,
    },
    demoUrl: {
      type: String,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
    },
    seo: {
      title: String,
      description: String,
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

productSchema.index({ featured: 1 });

const Product = mongoose.model<IProduct>('Product', productSchema);
export default Product;
