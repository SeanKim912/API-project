const express = require('express');
const router = express.Router();

const { Event, Group, User, Venue, EventImage } = require('../../db/models');
const user = require('../../db/models/user');
const { requireAuth } = require('../../utils/auth');



// Add an Image to an Event from its id
router.post('/:eventId/images', async (req, res, next) => {
    const { url, preview } = req.body;
    const { eventId } = req.params;

    const event = await Event.findByPk(eventId);

    if (!event) {
        const err = new Error("Event couldn't be found");
        err.status = 404;

        return next(err);
    }

    const newEventImage = await EventImage.create({ eventId, url, preview });

    res.json({
        id: newEventImage.id,
        url: newEventImage.url,
        preview: newEventImage.preview
    });
});



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



// Edit an Event by its id
router.put('/:eventId', async (req, res, next) => {
    const { venueId, name, type, capacity, price, description, startDate, endDate } = req.body;
    const { eventId } = req.params;

    const event = await Event.findByPk(eventId);

    if (!event) {
        const err = new Error("Event couldn't be found");
        err.status = 404;

        return next(err);
    };

    const updatedEvent = await event.update({
        venueId, name, type, capacity, price, description, startDate, endDate
    });

    res.json({
        id: updatedEvent.id,
        groupId: updatedEvent.groupId,
        name: updatedEvent.name,
        type: updatedEvent.type,
        capacity: updatedEvent.capacity,
        price: updatedEvent.price,
        description: updatedEvent.description,
        startDate: updatedEvent.startDate,
        endDate: updatedEvent.endDate
    })
});



// Delete an Event
router.delete('/:eventId', async (req, res, next) => {
    const event = await Event.findByPk(req.params.eventId);

    if (!event) {
        const err = new Error("Event couldn't be found");
        err.status = 404;

        return next(err);
    };

    await event.destroy();

    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    });
});



// Return all events
router.get('/', async (req, res) => {
    const events = await Event.findAll();
    const groups = await Group.findByPk(events.groupId);
    const venues = await Venue.findByPk(events.venueId);

    return res.json({
        Events: {
            id: events.id,
            groupId: events.groupId,
            venueId: events.venueId,
            name: events.name,
            type: events.type,
            startDate: events.startDate,
            endDate: events.endDate,
            Group: {
                id: groups.id,
                name: groups.name,
                city: groups.city,
                state: groups.state
            },
            Venue: {
                id: venues.id,
                city: venues.city,
                state: venues.state
            }
        }
    })
});


module.exports = router;
