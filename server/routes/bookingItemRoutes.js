import { Router } from 'express';
import * as ctrl from '../controllers/bookingItemController';
import { validate } from '../config/joi.validate';
import { listBookingItemSchema } from '../config/validation.schemas';

const router = Router();

router.get('/',    validate(listBookingItemSchema, 'query'), ctrl.getAll);
router.get('/:id', ctrl.getById);
router.delete('/:id', ctrl.remove);

export default router;