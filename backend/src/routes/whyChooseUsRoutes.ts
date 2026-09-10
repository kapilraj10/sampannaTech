import { Router } from 'express';
import {
  getWhyChooseUs,
  createWhyChooseUs,
  updateWhyChooseUs,
  deleteWhyChooseUs,
} from '../controllers/whyChooseUsController';
import { protect, authorize } from '../middleware/auth';

const router = Router();

router.get('/', getWhyChooseUs);
router.post('/', protect, authorize('admin', 'editor'), createWhyChooseUs);
router.put('/:id', protect, authorize('admin', 'editor'), updateWhyChooseUs);
router.delete('/:id', protect, authorize('admin'), deleteWhyChooseUs);

export default router;
