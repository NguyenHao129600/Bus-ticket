const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: {
          code: 401,
          message: 'Authentication required',
        },
      });
    }

    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: {
          code: 403,
          message: 'Forbidden',
        },
      });
    }

    return next();
  };
};

export default authorize;
