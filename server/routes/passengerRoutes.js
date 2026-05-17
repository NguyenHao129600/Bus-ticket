import { Router } from 'express';
import * as ctrl from '../controllers/passengerController';
import { validate } from '../config/joi.validate';
import { createPassengerSchema, updatePassengerSchema, listPassengerSchema } from '../config/validation.schemas';

const router = Router();

router.get('/',    validate(listPassengerSchema, 'query'), ctrl.getAll);
router.get('/:id', ctrl.getById);
router.post('/',   validate(createPassengerSchema), ctrl.create);
router.put('/:id', validate(updatePassengerSchema), ctrl.update);
router.delete('/:id', ctrl.remove);

export default router;