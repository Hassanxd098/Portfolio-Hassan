import nodemailer from 'nodemailer';
import { config } from '../config/env.js';
import { logger } from '../utils/logger.js';

export const sendContactEmail = async ({ name, email, subject, message }) => {
  if (!config.MAIL_USER || !config.MAIL_PASSWORD) {
    logger.info(`[Email Service Simulation] Received contact message from ${name} (${email}). Subject: "${subject}"`);
    return { simulated: true, success: true };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: config.MAIL_HOST,
      port: config.MAIL_PORT,
      secure: config.MAIL_PORT === 465,
      auth: {
        user: config.MAIL_USER,
        pass: config.MAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"${name}" <${config.MAIL_FROM}>`,
      to: config.CONTACT_EMAIL,
      replyTo: email,
      subject: `[Portfolio Contact] ${subject}`,
      html: `
        <h3>New Contact Message from Portfolio</h3>
        <p><strong>Sender:</strong> ${name} (&lt;${email}&gt;)</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <blockquote style="background: #f4f4f4; padding: 12px; border-left: 4px solid #0284c7;">
          ${message.replace(/\n/g, '<br/>')}
        </blockquote>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info(`Contact email sent successfully: ${info.messageId}`);
    return { simulated: false, success: true, messageId: info.messageId };
  } catch (error) {
    logger.error(`Error sending email: ${error.message}`);
    // Log message safely without breaking client response
    return { simulated: true, success: false, error: error.message };
  }
};
