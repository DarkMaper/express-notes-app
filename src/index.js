require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const { create } = require('express-handlebars');
const { join } = require('path');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const db = require('./database');
const UserRoutes = require('./routes/users.routes');
const NoteRoutes = require('./routes/notes.routes');

require('./config/passport');

const app = express();

// Variables

const hbs = create({
    partialsDir: join(__dirname, 'views', 'partials'),
    layoutsDir: join(__dirname, 'views', 'layouts'),
    defaultLayout: 'main.hbs',
    extname: '.hbs'
})

// Configs

app.set('port', process.env.PORT || 3000);
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', join(__dirname, 'views'));
app.use(express.static(join(__dirname, 'public')));
app.use(flash());
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        client: db
    }),
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 8 * 1
    }
}));
app.use(passport.initialize());
app.use(passport.session());

// Middlewares

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride(function(req, res) {
    if(req.body && '_method' in req.body) {
        let method = req.body._method;
        delete req.body._method;
        return method;
    }
}))

// Globals
app.use((req, res, next) => {
    app.locals.user = req.user;
    app.locals.loggedIn = req.user ? true : false;
    app.locals.errorMsg = req.flash('error');
    app.locals.successMsg = req.flash('success');
    app.locals.infoMsg = req.flash('info');
    app.locals.warningMsg = req.flash('warning');
    next();
})

// Routes

app.use('/', UserRoutes);
app.use('/', NoteRoutes);

app.use('*', (req, res) => {
    res.render('error/404.hbs');
})

// Listen server
app.listen(app.get('port'));
console.log('Listening in port', app.get('port'));