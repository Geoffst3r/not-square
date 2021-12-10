const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { requireAuth } = require('../../utils/auth');
const { Event, User, Rsvp } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateNewEvent = [
    check('time')
        .exists({ checkFalsy: true })
        .withMessage('Please provide the time of the event.')
        .custom((val) => {
            if (new Date(val) < new Date()) {
                throw new Error('Time of event must be in the future.')
            }
            return true;
        }),
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Please provide the title of the event.')
        .isLength({ max: 150 })
        .withMessage('Title cannot be longer than 150 characters.'),
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

// Get all user events
router.get('/user/:id(\\d+)', asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const events = await Event.findAll({
        where: { userId }
    });
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
            return res.json(event);
        }
    }));

// Delete a single event
router.delete('/:id(\\d+)',
    requireAuth,
    asyncHandler(async (req, res) => {
        const eventId = parseInt(req.params.id, 10);
        const event = await Event.findByPk(eventId);
        await Rsvp.destroy({
            where: { eventId }
        });

        if (event) {
            await event.destroy();
            return res.json('Success');
        }
    }));

module.exports = router;
