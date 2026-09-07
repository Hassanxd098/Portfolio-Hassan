import { Project, Skill, Experience, GitHubRepo } from '../types';

export const DEVELOPER_PROFILE = {
  name: 'Hassan',
  title: 'Full-Stack Developer & Software Engineer',
  tagline: 'I design and build scalable, high-performance web applications using React, Node.js, Express, MongoDB, and modern engineering practices.',
  availableForWork: true,
  statusMessage: 'Building production-grade full-stack & AI applications...',
  yearsExperience: 1.3,
  projectsBuiltCount: 12,
  technologiesCount: 15,
  apisCreatedCount: 25,
  location: 'Colan Infotech | Aspirasys',
  githubUrl: 'https://github.com/hassan-dev',
  linkedinUrl: 'https://linkedin.com/in/hassan-dev',
  email: 'pmhassanurrahman@gmail.com',
  whatsappNumber: '8754938757',
  resumeUrl: '#resume',
};

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Missile Health',
    slug: 'missile-health',
    subtitle: 'Enterprise Healthcare Management & Diagnostic Suite',
    description: 'Full-stack healthcare platform featuring doctor scheduling, EHR medical record management, patient prescription tracking, and AI symptom analysis.',
    problemSolved: 'Replaced fragmented paper check-ins with an instant reactive MERN platform, reducing patient check-in wait times by 65%.',
    category: 'Full Stack',
    featured: true,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    technologies: ['React.js', 'Redux Toolkit', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'REST API', 'JWT'],
    githubUrl: 'https://github.com/hassan-dev/missile-health-platform',
    liveUrl: 'https://missile-health-demo.example.com',
    caseStudy: {
      problem: 'Healthcare providers faced severe latency in managing patient EHR records, cross-referencing prescriptions, and triaging urgent care visits.',
      solution: 'Architected a microservices-based MERN web application with Redux Toolkit for complex UI state management and Express REST API gateway with MongoDB index-optimized queries.',
      architecture: [
        'User Client Layer (React.js + Redux Toolkit)',
        'API Gateway (Express.js + Rate Limiter Middleware)',
        'Authentication Layer (JWT + HTTP-Only Cookie)',
        'Service Controllers (Patient, Doctor, Appointment, AI Triage)',
        'Database Layer (MongoDB Atlas + Mongoose Aggregations)'
      ],
      technicalChallenges: [
        'Handling simultaneous doctor slot reservation mutations without state race conditions.',
        'Optimizing heavy MongoDB search queries across 100,000+ patient EHR records.'
      ],
      performance: ['98/100 Lighthouse Performance score', 'Sub-120ms average API response time'],
      security: ['Strict JWT token rotation', 'Helmet security headers', 'XSS input sanitization'],
      results: ['65% decrease in check-in queue times', 'Triaged over 20,000 patient appointments in load testing']
    }
  },
  {
    id: 'p2',
    title: 'AI Healthcare Symptom Checker',
    slug: 'ai-symptom-checker',
    subtitle: 'Intelligent Medical Assistant & Triage API',
    description: 'AI-driven diagnostic service providing real-time symptom analysis, medical risk stratification, and patient triage recommendation workflows.',
    problemSolved: 'Empowers patients with instant health guidance while mitigating emergency room congestion through intelligent risk categorization.',
    category: 'AI',
    featured: true,
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Gemini API', 'Tailwind CSS'],
    githubUrl: 'https://github.com/hassan-dev/ai-symptom-checker-api',
    liveUrl: 'https://ai-symptom-checker-demo.example.com',
    caseStudy: {
      problem: 'Patients frequently struggle to evaluate symptom severity prior to consulting a medical practitioner.',
      solution: 'Integrated generative AI structured prompt engineering with Express validation middleware to return consistent clinical triage categories.',
      architecture: [
        'React Chat & Symptom Form UI',
        'Express AI Endpoint Controller',
        'Multi-stage Prompt Construction & Zod Validation',
        'MongoDB Log Audit Trail'
      ],
      technicalChallenges: ['Ensuring 100% structured JSON response compliance from generative AI model endpoints.'],
      performance: ['Real-time streaming responses under 800ms initial token latency'],
      security: ['Zero PHI storage without consent', 'API rate-limiting per user fingerprint'],
      results: ['Accurate triage alignment across 94% of standardized test scenarios']
    }
  },
  {
    id: 'p3',
    title: 'DevScale SaaS Analytics Engine',
    slug: 'devscale-saas-analytics',
    subtitle: 'High-Performance API & Metric Tracker',
    description: 'Developer metrics dashboard for monitoring REST API endpoints, response latencies, error distributions, and subscription usage.',
    problemSolved: 'Consolidates distributed backend logs into visual real-time analytics with customizable notification webhooks.',
    category: 'React',
    featured: true,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    technologies: ['React.js', 'Redux Toolkit', 'TypeScript', 'Node.js', 'Express', 'Tailwind CSS'],
    githubUrl: 'https://github.com/hassan-dev/devscale-saas-analytics',
    liveUrl: 'https://devscale-demo.example.com',
    caseStudy: {
      problem: 'Backend microservices lacked a unified client portal for tracking operational latency metrics.',
      solution: 'Built a lightweight SVG chart dashboard powered by Redux state caching and Express WebSockets.',
      architecture: ['React UI', 'Redux Toolkit Store', 'Express WebSocket & REST Server', 'MongoDB Time-series Data'],
      technicalChallenges: ['Rendering 60 FPS real-time graph updates without re-rendering parent components.'],
      performance: ['Zero dropped frames on 10,000 live data point renders'],
      security: ['Role-based access control (RBAC)', 'Session timeout enforcement'],
      results: ['Adopted by 12 internal backend services for real-time uptime verification']
    }
  },
  {
    id: 'p4',
    title: 'Nexus Microservices API Gateway',
    slug: 'nexus-api-gateway',
    subtitle: 'Scalable Express & MongoDB Gateway Service',
    description: 'Enterprise REST API gateway providing JWT bearer authentication, rate limiting, routing proxying, and centralized Morgan logging.',
    problemSolved: 'Standardizes security headers, token verification, and request logging across fragmented backend microservices.',
    category: 'Node.js',
    featured: false,
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'Redis', 'JWT', 'Docker'],
    githubUrl: 'https://github.com/hassan-dev/nexus-api-gateway',
    liveUrl: 'https://nexus-gateway-demo.example.com',
    caseStudy: {
      problem: 'Distributed API endpoints lacked uniform rate-limiting and audit logging headers.',
      solution: 'Implemented centralized Express middleware chaining with structured JSON error logging.',
      architecture: ['Express Gateway', 'JWT Middleware', 'Rate Limiter', 'MongoDB Logging'],
      technicalChallenges: ['Managing CORS headers safely for multi-origin SaaS integrations.'],
      performance: ['<5ms gateway routing latency overhead'],
      security: ['Helmet security header suite', 'XSS sanitization'],
      results: ['Blocked over 50,000 malicious rate-limit violation requests in automated security audits']
    }
  }
];

