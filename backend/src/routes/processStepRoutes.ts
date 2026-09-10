import { Router } from 'express';
import {
  getProcessSteps,
  createProcessStep,
  updateProcessStep,
  deleteProcessStep,
} from '../controllers/processStepController';
import { protect, authorize } from '../middleware/auth';

const router = Router();

router.get('/', getProcessSteps);
router.post('/', protect, authorize('admin', 'editor'), createProcessStep);
router.put('/:id', protect, authorize('admin', 'editor'), updateProcessStep);
router.delete('/:id', protect, authorize('admin'), deleteProcessStep);

export default router;
