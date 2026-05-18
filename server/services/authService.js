import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel';
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

  getProfile: async (userId) => {
    const user = await UserModel.getById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  },
};

export default AuthService;
