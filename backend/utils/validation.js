// backend/utils/validation.js
const { validationResult, check } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const errors = validationErrors
            .array()
            .map((error) => `${error.msg}`);

        const err = Error('Validation error');
        err.title = 'Bad request.';
        err.errors = errors;
        err.status = 400;
        next(err);
    }

    next();
};



const validateGroup = [
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ min: 1, max: 60 })
        .withMessage('Name must be 60 characters or less'),
    check('about')
        .exists({ checkFalsy: true })
        .isLength({ min: 50 })
        .withMessage('About must be 50 characters or more'),
    check('type')
        .exists({ checkFalsy: true })
        .isIn(['In person', 'Online'])
        .withMessage("Type must be 'Online' or 'In person'"),
    check('private')
        .isBoolean()
        .withMessage('Private must be a boolean'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    handleValidationErrors
];



const validateVenue = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('lat')
        .exists({ checkFalsy: true })
        .isFloat()
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({ checkFalsy: true })
        .isFloat()
        .withMessage('Longitude is not valid'),
    handleValidationErrors
];



const validateEvent = [
    check('venueId')
        .exists()
        .withMessage('Venue does not exist'),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ min: 5 })
        .withMessage('Name must be at least 5 characters'),
    check('type')
        .exists({ checkFalsy: true })
        .isIn(['In person', 'Online'])
        .withMessage("Type must be 'Online' or 'In person'"),
    check('capacity')
        .exists({ checkFalsy: true })
        .isNumeric()
        .withMessage('Capacity must be an integer'),
    check('price')
        .exists({ checkFalsy: true })
        .isFloat()
        .withMessage('Price is invalid'),
    check('description')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Description is required'),
    check('startDate')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Start date is required'),
    check('endDate')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('End date is required'),
    check('endDate').toDate(),
    check('startDate').toDate().custom((start, { req }) => {
        if (start.getTime() > req.body.endDate.getTime()) {
            throw new Error('Start date must be before end date');
        }
        return true;
    }),
    check('startDate').toDate().custom((start) => {
        const current = new Date();
        if (start.getTime() < current.getTime()) {
            throw new Error('Start date must be in the future');
        }
        return true;
    }),
    handleValidationErrors
];



module.exports = {
    handleValidationErrors, validateGroup, validateVenue, validateEvent
};
