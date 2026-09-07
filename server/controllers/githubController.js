import { getGitHubRepos } from '../services/github.service.js';
import { ApiResponse } from '../utils/apiResponse.js';

export const getRepos = async (req, res, next) => {
  try {
    const repos = await getGitHubRepos();
    return res.status(200).json(new ApiResponse(200, repos, 'GitHub repositories retrieved successfully'));
  } catch (error) {
    next(error);
  }
};
