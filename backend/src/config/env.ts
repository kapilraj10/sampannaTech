export default {
  port: parseInt(process.env.PORT || '5015', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri:
    process.env.MONGODB_URI || 'mongodb://localhost:27017/sampannatech',
  jwtSecret: process.env.JWT_SECRET || 'sampanna_tech_dev_secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:3015',
  allowedOrigins: (process.env.ALLOWED_ORIGINS || 'http://localhost:3015,https://sampannatech.online,http://localhost:3000').split(',').map((o) => o.trim()).filter(Boolean),
};
