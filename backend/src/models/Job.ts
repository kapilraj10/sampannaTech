import mongoose, { Schema, Document } from 'mongoose';

export interface IJob extends Document {
  title: string;
  department: string;
  location: string;
  employmentType: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  salaryRange?: string;
  deadline?: Date;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const jobSchema = new Schema<IJob>(
  {
    title: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
      trim: true,
    },
    location: {
      type: String,
      default: 'Kathmandu, Nepal',
      trim: true,
    },
    employmentType: {
      type: String,
      default: 'Full-time',
      enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'],
    },
    description: {
      type: String,
      required: [true, 'Job description is required'],
    },
    requirements: {
      type: [String],
      default: [],
    },
    responsibilities: {
      type: [String],
      default: [],
    },
    salaryRange: {
      type: String,
      trim: true,
    },
    deadline: {
      type: Date,
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

jobSchema.index({ active: 1, createdAt: -1 });

const Job = mongoose.model<IJob>('Job', jobSchema);
export default Job;
