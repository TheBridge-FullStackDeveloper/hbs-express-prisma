// Import necessary modules
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const prisma = require('./prisma/client')

// Handlebars
const { create } = require('express-handlebars');
const hbs = create({ // Create Handlebars instance with custom settings
  extname: 'hbs',
  defaultLayout: 'main',
  partialsDir: 'views/partials',
  helpers: require('./utils/helpers'),
});

// Guardamos la sesion del usuario y lo autenticamos - Gracias a passport tenemos: req.user (datos del usuario)
const session = require('express-session'); 
const passport = require('passport'); 
app.use(session({ // Configure session middleware
  secret: 'tu_clave_secreta',
  resave: false,
  saveUninitialized: false
}));
app.use(express.json()); // Para parsear datos del body en formato.json
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

// Configuración de Handlebars como motor de vistas
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');

// Configuración de Passport (autenticación)
require('./config/passport');

// Import middleware and libraries
const morgan = require('morgan');
const methodOverride = require('method-override');

// Configure middleware for request logging, parsing, and method override
app.use(morgan('dev'));
app.use(methodOverride('_method'));

// Configure middleware for serving static files
app.use('/public', express.static('public'));

// Import routes from routes file and mount them
const router = require('./routes');
app.use('/', router);

// Start the server on specified port
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
})
