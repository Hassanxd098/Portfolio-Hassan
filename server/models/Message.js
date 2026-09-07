import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  ip: { type: String },
}, { timestamps: true });

export const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);
