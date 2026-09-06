import { Router } from 'express';
import {
  getSiteSettings,
  updateSiteSettings,
} from '../controllers/siteSettingsController';
import { protect, authorize } from '../middleware/auth';

const router = Router();

router.get('/', getSiteSettings);

router.put('/', protect, authorize('admin'), updateSiteSettings);

export default router;