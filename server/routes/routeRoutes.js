import { Router } from 'express';
import * as controller from '../controllers/routeController';
import { validate } from '../config/joi.validate';
import { createRouteSchema, updateRouteSchema, listRouteSchema } from '../config/validation.schemas';
import authenticate from '../middlewares/authenticate';
import authorize from '../middlewares/authorize';

const router = Router();
const manageRoutes = [authenticate, authorize('admin', 'operator_staff')];

router.get('/',    validate(listRouteSchema, 'query'), controller.getAll);
router.get('/:id', controller.getById);
router.post('/',   manageRoutes, validate(createRouteSchema), controller.create);
router.put('/:id', manageRoutes, validate(updateRouteSchema), controller.update);
router.delete('/:id', manageRoutes, controller.remove);

export default router;
