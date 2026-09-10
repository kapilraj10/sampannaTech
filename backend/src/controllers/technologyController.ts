import { Request, Response } from 'express';
import Technology from '../models/Technology';

export const getTechnologies = async (_req: Request, res: Response): Promise<void> => {
  try {
    const techs = await Technology.find({ active: true })
      .sort({ category: 1, sortOrder: 1, name: 1 })
      .lean();

    res.status(200).json({
      success: true,
      count: techs.length,
      data: techs,
    });
  } catch {
    res.status(500).json({ success: false, error: 'Unable to load technologies' });
  }
};

export const createTechnology = async (req: Request, res: Response): Promise<void> => {
  try {
    const tech = await Technology.create(req.body);
    res.status(201).json({ success: true, data: tech });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unable to create technology';
    res.status(400).json({ success: false, error: msg });
  }
};

export const updateTechnology = async (req: Request, res: Response): Promise<void> => {
  try {
    const tech = await Technology.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!tech) {
      res.status(404).json({ success: false, error: 'Technology not found' });
      return;
    }
    res.status(200).json({ success: true, data: tech });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unable to update technology';
    res.status(400).json({ success: false, error: msg });
  }
};

export const deleteTechnology = async (req: Request, res: Response): Promise<void> => {
  try {
    const tech = await Technology.findByIdAndDelete(req.params.id);
    if (!tech) {
      res.status(404).json({ success: false, error: 'Technology not found' });
      return;
    }
    res.status(200).json({ success: true, data: {} });
  } catch {
    res.status(500).json({ success: false, error: 'Unable to delete technology' });
  }
};
