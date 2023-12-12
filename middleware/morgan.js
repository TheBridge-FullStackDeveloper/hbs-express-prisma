// Import the morgan middleware for logging
const morgan = require('morgan');

module.exports = (app) => {
    app.use(morgan('dev'));
};