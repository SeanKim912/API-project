const express = require('express');
const router = express.Router();

const { Event, Group, User, Venue, EventImages } = require('../../db/models');
const user = require('../../db/models/user');
const { requireAuth } = require('../../utils/auth');



// Get details of an Event by its id
router.get('/:eventId', async (req, res) => {
    const details = await Event.findByPk(req.params.eventId);
    const images = await EventImage.findAll({ where: { eventId: req.params.eventId } });
    const groups = await Group.findByPk(details.groupId);
    const venue = await Venue.findByPk(details.venueId);

    if (!details) {
        const err = new Error("Event couldn't be found");
        err.status = 404;

        return next(err);
    };

    res.json({
        id: details.id,
        groupId: details.groupId,
        venueId: details.venueId,
        name: details.name,
        description: details.description,
        type: details.type,
        capacity: details.capacity,
        price: details.price,
        startDate: details.startDate,
        endDate: details.endDate,
        Group: groups,
        Venue: venue,
        EventImages: images
    });
});



// Return all events
router.get('/', async (req, res) => {
    const events = await Event.findAll();

    return res.json({events})
});


module.exports = router;
