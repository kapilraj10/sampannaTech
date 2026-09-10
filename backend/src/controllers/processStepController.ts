import { Request, Response } from 'express';
import ProcessStep from '../models/ProcessStep';

export const getProcessSteps = async (_req: Request, res: Response): Promise<void> => {
  try {
    const steps = await ProcessStep.find({ active: true })
      .sort({ sortOrder: 1, number: 1 })
      .lean();

    res.status(200).json({
      success: true,
      count: steps.length,
      data: steps,
    });
  } catch {
    res.status(500).json({ success: false, error: 'Unable to load process steps' });
  }
};

export const createProcessStep = async (req: Request, res: Response): Promise<void> => {
  try {
    const step = await ProcessStep.create(req.body);
    res.status(201).json({ success: true, data: step });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unable to create process step';
    res.status(400).json({ success: false, error: msg });
  }
};

export const updateProcessStep = async (req: Request, res: Response): Promise<void> => {
  try {
    const step = await ProcessStep.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!step) {
      res.status(404).json({ success: false, error: 'Process step not found' });
      return;
    }
    res.status(200).json({ success: true, data: step });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unable to update process step';
    res.status(400).json({ success: false, error: msg });
  }
};

export const deleteProcessStep = async (req: Request, res: Response): Promise<void> => {
  try {
    const step = await ProcessStep.findByIdAndDelete(req.params.id);
    if (!step) {
      res.status(404).json({ success: false, error: 'Process step not found' });
      return;
    }
    res.status(200).json({ success: true, data: {} });
  } catch {
    res.status(500).json({ success: false, error: 'Unable to delete process step' });
  }
};
