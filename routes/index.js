const express = require('express');
const router = express.Router();

const posts = require('./posts');
// tus rutas aqui
router.use('/posts', posts);

module.exports = router;
