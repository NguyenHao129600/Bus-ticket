import dotenv from 'dotenv';

dotenv.config();

const parseNumber = (value, fallback) => {
  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : fallback;
};

const parseOrigins = (value) => {
  if (!value) {
    return [];
  }

  return value.split(',').map(origin => origin.trim()).filter(Boolean);
};

const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  APP_HOST: process.env.APP_HOST || 'localhost',
  APP_PORT: parseNumber(process.env.APP_PORT, 3000),
  DB_HOST: process.env.DB_HOST || '127.0.0.1',
  DB_PORT: parseNumber(process.env.DB_PORT, 3306),
  DB_USER: process.env.DB_USER || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_NAME: process.env.DB_NAME || 'bus_booking',
  DB_CONNECTION_LIMIT: parseNumber(process.env.DB_CONNECTION_LIMIT, 10),
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',
  CORS_ORIGINS: parseOrigins(process.env.CORS_ORIGINS),
  REQUEST_BODY_LIMIT: process.env.REQUEST_BODY_LIMIT || '1mb',
  RATE_LIMIT_WINDOW_MS: parseNumber(process.env.RATE_LIMIT_WINDOW_MS, 15 * 60 * 1000),
  RATE_LIMIT_MAX: parseNumber(process.env.RATE_LIMIT_MAX, 300),
  LOG_DIR: process.env.LOG_DIR || 'logs',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
};

if (env.NODE_ENV === 'production' && !env.JWT_SECRET) {
  throw new Error('JWT_SECRET is required in production');
}

export default env;
