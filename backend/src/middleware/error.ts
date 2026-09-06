import { Request, Response } from 'express';

export class ApiError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const notFound = (req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    error: `Route not found: ${req.originalUrl}`,
  });
};

export const errorHandler = (
  err: Error | ApiError,
  _req: Request,
  res: Response
): void => {
  const statusCode = err instanceof ApiError ? err.statusCode : 500;
  const message =
    statusCode === 500 ? 'Internal server error' : err.message;

  if (statusCode === 500) {
    console.error('Server error:', err);
  }

  res.status(statusCode).json({
    success: false,
    error: message,
  });
};