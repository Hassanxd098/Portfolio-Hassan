import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  period: { type: String, required: true },
  location: { type: String, default: 'Remote / On-site' },
  isCurrent: { type: Boolean, default: false },
  responsibilities: [{ type: String }],
  achievements: [{ type: String }],
  technologies: [{ type: String }],
  order: { type: Number, default: 0 },
}, { timestamps: true });

export const Experience = mongoose.models.Experience || mongoose.model('Experience', experienceSchema);
