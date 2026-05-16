const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/tripEventController');
const { validate } = require('../config/joi.validate');
const { createTripEventSchema, listTripEventSchema } = require('../config/validation.schemas');

/**
 * @swagger
 * tags:
 *   name: TripEvents
 *   description: Trip event log
 */

/**
 * @swagger
 * /api/trip-events:
 *   get:
 *     summary: Get trip events (filter by trip_id, event_type)
 *     tags: [TripEvents]
 *     parameters:
 *       - { in: query, name: trip_id,    schema: { type: integer } }
 *       - { in: query, name: event_type, schema: { type: string } }
 *     responses:
 *       200: { description: List of events }
 */
router.get('/', validate(listTripEventSchema, 'query'), ctrl.getAll);

/**
 * @swagger
 * /api/trip-events/{id}:
 *   get:
 *     summary: Get trip event by ID
 *     tags: [TripEvents]
 *     parameters:
 *       - { in: path, name: id, required: true, schema: { type: integer } }
 *     responses:
 *       200: { description: Event found }
 *       404: { description: Not found }
 */
router.get('/:id', ctrl.getById);

/**
 * @swagger
 * /api/trip-events:
 *   post:
 *     summary: Log a new trip event manually
 *     tags: [TripEvents]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [trip_id, event_type]
 *             properties:
 *               trip_id:    { type: integer }
 *               event_type: { type: string, enum: [created, delayed, boarding, departed, arrived, completed, cancelled] }
 *               note:       { type: string }
 *               created_by: { type: integer }
 *     responses:
 *       201: { description: Event logged }
 */
router.post('/', validate(createTripEventSchema), ctrl.create);

/**
 * @swagger
 * /api/trip-events/{id}:
 *   delete:
 *     summary: Delete a trip event (admin only)
 *     tags: [TripEvents]
 *     parameters:
 *       - { in: path, name: id, required: true, schema: { type: integer } }
 *     responses:
 *       200: { description: Deleted }
 *       404: { description: Not found }
 */
router.delete('/:id', ctrl.remove);

module.exports = router;