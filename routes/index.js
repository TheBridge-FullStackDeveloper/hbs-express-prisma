const express = require('express');
const router = express.Router();

const postRoutes = require("./post")

router.use('/posts', postRoutes)


module.exports = router;
