import { Router } from 'express';
import * as controller from '../controllers/operatorStaffController';
import { validate } from '../config/joi.validate';
import { createOperatorStaffSchema, updateOperatorStaffSchema, listOperatorStaffSchema } from '../validators';
import authenticate from '../middlewares/authenticate';
import authorize from '../middlewares/authorize';

const router = Router();
const manageStaff = [authenticate, authorize('admin', 'operator_staff')];

router.get('/',                  manageStaff, validate(listOperatorStaffSchema, 'query'), controller.getAll);
router.get('/by-user/:user_id',  manageStaff, controller.getByUserId);
router.get('/:id',               manageStaff, controller.getById);
router.post('/',                 manageStaff, validate(createOperatorStaffSchema), controller.create);
router.put('/:id',               manageStaff, validate(updateOperatorStaffSchema), controller.update);
router.delete('/:id',            manageStaff, controller.remove);

export default router;
