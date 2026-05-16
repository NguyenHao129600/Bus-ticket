import { Router } from 'express';
import * as ctrl from '../controllers/tripSeatController';
import { validate } from '../config/joi.validate';
import { lockSeatSchema, releaseSeatSchema, updateTripSeatStatusSchema, listTripSeatSchema } from '../config/validation.schemas';

const router = Router();

router.get('/',             validate(listTripSeatSchema, 'query'), ctrl.getAll);
router.get('/:id',          ctrl.getById);
router.post('/lock',        validate(lockSeatSchema), ctrl.lockSeat);
router.post('/release',     validate(releaseSeatSchema), ctrl.releaseSeat);
router.patch('/:id/status', validate(updateTripSeatStatusSchema), ctrl.updateStatus);

export default router;