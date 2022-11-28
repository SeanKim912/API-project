const express = require('express');
const router = express.Router();
const { Sequelize, Op } = require('sequelize');

const { Group, GroupImage, User, Membership, Venue, Event, Attendance } = require('../../db/models');
const membership = require('../../db/models/membership');
const user = require('../../db/models/user');
const { requireAuth } = require('../../utils/auth');



// Get all Members of a Group from its id
router.get('/:groupId/members', async (req, res, next) => {
    const { groupId } = req.params;
    const userId = req.user.id;
    const group = await Group.findByPk(groupId);
    const membership = await Membership.findByPk(userId)
    const roster = await Membership.findAll({
            include: { model: User.scope("viewMembership") },
            where: { groupId: groupId },
        });

    if (!group) {
        const err = new Error("Group couldn't be found");
        err.status = 404;

        return next(err);
    };

    if (membership.status !== "co-host" || userId !== group.organizerId) {
        const filteredRoster = await Membership.findAll({
            include: { model: User.scope("viewMembership") },
            where: {
                groupId: groupId,
                [Op.not]: [{ status: ["pending"] }]
            }
        });

        res.json({ Members: filteredRoster });
    }

    res.json({ Members: roster });
});



// Change Membership status
router.put('/:groupId/membership', async (req, res, next) => {
    const { memberId, status } = req.body;
    const { groupId } = req.params;
    const group = await Group.findByPk(groupId);
    const membership = await Membership.findOne({ where: { userId: memberId } });

    if (!group) {
        const err = new Error("Group couldn't be found");
        err.status = 404;

        return next(err);
    }

    if (!membership) {
        const err = new Error("Membership does not exist for this User");
        err.status = 404;

        return next(err);
    }

    const updatedMembership = await membership.update({ status });

    res.json(updatedMembership);
});



// Request Membership to a Group by id
router.post('/:groupId/membership', async (req, res, next) => {
    const { groupId } = req.params;
    const userIdNumber = req.user.id;
    const group = await Group.findByPk(groupId);

    if (!group) {
        const err = new Error("Group couldn't be found");
        err.status = 404;

        return next(err);
    }

    const membershipRequest = await Membership.create({
        userId: userIdNumber,
        groupId,
        status: "pending"
    });

    console.log(membershipRequest)
    res.json({
        id: membershipRequest.id,
        memberId: membershipRequest.userId,
        status: membershipRequest.status
    });
});



// Delete a Membership
router.delete('/:groupId/membership', async (req, res, next) => {
    const { memberId } = req.body;
    const { groupId } = req.params;
    const group = await Group.findByPk(groupId);
    const user = await User.findByPk(memberId);
    const membership = await Membership.findOne({ where: { userId: memberId } });

    if (!group) {
        const err = new Error("Group couldn't be found");
        err.status = 404;

        return next(err);
    };

    if (!user) {
        const err = new Error("User couldn't be found");
        err.status = 404;

        return next(err);
    };

    if (!membership) {
        const err = new Error("Membership does not exist for this User");
        err.status = 404;

        return next(err);
    };

    await membership.destroy();

    res.json({
        "message": "Successfully deleted membership from group",
        "statusCode": 200
    });
});



// Add an Image to a Group based on the Group's id
router.post('/:groupId/images', async (req, res, next) => {
    const { url, preview } = req.body;
    const { groupId } = req.params;
    const group = await Group.findByPk(groupId);

    if (!group) {
        const err = new Error("Group couldn't be found");
        err.status = 404;

        return next(err);
    }

    const newGroupImage = await GroupImage.create({ groupId, url, preview });

    res.json({
        id: newGroupImage.id,
        url: newGroupImage.url,
        preview: newGroupImage.preview
    });
});



// Get all Venues of a Group from its id
router.get('/:groupId/venues', async (req, res, next) => {
    const { groupId } = req.params;
    const venues = await Venue.findAll({ where: { groupId: groupId } });

    if (!venues) {
        const err = new Error("Group couldn't be found");
        err.status = 404;

        return next(err);
    };

    res.json({ Venues: venues });
});



