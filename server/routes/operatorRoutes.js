import { Router } from 'express';
import * as ctrl from '../controllers/operatorController';
import { validate } from '../config/joi.validate';
import { createOperatorSchema, updateOperatorSchema, listOperatorSchema } from '../config/validation.schemas';

const router = Router();

router.get('/',    validate(listOperatorSchema, 'query'), ctrl.getAll);
router.get('/:id', ctrl.getById);
router.post('/',   validate(createOperatorSchema), ctrl.create);
router.put('/:id', validate(updateOperatorSchema), ctrl.update);
router.delete('/:id', ctrl.remove);

export default router;