const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { requireAuth } = require('../../utils/auth');
const { Event, User } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateNewEvent = [
    check('time')
        .exists({ checkFalsy: true })
        .withMessage('Please provide the time of the event.'),
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Please provide the title of the event.')
        .isLength({ max: 255 })
        .withMessage('Title cannot be longer than 255 characters.'),
    check('body')
        .exists({ checkFalsy: true })
        .withMessage('Please provide the body of the event.'),
    handleValidationErrors
];

// Get all events
router.get('/', asyncHandler(async (req, res) => {
    const events = await Event.findAll();
    return res.json(events);
}));

// Add a new event
router.post(
    '/',
    requireAuth,
    validateNewEvent,
    asyncHandler(async (req, res) => {
        const { time, title, body, userId } = req.body;
        const event = await Event.create({ time, title, body, userId });
        return res.json(event);
    })
);

// Get a single event
router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
    const eventId = parseInt(req.params.id, 10);
    const event = await Event.findByPk(eventId, { include: User });
    return res.json(event);
}));

// Update a single event
router.put('/:id(\\d+)',
    requireAuth,
    validateNewEvent,
    asyncHandler(async (req, res) => {
        const eventId = parseInt(req.params.id, 10);
        const event = await Event.findByPk(eventId);
        const { title, body, time, userId, createdAt, updatedAt } = req.body;

        if (event) {
            await event.update({
                title, body, time, userId, createdAt, updatedAt
            });
            return event;
        }
    }));

// Delete a single event
router.delete('/:id(\\d+)',
    requireAuth,
    asyncHandler(async (req, res) => {
        const eventId = parseInt(req.params.id, 10);
        const event = Event.findByPk(eventId);

        if (event) {
            await event.destroy();
            res.json('Success');
        }
    }));

module.exports = router;
