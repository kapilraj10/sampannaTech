import mongoose, { Schema, Document } from 'mongoose';

export const FINANCE_PROJECT_STATUSES = [
  'Planning',
  'In Progress',
  'On Hold',
  'Completed',
  'Cancelled',
] as const;

export interface IFinanceProject extends Document {
  name: string;
  client?: string;
  description?: string;
  status: (typeof FINANCE_PROJECT_STATUSES)[number];
  startDate?: Date;
  deadline?: Date;
  completedAt?: Date;
  budget: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const financeProjectSchema = new Schema<IFinanceProject>(
  {
    name: {
      type: String,
      required: [true, 'Project name is required'],
      trim: true,
      maxlength: 200,
    },
    client: { type: String, trim: true, maxlength: 200 },
    description: { type: String, trim: true, maxlength: 5000 },
    status: {
      type: String,
      enum: FINANCE_PROJECT_STATUSES,
      default: 'In Progress',
    },
    startDate: { type: Date },
    deadline: { type: Date },
    completedAt: { type: Date },
    budget: {
      type: Number,
      default: 0,
      min: [0, 'Budget cannot be negative'],
    },
    notes: { type: String, trim: true, maxlength: 5000 },
  },
  { timestamps: true }
);

financeProjectSchema.index({ status: 1, deadline: 1 });

const FinanceProject = mongoose.model<IFinanceProject>(
  'FinanceProject',
  financeProjectSchema
);
export default FinanceProject;
