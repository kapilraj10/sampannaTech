import { Router } from 'express';
import {
  getHomeSections,
  getHomeSection,
  upsertHomeSection,
  deleteHomeSection,
} from '../controllers/homeSectionController';
import { protect, authorize } from '../middleware/auth';

const router = Router();

router.get('/', getHomeSections);
router.get('/:key', getHomeSection);
router.post('/', protect, authorize('admin', 'editor'), upsertHomeSection);
router.put('/:key', protect, authorize('admin', 'editor'), upsertHomeSection);
router.delete('/:key', protect, authorize('admin'), deleteHomeSection);

export default router;
