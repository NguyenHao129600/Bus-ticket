import { Router } from 'express';
import * as controller from '../controllers/stationController';
import { validate } from '../config/joi.validate';
import { createStationSchema, updateStationSchema, listStationSchema } from '../config/validation.schemas';
import authenticate from '../middlewares/authenticate';
import authorize from '../middlewares/authorize';

const router = Router();
const manageStations = [authenticate, authorize('admin', 'operator_staff')];

router.get('/provinces', controller.getProvinces);
router.get('/',          validate(listStationSchema, 'query'), controller.getAll);
router.get('/:id',       controller.getById);
router.post('/',         manageStations, validate(createStationSchema), controller.create);
router.put('/:id',       manageStations, validate(updateStationSchema), controller.update);
router.delete('/:id',    manageStations, controller.remove);

export default router;
