import { Router } from 'express';
import * as ctrl from '../controllers/busController';
import { validate } from '../config/joi.validate';
import {
  createBusSchema, updateBusSchema, listBusSchema,
  createBusSeatSchema, updateBusSeatSchema, bulkCreateBusSeatSchema,
} from '../config/validation.schemas';

const router = Router();

// Bus CRUD
router.get('/',    validate(listBusSchema, 'query'), ctrl.getAll);
router.get('/:id', ctrl.getById);
router.post('/',   validate(createBusSchema), ctrl.create);
router.put('/:id', validate(updateBusSchema), ctrl.update);
router.delete('/:id', ctrl.remove);

// Bus Seats (nested)
router.get('/:id/seats',            ctrl.getSeats);
router.post('/:id/seats',           validate(createBusSeatSchema), ctrl.createSeat);
router.post('/:id/seats/bulk',      validate(bulkCreateBusSeatSchema), ctrl.bulkCreateSeats);
router.put('/:id/seats/:seat_id',   validate(updateBusSeatSchema), ctrl.updateSeat);
router.delete('/:id/seats/:seat_id', ctrl.deleteSeat);

export default router;