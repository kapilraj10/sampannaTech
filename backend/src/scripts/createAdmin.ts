import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import env from '../config/env';

dotenv.config();

const createAdmin = async (): Promise<void> => {
  try {
    await mongoose.connect(env.mongoUri);
    console.log('Connected to MongoDB');

    const name = process.env.ADMIN_NAME || 'Admin';
    const email = process.env.ADMIN_EMAIL || 'admin@sampannatech.com';
    const password = process.env.ADMIN_PASSWORD || 'ChangeMe123!';

    if (password.length < 8) {
      console.error('Password must be at least 8 characters');
      process.exit(1);
    }

    const existing = await User.findOne({ email });
    if (existing) {
      console.log('Admin user already exists.');
      await mongoose.disconnect();
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'admin',
    });

    console.log(`Admin user created: ${email}`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Failed to create admin user:', error);
    process.exit(1);
  }
};

createAdmin();