import { Router } from 'express';
import * as controller from '../controllers/tripSeatController';
import { validate } from '../config/joi.validate';
import { lockSeatSchema, releaseSeatSchema, updateTripSeatStatusSchema, listTripSeatSchema } from '../config/validation.schemas';
import authenticate from '../middlewares/authenticate';
import authorize from '../middlewares/authorize';

const router = Router();
const authenticated = [authenticate];
const manageSeats = [authenticate, authorize('admin', 'operator_staff')];

router.get('/',             validate(listTripSeatSchema, 'query'), controller.getAll);
router.get('/:id',          controller.getById);
router.post('/lock',        authenticated, validate(lockSeatSchema), controller.lockSeat);
router.post('/release',     authenticated, validate(releaseSeatSchema), controller.releaseSeat);
router.patch('/:id/status', manageSeats, validate(updateTripSeatStatusSchema), controller.updateStatus);

export default router;
