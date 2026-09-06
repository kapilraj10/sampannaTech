import { Request, Response } from 'express';
import SiteSettings from '../models/SiteSettings';

export const getSiteSettings = async (_req: Request, res: Response): Promise<void> => {
  try {
    const existing = await SiteSettings.findOne().lean();

    if (!existing) {
      const created = await SiteSettings.create({});
      const settings = created.toObject();
      res.status(200).json({
        success: true,
        data: settings,
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: existing,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Unable to load site settings',
    });
  }
};

export const updateSiteSettings = async (req: Request, res: Response): Promise<void> => {
  try {
    let settings = await SiteSettings.findOne();

    if (!settings) {
      settings = await SiteSettings.create(req.body);
    } else {
      settings = await SiteSettings.findByIdAndUpdate(settings._id, req.body, {
        new: true,
        runValidators: true,
      });
    }

    res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Unable to update site settings',
    });
  }
};