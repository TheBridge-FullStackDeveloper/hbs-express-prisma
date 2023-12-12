// Import required modules
const { create } = require('express-handlebars');

// Export a function that configures Handlebars for Express
module.exports = (app) => {
    const hbs = create({ // Create Handlebars instance with custom settings
        extname: 'hbs',
        defaultLayout: 'main',
        partialsDir: 'views/partials',
        helpers: require('../utils/helpers'),
    });

    // Configure Handlebars engine and view settings for Express app
    app.engine('hbs', hbs.engine);
    app.set('view engine', 'hbs');
    app.set('views', './views');
};
