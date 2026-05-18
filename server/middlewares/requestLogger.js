import crypto from 'crypto';
import logger from '../config/winston';

const REDACT_KEYS = [
  'password',
  'old_password',
  'new_password',
  'password_hash',
  'token',
  'authorization',
  'jwt',
  'secret',
];

const shouldRedact = (key) => {
  return REDACT_KEYS.includes(String(key).toLowerCase());
};

const sanitize = (value) => {
  if (!value || typeof value !== 'object') {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(item => sanitize(item));
  }

  return Object.keys(value).reduce((result, key) => {
    result[key] = shouldRedact(key) ? '[redacted]' : sanitize(value[key]);
    return result;
  }, {});
};

const isNoiseRequest = (req) => {
  return (
    req.path.startsWith('/.well-known/') ||
    req.path.startsWith('/swagger/') ||
    req.path.endsWith('.map') ||
    req.path === '/favicon.ico'
  );
};

const getRequestId = () => {
  if (crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return crypto.randomBytes(16).toString('hex');
};

export default (req, res, next) => {
  const startedAt = process.hrtime.bigint();
  const requestId = req.headers['x-request-id'] || getRequestId();

  req.requestId = requestId;
  res.setHeader('X-Request-Id', requestId);

  res.on('finish', () => {
    const durationMs = Number(process.hrtime.bigint() - startedAt) / 1000000;
    const statusCode = res.statusCode;
    const level = isNoiseRequest(req) ? 'debug' : statusCode >= 500 ? 'error' : statusCode >= 400 ? 'warn' : 'info';
    const userId = req.user && req.user.id;

    logger.log(level, 'http_request', {
      requestId,
      method: req.method,
      path: req.originalUrl || req.url,
      route: req.route && req.route.path,
      statusCode,
      durationMs: Number(durationMs.toFixed(2)),
      ip: req.ip || req.connection.remoteAddress,
      userId,
      userAgent: req.get('user-agent'),
      referer: req.get('referer'),
      query: sanitize(req.query),
      body: sanitize(req.body),
      contentLength: res.getHeader('content-length'),
    });
  });

  return next();
};
