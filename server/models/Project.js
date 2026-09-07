import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  subtitle: { type: String, required: true },
  description: { type: String, required: true },
  problemSolved: { type: String, required: true },
  category: { type: String, enum: ['All', 'React', 'Node.js', 'MongoDB', 'AI', 'Full Stack'], required: true },
  featured: { type: Boolean, default: false },
  image: { type: String, required: true },
  technologies: [{ type: String }],
  githubUrl: { type: String },
  liveUrl: { type: String },
  caseStudy: {
    problem: { type: String },
    solution: { type: String },
    architecture: [{ type: String }],
    technicalChallenges: [{ type: String }],
    performance: [{ type: String }],
    security: [{ type: String }],
    results: [{ type: String }],
  },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);
