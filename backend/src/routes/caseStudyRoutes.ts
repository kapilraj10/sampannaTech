import { Router } from 'express';
import {
  getCaseStudies,
  getCaseStudy,
  createCaseStudy,
  updateCaseStudy,
  deleteCaseStudy,
} from '../controllers/caseStudyController';
import { protect, authorize } from '../middleware/auth';

const router = Router();

router.get('/', getCaseStudies);
router.get('/:slug', getCaseStudy);
router.post('/', protect, authorize('admin', 'editor'), createCaseStudy);
router.put('/:id', protect, authorize('admin', 'editor'), updateCaseStudy);
router.delete('/:id', protect, authorize('admin'), deleteCaseStudy);

export default router;
