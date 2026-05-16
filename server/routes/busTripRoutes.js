import { Router } from 'express';
import * as ctrl from '../controllers/busTripController';
import { validate } from '../config/joi.validate';
import { createBusTripSchema, updateBusTripSchema, updateTripStatusSchema, listBusTripSchema } from '../config/validation.schemas';

const router = Router();

router.get('/',           validate(listBusTripSchema, 'query'), ctrl.getAll);
router.get('/:id',        ctrl.getById);
router.post('/',          validate(createBusTripSchema), ctrl.create);
router.put('/:id',        validate(updateBusTripSchema), ctrl.update);
router.patch('/:id/status', validate(updateTripStatusSchema), ctrl.updateStatus);
router.delete('/:id',     ctrl.remove);

export default router;