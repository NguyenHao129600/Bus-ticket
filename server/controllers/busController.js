import BusModel from '../models/busModel';
import BusSeatModel from '../models/busSeatModel';
import AppError from '../utils/AppError';

const isOperatorStaff = (user) => user && user.role === 'operator_staff';

const ensureOperatorScope = (req, operatorId) => {
  if (isOperatorStaff(req.user) && Number(operatorId) !== Number(req.user.operator_id)) {
    throw new AppError('You can only manage buses of your own operator', 403);
  }
};

const ensureBusScope = (req, bus) => {
  if (!bus) {
    return;
  }

  ensureOperatorScope(req, bus.operator_id);
};

export const getAll = async (req, res, next) => {
  try {
    const { page, limit, operator_id, search } = req.query;
    const scopedOperatorId = isOperatorStaff(req.user) ? req.user.operator_id : operator_id;
    if (operator_id) {
      ensureOperatorScope(req, operator_id);
    }
    const result = await BusModel.getAll({ page, limit, operator_id: scopedOperatorId, search });
    return res.json({ success: true, ...result });
  } catch (err) { next(err); }
};

export const getById = async (req, res, next) => {
  try {
    const bus = await BusModel.getById(req.params.id);
    if (!bus) return res.status(404).json({ success: false, message: 'Bus not found' });
    // Kèm danh sách ghế
    const seats = await BusSeatModel.getAll({ bus_id: req.params.id });
    return res.json({ success: true, data: { ...bus, seats } });
  } catch (err) { next(err); }
};

export const create = async (req, res, next) => {
  try {
    const { operator_id, license_plate, total_seats } = req.body;
    const scopedOperatorId = isOperatorStaff(req.user) ? req.user.operator_id : operator_id;

    ensureOperatorScope(req, scopedOperatorId);

    const existing = await BusModel.getByLicensePlate(license_plate);
    if (existing) return res.status(409).json({ success: false, message: 'License plate already exists' });

    const id = await BusModel.create({ operator_id: scopedOperatorId, license_plate, total_seats });
    const bus = await BusModel.getById(id);
    return res.status(201).json({ success: true, data: bus });
  } catch (err) { next(err); }
};

export const update = async (req, res, next) => {
  try {
    const { license_plate, total_seats } = req.body;
    const currentBus = await BusModel.getById(req.params.id);
    if (!currentBus) return res.status(404).json({ success: false, message: 'Bus not found' });
    ensureBusScope(req, currentBus);

    if (license_plate) {
      const existing = await BusModel.getByLicensePlate(license_plate);
      if (existing && existing.id !== Number(req.params.id)) {
        return res.status(409).json({ success: false, message: 'License plate already exists' });
      }
    }

    const affected = await BusModel.update(req.params.id, { license_plate, total_seats });
    if (!affected) return res.status(404).json({ success: false, message: 'Bus not found' });
    const bus = await BusModel.getById(req.params.id);
    return res.json({ success: true, data: bus });
  } catch (err) { next(err); }
};

export const remove = async (req, res, next) => {
  try {
    const bus = await BusModel.getById(req.params.id);
    if (!bus) return res.status(404).json({ success: false, message: 'Bus not found' });
    ensureBusScope(req, bus);
    const affected = await BusModel.softDelete(req.params.id);
    if (!affected) return res.status(404).json({ success: false, message: 'Bus not found' });
    return res.json({ success: true, message: 'Bus deleted successfully' });
  } catch (err) { next(err); }
};

// ─── BUS SEATS ───────────────────────────────────────────────────────────────

export const getSeats = async (req, res, next) => {
  try {
    const { seat_type } = req.query;
    const seats = await BusSeatModel.getAll({ bus_id: req.params.id, seat_type });
    return res.json({ success: true, data: seats, total: seats.length });
  } catch (err) { next(err); }
};

export const createSeat = async (req, res, next) => {
  try {
    const { seat_number, seat_type } = req.body;
    const bus_id = req.params.id;

    const bus = await BusModel.getById(bus_id);
    if (!bus) return res.status(404).json({ success: false, message: 'Bus not found' });
    ensureBusScope(req, bus);

    const existing = await BusSeatModel.getByBusAndSeatNumber(bus_id, seat_number);
    if (existing) return res.status(409).json({ success: false, message: 'Seat number already exists on this bus' });

    const id = await BusSeatModel.create({ bus_id, seat_number, seat_type });
    const seat = await BusSeatModel.getById(id);
    return res.status(201).json({ success: true, data: seat });
  } catch (err) { next(err); }
};

export const bulkCreateSeats = async (req, res, next) => {
  try {
    const { seats } = req.body;
    const bus_id = req.params.id;

    const bus = await BusModel.getById(bus_id);
    if (!bus) return res.status(404).json({ success: false, message: 'Bus not found' });
    ensureBusScope(req, bus);

    const affected = await BusSeatModel.bulkCreate(bus_id, seats);
    return res.status(201).json({ success: true, message: `${affected} seats created` });
  } catch (err) { next(err); }
};

export const updateSeat = async (req, res, next) => {
  try {
    const { seat_number, seat_type } = req.body;
    const seat = await BusSeatModel.getById(req.params.seat_id);
    if (!seat) return res.status(404).json({ success: false, message: 'Seat not found' });
    const bus = await BusModel.getById(seat.bus_id);
    ensureBusScope(req, bus);

    await BusSeatModel.update(req.params.seat_id, { seat_number, seat_type });
    const updated = await BusSeatModel.getById(req.params.seat_id);
    return res.json({ success: true, data: updated });
  } catch (err) { next(err); }
};

export const deleteSeat = async (req, res, next) => {
  try {
    const seat = await BusSeatModel.getById(req.params.seat_id);
    if (!seat) return res.status(404).json({ success: false, message: 'Seat not found' });
    const bus = await BusModel.getById(seat.bus_id);
    ensureBusScope(req, bus);
    const affected = await BusSeatModel.delete(req.params.seat_id);
    if (!affected) return res.status(404).json({ success: false, message: 'Seat not found' });
    return res.json({ success: true, message: 'Seat deleted successfully' });
  } catch (err) { next(err); }
};
