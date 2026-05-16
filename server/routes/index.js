import { Router } from 'express';
import userRoutes          from './userRoutes';
import operatorStaffRoutes from './operatorStaffRoutes';
import reviewRoutes        from './reviewRoutes';
import busTripRoutes       from './busTripRoutes';
import tripSeatRoutes      from './tripSeatRoutes';
import tripEventRoutes     from './tripEventRoutes';
import bookingRoutes       from './bookingRoutes';

const router = Router();

router.use('/users',           userRoutes);
router.use('/operator-staffs', operatorStaffRoutes);
router.use('/reviews',         reviewRoutes);
router.use('/bus-trips',       busTripRoutes);
router.use('/trip-seats',      tripSeatRoutes);
router.use('/trip-events',     tripEventRoutes);
router.use('/bookings',        bookingRoutes);

export default router;