import { Router } from 'express';
import { getRepos } from '../controllers/githubController.js';

const router = Router();

router.get('/repos', getRepos);

export default router;
