const express = require('express');
const router = express.Router();

const { Event, Group, User } = require('../../db/models');

// Return all events
router.get('/', async (req, res) => {

    const events = await Event.findAll();

    return res.json(events)
});

module.exports = router;
