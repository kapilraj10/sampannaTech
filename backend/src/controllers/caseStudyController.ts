import { Request, Response } from 'express';
import CaseStudy from '../models/CaseStudy';

export const getCaseStudies = async (_req: Request, res: Response): Promise<void> => {
  try {
    const studies = await CaseStudy.find({ active: true })
      .sort({ sortOrder: 1, createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      count: studies.length,
      data: studies,
    });
  } catch {
    res.status(500).json({ success: false, error: 'Unable to load case studies' });
  }
};

export const getCaseStudy = async (req: Request, res: Response): Promise<void> => {
  try {
    const study = await CaseStudy.findOne({
      slug: req.params.slug,
      active: true,
    }).lean();

    if (!study) {
      res.status(404).json({ success: false, error: 'Case study not found' });
      return;
    }

    res.status(200).json({ success: true, data: study });
  } catch {
    res.status(500).json({ success: false, error: 'Unable to load case study' });
  }
};

export const createCaseStudy = async (req: Request, res: Response): Promise<void> => {
  try {
    const study = await CaseStudy.create(req.body);
    res.status(201).json({ success: true, data: study });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unable to create case study';
    res.status(400).json({ success: false, error: msg });
  }
};

export const updateCaseStudy = async (req: Request, res: Response): Promise<void> => {
  try {
    const study = await CaseStudy.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!study) {
      res.status(404).json({ success: false, error: 'Case study not found' });
      return;
    }

    res.status(200).json({ success: true, data: study });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unable to update case study';
    res.status(400).json({ success: false, error: msg });
  }
};

export const deleteCaseStudy = async (req: Request, res: Response): Promise<void> => {
  try {
    const study = await CaseStudy.findByIdAndDelete(req.params.id);
    if (!study) {
      res.status(404).json({ success: false, error: 'Case study not found' });
      return;
    }
    res.status(200).json({ success: true, data: {} });
  } catch {
    res.status(500).json({ success: false, error: 'Unable to delete case study' });
  }
};
