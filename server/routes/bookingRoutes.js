import { Router } from 'express';
import * as ctrl from '../controllers/bookingController';
import { validate } from '../config/joi.validate';
import { createBookingSchema, updateBookingStatusSchema, listBookingSchema } from '../config/validation.schemas';

const router = Router();

router.get('/',             validate(listBookingSchema, 'query'), ctrl.getAll);
router.get('/:id',          ctrl.getById);
router.post('/',            validate(createBookingSchema), ctrl.create);
router.patch('/:id/status', validate(updateBookingStatusSchema), ctrl.updateStatus);
router.delete('/:id',       ctrl.remove);

export default router;