import { Router } from 'express';
import {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
} from '../controllers/serviceController';
import { protect, authorize } from '../middleware/auth';

const router = Router();

router.get('/', getServices);
router.get('/:slug', getService);

router.post('/', protect, authorize('admin', 'editor'), createService);
router.put('/:id', protect, authorize('admin', 'editor'), updateService);
router.delete('/:id', protect, authorize('admin'), deleteService);

export default router;