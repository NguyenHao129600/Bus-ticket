import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel';
import OperatorModel from '../models/operatorModel';
import OperatorStaffModel from '../models/operatorStaffModel';
import env from '../config/env';
import AppError from '../utils/AppError';

const SALT_ROUNDS = 10;

const sanitizeUser = (user) => {
  if (!user) {
    return null;
  }

  const safeUser = { ...user };
  delete safeUser.password_hash;

  return safeUser;
};

const signToken = (user) => {
  if (!env.JWT_SECRET) {
    throw new AppError('JWT_SECRET is not configured', 500);
  }

  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN }
  );
};

const signOperatorStaffToken = ({ user, staff }) => {
  if (!env.JWT_SECRET) {
    throw new AppError('JWT_SECRET is not configured', 500);
  }

  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      operator_staff_id: staff.id,
      operator_id: staff.operator_id,
      staff_role: staff.role,
    },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN }
  );
};

const sanitizeOperatorStaff = (staff) => {
  if (!staff) {
    return null;
  }

  return {
    id: staff.id,
    user_id: staff.user_id,
    operator_id: staff.operator_id,
    role: staff.role,
    operator_name: staff.operator_name,
    created_at: staff.created_at,
    updated_at: staff.updated_at,
  };
};

const AuthService = {
  register: async ({ full_name, email, password, phone_number }) => {
    const existing = await UserModel.getByEmail(email);
    if (existing) {
      throw new AppError('Email already in use', 409);
    }

    const password_hash = await bcrypt.hash(password, SALT_ROUNDS);
    const id = await UserModel.create({
      full_name,
      email,
      password_hash,
      phone_number,
      role: 'customer',
    });
    const user = await UserModel.getById(id);

    return {
      user,
      token: signToken(user),
    };
  },

  login: async ({ email, password }) => {
    const user = await UserModel.getByEmail(email);
    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      throw new AppError('Invalid email or password', 401);
    }

    return {
      user: sanitizeUser(user),
      token: signToken(user),
    };
  },

  registerOperatorStaff: async ({
    full_name,
    email,
    password,
    phone_number,
    operator_id,
    staff_role,
  }) => {
    const existing = await UserModel.getByEmail(email);
    if (existing) {
      throw new AppError('Email already in use', 409);
    }

    const operator = await OperatorModel.getById(operator_id);
    if (!operator) {
      throw new AppError('Operator not found', 404);
    }

    const password_hash = await bcrypt.hash(password, SALT_ROUNDS);
    const userId = await UserModel.create({
      full_name,
      email,
      password_hash,
      phone_number,
      role: 'operator_staff',
    });

    const operatorStaffId = await OperatorStaffModel.create({
      user_id: userId,
      operator_id,
      role: staff_role,
    });

    const user = await UserModel.getById(userId);
    const staff = await OperatorStaffModel.getById(operatorStaffId);

    return {
      user,
      staff: sanitizeOperatorStaff(staff),
      token: signOperatorStaffToken({ user, staff }),
    };
  },

  loginOperatorStaff: async ({ email, password, operator_id }) => {
    const user = await UserModel.getByEmail(email);
    if (!user || user.role !== 'operator_staff') {
      throw new AppError('Invalid email or password', 401);
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      throw new AppError('Invalid email or password', 401);
    }

    const staffMemberships = await OperatorStaffModel.getByUserId(user.id);
    if (!staffMemberships.length) {
      throw new AppError('Operator staff account is not assigned to any operator', 403);
    }

    let staff = null;
    if (operator_id) {
      staff = staffMemberships.find((item) => Number(item.operator_id) === Number(operator_id)) || null;
      if (!staff) {
        throw new AppError('Operator staff account does not belong to this operator', 403);
      }
    } else if (staffMemberships.length === 1) {
      [staff] = staffMemberships;
    } else {
      throw new AppError('operator_id is required because this account belongs to multiple operators', 400);
    }

    return {
      user: sanitizeUser(user),
      staff: sanitizeOperatorStaff(staff),
      memberships: staffMemberships.map(sanitizeOperatorStaff),
      token: signOperatorStaffToken({ user, staff }),
    };
  },

  logoutOperatorStaff: async () => {
    return {
      message: 'Logged out successfully. Please remove the token on the client side.',
    };
  },

  getOperatorStaffProfile: async (userId, operatorStaffId = null) => {
    const user = await UserModel.getById(userId);
    if (!user || user.role !== 'operator_staff') {
      throw new AppError('Operator staff not found', 404);
    }

    const memberships = await OperatorStaffModel.getByUserId(userId);
    if (!memberships.length) {
      throw new AppError('Operator staff account is not assigned to any operator', 404);
    }

    const currentStaff = operatorStaffId
      ? memberships.find((item) => Number(item.id) === Number(operatorStaffId)) || null
      : memberships[0];

    if (!currentStaff) {
      throw new AppError('Operator staff membership not found', 404);
    }

    return {
      user,
      staff: sanitizeOperatorStaff(currentStaff),
      memberships: memberships.map(sanitizeOperatorStaff),
    };
  },

  getProfile: async (userId) => {
    const user = await UserModel.getById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  },
};

export default AuthService;
