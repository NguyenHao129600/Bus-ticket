import { Router } from 'express';
import * as ctrl from '../controllers/refundController';
import { validate } from '../config/joi.validate';
import { createRefundSchema, updateRefundStatusSchema, listRefundSchema } from '../validators';
<<<<<<< HEAD
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
=======

const router = Router();

router.get('/',           validate(listRefundSchema, 'query'), ctrl.getAll);
router.get('/:id',        ctrl.getById);
router.post('/',          validate(createRefundSchema), ctrl.create);
router.patch('/:id/status', validate(updateRefundStatusSchema), ctrl.updateStatus);
router.delete('/:id',     ctrl.remove);

export default router;
>>>>>>> 3280072fb40a74f0a1a6893a1725e6cea9f2671a
