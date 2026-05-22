import AuthService from '../services/authService';

export const register = async (req, res, next) => {
  try {
    const result = await AuthService.register(req.body);

    return res.status(201).json({ success: true, data: result });
  } catch (err) {
    return next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const result = await AuthService.login(req.body);

    return res.json({ success: true, data: result });
  } catch (err) {
    return next(err);
  }
};

export const registerOperatorStaff = async (req, res, next) => {
  try {
    const result = await AuthService.registerOperatorStaff(req.body);

    return res.status(201).json({ success: true, data: result });
  } catch (err) {
    return next(err);
  }
};

export const loginOperatorStaff = async (req, res, next) => {
  try {
    const result = await AuthService.loginOperatorStaff(req.body);

    return res.json({ success: true, data: result });
  } catch (err) {
    return next(err);
  }
};

export const logoutOperatorStaff = async (req, res, next) => {
  try {
    const result = await AuthService.logoutOperatorStaff();

    return res.json({ success: true, data: result });
  } catch (err) {
    return next(err);
  }
};

export const me = async (req, res, next) => {
  try {
    const user = await AuthService.getProfile(req.user.id);

    return res.json({ success: true, data: user });
  } catch (err) {
    return next(err);
  }
};

export const meOperatorStaff = async (req, res, next) => {
  try {
    const profile = await AuthService.getOperatorStaffProfile(req.user.id, req.user.operator_staff_id);

    return res.json({ success: true, data: profile });
  } catch (err) {
    return next(err);
  }
};