// Create a Venue for a Group based on its id
router.post('/:groupId/venues', async (req, res, next) => {
    const { address, city, state, lat, lng } = req.body;
    const { groupId } = req.params;

    const group = await Group.findByPk(groupId);

    if (!group) {
        const err = new Error("Group couldn't be found");
        err.status = 404;

        return next(err);
    }

    const newVenue = await Venue.create({ groupId, address, city, state, lat, lng });

    res.json({
        id: newVenue.id,
        groupId: newVenue.groupId,
        address: newVenue.address,
        city: newVenue.city,
        state: newVenue.state,
        lat: newVenue.lat,
        lng: newVenue.lng
    });
});



// Get all Events of a Group from its id
router.get('/:groupId/events', async (req, res, next) => {
    const { groupId } = req.params;
    const events = await Event.findAll({
        where: { groupId: groupId },
        include: [{ model: Group }, { model: Venue }]
    });

    if (!events || events.length === 0) {
        const err = new Error("Group couldn't be found");
        err.status = 404;

        return next(err);
    };

    return res.json({ Events: events });
});



// Create an Event for a Group from its id
router.post('/:groupId/events', async (req, res, next) => {
    const { venueId, name, type, capacity, price, description, startDate, endDate } = req.body;
    const { groupId } = req.params;

    const group = await Group.findByPk(groupId);

    if (!group) {
        const err = new Error("Group couldn't be found");
        err.status = 404;

        return next(err);
    }

    const newEvent = await Event.create({ groupId, venueId, name, type, capacity, price, description, startDate, endDate });

    res.json({
        id: newEvent.id,
        groupId: newEvent.groupId,
        venueId: newEvent.venueId,
        name: newEvent.name,
        type: newEvent.type,
        capacity: newEvent.capacity,
        price: newEvent.price,
        description: newEvent.description,
        startDate: newEvent.startDate,
        endDate: newEvent.endDate
    });
});



// Return all groups joined/organized by Current User
router.get('/current', async (req, res) => {
    const userId = req.user.id
    const organized = await Group.findAll({
        where: { organizerId: userId }
    });

    const joined = await User.findByPk(req.user.id, {
        include: { model: Group }
    });

    return res.json({
        organized,
        joined
    });
});



// Get details of a Group from its id
router.get('/:groupId', async (req, res) => {
    const details = await Group.findByPk(req.params.groupId);
    const images = await GroupImage.findAll({ where: { groupId: req.params.groupId } });
    const organizer = await User.findByPk(details.organizerId);
    const venue = await Venue.findAll({ where: { groupId: req.params.groupId } });

    res.json({
        Groups: details,
        GroupImages: images,
        Organizer: organizer,
        Venues: venue
    });
});



// Edit a Group by its id
router.put('/:groupId', async (req, res, next) => {
    const { name, about, type, private, city, state } = req.body;
    const { groupId } = req.params;

    const group = await Group.findByPk(groupId);

    if (!group) {
        const err = new Error("Group couldn't be found");
        err.status = 404;

        return next(err);
    };

    const updatedGroup = await group.update({ name, about, type, private, city, state });

    res.json({
        id: updatedGroup.id,
        organizerId: updatedGroup.organizerId,
        name: updatedGroup.name,
        about: updatedGroup.about,
        type: updatedGroup.type,
        private: updatedGroup.private,
        city: updatedGroup.city,
        state: updatedGroup.state,
        createdAt: updatedGroup.createdAt,
        updatedAt: updatedGroup.updatedAt
    });
});



// Delete a Group
router.delete('/:groupId', async (req, res, next) => {
    const group = await Group.findByPk(req.params.groupId);

    if (!group) {
        const err = new Error("Group couldn't be found");
        err.status = 404;

        return next(err);
    };

    await group.destroy();

    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    });
});



// Return all groups
router.get('/', async (req, res) => {

    const groups = await Group.findAll();

    return res.json(groups);
});



// Create a Group
router.post('/', async (req, res) => {
    const { name, about, type, private, city, state } = req.body;
    const newGroup = await Group.create({ organizerId: req.user.id, name, about, type, private, city, state });

    res.status(201);
    res.json({
        id: newGroup.id,
        organizerId: newGroup.organizerId,
        name: newGroup.name,
        about: newGroup.about,
        type: newGroup.type,
        private: newGroup.private,
        city: newGroup.city,
        state: newGroup.state,
        createdAt: newGroup.createdAt,
        updatedAt: newGroup.updatedAt
    });
});


module.exports = router;
