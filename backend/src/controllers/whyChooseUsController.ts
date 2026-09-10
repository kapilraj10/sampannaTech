import { Request, Response } from 'express';
import WhyChooseUs from '../models/WhyChooseUs';

export const getWhyChooseUs = async (_req: Request, res: Response): Promise<void> => {
  try {
    const items = await WhyChooseUs.find({ active: true })
      .sort({ sortOrder: 1, createdAt: 1 })
      .lean();

    res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch {
    res.status(500).json({ success: false, error: 'Unable to load items' });
  }
};

export const createWhyChooseUs = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await WhyChooseUs.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unable to create item';
    res.status(400).json({ success: false, error: msg });
  }
};

export const updateWhyChooseUs = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await WhyChooseUs.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) {
      res.status(404).json({ success: false, error: 'Item not found' });
      return;
    }
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unable to update item';
    res.status(400).json({ success: false, error: msg });
  }
};

export const deleteWhyChooseUs = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await WhyChooseUs.findByIdAndDelete(req.params.id);
    if (!item) {
      res.status(404).json({ success: false, error: 'Item not found' });
      return;
    }
    res.status(200).json({ success: true, data: {} });
  } catch {
    res.status(500).json({ success: false, error: 'Unable to delete item' });
  }
};
