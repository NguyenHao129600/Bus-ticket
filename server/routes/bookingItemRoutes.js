import { Router } from 'express';
import * as controller from '../controllers/bookingItemController';
import { validate } from '../config/joi.validate';
import { listBookingItemSchema } from '../config/validation.schemas';
import authenticate from '../middlewares/authenticate';
import authorize from '../middlewares/authorize';

const router = Router();
const manageBookingItems = [authenticate, authorize('admin', 'operator_staff')];

router.get('/',    manageBookingItems, validate(listBookingItemSchema, 'query'), controller.getAll);
router.get('/:id', manageBookingItems, controller.getById);
router.delete('/:id', manageBookingItems, controller.remove);

export default router;
