import { Request, Response } from 'express';
import Media from '../models/Media';

export const getMedia = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, featured } = req.query;

    const filter: { category?: string; featured?: boolean } = {};
    if (category) filter.category = category as string;
    if (featured === 'true') filter.featured = true;

    const items = await Media.find(filter)
      .sort({ sortOrder: 1, createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Unable to load media',
    });
  }
};

export const createMedia = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, url, alt, title, category, featured, sortOrder } = req.body;

    if (!name || !url) {
      res.status(400).json({
        success: false,
        error: 'Name and URL are required',
      });
      return;
    }

    const item = await Media.create({
      name: name.trim(),
      url: url.trim(),
      alt: alt?.trim(),
      title: title?.trim(),
      category: category?.trim(),
      featured: !!featured,
      sortOrder: sortOrder || 0,
    });

    res.status(201).json({
      success: true,
      data: item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Unable to create media item',
    });
  }
};

export const updateMedia = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await Media.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!item) {
      res.status(404).json({
        success: false,
        error: 'Media item not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Unable to update media item',
    });
  }
};

export const deleteMedia = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await Media.findByIdAndDelete(req.params.id);

    if (!item) {
      res.status(404).json({
        success: false,
        error: 'Media item not found',
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
      error: 'Unable to delete media item',
    });
  }
};