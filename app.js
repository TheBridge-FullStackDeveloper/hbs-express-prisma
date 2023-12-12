// Import necessary modules
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Import middleware and libraries
const morgan = require('./middleware/morgan'); 
const handlebars = require('./middleware/handlebars');

const methodOverride = require('method-override');
const session = require('express-session'); 
const passport = require('passport'); 

// Load Passport configuration from config file
require('./config/passport');

// Configure session middleware
app.use(session({
  secret: 'tu_clave_secreta',
  resave: false,
  saveUninitialized: false
}));

// Configure middleware for request logging, parsing, and method override
morgan(app);
handlebars(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Configure middleware for serving static files
app.use('/public', express.static('public'));

// Initialize and configure Passport authentication
app.use(passport.initialize());
app.use(passport.session());

// Import routes from routes file and mount them
const router = require('./routes');
app.use('/', router);

// Define middleware for handling the homepage route
app.get('/', (req, res) => {
  res.render('home');
});

// Start the server on specified port
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
})
