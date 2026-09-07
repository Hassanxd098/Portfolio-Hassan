import axios from 'axios';
import { config } from '../config/env.js';
import { logger } from '../utils/logger.js';

const mockRepos = [
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

export const getGitHubRepos = async () => {
  if (!config.GITHUB_USERNAME) {
    return mockRepos;
  }
  try {
    const headers = {};
    if (config.GITHUB_TOKEN) {
      headers.Authorization = `token ${config.GITHUB_TOKEN}`;
    }
    const response = await axios.get(
      `https://api.github.com/users/${config.GITHUB_USERNAME}/repos?sort=updated&per_page=12`,
      { headers, timeout: 5000 }
    );
    return response.data.map(repo => ({
      id: repo.id,
      name: repo.name,
      description: repo.description || 'No description provided.',
      html_url: repo.html_url,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      language: repo.language || 'JavaScript',
      updated_at: repo.updated_at,
      topics: repo.topics || [],
    }));
  } catch (err) {
    logger.warn(`GitHub API request failed (${err.message}). Using static repositories.`);
    return mockRepos;
  }
};
