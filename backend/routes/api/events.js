const express = require('express');
const router = express.Router();
const { Sequelize, Op } = require('sequelize');

const { Event, Group, User, Venue, EventImage, Membership, Attendance } = require('../../db/models');
const user = require('../../db/models/user');
const { requireAuth } = require('../../utils/auth');



// Get all Attendees of an Event by id
router.get('/:eventId/attendees', async (req, res, next) => {
    const { eventId } = req.params;
    const userId = req.user.id;
    const event = await Event.findByPk(eventId);
    const membership = await Membership.findByPk(userId)
    const roster = await Attendance.findAll({
            include: { model: User.scope("viewMembership") },
            where: { eventId: eventId }
        });

    if (!event) {
        const err = new Error("Event couldn't be found");
        err.status = 404;

        return next(err);
    };

    if (membership.status !== "co-host" || userId !== group.organizerId) {
        const filteredRoster = await Attendance.findAll({
            include: { model: User.scope("viewMembership") },
            where: {
                eventId: eventId,
                [Op.not]: [{ status: ["pending"] }]
            }
        });

        res.json({ Attendees: filteredRoster });
    }

    res.json({ Attendees: roster });
});



// Change Attendance status
router.put('/:eventId/attendance', async (req, res, next) => {
    const { userId, status } = req.body;
    const { eventId } = req.params;
    const event = await Event.findByPk(eventId);
    const attendance = await Attendance.findOne({ where: { userId: userId } });

    if (!event) {
        const err = new Error("Event couldn't be found");
        err.status = 404;

        return next(err);
    }

    if (!attendance) {
        const err = new Error("Attendance between the user and the event does not exist");
        err.status = 404;

        return next(err);
    }

    const updatedAttendance = await attendance.update({ status });

    res.json(updatedAttendance);
});



// Request Attendance to an Event by id
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

    console.log(attendanceRequest)
    res.json({
        id: attendanceRequest.id,
        userId: attendanceRequest.userId,
        status: attendanceRequest.status
    });
});



// Delete an Attendance
router.delete('/:eventId/attendance', async (req, res, next) => {
    const { memberId } = req.body;
    const { eventId } = req.params;
    const event = await Event.findByPk(eventId);
    const attendance = await Attendance.findOne({ where: { userId: memberId } });

    if (!event) {
        const err = new Error("Event couldn't be found");
        err.status = 404;

        return next(err);
    };

    if (!attendance) {
        const err = new Error("Attendance does not exist for this User");
        err.status = 404;

        return next(err);
    };

    await attendance.destroy();

    res.json({
        "message": "Successfully deleted attendance from event",
        "statusCode": 200
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
    const { eventId } = req.params;
    const event = await Event.findByPk(eventId);

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
router.get('/', async (req, res, next) => {
    let query = {
        where: {},
        include: []
    };
    const Events = await Event.findAll({
        include: [{ model: Group }, { model: Venue }]
    });

    return res.json({ Events });
});



module.exports = router;
