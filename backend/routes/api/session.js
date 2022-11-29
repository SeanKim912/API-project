// backend/routes/api/session.js
const express = require('express')
const router = express.Router();

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');


const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Email is required'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Password is required'),
    handleValidationErrors
];

// Log in
router.post('/', validateLogin, async (req, res, next) => {
    const { credential, password } = req.body;
    const user = await User.login({ credential, password });

    if (!user) {
        const err = new Error('Invalid credentials');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = ['The provided credentials were invalid.'];
        return next(err);
    }

    const token = await setTokenCookie(res, user);
    const userRes = user.toSafeObject();
    userRes.token = token;

    return res.json({
        id: userRes.id,
        firstName: userRes.firstName,
        lastName: userRes.lastName,
        email: userRes.email,
        token: userRes.token
    });
});



// Log out
router.delete('/', (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
});



// Get Current User
router.get('/', requireAuth, restoreUser, (req, res) => {
    const { user } = req;
    if (user) {
        return res.json(
            user.toSafeObject()
        );
    } else return res.json({});
});



module.exports = router;
