// Define a middleware function for checking user authentication
function isAuthenticated(req, res, next) {
    if (req.user) {
        return next(); // If authenticated, proceed to the next middleware or route handler
    }
    res.redirect('/auth/login-page'); // If not authenticated, redirect to the login page
}

module.exports = isAuthenticated;
