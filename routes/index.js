const express = require('express');
const router = express.Router();

router.use('/posts', require('./posts'));

// tus rutas aqui

module.exports = router;
