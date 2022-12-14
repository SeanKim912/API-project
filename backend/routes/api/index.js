// backend/routes/api/index.js
const router = require('express').Router();

const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const groupsRouter = require('./groups.js');
const venuesRouter = require('./venues.js');
const eventsRouter = require('./events.js');
const groupImagesRouter = require('./group-images.js');
const eventImagesRouter = require('./event-images.js');
const { requireAuth } = require("../../utils/auth.js");
const { restoreUser } = require("../../utils/auth.js");

router.get('/test', requireAuth, (req, res) => {
    res.json({message: 'success'})
})

router.use(restoreUser);

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/groups', groupsRouter);
router.use('/venues', venuesRouter);
router.use('/events', eventsRouter);
router.use('/group-images', groupImagesRouter);
router.use('/event-images', eventImagesRouter);



module.exports = router;
