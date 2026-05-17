import { Router } from 'express';
import * as ctrl from '../controllers/tripEventController';
import { validate } from '../config/joi.validate';
import { createTripEventSchema, listTripEventSchema } from '../config/validation.schemas';

const router = Router();

router.get('/',    validate(listTripEventSchema, 'query'), ctrl.getAll);
router.get('/:id', ctrl.getById);
router.post('/',   validate(createTripEventSchema), ctrl.create);
router.delete('/:id', ctrl.remove);

export default router;