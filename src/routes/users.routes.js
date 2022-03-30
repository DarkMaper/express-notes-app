const express = require('express');
const router = express.Router();
const passport = require('passport');
const { renderLoginForm, renderSignupForm, logout, signup } = require('../controllers/users.controllers');

router.get('/signin', renderLoginForm);
router.post('/signin', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signin',
    failureFlash: true
}));
router.get('/signup', renderSignupForm);
router.post('/signup', signup);

router.get('/logout', logout);

module.exports = router;