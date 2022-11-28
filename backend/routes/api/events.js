const express = require('express');
const router = express.Router();

const { Event, Group, User, Venue, EventImage, Membership, Attendance } = require('../../db/models');
const user = require('../../db/models/user');
const { requireAuth } = require('../../utils/auth');



// Request Attendance to an Event
router.post('/:eventId/attendance', async (req, res, next) => {
    const { eventId } = req.params;
    const userIdNumber = req.user.id;
    const event = await Event.findByPk(eventId);

    if (!event) {
        const err = new Error("Event couldn't be found");
        err.status = 404;

        return next(err);
    }

    const attendanceRequest = await Attendance.create({
        userId: userIdNumber,
        eventId,
        status: "pending"
    });

    res.json({
        id: attendanceRequest.id,
        userId: attendanceRequest.userId,
        status: attendanceRequest.status
    });
});



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
router.get('/:eventId', async (req, res, next) => {
    const { eventId } = req.params;
    const event = await Event.findOne({
        where: { id: eventId },
        include: [{ model: Group }, { model: Venue }, { model: EventImage }]

    });

    if (!event) {
        const err = new Error("Event couldn't be found");
        err.status = 404;

        return next(err);
    };

    res.json(event);
});



// Edit an Event by its id
router.put('/:eventId', async (req, res, next) => {
    const { venueId, name, type, capacity, price, description, startDate, endDate } = req.body;
    const { eventId } = req.params;

    const event = await Event.findByPk(eventId);
    const venue = await Venue.findByPk(venueId);

    if (!event) {
        const err = new Error("Event couldn't be found");
        err.status = 404;

        return next(err);
    };

    if (!venue) {
        const err = new Error("Venue couldn't be found");
        err.status = 404;

        return next(err);
    }

    const updatedEvent = await event.update({
        venueId, name, type, capacity, price, description, startDate, endDate
    });

    res.json(updatedEvent)
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
    const Events = await Event.findAll({
        include: [{ model: Group }, { model: Venue }]
    });

    return res.json({ Events });
});


module.exports = router;
