import { Router } from 'express';
import * as ctrl from '../controllers/ticketController';
import { validate } from '../config/joi.validate';
import { createTicketSchema, listTicketSchema } from '../config/validation.schemas';

const router = Router();

router.get('/',                   validate(listTicketSchema, 'query'), ctrl.getAll);
router.get('/:id',                ctrl.getById);
router.get('/code/:code',         ctrl.getByCode);
router.post('/',                  validate(createTicketSchema), ctrl.create);
router.patch('/:code/check-in',   ctrl.checkIn);
router.patch('/:code/cancel',     ctrl.cancel);

export default router;