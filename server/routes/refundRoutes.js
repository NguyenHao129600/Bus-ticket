import { Router } from 'express';
import * as ctrl from '../controllers/refundController';
import { validate } from '../config/joi.validate';
import { createRefundSchema, updateRefundStatusSchema, listRefundSchema } from '../validators';
import authenticate from '../middlewares/authenticate';
import authorize from '../middlewares/authorize';

const router = Router();
const manageRefunds = [authenticate, authorize('admin', 'operator_staff')];

router.get('/',                     manageRefunds, validate(listRefundSchema, 'query'), ctrl.getAll);
router.get('/operator/trips/:trip_id', manageRefunds, validate(listRefundSchema, 'query'), ctrl.getByTrip);
router.get('/:id',                  manageRefunds, ctrl.getById);
router.post('/',                    manageRefunds, validate(createRefundSchema), ctrl.create);
router.patch('/:id/status',         manageRefunds, validate(updateRefundStatusSchema), ctrl.updateStatus);
router.delete('/:id',               manageRefunds, ctrl.remove);

export default router;
