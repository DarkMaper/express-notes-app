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

const signup = async (req, res) => {
    const { firstName, lastName, username, password, password2 } = req.body;

    const user = await User.findOne({ username });

    if(user) {
        req.flash('error', 'El nombre de usuario ya está en uso.');
        return res.render('signup', { firstName, lastName, errorMsg: req.flash('error') });
    }

    if(password !== password2) {
        req.flash('error', 'Las contraseñas no coinciden.');
        return res.render('signup', { firstName, lastName, username, errorMsg: req.flash('error') });
    }

    const newUser = User({
        firstName,
        lastName,
        username,
        password
    });

    await newUser.save();

    req.flash('success', 'Se ha creado correctamente su cuenta.');
    res.redirect('/signin');
}

module.exports = {
    renderLoginForm,
    renderSignupForm,
    logout,
    signup
}