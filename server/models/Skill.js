import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['Frontend', 'Backend', 'Database', 'State', 'DevOps', 'Tools', 'AI'], required: true },
  level: { type: Number, min: 0, max: 100, required: true },
  experienceYears: { type: Number, required: true },
  description: { type: String, required: true },
  iconName: { type: String, required: true },
  projectsUsing: [{ type: String }],
  relatedSkills: [{ type: String }],
  featured: { type: Boolean, default: false },
}, { timestamps: true });

export const Skill = mongoose.models.Skill || mongoose.model('Skill', skillSchema);
