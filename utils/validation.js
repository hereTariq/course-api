const { body } = require('express-validator');
const User = require('../models/user');

exports.registerValidation = [
    body('username')
        .not()
        .isEmpty()
        .withMessage('Username is required')
        .isString()
        .withMessage(
            'username should be combination of characters and at least 4 characters.'
        )
        .isLength({ min: 4 })
        .withMessage(
            'username should be combination of characters and at least 4 characters.'
        ),
    body('email')
        .not()
        .isEmpty()
        .withMessage('Email is required!')
        .trim()
        .isEmail()
        .withMessage('Email must be a valid email')
        .normalizeEmail()
        .toLowerCase()
        .custom((value) => {
            return User.findOne({ email: value }).then((user) => {
                if (user) {
                    return Promise.reject('Email already in use');
                }
            });
        }),
    body('password')
        .not()
        .isEmpty()
        .withMessage('Password is required!')
        .trim()
        .isLength({ min: 5 })
        .withMessage('Password should be at least 5 characters')
        .matches('[a-zA-Z]')
        .matches('[0-9]')
        .withMessage('Password must contain number and character'),
    body('password2').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match');
        }
        return true;
    }),
];

exports.loginValidation = [
    body('email')
        .not()
        .isEmpty()
        .withMessage('Email and Password are required')
        .trim()
        .isEmail()
        .withMessage('Please enter a valid email address')
        .normalizeEmail()
        .toLowerCase(),
    body('password').not().isEmpty().withMessage('Password field is required!'),
];

exports.courseInputValidation = [
    body('title')
        .not()
        .isEmpty()
        .withMessage('Title of the course is required.')
        .isString()
        .withMessage('Title should be combination of characters'),
    body('imageUrl')
        .not()
        .isEmpty()
        .withMessage('Image url of the course is required')
        .isURL()
        .withMessage('Please enter a valid url'),
    body(
        'universityName',
        'University name is required and it should be combination of characters'
    )
        .not()
        .isEmpty()
        .isString(),
    body('learningHours', 'Learning Hours is required').not().isEmpty(),
    body('duration', 'Duration is required').not().isEmpty(),
    body('price')
        .not()
        .isEmpty()
        .withMessage('Price is required')
        .isNumeric()
        .withMessage('Price should be number'),
    body('certificateUrl', 'certificate url is required')
        .not()
        .isEmpty()
        .isURL(),
    body('eligibilityCriteria')
        .not()
        .isEmpty()
        .withMessage('Eligibility criteria is required'),
];
