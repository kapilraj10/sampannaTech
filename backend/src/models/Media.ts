import mongoose, { Schema, Document } from 'mongoose';

export interface IMedia extends Document {
  name: string;
  url: string;
  alt?: string;
  title?: string;
  category?: string;
  featured?: boolean;
  sortOrder?: number;
  createdAt: Date;
  updatedAt: Date;
}

const mediaSchema = new Schema<IMedia>(
  {
    name: {
      type: String,
      required: [true, 'Media name is required'],
      trim: true,
    },
    url: {
      type: String,
      required: [true, 'Media URL is required'],
      trim: true,
    },
    alt: {
      type: String,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

mediaSchema.index({ featured: 1, sortOrder: 1, createdAt: -1 });

const Media = mongoose.model<IMedia>('Media', mediaSchema);
export default Media;