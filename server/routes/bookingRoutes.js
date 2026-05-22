import { Router } from 'express';
import * as controller from '../controllers/bookingController';
import { validate } from '../config/joi.validate';
import { createBookingSchema, updateBookingStatusSchema, listBookingSchema } from '../validators';
import authenticate from '../middlewares/authenticate';
import authorize from '../middlewares/authorize';

const router = Router();
const authenticated = [authenticate];
const manageBookings = [authenticate, authorize('admin', 'operator_staff')];

router.get('/',             manageBookings, validate(listBookingSchema, 'query'), controller.getAll);
router.get('/operator/trips/:trip_id', manageBookings, validate(listBookingSchema, 'query'), controller.getByTripId);
router.get('/:id',          authenticated, controller.getById);
router.post('/',            authenticated, validate(createBookingSchema), controller.create);
router.patch('/:id/status', manageBookings, validate(updateBookingStatusSchema), controller.updateStatus);
router.delete('/:id',       manageBookings, controller.remove);

export default router;