export const INITIAL_SKILLS: Skill[] = [
  // Frontend (Intermediate)
  { id: 's1', name: 'React.js', category: 'Frontend', level: 82, experienceYears: 1.3, description: 'Component state, custom hooks, Virtual DOM performance optimization, Redux integrations, and responsive UI building.', iconName: 'Atom', projectsUsing: ['Missile Health', 'AI Symptom Checker', 'DevScale Analytics'], relatedSkills: ['TypeScript', 'Redux Toolkit', 'JavaScript'], featured: true },
  { id: 's2', name: 'JavaScript (ES6+)', category: 'Frontend', level: 84, experienceYears: 1.3, description: 'Async/await promises, ES6 syntax, event loops, DOM manipulations, closures, and functional array methods.', iconName: 'Code', projectsUsing: ['All Projects'], relatedSkills: ['React.js', 'Node.js', 'TypeScript'], featured: true },
  { id: 's3', name: 'TypeScript', category: 'Frontend', level: 76, experienceYears: 1.0, description: 'Type interfaces, type safety in React props, API response interfaces, and strict build validation.', iconName: 'FileCode', projectsUsing: ['Missile Health', 'DevScale Analytics'], relatedSkills: ['React.js', 'JavaScript'], featured: true },
  { id: 's4', name: 'Tailwind CSS', category: 'Frontend', level: 85, experienceYears: 1.3, description: 'Utility-first CSS styling, flexbox/grid layouts, dark mode support, and responsive breakpoint design.', iconName: 'Palette', projectsUsing: ['Missile Health', 'AI Symptom Checker'], relatedSkills: ['CSS3', 'React.js'], featured: false },

  // Backend (Intermediate)
  { id: 's5', name: 'Node.js', category: 'Backend', level: 80, experienceYears: 1.3, description: 'Asynchronous event driven I/O, npm package management, file streams, and REST API server development.', iconName: 'Server', projectsUsing: ['Missile Health', 'AI Symptom Checker', 'Nexus Gateway'], relatedSkills: ['Express.js', 'MongoDB', 'REST APIs'], featured: true },
  { id: 's6', name: 'Express.js', category: 'Backend', level: 82, experienceYears: 1.3, description: 'Route versioning, custom middleware orchestration, JWT authentication, rate limiting, and central error handlers.', iconName: 'Cpu', projectsUsing: ['All Backend Services'], relatedSkills: ['Node.js', 'REST APIs', 'MongoDB'], featured: true },
  { id: 's7', name: 'REST APIs', category: 'Backend', level: 85, experienceYears: 1.3, description: 'HTTP method verbs, status codes, query pagination, payload validation, and client-server data exchange.', iconName: 'Globe', projectsUsing: ['All Projects'], relatedSkills: ['Express.js', 'Node.js', 'JSON'], featured: true },
  { id: 's8', name: 'GraphQL', category: 'Backend', level: 70, experienceYears: 0.8, description: 'GraphQL queries, schemas, mutations, and API integrations.', iconName: 'Share2', projectsUsing: ['Missile Health'], relatedSkills: ['Node.js', 'REST APIs'], featured: false },

  // Database (Intermediate)
  { id: 's9', name: 'MongoDB', category: 'Database', level: 78, experienceYears: 1.3, description: 'Document collection design, query indexing, MongoDB Atlas cloud deployment, and basic aggregations.', iconName: 'Database', projectsUsing: ['Missile Health', 'AI Symptom Checker', 'Nexus Gateway'], relatedSkills: ['Mongoose', 'Node.js', 'Express.js'], featured: true },
  { id: 's10', name: 'Mongoose', category: 'Database', level: 80, experienceYears: 1.3, description: 'Schema declarations, validation rules, model CRUD methods, populate references, and middleware hooks.', iconName: 'Layers', projectsUsing: ['Missile Health', 'AI Symptom Checker'], relatedSkills: ['MongoDB', 'Node.js'], featured: true },

  // State Management (Intermediate)
  { id: 's11', name: 'Redux Toolkit', category: 'State', level: 80, experienceYears: 1.0, description: 'createSlice state management, createAsyncThunk API requests, slice reducers, and global UI state synchronization.', iconName: 'Workflow', projectsUsing: ['Missile Health', 'DevScale Analytics'], relatedSkills: ['React.js', 'TypeScript', 'Context API'], featured: true },
  { id: 's12', name: 'Context API', category: 'State', level: 82, experienceYears: 1.3, description: 'Lightweight React context state management, theme state persistence, and auth context hooks.', iconName: 'ToggleLeft', projectsUsing: ['Portfolio UI', 'AI Symptom Checker'], relatedSkills: ['React.js', 'Redux Toolkit'], featured: false },

  // Tools & DevOps & AI (Intermediate)
  { id: 's13', name: 'Git & GitHub', category: 'Tools', level: 84, experienceYears: 1.3, description: 'Git branch management, pull requests, commit workflows, and version control collaboration.', iconName: 'GitBranch', projectsUsing: ['All Projects'], relatedSkills: ['VS Code', 'GitHub'], featured: true },
  { id: 's14', name: 'Docker', category: 'DevOps', level: 68, experienceYears: 0.8, description: 'Basic container configurations, dockerfiles, and container environment setups.', iconName: 'Box', projectsUsing: ['Nexus Gateway'], relatedSkills: ['Node.js', 'MongoDB'], featured: false },
  { id: 's15', name: 'AI Integration', category: 'AI', level: 75, experienceYears: 1.0, description: 'Generative AI REST endpoints integration, prompt formatting, and structured response parsing.', iconName: 'Sparkles', projectsUsing: ['AI Symptom Checker', 'Portfolio AI Assistant'], relatedSkills: ['Node.js', 'REST APIs'], featured: true },
];

