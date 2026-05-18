import { Router } from 'express';
import * as controller from '../controllers/userController';
import { validate } from '../config/joi.validate';
import { createUserSchema, updateUserSchema, updatePasswordSchema, listUserSchema } from '../validators';
import authenticate from '../middlewares/authenticate';
import authorize from '../middlewares/authorize';

const router = Router();
const adminOnly = [authenticate, authorize('admin')];

router.get('/',                adminOnly, validate(listUserSchema, 'query'), controller.getAll);
router.get('/:id',             adminOnly, controller.getById);
router.post('/',               adminOnly, validate(createUserSchema), controller.create);
router.put('/:id',             adminOnly, validate(updateUserSchema), controller.update);
router.patch('/:id/password',  adminOnly, validate(updatePasswordSchema), controller.updatePassword);
router.delete('/:id',          adminOnly, controller.remove);

export default router;
