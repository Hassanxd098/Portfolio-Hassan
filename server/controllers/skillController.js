import { Skill } from '../models/Skill.js';
import { isConnected } from '../config/db.js';
import { ApiResponse } from '../utils/apiResponse.js';

const mockSkills = [
  // Frontend
  { id: 's1', name: 'React.js', category: 'Frontend', level: 82, experienceYears: 1.3, description: 'Component state, custom hooks, Virtual DOM performance optimization, Redux integrations, and responsive UI building.', iconName: 'Atom', projectsUsing: ['Missile Health', 'AI Symptom Checker', 'DevScale Analytics'], relatedSkills: ['TypeScript', 'Redux Toolkit', 'JavaScript'], featured: true },
  { id: 's2', name: 'JavaScript (ES6+)', category: 'Frontend', level: 84, experienceYears: 1.3, description: 'Async/await promises, ES6 syntax, event loops, DOM manipulations, closures, and functional array methods.', iconName: 'Code', projectsUsing: ['All Projects'], relatedSkills: ['React.js', 'Node.js', 'TypeScript'], featured: true },
  { id: 's3', name: 'TypeScript', category: 'Frontend', level: 76, experienceYears: 1.0, description: 'Type interfaces, type safety in React props, API response interfaces, and strict build validation.', iconName: 'FileCode', projectsUsing: ['Missile Health', 'DevScale Analytics'], relatedSkills: ['React.js', 'JavaScript'], featured: true },
  { id: 's4', name: 'Tailwind CSS', category: 'Frontend', level: 85, experienceYears: 1.3, description: 'Utility-first CSS styling, flexbox/grid layouts, dark mode support, and responsive breakpoint design.', iconName: 'Palette', projectsUsing: ['Missile Health', 'AI Symptom Checker'], relatedSkills: ['CSS3', 'React.js'], featured: false },

  // Backend
  { id: 's5', name: 'Node.js', category: 'Backend', level: 80, experienceYears: 1.3, description: 'Asynchronous event driven I/O, npm package management, file streams, and REST API server development.', iconName: 'Server', projectsUsing: ['Missile Health', 'AI Symptom Checker', 'Nexus Gateway'], relatedSkills: ['Express.js', 'MongoDB', 'REST APIs'], featured: true },
  { id: 's6', name: 'Express.js', category: 'Backend', level: 82, experienceYears: 1.3, description: 'Route versioning, custom middleware orchestration, JWT authentication, rate limiting, and central error handlers.', iconName: 'Cpu', projectsUsing: ['All Backend Services'], relatedSkills: ['Node.js', 'REST APIs', 'MongoDB'], featured: true },
  { id: 's7', name: 'REST APIs', category: 'Backend', level: 85, experienceYears: 1.3, description: 'HTTP method verbs, status codes, query pagination, payload validation, and client-server data exchange.', iconName: 'Globe', projectsUsing: ['All Projects'], relatedSkills: ['Express.js', 'Node.js', 'JSON'], featured: true },
  { id: 's8', name: 'GraphQL', category: 'Backend', level: 70, experienceYears: 0.8, description: 'GraphQL queries, schemas, mutations, and API integrations.', iconName: 'Share2', projectsUsing: ['Missile Health'], relatedSkills: ['Node.js', 'REST APIs'], featured: false },

  // Database
  { id: 's9', name: 'MongoDB', category: 'Database', level: 78, experienceYears: 1.3, description: 'Document collection design, query indexing, MongoDB Atlas cloud deployment, and basic aggregations.', iconName: 'Database', projectsUsing: ['Missile Health', 'AI Symptom Checker', 'Nexus Gateway'], relatedSkills: ['Mongoose', 'Node.js', 'Express.js'], featured: true },
  { id: 's10', name: 'Mongoose', category: 'Database', level: 80, experienceYears: 1.3, description: 'Schema declarations, validation rules, model CRUD methods, populate references, and middleware hooks.', iconName: 'Layers', projectsUsing: ['Missile Health', 'AI Symptom Checker'], relatedSkills: ['MongoDB', 'Node.js'], featured: true },

  // State Management
  { id: 's11', name: 'Redux Toolkit', category: 'State', level: 80, experienceYears: 1.0, description: 'createSlice state management, createAsyncThunk API requests, slice reducers, and global UI state synchronization.', iconName: 'Workflow', projectsUsing: ['Missile Health', 'DevScale Analytics'], relatedSkills: ['React.js', 'TypeScript', 'Context API'], featured: true },
  { id: 's12', name: 'Context API', category: 'State', level: 82, experienceYears: 1.3, description: 'Lightweight React context state management, theme state persistence, and auth context hooks.', iconName: 'ToggleLeft', projectsUsing: ['Portfolio UI', 'AI Symptom Checker'], relatedSkills: ['React.js', 'Redux Toolkit'], featured: false },

  // Tools & DevOps & AI
  { id: 's13', name: 'Git & GitHub', category: 'Tools', level: 84, experienceYears: 1.3, description: 'Git branch management, pull requests, commit workflows, and version control collaboration.', iconName: 'GitBranch', projectsUsing: ['All Projects'], relatedSkills: ['VS Code', 'GitHub'], featured: true },
  { id: 's14', name: 'Docker', category: 'DevOps', level: 68, experienceYears: 0.8, description: 'Basic container configurations, dockerfiles, and container environment setups.', iconName: 'Box', projectsUsing: ['Nexus Gateway'], relatedSkills: ['Node.js', 'MongoDB'], featured: false },
  { id: 's15', name: 'AI Integration', category: 'AI', level: 75, experienceYears: 1.0, description: 'Generative AI REST endpoints integration, prompt formatting, and structured response parsing.', iconName: 'Sparkles', projectsUsing: ['AI Symptom Checker', 'Portfolio AI Assistant'], relatedSkills: ['Node.js', 'REST APIs'], featured: true },
];

export const getSkills = async (req, res, next) => {
  try {
    const { category } = req.query;
    let skills = mockSkills;

    if (isConnected) {
      const query = category && category !== 'All' ? { category } : {};
      skills = await Skill.find(query);
    } else if (category && category !== 'All') {
      skills = mockSkills.filter(s => s.category === category);
    }

    return res.status(200).json(new ApiResponse(200, skills, 'Skills retrieved successfully'));
  } catch (error) {
    next(error);
  }
};
