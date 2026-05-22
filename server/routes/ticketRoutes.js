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
<<<<<<< HEAD
router.get('/operator/trips/:trip_id', manageTickets, validate(listTicketSchema, 'query'), controller.getTripTickets);
=======
>>>>>>> 3280072fb40a74f0a1a6893a1725e6cea9f2671a
router.get('/code/:code',         authenticated, controller.getByCode);
router.get('/:id',                authenticated, controller.getById);
router.post('/',                  manageTickets, validate(createTicketSchema), controller.create);
router.patch('/:code/check-in',   manageTickets, controller.checkIn);
router.patch('/:code/cancel',     authenticated, controller.cancel);
<<<<<<< HEAD
router.patch('/operator/:code/cancel', manageTickets, controller.cancel);
=======
>>>>>>> 3280072fb40a74f0a1a6893a1725e6cea9f2671a

export default router;
