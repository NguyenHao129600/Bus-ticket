import { Router } from 'express';
import * as controller from '../controllers/busController';
import { validate } from '../config/joi.validate';
import {
  createBusSchema, updateBusSchema, listBusSchema,
  createBusSeatSchema, updateBusSeatSchema, bulkCreateBusSeatSchema,
} from '../validators';
import authenticate from '../middlewares/authenticate';
import authorize from '../middlewares/authorize';

const router = Router();
const manageBuses = [authenticate, authorize('admin', 'operator_staff')];

// Bus CRUD
router.get('/',    validate(listBusSchema, 'query'), controller.getAll);
router.get('/:id', controller.getById);
router.post('/',   manageBuses, validate(createBusSchema), controller.create);
router.put('/:id', manageBuses, validate(updateBusSchema), controller.update);
router.delete('/:id', manageBuses, controller.remove);

// Bus Seats (nested)
router.get('/:id/seats',            controller.getSeats);
router.post('/:id/seats',           manageBuses, validate(createBusSeatSchema), controller.createSeat);
router.post('/:id/seats/bulk',      manageBuses, validate(bulkCreateBusSeatSchema), controller.bulkCreateSeats);
router.put('/:id/seats/:seat_id',   manageBuses, validate(updateBusSeatSchema), controller.updateSeat);
router.delete('/:id/seats/:seat_id', manageBuses, controller.deleteSeat);

export default router;
