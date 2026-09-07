import { Project } from '../models/Project.js';
import { isConnected } from '../config/db.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { ApiError } from '../utils/apiError.js';

const mockProjects = [
  {
    id: 'p1',
    title: 'Missile Health',
    slug: 'missile-health',
    subtitle: 'Enterprise Healthcare & Diagnostic Platform',
    description: 'Full-stack healthcare suite featuring real-time appointment triage, EHR doctor portal, patient prescription tracking, and AI symptom analysis.',
    problemSolved: 'Replaced legacy healthcare paperwork with a high-throughput reactive dashboard reducing patient check-in wait times by 65%.',
    category: 'Full Stack',
    featured: true,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    technologies: ['React.js', 'Redux Toolkit', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'REST API', 'JWT'],
    githubUrl: 'https://github.com/hassan-dev/missile-health-platform',
    liveUrl: 'https://missile-health-demo.example.com',
    caseStudy: {
      problem: 'Healthcare providers faced severe latency in managing patient records, cross-referencing prescriptions, and triaging initial symptom urgent care visits.',
      solution: 'Architected a microservices-based MERN web application with Redux Toolkit for complex UI cache invalidation and Express REST API gateway with MongoDB index-optimized queries.',
      architecture: [
        'User Client (React + Redux Toolkit)',
        'API Gateway (Express.js + Rate Limiter)',
        'Authentication Layer (JWT + HTTP-Only Cookie)',
        'Service Controllers (Patient, Doctor, Appointment, AI Triage)',
        'Database Layer (MongoDB + Mongoose Aggregations)'
      ],
      technicalChallenges: [
        'Handling simultaneous doctor schedule lock mutations without state race conditions.',
        'Optimizing heavy MongoDB search queries across 100,000+ patient EHR records.'
      ],
      performance: ['98/100 Lighthouse Performance score', 'Sub-120ms average API response time'],
      security: ['Strict JWT token rotation', 'Helmet headers', 'Input sanitizer middleware'],
      results: ['65% decrease in check-in queue times', 'Successfully triaged 20,000+ mock patient cases in load tests']
    }
  },
  {
    id: 'p2',
    title: 'AI Healthcare Symptom Checker',
    slug: 'ai-symptom-checker',
    subtitle: 'Intelligent Medical Assistant & Triage API',
    description: 'AI-driven diagnostic service providing real-time symptom analysis, medical risk stratification, and patient recommendation workflows.',
    problemSolved: 'Empowers users with instant initial health guidance while preventing emergency room overcrowding through intelligent risk categorization.',
    category: 'AI',
    featured: true,
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Gemini API', 'Tailwind CSS'],
    githubUrl: 'https://github.com/hassan-dev/ai-symptom-checker-api',
    liveUrl: 'https://ai-symptom-checker-demo.example.com',
    caseStudy: {
      problem: 'Patients frequently struggle to evaluate symptom severity prior to consulting a general practitioner.',
      solution: 'Integrated generative AI structured prompts with express validation middleware to return consistent clinical triage categories.',
      architecture: [
        'React Chat & Symptom Form UI',
        'Express AI Endpoint Controller',
        'Multi-stage Prompt Construction & Validation',
        'MongoDB Log Audit Trail'
      ],
      technicalChallenges: ['Ensuring 100% structured JSON response format from generative AI endpoints.'],
      performance: ['Real-time streaming responses under 800ms initial token latency'],
      security: ['No PHI storage without consent', 'API rate-limiting per user fingerprint'],
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
    technologies: ['React.js', 'Redux Toolkit', 'Chart.js', 'TypeScript', 'Node.js', 'Express'],
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
    description: 'Enterprise REST API gateway providing JWT bearer authentication, Redis rate limiting, routing proxying, and centralized Morgan logging.',
    problemSolved: 'Standardizes security headers, token verification, and request logging across fragmented backend services.',
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

export const getProjects = async (req, res, next) => {
  try {
    const { category } = req.query;
    let projects = mockProjects;

    if (isConnected) {
      const query = category && category !== 'All' ? { category } : {};
      projects = await Project.find(query).sort({ order: 1, createdAt: -1 });
    } else if (category && category !== 'All') {
      projects = mockProjects.filter(p => p.category === category);
    }

    return res.status(200).json(new ApiResponse(200, projects, 'Projects retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

export const getProjectBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    let project = mockProjects.find(p => p.slug === slug);

    if (isConnected) {
      project = await Project.findOne({ slug });
    }

    if (!project) {
      throw new ApiError(404, 'Project not found');
    }

    return res.status(200).json(new ApiResponse(200, project, 'Project details retrieved'));
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req, res, next) => {
  try {
    const newProj = { id: `p_${Date.now()}`, ...req.body };
    if (isConnected) {
      const created = await Project.create(req.body);
      return res.status(201).json(new ApiResponse(201, created, 'Project created in MongoDB'));
    }
    mockProjects.unshift(newProj);
    return res.status(201).json(new ApiResponse(201, newProj, 'Project created (in-memory)'));
  } catch (error) {
    next(error);
  }
};
