import { Router } from 'express';
import authRoutes          from './authRoutes';
import userRoutes          from './userRoutes';
import operatorRoutes      from './operatorRoutes';
import operatorStaffRoutes from './operatorStaffRoutes';
import stationRoutes       from './stationRoutes';
import routeRoutes         from './routeRoutes';
import busRoutes           from './busRoutes';
import reviewRoutes        from './reviewRoutes';
import busTripRoutes       from './busTripRoutes';
import tripSeatRoutes      from './tripSeatRoutes';
import tripEventRoutes     from './tripEventRoutes';
import bookingRoutes       from './bookingRoutes';
import bookingItemRoutes   from './bookingItemRoutes';
import passengerRoutes     from './passengerRoutes';
import ticketRoutes        from './ticketRoutes';

const router = Router();

router.use('/auth',            authRoutes);
router.use('/users',           userRoutes);
router.use('/operators',       operatorRoutes);
router.use('/operator-staffs', operatorStaffRoutes);
router.use('/stations',        stationRoutes);
router.use('/routes',          routeRoutes);
router.use('/buses',           busRoutes);
router.use('/reviews',         reviewRoutes);
router.use('/bus-trips',       busTripRoutes);
router.use('/trip-seats',      tripSeatRoutes);
router.use('/trip-events',     tripEventRoutes);
router.use('/bookings',        bookingRoutes);
router.use('/booking-items',   bookingItemRoutes);
router.use('/passengers',      passengerRoutes);
router.use('/tickets',         ticketRoutes);

export default router;
