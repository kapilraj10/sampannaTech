import { Request, Response } from 'express';
import Contact from '../models/Contact';

export const createContactEnquiry = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, phone, company, service, message } = req.body;

    const enquiry = await Contact.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || undefined,
      company: company?.trim() || undefined,
      service: service?.trim() || undefined,
      message: message.trim(),
      status: 'new',
    });

    res.status(201).json({
      success: true,
      message:
        'Thank you for reaching out. We have received your message and will get back to you soon.',
      data: {
        id: enquiry._id,
        name: enquiry.name,
        email: enquiry.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Unable to send your message. Please try again later.',
    });
  }
};

export const getEnquiries = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, search } = req.query;

    const filter: Record<string, unknown> = {};

    if (status && ['new', 'contacted', 'closed'].includes(status as string)) {
      filter.status = status;
    }

    if (search && typeof search === 'string') {
      const regex = new RegExp(search, 'i');
      filter.$or = [
        { name: regex },
        { email: regex },
        { company: regex },
        { service: regex },
        { message: regex },
      ];
    }

    const enquiries = await Contact.find(filter).sort({ createdAt: -1 }).lean();
    res.status(200).json({
      success: true,
      count: enquiries.length,
      data: enquiries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Unable to load enquiries',
    });
  }
};

export const updateEnquiryStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { status } = req.body;

    if (!['new', 'contacted', 'closed'].includes(status)) {
      res.status(400).json({
        success: false,
        error: 'Invalid status value',
      });
      return;
    }

    const enquiry = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!enquiry) {
      res.status(404).json({
        success: false,
        error: 'Enquiry not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: enquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Unable to update enquiry',
    });
  }
};

export const deleteEnquiry = async (req: Request, res: Response): Promise<void> => {
  try {
    const enquiry = await Contact.findByIdAndDelete(req.params.id);

    if (!enquiry) {
      res.status(404).json({
        success: false,
        error: 'Enquiry not found',
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
      error: 'Unable to delete enquiry',
    });
  }
};