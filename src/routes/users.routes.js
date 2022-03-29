const express = require('express');
const router = express.Router();
const passport = require('passport');
const { renderLoginForm, renderSignupForm, logout } = require('../controllers/users.controllers');

router.get('/signin', renderLoginForm);
router.post('/signin', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signin',
}));
router.get('/signup', renderSignupForm);
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/signin',
    failureMessage: '/signup'
}))

router.get('/logout', logout);

module.exports = router;