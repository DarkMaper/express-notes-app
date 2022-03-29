const passport = require('passport');
const { Strategy } = require('passport-local');

const User = require('../models/Users');

passport.use('local', new Strategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const user = await User.findOne({ username });

    if(!user) return done(null, false);

    const passwordMatch = await user.checkPassword(password);

    if(!passwordMatch) {
        return done(null, false);
    }

    return done(null, user._id);
}))

passport.use('local-signup', new Strategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const user = await User.findOne({ username });

    if(user) return done(null, false);

    const { firstName, lastName, password2 } = req.body;
    if(password !== password2) return done(null, false);

    const newUser = User({ firstName, lastName, username, password});

    await newUser.save();

    done(null, newUser);
}))

passport.serializeUser((user, done) => {
    done(null, user._id);
})

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id).select('-password').lean();
    done(null, user);
})