const express = require('express');
const router = express.Router();
const { Sequelize, Op } = require('sequelize');

const { Event, Group, User, Venue, EventImage, Membership, Attendance } = require('../../db/models');
const user = require('../../db/models/user');
const { requireAuth } = require('../../utils/auth');
const { check, validationResult } = require('express-validator');
const { handleValidationErrors, validateGroup, validateVenue, validateEvent } = require('../../utils/validation');


// Get all Attendees of an Event by id
router.get('/:eventId/attendees', async (req, res, next) => {
    const { eventId } = req.params;
    const currUserId = req.user.id;
    const event = await Event.findByPk(eventId);

    if (!event) {
        const err = new Error("Event couldn't be found");
        err.status = 404;

        return next(err);
    };

    const group = await Group.findByPk(event.groupId);

    const where = {};

    if (!currUserId || currUserId !== group.organizerId) {
        where.status = { [Op.in]: ['co-host', 'member'] }
    }

    const attendees = await Event.findByPk(eventId, {
        include: [{
            model: User,
            as: 'Attendees',
            attributes: [ 'id', 'firstName', 'lastName' ],
            through: {
                attributes: [ 'status' ],
                where,
                required: false
            },
            required: false
        }],
        attributes: []
    })
    res.json( attendees );
});



// Change Attendance status
router.put('/:eventId/attendance', requireAuth, async (req, res, next) => {
    const { userId, status } = req.body;
    const { eventId } = req.params;

    if (status === 'pending') {
        const err = new Error("Validation Error");
        err.status = 400;
        err.title = 'Status change failed';
        err.errors = [ 'Cannot change an attendance status to pending' ];

        return next(err);
    }

    const event = await Event.findByPk(eventId);

    if (!event) {
        const err = new Error("Event couldn't be found");
        err.status = 404;

        return next(err);
    }

    const attendance = await Attendance.findOne({ where: { userId: userId } });

    if (!attendance) {
        const err = new Error("Attendance between the user and the event does not exist");
        err.status = 404;

        return next(err);
    }

    const updatedAttendance = await attendance.update({ status });

    res.json(updatedAttendance);
});



// Request Attendance to an Event by id
router.post('/:eventId/attendance', requireAuth, async (req, res, next) => {
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



// Delete an Attendance
router.delete('/:eventId/attendance', requireAuth, async (req, res, next) => {
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
router.post('/:eventId/images', requireAuth, async (req, res, next) => {
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
router.put('/:eventId', requireAuth, validateEvent, async (req, res, next) => {
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
router.delete('/:eventId', requireAuth, async (req, res, next) => {
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
    let { page, size, name, type, startDate } = req.query;

    if(!page) page = 1;
    if(!size) size = 20;
    if(page > 10) page = 10;
    if(size < 1) size = 1;

    page = parseInt(page);
    size = parseInt(size);

    const pagination = {};
    if (page >= 1 && size >= 1) {
        pagination.limit = size;
        pagination.offset = size * (page - 1);
    }

    const where = {};

    if (name && name !== '') {
        where.name = name
    };

    if (type && type !== '') {
        where.type = type
    };

    if (startDate && startDate !== '') {

    }

    const event = await Event.findAll({
        include: [{
            model: Group,
            attributes: ['id', 'name', 'city', 'state']
        }, {
            model: Venue,
            attributes: ['id', 'city', 'state']
        }],
        where,
        ...pagination
    });

    return res.json({ Events: event });
});



module.exports = router;
