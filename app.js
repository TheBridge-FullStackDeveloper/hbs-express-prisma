const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const { create } = require('express-handlebars');
const session = require('express-session');
const passport = require('passport');

const app = express();

const PORT = process.env.PORT || 3000;

const hbs = create({
  extname: 'hbs',
  defaultLayout: 'main',
  partialsDir: 'views/partials',
  helpers: require('./utils/helpers'),
});

require('./config/passport'); 

app.use(session({
  secret: 'tu_clave_secreta',
  resave: false,
  saveUninitialized: false
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Middleware for Handlebars engine and view settings
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');

// Middleware for static files
app.use('/public', express.static('public'));

// Initialize and configure Passport
app.use(passport.initialize());
app.use(passport.session());

const router = require('./routes');
app.use('/', router);
app.use('/public', express.static('public'));


app.get('/', (req, res) => {
  res.render('home', {
      title: 'Home Page'
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
