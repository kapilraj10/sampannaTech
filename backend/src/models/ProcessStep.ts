import mongoose, { Schema, Document } from 'mongoose';

export interface IProcessStep extends Document {
  number: number;
  title: string;
  description: string;
  icon?: string;
  sortOrder?: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const processStepSchema = new Schema<IProcessStep>(
  {
    number: {
      type: Number,
      required: [true, 'Step number is required'],
    },
    title: {
      type: String,
      required: [true, 'Step title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Step description is required'],
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

processStepSchema.index({ active: 1, sortOrder: 1 });

const ProcessStep = mongoose.model<IProcessStep>('ProcessStep', processStepSchema);
export default ProcessStep;
