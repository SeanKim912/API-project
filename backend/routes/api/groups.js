const express = require('express');
const router = express.Router();

const { Group, GroupImage, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

// Return all groups
router.get('/', async (req, res) => {

    const groups = await Group.findAll();

    return res.json(groups)
});

// Create a Group
router.post('/', async (req, res) => {
    const { name, about, type, private, city, state } = req.body;
    const newGroup = await Group.create({ organizerId: req.user.id, name, about, type, private, city, state });

    return res.json({
        newGroup
    });
});

// Add an Image to a Group based on the Group's id
router.post('/:groupId/images', async (req, res) => {
    const { url, preview } = req.body;
    const id = req.params.groupId;

    const group = await Group.findByPk(id);

    if (!group) {
        res.statusCode = 404;
        res.json({
            "message": "Group couldn't be found",
            "statusCode": 404
        });
    } else {
        const newGroupImage = await GroupImage.create({
            groupId: group.id,
            url,
            preview
        });
    }

    res.json(newGroupImage);
});

// Return all groups joined/organized by Current User
// router.get('/current', async (req, res) => {});

// Get details of a Group from its id
// router.get('/:groupId', async (req, res) => {});



// Edit a Group
// router.put('/:groupId', async (req, res) => {});

// Delete a Group
// router.delete('/:groupId', async (req, res) => {});

module.exports = router;
