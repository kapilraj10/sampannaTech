import { Router } from 'express';
import { login, getMe, createUser } from '../controllers/authController';
import { protect, authorize } from '../middleware/auth';
import { validateLogin, validateCreateUser } from '../middleware/validate';

const router = Router();

router.post('/login', validateLogin, login);

router.get('/me', protect, getMe);

router.post('/users', protect, authorize('admin'), validateCreateUser, createUser);

export default router;