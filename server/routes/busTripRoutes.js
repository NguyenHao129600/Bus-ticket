import { Router } from 'express';
import * as controller from '../controllers/busTripController';
import { validate } from '../config/joi.validate';
import { createBusTripSchema, updateBusTripSchema, updateTripStatusSchema, listBusTripSchema } from '../validators';
import authenticate from '../middlewares/authenticate';
import authorize from '../middlewares/authorize';

const router = Router();
const manageTrips = [authenticate, authorize('admin', 'operator_staff')];

router.get('/',           validate(listBusTripSchema, 'query'), controller.getAll);
router.get('/:id',        controller.getById);
router.post('/',          manageTrips, validate(createBusTripSchema), controller.create);
router.put('/:id',        manageTrips, validate(updateBusTripSchema), controller.update);
router.patch('/:id/status', manageTrips, validate(updateTripStatusSchema), controller.updateStatus);
router.delete('/:id',     manageTrips, controller.remove);

export default router;
