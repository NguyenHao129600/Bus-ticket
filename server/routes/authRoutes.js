import { Router } from 'express';
import * as controller from '../controllers/authController';
import { validate } from '../config/joi.validate';
import {
  loginOperatorStaffSchema,
  loginSchema,
  registerOperatorStaffSchema,
  registerSchema,
} from '../validators';
import authenticate from '../middlewares/authenticate';
import authorize from '../middlewares/authorize';

const router = Router();
const authenticateOperatorStaff = [authenticate, authorize('operator_staff')];

router.post('/register', validate(registerSchema), controller.register);
router.post('/login', validate(loginSchema), controller.login);
router.post(
  '/operator-staff/register',
  validate(registerOperatorStaffSchema),
  controller.registerOperatorStaff
);
router.post(
  '/operator-staff/login',
  validate(loginOperatorStaffSchema),
  controller.loginOperatorStaff
);
router.post('/operator-staff/logout', authenticateOperatorStaff, controller.logoutOperatorStaff);
router.get('/me', authenticate, controller.me);
router.get('/operator-staff/me', authenticateOperatorStaff, controller.meOperatorStaff);

export default router;
