const User = require('../models/Users');

const renderLoginForm = (req, res) => {
    res.render('signin');
}

const renderSignupForm = (req, res) => {
    res.render('signup');
}

const logout = (req, res) => {
    req.logout();
    res.redirect('/signin');
}

module.exports = {
    renderLoginForm,
    renderSignupForm,
    logout
}