const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const morgan = require('morgan');
const methodOverride = require('method-override');
const { create } = require('express-handlebars');

// Configuring Handlebars
const hbs = create({
  extname: 'hbs',
  defaultLayout: 'main',
  partialsDir: 'views/partials',
  helpers: require('./utils/helpers'), // Ensure this file exists if using helpers
});

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

// Set up Handlebars as the view engine
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');

// Import and use the routes
const router = require('./routes'); // Import routes from 'routes/index.js'
app.use('/', router); // Use router for all routes

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
