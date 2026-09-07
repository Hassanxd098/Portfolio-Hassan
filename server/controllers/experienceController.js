import { Experience } from '../models/Experience.js';
import { isConnected } from '../config/db.js';
import { ApiResponse } from '../utils/apiResponse.js';

const mockExperiences = [
  {
    id: 'e1',
    company: 'Colan Infotech',
    role: 'Full-Stack Developer',
    period: 'July 2025 - Present',
    location: 'Full-Time (from Nov 2025) | Intern (July 2025 - Nov 2025)',
    isCurrent: true,
    responsibilities: [
      'Joined Colan Infotech as a Full-Stack Developer Intern in July 2025 and promoted to Full-Time Engineer position in November 2025.',
      'Architecting and delivering full-stack web applications using React.js, Redux Toolkit, Node.js, Express.js, and MongoDB.',
      'Building versioned RESTful API microservices with Zod payload validation, rate-limiting, and JWT authentication.',
      'Collaborating on enterprise production platforms including EHR patient management systems and reactive web dashboards.'
    ],
    achievements: [
      'Promoted from Intern to Full-Time Full-Stack Developer in Nov 2025 following outstanding internship technical delivery.',
      'Developed responsive UI components and Express backend APIs with optimized MongoDB query pipelines.'
    ],
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Redux Toolkit', 'JavaScript', 'REST APIs', 'Tailwind CSS']
  },
  {
    id: 'e2',
    company: 'Aspirasys',
    role: 'Full-Stack Developer',
    period: 'Nov 2024 - June 2025',
    location: 'On-site (7 Months)',
    isCurrent: false,
    responsibilities: [
      'Engineered interactive single-page web applications using React.js, JavaScript (ES6+), and REST API integration.',
      'Assisted in designing MongoDB document schemas, Mongoose models, and Express controller functions.',
      'Created mobile-responsive UI layouts adhering to modern UI/UX design specifications and WCAG accessibility standards.'
    ],
    achievements: [
      'Delivered core frontend components and API endpoints for internal client management portals.',
      'Refactored legacy web interfaces into reusable, modular React component architecture.'
    ],
    technologies: ['React.js', 'JavaScript', 'Node.js', 'Express.js', 'MongoDB', 'HTML5', 'CSS3', 'Git']
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
