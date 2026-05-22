import BusModel from '../models/busModel';
import BusSeatModel from '../models/busSeatModel';

export const getAll = async (req, res, next) => {
  try {
    const { page, limit, operator_id, search } = req.query;
    const result = await BusModel.getAll({ page, limit, operator_id, search });
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

    const existing = await BusModel.getByLicensePlate(license_plate);
    if (existing) return res.status(409).json({ success: false, message: 'License plate already exists' });

    const id = await BusModel.create({ operator_id, license_plate, total_seats });
    const bus = await BusModel.getById(id);
    return res.status(201).json({ success: true, data: bus });
  } catch (err) { next(err); }
};

export const update = async (req, res, next) => {
  try {
    const { license_plate, total_seats } = req.body;

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

    const affected = await BusSeatModel.bulkCreate(bus_id, seats);
    return res.status(201).json({ success: true, message: `${affected} seats created` });
  } catch (err) { next(err); }
};

export const updateSeat = async (req, res, next) => {
  try {
    const { seat_number, seat_type } = req.body;
    const seat = await BusSeatModel.getById(req.params.seat_id);
    if (!seat) return res.status(404).json({ success: false, message: 'Seat not found' });

    await BusSeatModel.update(req.params.seat_id, { seat_number, seat_type });
    const updated = await BusSeatModel.getById(req.params.seat_id);
    return res.json({ success: true, data: updated });
  } catch (err) { next(err); }
};

export const deleteSeat = async (req, res, next) => {
  try {
    const affected = await BusSeatModel.delete(req.params.seat_id);
    if (!affected) return res.status(404).json({ success: false, message: 'Seat not found' });
    return res.json({ success: true, message: 'Seat deleted successfully' });
  } catch (err) { next(err); }
};