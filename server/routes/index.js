import { Router } from 'express';
import authRoutes from './auth.routes.js';
import projectRoutes from './project.routes.js';
import skillRoutes from './skill.routes.js';
import experienceRoutes from './experience.routes.js';
import contactRoutes from './contact.routes.js';
import githubRoutes from './github.routes.js';
import aiRoutes from './ai.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);
router.use('/skills', skillRoutes);
router.use('/experience', experienceRoutes);
router.use('/contact', contactRoutes);
router.use('/github', githubRoutes);
router.use('/ai', aiRoutes);

router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'Hassan Portfolio REST API v1',
  });
});

export default router;
