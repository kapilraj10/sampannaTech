import { Router } from 'express';
import {
  getJobs,
  createJob,
  updateJob,
  deleteJob,
} from '../controllers/jobController';
import { protect, authorize } from '../middleware/auth';

const router = Router();

router.get('/', getJobs);

router.post('/', protect, authorize('admin', 'editor'), createJob);
router.put('/:id', protect, authorize('admin', 'editor'), updateJob);
router.delete('/:id', protect, authorize('admin'), deleteJob);

export default router;