import { Message } from '../models/Message.js';
import { isConnected } from '../config/db.js';
import { sendContactEmail } from '../services/mailer.service.js';
import { ApiResponse } from '../utils/apiResponse.js';

export const submitContactMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    const clientIp = req.ip || req.headers['x-forwarded-for'] || '127.0.0.1';

    // Save to database if connected
    let savedMessage = { id: `m_${Date.now()}`, name, email, subject, message, createdAt: new Date() };
    if (isConnected) {
      savedMessage = await Message.create({ name, email, subject, message, ip: clientIp });
    }

    // Trigger backend mailer service
    const mailResult = await sendContactEmail({ name, email, subject, message });

    return res.status(201).json(
      new ApiResponse(
        201,
        { message: savedMessage, emailDelivery: mailResult },
        'Thank you for reaching out! Your message has been transmitted successfully.'
      )
    );
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    if (isConnected) {
      const messages = await Message.find().sort({ createdAt: -1 });
      return res.status(200).json(new ApiResponse(200, messages, 'Messages retrieved'));
    }
    return res.status(200).json(new ApiResponse(200, [], 'Messages retrieved (no active DB)'));
  } catch (error) {
    next(error);
  }
};
