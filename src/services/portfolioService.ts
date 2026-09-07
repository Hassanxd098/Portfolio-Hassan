import { apiClient } from './apiClient';
import { Project, Skill, Experience, GitHubRepo, ContactFormData, UserAdmin } from '../types';

export const portfolioService = {
  getProjects: async (category?: string): Promise<Project[]> => {
    const url = category && category !== 'All' ? `/projects?category=${category}` : '/projects';
    const res: any = await apiClient.get(url);
    return res.data;
  },

  getProjectBySlug: async (slug: string): Promise<Project> => {
    const res: any = await apiClient.get(`/projects/${slug}`);
    return res.data;
  },

  getSkills: async (category?: string): Promise<Skill[]> => {
    const url = category && category !== 'All' ? `/skills?category=${category}` : '/skills';
    const res: any = await apiClient.get(url);
    return res.data;
  },

  getExperiences: async (): Promise<Experience[]> => {
    const res: any = await apiClient.get('/experience');
    return res.data;
  },

  getGitHubRepos: async (): Promise<GitHubRepo[]> => {
    const res: any = await apiClient.get('/github/repos');
    return res.data;
  },

  submitContact: async (formData: ContactFormData): Promise<{ message: string; success: boolean }> => {
    const res: any = await apiClient.post('/contact', formData);
    return res;
  },

  queryAiAssistant: async (query: string): Promise<{ answer: string; suggestedQuestions?: string[] }> => {
    const res: any = await apiClient.post('/ai/chat', { query });
    return res.data;
  },

  loginAdmin: async (credentials: { username: string; password: string }): Promise<{ user: UserAdmin; token: string }> => {
    const res: any = await apiClient.post('/auth/login', credentials);
    return res.data;
  }
};
