import { Router } from 'express';
import * as ctrl from '../controllers/stationController';
import { validate } from '../config/joi.validate';
import { createStationSchema, updateStationSchema, listStationSchema } from '../config/validation.schemas';

const router = Router();

router.get('/provinces', ctrl.getProvinces);
router.get('/',          validate(listStationSchema, 'query'), ctrl.getAll);
router.get('/:id',       ctrl.getById);
router.post('/',         validate(createStationSchema), ctrl.create);
router.put('/:id',       validate(updateStationSchema), ctrl.update);
router.delete('/:id',    ctrl.remove);

export default router;