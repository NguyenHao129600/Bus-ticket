import { Router } from 'express';
import * as ctrl from '../controllers/routeController';
import { validate } from '../config/joi.validate';
import { createRouteSchema, updateRouteSchema, listRouteSchema } from '../config/validation.schemas';

const router = Router();

router.get('/',    validate(listRouteSchema, 'query'), ctrl.getAll);
router.get('/:id', ctrl.getById);
router.post('/',   validate(createRouteSchema), ctrl.create);
router.put('/:id', validate(updateRouteSchema), ctrl.update);
router.delete('/:id', ctrl.remove);

export default router;