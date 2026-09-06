import { Router } from 'express';
import {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
} from '../controllers/blogController';
import { protect, authorize } from '../middleware/auth';

const router = Router();

router.get('/', getBlogs);
router.get('/:slug', getBlogBySlug);

router.post('/', protect, authorize('admin', 'editor'), createBlog);
router.put('/:id', protect, authorize('admin', 'editor'), updateBlog);
router.delete('/:id', protect, authorize('admin'), deleteBlog);

export default router;