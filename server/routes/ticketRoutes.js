import { Router } from 'express';
import * as controller from '../controllers/ticketController';
import { validate } from '../config/joi.validate';
import { createTicketSchema, listTicketSchema } from '../validators';
import authenticate from '../middlewares/authenticate';
import authorize from '../middlewares/authorize';

const router = Router();
const authenticated = [authenticate];
const manageTickets = [authenticate, authorize('admin', 'operator_staff')];

router.get('/',                   manageTickets, validate(listTicketSchema, 'query'), controller.getAll);
router.get('/code/:code',         authenticated, controller.getByCode);
router.get('/:id',                authenticated, controller.getById);
router.post('/',                  manageTickets, validate(createTicketSchema), controller.create);
router.patch('/:code/check-in',   manageTickets, controller.checkIn);
router.patch('/:code/cancel',     authenticated, controller.cancel);

export default router;
