const express = require('express');
const router = express.Router();

router.use('/posts', require('./posts'));

router.get('/', (req, res) => {
    res.render('home', {
        title: 'Home Page',
        isMainPage: true
    });
});

module.exports = router;
