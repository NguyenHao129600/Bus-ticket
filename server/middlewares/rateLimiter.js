import env from '../config/env';

const buckets = new Map();

const rateLimiter = (req, res, next) => {
  const now = Date.now();
  const key = req.ip || req.connection.remoteAddress || 'unknown';
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + env.RATE_LIMIT_WINDOW_MS });

    return next();
  }

  current.count += 1;

  if (current.count > env.RATE_LIMIT_MAX) {
    return res.status(429).json({
      success: false,
      error: {
        code: 429,
        message: 'Too many requests',
      },
    });
  }

  return next();
};

export default rateLimiter;
