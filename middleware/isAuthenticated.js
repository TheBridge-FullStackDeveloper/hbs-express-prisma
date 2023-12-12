function isAuthenticated(req, res, next) {
    if (req.user) {
        return next();
    }
    res.redirect('/auth/login-page');
}

module.exports = isAuthenticated;