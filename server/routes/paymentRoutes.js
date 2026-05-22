import { Router } from 'express';
import * as ctrl from '../controllers/paymentController';
import { validate } from '../config/joi.validate';
import { createPaymentSchema, updatePaymentStatusSchema, listPaymentSchema } from '../validators';
<<<<<<< HEAD
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
=======

const router = Router();

router.get('/',                        validate(listPaymentSchema, 'query'), ctrl.getAll);
router.get('/booking/:booking_id',     ctrl.getByBooking);
router.get('/:id',                     ctrl.getById);
router.post('/',                       validate(createPaymentSchema), ctrl.create);
router.patch('/:id/status',            validate(updatePaymentStatusSchema), ctrl.updateStatus);
router.delete('/:id',                  ctrl.remove);

export default router;
>>>>>>> 3280072fb40a74f0a1a6893a1725e6cea9f2671a
