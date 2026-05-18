import jwt from 'jsonwebtoken';
import env from '../config/env';

const authenticate = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: {
        code: 401,
        message: 'No token provided',
      },
    });
  }

  if (!env.JWT_SECRET) {
    return res.status(500).json({
      success: false,
      error: {
        code: 500,
        message: 'JWT_SECRET is not configured',
      },
    });
  }

  try {
    const token = auth.split(' ')[1];
    req.user = jwt.verify(token, env.JWT_SECRET);

    return next();
  } catch {
    return res.status(401).json({
      success: false,
      error: {
        code: 401,
        message: 'Invalid or expired token',
      },
    });
  }
};

export default authenticate;
