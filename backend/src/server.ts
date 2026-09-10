import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

import connectDB from './config/database';
import env from './config/env';

import authRoutes from './routes/authRoutes';
import serviceRoutes from './routes/serviceRoutes';
import productRoutes from './routes/productRoutes';
import projectRoutes from './routes/projectRoutes';
import blogRoutes from './routes/blogRoutes';
import testimonialRoutes from './routes/testimonialRoutes';
import teamRoutes from './routes/teamRoutes';
import mediaRoutes from './routes/mediaRoutes';
import jobRoutes from './routes/jobRoutes';
import contactRoutes from './routes/contactRoutes';
import newsletterRoutes from './routes/newsletterRoutes';
import siteSettingsRoutes from './routes/siteSettingsRoutes';
import adminRoutes from './routes/adminRoutes';
import caseStudyRoutes from './routes/caseStudyRoutes';
import technologyRoutes from './routes/technologyRoutes';
import processStepRoutes from './routes/processStepRoutes';
import whyChooseUsRoutes from './routes/whyChooseUsRoutes';
import homeSectionRoutes from './routes/homeSectionRoutes';
import uploadRoutes from './routes/uploadRoutes';

import { notFound, errorHandler } from './middleware/error';

const app: Application = express();

/**
 * Trust Nginx reverse proxy
 * Required for express-rate-limit when using X-Forwarded-For
 */
app.set('trust proxy', 1);

/**
 * Security headers
 */
app.use(
  helmet({
    contentSecurityPolicy:
      env.nodeEnv === 'production'
        ? undefined
        : {
            directives: {
              defaultSrc: ["'self'"],
              styleSrc: ["'self'", "'unsafe-inline'"],
            },
          },
  })
);

/**
 * CORS
 */
const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    const normalizedOrigin = origin?.replace(/\/$/, '');

    if (!normalizedOrigin || env.allowedOrigins.includes(normalizedOrigin)) {
      callback(null, true);
    } else if (env.nodeEnv !== 'production') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

/**
 * Body parsers
 */
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

/**
 * MongoDB sanitization
 */
app.use(mongoSanitize());

/**
 * Rate limiter
 */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many requests from this IP. Please try again later.',
  },
});

app.use('/api', limiter);

/**
 * Health check
 */
app.get('/api/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Sampanna Tech API is running',
    environment: env.nodeEnv,
    timestamp: new Date().toISOString(),
  });
});

/**
 * API Routes
 */
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/products', productRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/site-settings', siteSettingsRoutes);
app.use('/api/case-studies', caseStudyRoutes);
app.use('/api/technologies', technologyRoutes);
app.use('/api/process-steps', processStepRoutes);
app.use('/api/why-choose-us', whyChooseUsRoutes);
app.use('/api/home-sections', homeSectionRoutes);
app.use('/api/upload', uploadRoutes);

/**
 * Serve uploaded files
 */
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

/**
 * 404 Handler
 */
app.use(notFound);

/**
 * Global Error Handler
 */
app.use(errorHandler);

/**
 * Server
 */
let server: ReturnType<typeof app.listen> | undefined;

const startServer = async (): Promise<void> => {
  try {
    await connectDB();

    server = app.listen(env.port, () => {
      console.log(
        `Sampanna Tech API running in ${env.nodeEnv} mode on port ${env.port}`
      );
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

/**
 * Handle unhandled promise rejections
 */
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);

  if (server) {
    server.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
});

/**
 * Graceful shutdown
 */
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');

  if (server) {
    server.close(() => process.exit(0));
  } else {
    process.exit(0);
  }
});

export default app;