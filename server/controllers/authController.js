import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { ApiError } from '../utils/apiError.js';

export const loginAdmin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Default admin credentials for demo/production testing
    if (username === 'admin' && password === 'admin123') {
      const token = jwt.sign(
        { id: 'admin_1', username: 'admin', role: 'admin' },
        config.JWT_SECRET,
        { expiresIn: config.JWT_EXPIRES_IN }
      );

      return res.status(200).json(
        new ApiResponse(200, {
          user: { username: 'admin', role: 'admin' },
          token,
        }, 'Login successful')
      );
    }

    throw new ApiError(401, 'Invalid username or password credentials');
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    return res.status(200).json(
      new ApiResponse(200, { user: req.user }, 'User profile retrieved')
    );
  } catch (error) {
    next(error);
  }
};
