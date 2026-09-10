import mongoose, { Schema, Document } from 'mongoose';

export interface IHomeSection extends Document {
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
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const homeSectionSchema = new Schema<IHomeSection>(
  {
    sectionKey: {
      type: String,
      required: [true, 'Section key is required'],
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    subtitle: {
      type: String,
    },
    description: {
      type: String,
    },
    buttonText: {
      type: String,
    },
    buttonUrl: {
      type: String,
    },
    buttonText2: {
      type: String,
    },
    buttonUrl2: {
      type: String,
    },
    image: {
      type: String,
    },
    content: {
      type: Schema.Types.Mixed,
      default: {},
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

homeSectionSchema.index({ sectionKey: 1, active: 1 });

const HomeSection = mongoose.model<IHomeSection>('HomeSection', homeSectionSchema);
export default HomeSection;
