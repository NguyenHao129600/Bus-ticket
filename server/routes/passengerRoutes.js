import { Router } from 'express';
import * as controller from '../controllers/passengerController';
import { validate } from '../config/joi.validate';
import { createPassengerSchema, updatePassengerSchema, listPassengerSchema } from '../validators';
import authenticate from '../middlewares/authenticate';
import authorize from '../middlewares/authorize';

const router = Router();
const authenticated = [authenticate];
const managePassengers = [authenticate, authorize('admin', 'operator_staff')];

router.get('/',    authenticated, validate(listPassengerSchema, 'query'), controller.getAll);
router.get('/operator/trips/:trip_id', managePassengers, controller.getByTripId);
router.get('/:id', authenticated, controller.getById);
router.post('/',   authenticated, validate(createPassengerSchema), controller.create);
router.put('/:id', authenticated, validate(updatePassengerSchema), controller.update);
router.delete('/:id', authenticated, controller.remove);

export default router;
