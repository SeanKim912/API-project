// backend/routes/api/users.js
const express = require('express');
const router = express.Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const validateSignup = [
    check('firstName')
        .exists({ checkFalsy: true })
        .withMessage('First Name is required'),
    check('lastName')
        .exists({ checkFalsy: true })
        .withMessage('Last Name is required'),
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Invalid email'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

router.post(
    '/',
    validateSignup,
    async (req, res) => {
        const { firstName, lastName, email, username, password } = req.body;

        const validateEmail = await User.findOne({ where: { email: email } });

        if (validateEmail) {
            res.status(403);
            return res.json({
                "message": "User already exists",
                "statusCode": 403,
                "errors": {
                    "email": "User with that email already exists"
                }
            });
        };

        const user = await User.signup({ email, username, password, firstName, lastName });

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
    }
);



module.exports = router;
