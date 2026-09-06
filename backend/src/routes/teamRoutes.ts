import { Router } from 'express';
import {
  getTeam,
  getTeamMember,
  getAllTeam,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from '../controllers/teamController';
import { protect, authorize } from '../middleware/auth';

const router = Router();

router.get('/', getTeam);
router.get('/all', protect, authorize('admin', 'editor'), getAllTeam);
router.get('/:slug', getTeamMember);

router.post('/', protect, authorize('admin', 'editor'), createTeamMember);
router.put('/:id', protect, authorize('admin', 'editor'), updateTeamMember);
router.delete('/:id', protect, authorize('admin'), deleteTeamMember);

export default router;