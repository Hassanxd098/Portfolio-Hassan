import { Skill } from '../models/Skill.js';
import { isConnected } from '../config/db.js';
import { ApiResponse } from '../utils/apiResponse.js';

const mockSkills = [
  // Frontend
  { id: 's1', name: 'React.js', category: 'Frontend', level: 95, experienceYears: 5, description: 'Component lifecycle, Hooks, Concurrent Mode, Virtual DOM performance optimization, custom hook abstractions.', iconName: 'Atom', projectsUsing: ['Missile Health', 'AI Symptom Checker', 'DevScale Analytics'], relatedSkills: ['TypeScript', 'Redux Toolkit', 'JavaScript', 'Next.js'], featured: true },
  { id: 's2', name: 'TypeScript', category: 'Frontend', level: 90, experienceYears: 4, description: 'Strict type safety, generics, utility types, interface contracts, seamless integration with React & Express.', iconName: 'FileCode', projectsUsing: ['Missile Health', 'DevScale Analytics'], relatedSkills: ['React.js', 'JavaScript', 'Node.js'], featured: true },
  { id: 's3', name: 'JavaScript (ES6+)', category: 'Frontend', level: 96, experienceYears: 6, description: 'Asynchronous event loop, promises, async/await, closures, prototypes, DOM manipulation, functional programming.', iconName: 'Code', projectsUsing: ['All Projects'], relatedSkills: ['React.js', 'Node.js', 'TypeScript'], featured: true },
  { id: 's4', name: 'Tailwind CSS', category: 'Frontend', level: 92, experienceYears: 4, description: 'Utility-first styling, design system tokenization, dark mode support, responsive layout grids, glassmorphism.', iconName: 'Palette', projectsUsing: ['Missile Health', 'AI Symptom Checker'], relatedSkills: ['CSS3', 'React.js'], featured: false },

  // Backend
  { id: 's5', name: 'Node.js', category: 'Backend', level: 94, experienceYears: 5, description: 'Non-blocking I/O event driven architecture, stream processing, native module management, REST API microservices.', iconName: 'Server', projectsUsing: ['Missile Health', 'AI Symptom Checker', 'Nexus Gateway'], relatedSkills: ['Express.js', 'MongoDB', 'REST APIs'], featured: true },
  { id: 's6', name: 'Express.js', category: 'Backend', level: 95, experienceYears: 5, description: 'Middleware orchestration, router versioning, error handling, validation pipelines, JWT authentication, rate limiting.', iconName: 'Cpu', projectsUsing: ['All Backend Services'], relatedSkills: ['Node.js', 'REST APIs', 'MongoDB'], featured: true },
  { id: 's7', name: 'REST APIs', category: 'Backend', level: 96, experienceYears: 5, description: 'HATEOAS, standard status codes, payload pagination, validation filtering, open API specification, version control.', iconName: 'Globe', projectsUsing: ['All Projects'], relatedSkills: ['Express.js', 'GraphQL', 'JSON'], featured: true },
  { id: 's8', name: 'GraphQL', category: 'Backend', level: 85, experienceYears: 3, description: 'Schema declaration, resolvers, queries, mutations, subscriptions, Apollo Server integration, n+1 query optimization.', iconName: 'Share2', projectsUsing: ['Missile Health'], relatedSkills: ['Node.js', 'REST APIs'], featured: false },

  // Database
  { id: 's9', name: 'MongoDB', category: 'Database', level: 92, experienceYears: 5, description: 'Document schema design, index optimization, aggregation pipelines, replica sets, Atlas management.', iconName: 'Database', projectsUsing: ['Missile Health', 'AI Symptom Checker', 'Nexus Gateway'], relatedSkills: ['Mongoose', 'Node.js', 'Express.js'], featured: true },
  { id: 's10', name: 'Mongoose', category: 'Database', level: 94, experienceYears: 5, description: 'Schema validation rules, middleware hooks, population references, virtual getters, static model methods.', iconName: 'Layers', projectsUsing: ['Missile Health', 'AI Symptom Checker'], relatedSkills: ['MongoDB', 'Node.js'], featured: true },

  // State Management
  { id: 's11', name: 'Redux Toolkit', category: 'State', level: 94, experienceYears: 4, description: 'createSlice, createAsyncThunk, RTK Query caching, middleware selectors, state normalization, devtools.', iconName: 'Workflow', projectsUsing: ['Missile Health', 'DevScale Analytics'], relatedSkills: ['React.js', 'TypeScript', 'Context API'], featured: true },
  { id: 's12', name: 'Context API', category: 'State', level: 90, experienceYears: 5, description: 'Lightweight global context provider, custom hooks, reducer dispatching, theme & auth state management.', iconName: 'ToggleLeft', projectsUsing: ['Portfolio UI', 'AI Symptom Checker'], relatedSkills: ['React.js', 'Redux Toolkit'], featured: false },

  // DevOps & Tools & AI
  { id: 's13', name: 'Git & GitHub', category: 'Tools', level: 95, experienceYears: 6, description: 'Branching strategies (GitFlow), rebase workflows, pull request reviews, GitHub Actions CI/CD automation.', iconName: 'GitBranch', projectsUsing: ['All Projects'], relatedSkills: ['Docker', 'VS Code'], featured: true },
  { id: 's14', name: 'Docker', category: 'DevOps', level: 84, experienceYears: 3, description: 'Multi-stage container builds, docker-compose orchestration, container networking, environment isolation.', iconName: 'Box', projectsUsing: ['Nexus Gateway'], relatedSkills: ['Node.js', 'MongoDB'], featured: false },
  { id: 's15', name: 'AI Integration', category: 'AI', level: 88, experienceYears: 2, description: 'Generative AI APIs, structured JSON output validation, prompt engineering, RAG context retrieval.', iconName: 'Sparkles', projectsUsing: ['AI Symptom Checker', 'Portfolio AI Assistant'], relatedSkills: ['Node.js', 'REST APIs'], featured: true },
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
