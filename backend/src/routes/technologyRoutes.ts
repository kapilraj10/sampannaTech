import { Router } from 'express';
import {
  getTechnologies,
  createTechnology,
  updateTechnology,
  deleteTechnology,
} from '../controllers/technologyController';
import { protect, authorize } from '../middleware/auth';

const router = Router();

router.get('/', getTechnologies);
router.post('/', protect, authorize('admin', 'editor'), createTechnology);
router.put('/:id', protect, authorize('admin', 'editor'), updateTechnology);
router.delete('/:id', protect, authorize('admin'), deleteTechnology);

export default router;
