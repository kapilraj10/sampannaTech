import { Router } from 'express';
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../controllers/testimonialController';
import { protect, authorize } from '../middleware/auth';

const router = Router();

router.get('/', getTestimonials);

router.post('/', protect, authorize('admin', 'editor'), createTestimonial);
router.put('/:id', protect, authorize('admin', 'editor'), updateTestimonial);
router.delete('/:id', protect, authorize('admin'), deleteTestimonial);

export default router;