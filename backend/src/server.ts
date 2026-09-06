import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import dotenv from 'dotenv';

dotenv.config();

import connectDB from './config/database';
import env from './config/env';
import authRoutes from './routes/authRoutes';
import serviceRoutes from './routes/serviceRoutes';
import productRoutes from './routes/productRoutes';
import projectRoutes from './routes/projectRoutes';
import blogRoutes from './routes/blogRoutes';
import testimonialRoutes from './routes/testimonialRoutes';
import jobRoutes from './routes/jobRoutes';
import contactRoutes from './routes/contactRoutes';
import newsletterRoutes from './routes/newsletterRoutes';
import siteSettingsRoutes from './routes/siteSettingsRoutes';
import { notFound, errorHandler } from './middleware/error';

const app: Application = express();

app.use(
  helmet({
    contentSecurityPolicy:
      env.nodeEnv === 'production'
        ? undefined
        : { directives: { defaultSrc: ["'self'"], styleSrc: ["'self'", "'unsafe-inline'"] } },
  })
);

const corsOptions: cors.CorsOptions = {
  origin:
    env.nodeEnv === 'production'
      ? env.clientUrl
      : true,
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(mongoSanitize());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many requests from this IP. Please try again later.',
  },
});

app.use('/api', limiter);

app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/products', productRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/site-settings', siteSettingsRoutes);

app.get('/api/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Sampanna Tech API is running',
    environment: env.nodeEnv,
    timestamp: new Date().toISOString(),
  });
});

app.use(notFound);
app.use(errorHandler);

let server: ReturnType<typeof app.listen> | undefined;

const startServer = async (): Promise<void> => {
  await connectDB();

  server = app.listen(env.port, () => {
    console.log(
      `Sampanna Tech API running in ${env.nodeEnv} mode on port ${env.port}`
    );
  });
};

startServer();

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
  if (server) {
    server.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  if (server) {
    server.close(() => process.exit(0));
  }
});

export default app;