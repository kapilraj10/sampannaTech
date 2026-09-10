import { Request, Response } from 'express';
import HomeSection from '../models/HomeSection';

export const getHomeSections = async (_req: Request, res: Response): Promise<void> => {
  try {
    const sections = await HomeSection.find({ active: true }).lean();
    res.status(200).json({
      success: true,
      count: sections.length,
      data: sections,
    });
  } catch {
    res.status(500).json({ success: false, error: 'Unable to load home sections' });
  }
};

export const getHomeSection = async (req: Request, res: Response): Promise<void> => {
  try {
    const section = await HomeSection.findOne({ sectionKey: req.params.key }).lean();
    if (!section) {
      res.status(404).json({ success: false, error: 'Section not found' });
      return;
    }
    res.status(200).json({ success: true, data: section });
  } catch {
    res.status(500).json({ success: false, error: 'Unable to load section' });
  }
};

export const upsertHomeSection = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sectionKey } = req.body;
    if (!sectionKey) {
      res.status(400).json({ success: false, error: 'sectionKey is required' });
      return;
    }

    const section = await HomeSection.findOneAndUpdate(
      { sectionKey },
      { $set: req.body },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json({ success: true, data: section });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unable to save section';
    res.status(400).json({ success: false, error: msg });
  }
};

export const deleteHomeSection = async (req: Request, res: Response): Promise<void> => {
  try {
    const section = await HomeSection.findOneAndDelete({ sectionKey: req.params.key });
    if (!section) {
      res.status(404).json({ success: false, error: 'Section not found' });
      return;
    }
    res.status(200).json({ success: true, data: {} });
  } catch {
    res.status(500).json({ success: false, error: 'Unable to delete section' });
  }
};
