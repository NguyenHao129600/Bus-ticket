import { Router } from 'express';
import * as ctrl from '../controllers/paymentController';
import { validate } from '../config/joi.validate';
import { createPaymentSchema, updatePaymentStatusSchema, listPaymentSchema } from '../validators';
import authenticate from '../middlewares/authenticate';
import authorize from '../middlewares/authorize';

const router = Router();
const managePayments = [authenticate, authorize('admin', 'operator_staff')];

router.get('/',                        managePayments, validate(listPaymentSchema, 'query'), ctrl.getAll);
router.get('/booking/:booking_id',     managePayments, ctrl.getByBooking);
router.get('/operator/trips/:trip_id', managePayments, validate(listPaymentSchema, 'query'), ctrl.getByTrip);
router.get('/:id',                     managePayments, ctrl.getById);
router.post('/',                       managePayments, validate(createPaymentSchema), ctrl.create);
router.patch('/:id/status',            managePayments, validate(updatePaymentStatusSchema), ctrl.updateStatus);
router.delete('/:id',                  managePayments, ctrl.remove);

export default router;
