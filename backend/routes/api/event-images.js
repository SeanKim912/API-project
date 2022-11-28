const express = require('express');
const router = express.Router();
const { Sequelize, Op } = require('sequelize');

const { EventImage } = require('../../db/models');
const eventimage = require('../../db/models/eventimage');
const user = require('../../db/models/user');
const { requireAuth } = require('../../utils/auth');


// Delete an Image for an Event
router.delete('/:imageId', async (req, res, next) => {
    const { imageId } = req.params;
    const image = await EventImage.findByPk(imageId);

    if (!image) {
        const err = new Error("Event Image couldn't be found");
        err.status = 404;

        return next(err);
    };

    await image.destroy();

    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    });
});



module.exports = router;
