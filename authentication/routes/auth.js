const express = require('express');
const validator = require('express-validator');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login',
    [
        validator
            .check('email', 'Please enter a valid email.')
            .isEmail()
            .normalizeEmail(),
        validator
            .check('password', 'Password must be at least 8 characters long.')
            .isLength({ min: 8 })
            .trim()
    ],
    authController.postLogin);

router.post('/signup',
    [
        validator
            .check('email', 'Please enter a valid email.')
            .isEmail()
            .normalizeEmail()
            .custom((value, { req }) => {
                return User.findOne({
                    email: value
                }).then(userDoc => {
                    if (userDoc) {
                        return Promise.reject('Email already exists!');
                    }
                })
            }),
        validator
            .check('password', 'Password must be at least 8 characters long.')
            .isLength({ min: 8 })
            .trim(),
        validator
            .body('confirmPassword')
            .trim()
            .custom((value, { req }) => {
                if (value !== req.body.password) throw new Error('Passwords do not match');
                return true;
            })
    ],
    authController.postSignup);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;