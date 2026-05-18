import { Router } from 'express';
import * as ctrl from '../controllers/refundController';
import { validate } from '../config/joi.validate';
import { createRefundSchema, updateRefundStatusSchema, listRefundSchema } from '../config/validation.schemas';

const router = Router();

router.get('/',           validate(listRefundSchema, 'query'), ctrl.getAll);
router.get('/:id',        ctrl.getById);
router.post('/',          validate(createRefundSchema), ctrl.create);
router.patch('/:id/status', validate(updateRefundStatusSchema), ctrl.updateStatus);
router.delete('/:id',     ctrl.remove);

export default router;