import { NextFunction, Request, Response } from 'express';

export const validateCreateUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({
      success: false,
      error: 'Name, email and password are required',
    });
    return;
  }

  if (typeof password !== 'string' || password.length < 8) {
    res.status(400).json({
      success: false,
      error: 'Password must be at least 8 characters',
    });
    return;
  }

  next();
};

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      success: false,
      error: 'Email and password are required',
    });
    return;
  }

  next();
};

export const validateContact = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    res.status(400).json({
      success: false,
      error: 'Name, email and message are required',
    });
    return;
  }

  if (typeof name !== 'string' || name.trim().length < 2) {
    res.status(400).json({
      success: false,
      error: 'Please provide a valid name',
    });
    return;
  }

  const emailRegex = /^\S+@\S+\.\S+$/;
  if (typeof email !== 'string' || !emailRegex.test(email)) {
    res.status(400).json({
      success: false,
      error: 'Please provide a valid email address',
    });
    return;
  }

  if (typeof message !== 'string' || message.trim().length < 10) {
    res.status(400).json({
      success: false,
      error: 'Message must be at least 10 characters',
    });
    return;
  }

  next();
};

export const validateNewsletter = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({
      success: false,
      error: 'Email is required',
    });
    return;
  }

  const emailRegex = /^\S+@\S+\.\S+$/;
  if (typeof email !== 'string' || !emailRegex.test(email)) {
    res.status(400).json({
      success: false,
      error: 'Please provide a valid email address',
    });
    return;
  }

  next();
};