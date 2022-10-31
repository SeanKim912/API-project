const express = require('express');
const router = express.Router();

const { Group, GroupImage, User, Membership, Venue } = require('../../db/models');
const user = require('../../db/models/user');
const { requireAuth } = require('../../utils/auth');



// Edit a Venue from its id
router.put('/venues/:venueId', async (req, res, next) => {
    const { address, city, state, lat, lng } = req.body;
    const { venueId } = req.params;

    const venue = await Venue.findByPk(venueId);

    if (!venue) {
        const err = new Error("Venue couldn't be found");
        err.status = 404;

        return next(err);
    };

    const updatedVenue = await venue.update({ address, city, state, lat, lng });

    res.json({
        id: updatedVenue.id,
        groupId: updatedVenue.groupId,
        address: updatedVenue.address,
        city: updatedVenue.city,
        state: updatedVenue.state,
        lat: updatedVenue.lat,
        lng: updatedVenue.lng
    });
});


module.exports = router;
