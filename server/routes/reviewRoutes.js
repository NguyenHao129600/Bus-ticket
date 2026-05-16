import { Router } from 'express';
import * as ctrl from '../controllers/reviewController';
import { validate } from '../config/joi.validate';
import { createReviewSchema, updateReviewSchema, listReviewSchema } from '../config/validation.schemas';

const router = Router();

router.get('/',                          validate(listReviewSchema, 'query'), ctrl.getAll);
router.get('/operator/:operator_id/stats', ctrl.getOperatorStats);
router.get('/:id',                       ctrl.getById);
router.post('/',                         validate(createReviewSchema), ctrl.create);
router.put('/:id',                       validate(updateReviewSchema), ctrl.update);
router.delete('/:id',                    ctrl.remove);

export default router;