const express = require('express');
const router = express.Router();
const postRoutes = require('./posts'); // Rutas de posts

// Usar las rutas de posts bajo el prefijo /posts
router.use('/posts', postRoutes);

module.exports = router;


