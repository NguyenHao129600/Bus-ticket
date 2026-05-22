import { Router } from 'express';
import * as controller from '../controllers/reviewController';
import { validate } from '../config/joi.validate';
import { createReviewSchema, updateReviewSchema, listReviewSchema } from '../validators';
import authenticate from '../middlewares/authenticate';

const router = Router();
const authenticated = [authenticate];

router.get('/',                          validate(listReviewSchema, 'query'), controller.getAll);
router.get('/operator/:operator_id/stats', controller.getOperatorStats);
router.get('/:id',                       controller.getById);
router.post('/',                         authenticated, validate(createReviewSchema), controller.create);
router.put('/:id',                       authenticated, validate(updateReviewSchema), controller.update);
router.delete('/:id',                    authenticated, controller.remove);

export default router;
