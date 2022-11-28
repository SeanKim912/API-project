const express = require('express');
const router = express.Router();
const { Sequelize, Op } = require('sequelize');

const { GroupImage } = require('../../db/models');
const groupimage = require('../../db/models/groupimage');
const user = require('../../db/models/user');
const { requireAuth } = require('../../utils/auth');



// Delete an Image for a Group
router.delete('/:imageId', async (req, res, next) => {
    const { imageId } = req.params;
    const image = await GroupImage.findByPk(imageId);

    if (!image) {
        const err = new Error("Group Image couldn't be found");
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
