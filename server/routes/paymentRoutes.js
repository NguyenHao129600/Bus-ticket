import { Router } from 'express';
import * as ctrl from '../controllers/paymentController';
import { validate } from '../config/joi.validate';
import { createPaymentSchema, updatePaymentStatusSchema, listPaymentSchema } from '../config/validation.schemas';

const router = Router();

router.get('/',                        validate(listPaymentSchema, 'query'), ctrl.getAll);
router.get('/booking/:booking_id',     ctrl.getByBooking);
router.get('/:id',                     ctrl.getById);
router.post('/',                       validate(createPaymentSchema), ctrl.create);
router.patch('/:id/status',            validate(updatePaymentStatusSchema), ctrl.updateStatus);
router.delete('/:id',                  ctrl.remove);

export default router;