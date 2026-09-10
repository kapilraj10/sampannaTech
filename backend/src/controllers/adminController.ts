import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import Service from '../models/Service';
import Product from '../models/Product';
import Project from '../models/Project';
import Blog from '../models/Blog';
import Testimonial from '../models/Testimonial';
import TeamMember from '../models/TeamMember';
import Job from '../models/Job';
import Contact from '../models/Contact';
import NewsletterSubscriber from '../models/NewsletterSubscriber';
import Media from '../models/Media';
import CaseStudy from '../models/CaseStudy';
import Technology from '../models/Technology';
import ProcessStep from '../models/ProcessStep';
import WhyChooseUs from '../models/WhyChooseUs';
import HomeSection from '../models/HomeSection';

interface Queryable {
  find: (filter?: object) => {
    sort: (sort?: object) => { lean: () => Promise<unknown[]> };
  };
}

export const getAllContent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { resource } = req.params;

    const models: Record<string, Queryable> = {
      services: Service as unknown as Queryable,
      products: Product as unknown as Queryable,
      projects: Project as unknown as Queryable,
      blogs: Blog as unknown as Queryable,
      testimonials: Testimonial as unknown as Queryable,
      team: TeamMember as unknown as Queryable,
      media: Media as unknown as Queryable,
      jobs: Job as unknown as Queryable,
      'case-studies': CaseStudy as unknown as Queryable,
      technologies: Technology as unknown as Queryable,
      'process-steps': ProcessStep as unknown as Queryable,
      'why-choose-us': WhyChooseUs as unknown as Queryable,
      'home-sections': HomeSection as unknown as Queryable,
    };

    const model = models[resource];
    if (!model) {
      res.status(400).json({
        success: false,
        error: 'Unknown content resource',
      });
      return;
    }

    const items = await model.find({}).sort({ createdAt: -1 }).lean();

    res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Unable to load content',
    });
  }
};

export const getDashboardStats = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const [
      services,
      products,
      projects,
      blogs,
      testimonials,
      teamMembers,
      jobs,
      contacts,
      subscribers,
      media,
      caseStudies,
      technologies,
      processSteps,
      whyChooseUs,
    ] = await Promise.all([
      Service.countDocuments(),
      Product.countDocuments(),
      Project.countDocuments(),
      Blog.countDocuments(),
      Testimonial.countDocuments(),
      TeamMember.countDocuments(),
      Job.countDocuments(),
      Contact.countDocuments(),
      NewsletterSubscriber.countDocuments(),
      Media.countDocuments(),
      CaseStudy.countDocuments(),
      Technology.countDocuments(),
      ProcessStep.countDocuments(),
      WhyChooseUs.countDocuments(),
    ]);

    const recentContacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(8)
      .select('name email service status createdAt')
      .lean();

    res.status(200).json({
      success: true,
      data: {
        counts: {
          services,
          products,
          projects,
          blogs,
          testimonials,
          teamMembers,
          jobs,
          contacts,
          subscribers,
          media,
          caseStudies,
          technologies,
          processSteps,
          whyChooseUs,
        },
        recentContacts,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Unable to load dashboard data',
    });
  }
};

export const getUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find().select('-password -__v').sort({ createdAt: 1 }).lean();

    const safeUsers = users.map((u) => ({
      id: u._id.toString(),
      name: u.name,
      email: u.email,
      role: u.role,
      active: u.active,
      createdAt: u.createdAt,
    }));

    res.status(200).json({
      success: true,
      count: safeUsers.length,
      data: safeUsers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Unable to load users',
    });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, role, active, password } = req.body;

    const update: Record<string, unknown> = {};
    if (name) update.name = name.trim();
    if (role && ['admin', 'editor'].includes(role)) update.role = role;
    if (typeof active === 'boolean') update.active = active;
    if (password && password.length >= 8) {
      update.password = await bcrypt.hash(password, 12);
    }

    const user = await User.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    }).select('-password');

    if (!user) {
      res.status(404).json({
        success: false,
        error: 'User not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        active: user.active,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Unable to update user',
    });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      res.status(404).json({
        success: false,
        error: 'User not found',
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
      error: 'Unable to delete user',
    });
  }
};
