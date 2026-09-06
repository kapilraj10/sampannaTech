import { Router } from 'express';
import {
  getMedia,
  createMedia,
  updateMedia,
  deleteMedia,
} from '../controllers/mediaController';
import { protect, authorize } from '../middleware/auth';

const router = Router();

router.get('/', getMedia);

router.post('/', protect, authorize('admin', 'editor'), createMedia);
router.put('/:id', protect, authorize('admin', 'editor'), updateMedia);
router.delete('/:id', protect, authorize('admin'), deleteMedia);

export default router;