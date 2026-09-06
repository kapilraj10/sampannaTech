import { Request, Response } from 'express';
import Blog from '../models/Blog';

interface BlogQuery {
  published?: boolean;
  category?: string;
}

export const getBlogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category } = req.query;

    const filter: BlogQuery = { published: true };

    if (category) {
      filter.category = category as string;
    }

    const blogs = await Blog.find(filter)
      .sort({ publishedAt: -1 })
      .select('-__v')
      .lean();

    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Unable to load blogs',
    });
  }
};

export const getBlogBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const blog = await Blog.findOne({
      slug: req.params.slug,
      published: true,
    }).lean();

    if (!blog) {
      res.status(404).json({
        success: false,
        error: 'Blog post not found',
      });
      return;
    }

    const relatedPosts = await Blog.find({
      category: blog.category,
      slug: { $ne: blog.slug },
      published: true,
    })
      .select('title slug excerpt category publishedAt coverImage')
      .limit(3)
      .lean();

    res.status(200).json({
      success: true,
      data: blog,
      relatedPosts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Unable to load blog post',
    });
  }
};

export const createBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Unable to create blog post',
    });
  }
};

export const updateBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!blog) {
      res.status(404).json({
        success: false,
        error: 'Blog post not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Unable to update blog post',
    });
  }
};

export const deleteBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      res.status(404).json({
        success: false,
        error: 'Blog post not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Unable to delete blog post',
    });
  }
};