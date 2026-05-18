import { Router } from 'express';
import * as controller from '../controllers/authController';
import { validate } from '../config/joi.validate';
import { loginSchema, registerSchema } from '../config/validation.schemas';
import authenticate from '../middlewares/authenticate';

const router = Router();

router.post('/register', validate(registerSchema), controller.register);
router.post('/login', validate(loginSchema), controller.login);
router.get('/me', authenticate, controller.me);

export default router;
