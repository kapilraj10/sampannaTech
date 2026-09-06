import { Router } from 'express';
import {
  createContactEnquiry,
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
} from '../controllers/contactController';
import { protect, authorize } from '../middleware/auth';
import { validateContact } from '../middleware/validate';

const router = Router();

router.post('/', validateContact, createContactEnquiry);

router.get('/', protect, authorize('admin', 'editor'), getEnquiries);
router.put('/:id', protect, authorize('admin', 'editor'), updateEnquiryStatus);
router.delete('/:id', protect, authorize('admin'), deleteEnquiry);

export default router;