import { Request, Response } from 'express';
import NewsletterSubscriber from '../models/NewsletterSubscriber';

export const subscribe = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    let subscriber = await NewsletterSubscriber.findOne({
      email: email.toLowerCase(),
    });

    if (subscriber) {
      if (!subscriber.active) {
        subscriber.active = true;
        await subscriber.save();
      }

      res.status(200).json({
        success: true,
        message: 'You are already subscribed to our newsletter.',
      });
      return;
    }

    subscriber = await NewsletterSubscriber.create({
      email: email.toLowerCase(),
      active: true,
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for subscribing to our newsletter.',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Unable to subscribe. Please try again later.',
    });
  }
};

export const getSubscribers = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const subscribers = await NewsletterSubscriber.find()
      .sort({ createdAt: -1 })
      .lean();
    res.status(200).json({
      success: true,
      count: subscribers.length,
      data: subscribers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Unable to load subscribers',
    });
  }
};

export const deleteSubscriber = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const subscriber = await NewsletterSubscriber.findByIdAndDelete(req.params.id);

    if (!subscriber) {
      res.status(404).json({
        success: false,
        error: 'Subscriber not found',
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
      error: 'Unable to delete subscriber',
    });
  }
};