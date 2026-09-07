import { ApiError } from '../utils/apiError.js';

export const validate = (schema) => async (req, res, next) => {
  try {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  } catch (error) {
    const errorMessages = error.errors ? error.errors.map(err => `${err.path.join('.')}: ${err.message}`) : [error.message];
    return next(new ApiError(400, 'Validation Error', errorMessages));
  }
};
