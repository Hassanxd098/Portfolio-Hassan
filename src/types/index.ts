export type ThemeMode = 'dark' | 'light';

export interface ProjectCaseStudy {
  problem: string;
  solution: string;
  architecture: string[];
  technicalChallenges: string[];
  performance: string[];
  security: string[];
  results: string[];
}

export interface Project {
  id: string;
  title: string;
  slug?: string;
  subtitle: string;
  description: string;
  problemSolved?: string;
  category: string;
  featured: boolean;
  year?: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  github?: string;
  live?: string;
  metrics?: {
    lighthouse?: string;
    latency?: string;
    impact?: string;
    [key: string]: any;
  };
  caseStudy?: ProjectCaseStudy;
}

export interface Skill {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'State' | 'DevOps' | 'Tools' | 'AI';
  level: number; // 0 - 100
  experienceYears: number;
  description: string;
  iconName: string;
  projectsUsing: string[];
  relatedSkills: string[];
  featured?: boolean;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  isCurrent: boolean;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
  topics: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface AiChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  suggestedQuestions?: string[];
}

export interface UserAdmin {
  username: string;
  role: string;
  token?: string;
}
