import mongoose, { Schema, Document, Types } from 'mongoose';

export const TRANSACTION_TYPES = ['income', 'expense'] as const;

export interface ITransaction extends Document {
  project?: Types.ObjectId;
  type: (typeof TRANSACTION_TYPES)[number];
  amount: number;
  date: Date;
  category?: string;
  description?: string;
  paymentMethod?: string;
  createdAt: Date;
  updatedAt: Date;
}

const transactionSchema = new Schema<ITransaction>(
  {
    // Optional: an expense like office rent belongs to no project.
    project: { type: Schema.Types.ObjectId, ref: 'FinanceProject' },
    type: {
      type: String,
      enum: TRANSACTION_TYPES,
      required: [true, 'Type (income or expense) is required'],
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [0, 'Amount cannot be negative'],
    },
    date: { type: Date, required: true, default: Date.now },
    category: { type: String, trim: true, maxlength: 100 },
    description: { type: String, trim: true, maxlength: 2000 },
    paymentMethod: { type: String, trim: true, maxlength: 100 },
  },
  { timestamps: true }
);

transactionSchema.index({ project: 1, type: 1 });
transactionSchema.index({ date: -1 });

const Transaction = mongoose.model<ITransaction>('Transaction', transactionSchema);
export default Transaction;
