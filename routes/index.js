const express = require('express');
const router = express.Router();

const posts = require('./posts');
const auth = require('./auth')

router.use('/posts', posts);
router.use('/auth', auth)

module.exports = router;
