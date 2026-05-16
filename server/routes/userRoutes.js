import { Router } from 'express';
import * as ctrl from '../controllers/userController';
import { validate } from '../config/joi.validate';
import { createUserSchema, updateUserSchema, updatePasswordSchema, listUserSchema } from '../config/validation.schemas';

const router = Router();

router.get('/',                validate(listUserSchema, 'query'), ctrl.getAll);
router.get('/:id',             ctrl.getById);
router.post('/',               validate(createUserSchema), ctrl.create);
router.put('/:id',             validate(updateUserSchema), ctrl.update);
router.patch('/:id/password',  validate(updatePasswordSchema), ctrl.updatePassword);
router.delete('/:id',          ctrl.remove);

export default router;