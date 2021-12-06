const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { requireAuth } = require('../../utils/auth');
const { Event } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateNewEvent = [
    check('time')
        .exists({ checkFalsy: true })
        .withMessage('Please provide the time of the event.'),
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Please provide the title of the event.'),
    check('body')
        .exists({ checkFalsy: true })
        .withMessage('Please provide the body of the event.'),
    handleValidationErrors
];

// Add a new event
router.post(
    '/',
    requireAuth,
    validateNewEvent,
    asyncHandler(async (req, res) => {
        const { time, title, body } = req.body;
        const event = await Event.create({ time, title, body });
        return res.json({ event });
    })
);

module.exports = router;
