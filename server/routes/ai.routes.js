import { Router } from 'express';
import { queryAiAssistant } from '../controllers/aiController.js';

const router = Router();

router.post('/chat', queryAiAssistant);

export default router;
