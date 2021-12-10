const express = require('express');
const asyncHandler = require('express-async-handler');
const { Rsvp } = require('../../db/models');

const router = express.Router();

// Get all user RSVPs
router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
    const eventId = parseInt(req.params.id, 10);
    const rsvps = await Rsvp.findAll({
        where: { eventId }
    });
    return res.json(rsvps);
}));

// RSVP an event
router.post('/', asyncHandler(async (req, res) => {
    const { eventId, userId } = req.body;
    const rsvp = await Rsvp.create({
        eventId, userId
    });
    return res.json(rsvp);
}));

// delete an RSVP
router.delete('/', asyncHandler(async (req, res) => {
    const { rsvpId } = req.body;
    const rsvp = await Rsvp.findByPk(rsvpId);
    if (rsvp) {
        await rsvp.destroy();
        return res.json('Success')
    };
}));

module.exports = router;
