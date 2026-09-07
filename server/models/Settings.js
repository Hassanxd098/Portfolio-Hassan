import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  availableForWork: { type: Boolean, default: true },
  yearsExperience: { type: Number, default: 5 },
  projectsBuiltCount: { type: Number, default: 24 },
  technologiesCount: { type: Number, default: 18 },
  apisCreatedCount: { type: Number, default: 45 },
  statusMessage: { type: String, default: 'Building scalable full-stack & AI applications...' },
}, { timestamps: true });

export const Settings = mongoose.models.Settings || mongoose.model('Settings', settingsSchema);
