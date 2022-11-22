const express = require('express');
const router = express.Router();
const { Sequelize, Op } = require('sequelize');

const { Group, GroupImage, User, Membership, Venue, Event, Attendance } = require('../../db/models');
const user = require('../../db/models/user');
const { requireAuth } = require('../../utils/auth');



// // Get all Members of a Group from its id
// router.get('/:groupId/members', async (req, res, next) => {
//     const { groupId } = req.params;
//     const userId = req.user.id;
//     const group = await Group.findByPk(groupId);
//     const roster = await User.findAll({
//             where: {
//                 groupId: groupId
//             },
//             include: Membership

//             }
//         })

//     if (!group) {
//         const err = new Error("Group couldn't be found");
//         err.status = 404;

//         return next(err);
//     };

//     if (userId !== group.organizerId) {

//     }

//     res.json({
//         Members: {
//             id: venues.id,
//             groupId: venues.groupId,
//             address: venues.address,
//             city: venues.city,
//             state: venues.state,
//             lat: venues.lat,
//             lng: venues.lng
//         }
//     });
// });



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

    res.json({
        Venues: {
            id: venues.id,
            groupId: venues.groupId,
            address: venues.address,
            city: venues.city,
            state: venues.state,
            lat: venues.lat,
            lng: venues.lng
        }
    });
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
    const events = await Event.findAll({ where: { groupId: groupId } });
    const groups = await Group.findByPk(groupId);
    const venues = await Venue.findByPk(events.venueId);

    if (!events) {
        const err = new Error("Group couldn't be found");
        err.status = 404;

        return next(err);
    };

    res.json({
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
    });
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
    const organized = await Group.findAll({
        where: { organizerId: req.user.id }
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
