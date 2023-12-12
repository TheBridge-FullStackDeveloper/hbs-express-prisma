const { create } = require('express-handlebars');
const hbs = create({
    extname: 'hbs',
    defaultLayout: 'main',
    partialsDir: 'views/partials',
    helpers: require('./utils/helpers'),
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');