const express = require('express');
const router = express.Router();

const posts = require('./posts');
const auth = require('./auth')
const user = require('./user')

router.use('/posts', posts);
router.use('/auth', auth)
router.use('/user', user)

module.exports = router;
