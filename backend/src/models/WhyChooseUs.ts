import mongoose, { Schema, Document } from 'mongoose';

export interface IWhyChooseUs extends Document {
  title: string;
  description: string;
  icon?: string;
  sortOrder?: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const whyChooseUsSchema = new Schema<IWhyChooseUs>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    icon: {
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

whyChooseUsSchema.index({ active: 1, sortOrder: 1 });

const WhyChooseUs = mongoose.model<IWhyChooseUs>('WhyChooseUs', whyChooseUsSchema);
export default WhyChooseUs;
