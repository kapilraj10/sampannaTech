import { Router } from 'express';
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController';
import { protect, authorize } from '../middleware/auth';

const router = Router();

router.get('/', getProjects);
router.get('/:slug', getProject);

router.post('/', protect, authorize('admin', 'editor'), createProject);
router.put('/:id', protect, authorize('admin', 'editor'), updateProject);
router.delete('/:id', protect, authorize('admin'), deleteProject);

export default router;