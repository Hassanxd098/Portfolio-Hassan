import { Router } from 'express';
import { loginAdmin, getMe } from '../controllers/authController.js';
import { validate } from '../middleware/validate.middleware.js';
import { loginSchema } from '../validators/auth.validator.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/login', validate(loginSchema), loginAdmin);
router.get('/me', verifyJWT, getMe);

export default router;
