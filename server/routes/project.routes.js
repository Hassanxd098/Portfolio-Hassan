import { Router } from 'express';
import { getProjects, getProjectBySlug, createProject } from '../controllers/projectController.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', getProjects);
router.get('/:slug', getProjectBySlug);
router.post('/', verifyJWT, createProject);

export default router;
