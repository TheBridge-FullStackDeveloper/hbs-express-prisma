const hbs = require('hbs');

hbs.registerHelper('formatDate', function(date) {
  return new Date(date).toLocaleDateString('DD/MM/YYYY'); 
});

module.exports = {};
