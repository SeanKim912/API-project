// backend/routes/api/index.js
const router = require('express').Router();

const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const { requireAuth } = require("../../utils/auth.js");
const { restoreUser } = require("../../utils/auth.js");

router.get('/test', requireAuth, (req, res) => {
    res.json({message: 'success'})
})

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.post('/test', function (req, res) {
    res.json({ requestBody: req.body });
});


module.exports = router;
