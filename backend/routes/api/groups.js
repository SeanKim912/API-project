const express = require('express');
const router = express.Router();

const { Group, GroupImage, User, Membership, Organizer, Venue } = require('../../db/models');
const user = require('../../db/models/user');
const { requireAuth } = require('../../utils/auth');

// Add an Image to a Group based on the Group's id
router.post('/:groupId/images', async (req, res) => {
    const { url, preview } = req.body;
    const { groupId } = req.params;

    const group = await Group.findByPk(groupId);

    if (!group) {
        res.statusCode = 404;
        res.json({
            "message": "Group couldn't be found",
            "statusCode": 404
        });
    }

    const newGroupImage = await GroupImage.create({
        groupId,
        url,
        preview
    });

    res.json({
        id: newGroupImage.id,
        url: newGroupImage.url,
        preview: newGroupImage.preview
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

// Edit a Group
// router.put('/:groupId', async (req, res) => {});

// Delete a Group
// router.delete('/:groupId', async (req, res) => {});

// Return all groups
router.get('/', async (req, res) => {

    const groups = await Group.findAll();

    return res.json(groups)
});

// Create a Group
router.post('/', async (req, res) => {
    const { name, about, type, private, city, state } = req.body;
    const newGroup = await Group.create({ organizerId: req.user.id, name, about, type, private, city, state });

    res.statusCode(201);
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
