import { Router } from 'express';
import {
  subscribe,
  getSubscribers,
  deleteSubscriber,
} from '../controllers/newsletterController';
import { protect, authorize } from '../middleware/auth';
import { validateNewsletter } from '../middleware/validate';

const router = Router();

router.post('/', validateNewsletter, subscribe);

router.get('/', protect, authorize('admin', 'editor'), getSubscribers);
router.delete('/:id', protect, authorize('admin'), deleteSubscriber);

export default router;