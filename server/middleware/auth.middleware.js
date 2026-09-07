import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import { ApiError } from '../utils/apiError.js';

export const verifyJWT = (req, res, next) => {
  try {
    const token = req.cookies?.accessToken || req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new ApiError(401, 'Unauthorized request: Missing token');
    }

    const decodedToken = jwt.verify(token, config.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    next(new ApiError(401, error?.message || 'Invalid access token'));
  }
};
