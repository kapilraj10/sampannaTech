import mongoose, { Schema, Document } from 'mongoose';

export interface ITeamMember extends Document {
  name: string;
  slug: string;
  position: string;
  bio: string;
  photo?: string;
  skills: string[];
  social?: {
    linkedin?: string;
    github?: string;
    facebook?: string;
    instagram?: string;
    website?: string;
    email?: string;
  };
  featured: boolean;
  order: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const teamMemberSchema = new Schema<ITeamMember>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    position: {
      type: String,
      required: [true, 'Position is required'],
      trim: true,
    },
    bio: {
      type: String,
      default: '',
    },
    photo: {
      type: String,
    },
    skills: {
      type: [String],
      default: [],
    },
    social: {
      linkedin: String,
      github: String,
      facebook: String,
      instagram: String,
      website: String,
      email: String,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
    published: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

teamMemberSchema.index({ published: 1, order: 1, createdAt: -1 });

const TeamMember = mongoose.model<ITeamMember>('TeamMember', teamMemberSchema);
export default TeamMember;