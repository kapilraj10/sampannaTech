import mongoose, { Schema, Document } from 'mongoose';

export interface ITechnology extends Document {
  name: string;
  category: string;
  icon?: string;
  color?: string;
  sortOrder?: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const technologySchema = new Schema<ITechnology>(
  {
    name: {
      type: String,
      required: [true, 'Technology name is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Technology category is required'],
      trim: true,
      default: 'Frontend',
    },
    icon: {
      type: String,
    },
    color: {
      type: String,
    },
    sortOrder: {
      type: Number,
      default: 0,
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

technologySchema.index({ active: 1, category: 1, sortOrder: 1 });

const Technology = mongoose.model<ITechnology>('Technology', technologySchema);
export default Technology;
