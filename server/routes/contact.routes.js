import { Router } from 'express';
import { submitContactMessage, getMessages } from '../controllers/contactController.js';
import { validate } from '../middleware/validate.middleware.js';
import { contactSchema } from '../validators/contact.validator.js';
import { contactLimiter } from '../middleware/rateLimiter.middleware.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/', contactLimiter, validate(contactSchema), submitContactMessage);
router.get('/', verifyJWT, getMessages);

export default router;