export const INITIAL_EXPERIENCES: Experience[] = [
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

export const INITIAL_GITHUB_REPOS: GitHubRepo[] = [
  {
    id: 1,
    name: 'missile-health-platform',
    description: 'Enterprise healthcare management platform featuring patient records, doctor scheduling, prescription system, and AI symptom analysis.',
    html_url: 'https://github.com/hassan-dev/missile-health-platform',
    stargazers_count: 142,
    forks_count: 38,
    language: 'TypeScript',
    updated_at: '2026-08-28T14:22:00Z',
    topics: ['react', 'redux-toolkit', 'nodejs', 'express', 'mongodb', 'healthcare'],
  },
  {
    id: 2,
    name: 'ai-symptom-checker-api',
    description: 'AI-driven diagnostic REST microservice delivering structured medical triage recommendations using multi-stage LLM evaluation.',
    html_url: 'https://github.com/hassan-dev/ai-symptom-checker-api',
    stargazers_count: 98,
    forks_count: 24,
    language: 'JavaScript',
    updated_at: '2026-08-20T10:15:00Z',
    topics: ['nodejs', 'express', 'ai', 'gemini-api', 'rest-api'],
  },
  {
    id: 3,
    name: 'fullstack-clean-architecture',
    description: 'Production-ready full-stack boilerplate with JWT auth, rate limiting, MongoDB Mongoose models, and React state management.',
    html_url: 'https://github.com/hassan-dev/fullstack-clean-architecture',
    stargazers_count: 215,
    forks_count: 57,
    language: 'TypeScript',
    updated_at: '2026-08-15T18:00:00Z',
    topics: ['react', 'express', 'clean-architecture', 'redux-toolkit', 'security'],
  },
  {
    id: 4,
    name: 'redux-toolkit-query-starter',
    description: 'High-performance state management pattern demonstrating RTK Query caching, optimistic UI updates, and custom middleware.',
    html_url: 'https://github.com/hassan-dev/redux-toolkit-query-starter',
    stargazers_count: 76,
    forks_count: 19,
    language: 'TypeScript',
    updated_at: '2026-07-30T11:45:00Z',
    topics: ['react', 'redux-toolkit', 'rtk-query', 'state-management'],
  },
  {
    id: 5,
    name: 'express-rate-limiter-auth-kit',
    description: 'Robust authentication & rate-limiting middleware package supporting HTTP-Only cookies, JWT rotation, and RBAC.',
    html_url: 'https://github.com/hassan-dev/express-rate-limiter-auth-kit',
    stargazers_count: 112,
    forks_count: 31,
    language: 'JavaScript',
    updated_at: '2026-07-10T16:30:00Z',
    topics: ['express', 'security', 'jwt', 'middleware', 'rate-limit'],
  },
  {
    id: 6,
    name: 'developer-terminal-portfolio',
    description: 'Interactive CLI developer portfolio engine built with React, Framer Motion, and custom shell command parser.',
    html_url: 'https://github.com/hassan-dev/developer-terminal-portfolio',
    stargazers_count: 189,
    forks_count: 42,
    language: 'TypeScript',
    updated_at: '2026-09-01T09:00:00Z',
    topics: ['react', 'terminal', 'cli', 'portfolio', 'framer-motion'],
  }
];

export const ARCHITECTURE_LAYERS = [
  {
    id: 'layer-ui',
    title: '1. UI & Experience Layer',
    tech: 'React.js, TypeScript, Tailwind CSS, Framer Motion',
    details: 'Accessible WCAG compliance, responsive mobile layouts, dynamic glassmorphic design system, custom hooks, and memoized component renders.'
  },
  {
    id: 'layer-state',
    title: '2. State Management Layer',
    tech: 'Redux Toolkit, Context API, RTK Query',
    details: 'Normalized slices (auth, projects, skills, github, contact), optimistic UI updates, persistent theme storage, and automatic cache invalidation.'
  },
  {
    id: 'layer-api',
    title: '3. API & Middleware Layer',
    tech: 'Express.js, REST Architecture, Helmet, Rate Limiter',
    details: 'Versioned routes (/api/v1), CORS policy enforcement, Helmet security headers, rate limiting (100 req / 15 min), and Zod request payload validation.'
  },
  {
    id: 'layer-logic',
    title: '4. Business & Auth Logic Layer',
    tech: 'Node.js Controllers, JWT Authentication, Mailer & AI Services',
    details: 'Decoupled service controllers, JWT bearer token rotation, Nodemailer SMTP integrations, and structured generative AI prompt orchestration.'
  },
  {
    id: 'layer-db',
    title: '5. Database & Data Persistence Layer',
    tech: 'MongoDB, Mongoose ORM, Aggregation Indexing',
    details: 'Document schema validation, indexed query optimization, timestamp tracking, and resilient memory fallback handlers.'
  }
];
