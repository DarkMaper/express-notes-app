const isLoggedIn = (req, res, next) => {
    const isLogged = req.user ? true : false;

    if(!isLogged) return res.redirect('/signin');
    next();
}

module.exports = {
    isLoggedIn
}