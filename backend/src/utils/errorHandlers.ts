import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../middleware/error';

export const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction): void => {
    fn(req, res, next).catch(next);
  };

export const checkId = (id: string): boolean => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

export const handleValidationError = (error: unknown): ApiError => {
  if (error instanceof Error && 'errors' in error) {
    const errors = (error as { errors?: Record<string, { message: string }> })
      .errors;
    if (errors) {
      const messages = Object.values(errors).map((e) => e.message);
      return new ApiError(messages.join(', '), 400);
    }
  }
  return new ApiError('Validation error', 400);
};

export const handleDuplicateError = (error: unknown): ApiError => {
  if (error instanceof Error && error.name === 'MongoServerError') {
    return new ApiError('Duplicate field value. Please use a different value.', 400);
  }
  return new ApiError('Duplicate error', 400);
};