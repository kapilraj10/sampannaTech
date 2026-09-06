import { Router } from 'express';
import {
  getDashboardStats,
  getAllContent,
  getUsers,
  updateUser,
  deleteUser,
} from '../controllers/adminController';
import { protect, authorize } from '../middleware/auth';

const router = Router();

router.get('/stats', protect, authorize('admin', 'editor'), getDashboardStats);
router.get('/content/:resource', protect, authorize('admin', 'editor'), getAllContent);

router.get('/users', protect, authorize('admin'), getUsers);
router.put('/users/:id', protect, authorize('admin'), updateUser);
router.delete('/users/:id', protect, authorize('admin'), deleteUser);

export default router;