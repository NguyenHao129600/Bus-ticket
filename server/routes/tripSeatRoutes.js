import { Router } from 'express';
import * as controller from '../controllers/tripSeatController';
import { validate } from '../config/joi.validate';
<<<<<<< HEAD
import {
  lockSeatSchema,
  operatorLockSeatSchema,
  releaseSeatSchema,
  updateTripSeatStatusSchema,
  listTripSeatSchema,
} from '../validators';
=======
import { lockSeatSchema, releaseSeatSchema, updateTripSeatStatusSchema, listTripSeatSchema } from '../validators';
>>>>>>> 3280072fb40a74f0a1a6893a1725e6cea9f2671a
import authenticate from '../middlewares/authenticate';
import authorize from '../middlewares/authorize';

const router = Router();
const authenticated = [authenticate];
const manageSeats = [authenticate, authorize('admin', 'operator_staff')];

router.get('/',             validate(listTripSeatSchema, 'query'), controller.getAll);
<<<<<<< HEAD
router.get('/operator/trips/:trip_id/available', manageSeats, controller.getAvailableSeatsByTrip);
router.get('/operator/trips/:trip_id/booked',    manageSeats, controller.getBookedSeatsByTrip);
router.post('/operator/:id/lock',                manageSeats, validate(operatorLockSeatSchema), controller.operatorLockSeat);
router.post('/operator/:id/release',             manageSeats, controller.operatorReleaseSeat);
=======
>>>>>>> 3280072fb40a74f0a1a6893a1725e6cea9f2671a
router.get('/:id',          controller.getById);
router.post('/lock',        authenticated, validate(lockSeatSchema), controller.lockSeat);
router.post('/release',     authenticated, validate(releaseSeatSchema), controller.releaseSeat);
router.patch('/:id/status', manageSeats, validate(updateTripSeatStatusSchema), controller.updateStatus);

export default router;
