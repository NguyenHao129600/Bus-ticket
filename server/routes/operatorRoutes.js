import { Router } from 'express';
import * as controller from '../controllers/operatorController';
import { validate } from '../config/joi.validate';
import { createOperatorSchema, updateOperatorSchema, listOperatorSchema } from '../config/validation.schemas';
import authenticate from '../middlewares/authenticate';
import authorize from '../middlewares/authorize';

const router = Router();
const manageOperators = [authenticate, authorize('admin')];

router.get('/',    validate(listOperatorSchema, 'query'), controller.getAll);
router.get('/:id', controller.getById);
router.post('/',   manageOperators, validate(createOperatorSchema), controller.create);
router.put('/:id', manageOperators, validate(updateOperatorSchema), controller.update);
router.delete('/:id', manageOperators, controller.remove);

export default router;
