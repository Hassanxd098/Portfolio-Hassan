import { Experience } from '../models/Experience.js';
import { isConnected } from '../config/db.js';
import { ApiResponse } from '../utils/apiResponse.js';

const mockExperiences = [
  {
    id: 'e1',
    company: 'Apex Digital Systems',
    role: 'Senior Full-Stack Software Engineer',
    period: '2024 - Present',
    location: 'Remote',
    isCurrent: true,
    responsibilities: [
      'Architected and led the development of high-throughput web applications using React, Redux Toolkit, Node.js, and MongoDB.',
      'Designed versioned REST APIs serving 500k+ daily active requests with sub-100ms response latencies.',
      'Integrated security protections including JWT token rotation, rate-limiting headers, input sanitization, and CORS enforcement.',
      'Mentored 6 junior/mid-level frontend engineers on Redux state normalization and clean code patterns.'
    ],
    achievements: [
      'Reduced web application bundle size by 42% using dynamic import code-splitting.',
      'Improved MongoDB query execution speed by 3.5x via strategic indexing and aggregation refactoring.'
    ],
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Redux Toolkit', 'TypeScript', 'REST APIs', 'Docker']
  },
  {
    id: 'e2',
    company: 'HealthTech Innovations',
    role: 'Full-Stack Developer (MERN)',
    period: '2022 - 2024',
    location: 'Hybrid',
    isCurrent: false,
    responsibilities: [
      'Engineered core healthcare modules for Missile Health platform including doctor-patient scheduling and prescription workflows.',
      'Built responsive, accessible UI components with React, Tailwind CSS, and Framer Motion adhering to WCAG AAA contrast guidelines.',
      'Developed express backend services connected to MongoDB for real-time medical triage categorization.'
    ],
    achievements: [
      'Successfully deployed AI Healthcare Symptom Checker microservice reducing ER non-emergency check-ins.',
      'Maintained 99.9% uptime across production MongoDB Atlas databases.'
    ],
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'REST API', 'Tailwind CSS', 'Git']
  },
  {
    id: 'e3',
    company: 'CloudScale Solutions',
    role: 'Frontend Developer',
    period: '2021 - 2022',
    location: 'On-site',
    isCurrent: false,
    responsibilities: [
      'Built interactive single-page web applications using React.js, Redux, and modern JavaScript (ES6+).',
      'Collaborated with UI/UX designers to translate Figma mockups into pixel-perfect responsive components.',
      'Integrated Axios client layers with backend REST endpoints featuring automatic request retries and global toast notifications.'
    ],
    achievements: [
      'Refactored legacy jQuery application into modular React components.',
      'Achieved 95+ Lighthouse performance scores across all client landing pages.'
    ],
    technologies: ['React.js', 'JavaScript', 'Redux', 'HTML5', 'CSS3', 'REST APIs', 'Git']
  }
];

export const getExperiences = async (req, res, next) => {
  try {
    let experiences = mockExperiences;
    if (isConnected) {
      experiences = await Experience.find().sort({ order: 1, createdAt: -1 });
    }
    return res.status(200).json(new ApiResponse(200, experiences, 'Experience timeline retrieved'));
  } catch (error) {
    next(error);
  }
};
