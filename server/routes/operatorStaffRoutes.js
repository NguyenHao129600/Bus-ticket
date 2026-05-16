import { Router } from 'express';
import * as ctrl from '../controllers/operatorStaffController';
import { validate } from '../config/joi.validate';
import { createOperatorStaffSchema, updateOperatorStaffSchema, listOperatorStaffSchema } from '../config/validation.schemas';

const router = Router();

router.get('/',                  validate(listOperatorStaffSchema, 'query'), ctrl.getAll);
router.get('/by-user/:user_id',  ctrl.getByUserId);
router.get('/:id',               ctrl.getById);
router.post('/',                 validate(createOperatorStaffSchema), ctrl.create);
router.put('/:id',               validate(updateOperatorStaffSchema), ctrl.update);
router.delete('/:id',            ctrl.remove);

export default router;