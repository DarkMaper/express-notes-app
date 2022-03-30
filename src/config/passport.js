const passport = require('passport');
const { Strategy } = require('passport-local');

const User = require('../models/Users');

passport.use('local', new Strategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const user = await User.findOne({ username });

    if(!user) return done(null, false, req.flash('error', 'El usuario o la contraseña son incorrectos.'));

    const passwordMatch = await user.checkPassword(password);

    if(!passwordMatch) {
        return done(null, false, req.flash('error', 'El usuario o la contraseña son incorrectos.'));
    }

    return done(null, user._id);
}))

passport.serializeUser((user, done) => {
    done(null, user._id);
})

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id).select('-password').lean();
    done(null, user);
})