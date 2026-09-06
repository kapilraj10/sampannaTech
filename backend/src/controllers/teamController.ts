import { Request, Response } from 'express';
import TeamMember from '../models/TeamMember';

export const getTeam = async (_req: Request, res: Response): Promise<void> => {
  try {
    const members = await TeamMember.find({ published: true })
      .sort({ order: 1, createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      count: members.length,
      data: members,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Unable to load team members',
    });
  }
};

export const getTeamMember = async (req: Request, res: Response): Promise<void> => {
  try {
    const member = await TeamMember.findOne({
      slug: req.params.slug,
      published: true,
    }).lean();

    if (!member) {
      res.status(404).json({
        success: false,
        error: 'Team member not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: member,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Unable to load team member',
    });
  }
};

export const getAllTeam = async (_req: Request, res: Response): Promise<void> => {
  try {
    const members = await TeamMember.find().sort({ order: 1, createdAt: -1 }).lean();
    res.status(200).json({
      success: true,
      count: members.length,
      data: members,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Unable to load team members',
    });
  }
};

export const createTeamMember = async (req: Request, res: Response): Promise<void> => {
  try {
    const member = await TeamMember.create(req.body);
    res.status(201).json({
      success: true,
      data: member,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Unable to create team member',
    });
  }
};

export const updateTeamMember = async (req: Request, res: Response): Promise<void> => {
  try {
    const member = await TeamMember.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!member) {
      res.status(404).json({
        success: false,
        error: 'Team member not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: member,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Unable to update team member',
    });
  }
};

export const deleteTeamMember = async (req: Request, res: Response): Promise<void> => {
  try {
    const member = await TeamMember.findByIdAndDelete(req.params.id);

    if (!member) {
      res.status(404).json({
        success: false,
        error: 'Team member not found',
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
      error: 'Unable to delete team member',
    });
  }
};