const express = require('express');
const router = express.Router();

const { Group, GroupImage, User, Membership, Organizer, Venue } = require('../../db/models');
const user = require('../../db/models/user');
const { requireAuth } = require('../../utils/auth');



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
router.get('/:groupId/venues', async (req, res) => {
    const venues = await Venue.findAll({ where: { groupId: req.params.groupId } });

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
    })
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



// Edit a Group
router.put('/:groupId', async (req, res, next) => {
    const { name, about, type, private, city, state } = req.body;
    const { groupId } = req.params;

    const group = await Group.findByPk(groupId);

    if (!group) {
        const err = new Error("Group couldn't be found");
        err.status = 404;

        return next(err);
    };

    const updatedGroup = await group.update({
        name, about, type, private, city, state
    });

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
    })
});



// Delete a Group
router.delete('/:groupId', async (req, res, next) => {
    const group = await Venue.findByPk(req.params.groupId);

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



// Return all groups
router.get('/', async (req, res) => {

    const groups = await Group.findAll();

    return res.json(groups)
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
