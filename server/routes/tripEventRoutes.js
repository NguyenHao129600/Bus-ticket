import { Router } from 'express';
import * as controller from '../controllers/tripEventController';
import { validate } from '../config/joi.validate';
import { createTripEventSchema, listTripEventSchema } from '../validators';
import authenticate from '../middlewares/authenticate';
import authorize from '../middlewares/authorize';

const router = Router();
const manageTripEvents = [authenticate, authorize('admin', 'operator_staff')];

router.get('/',    validate(listTripEventSchema, 'query'), controller.getAll);
router.get('/:id', controller.getById);
router.post('/',   manageTripEvents, validate(createTripEventSchema), controller.create);
router.delete('/:id', manageTripEvents, controller.remove);

export default router;
