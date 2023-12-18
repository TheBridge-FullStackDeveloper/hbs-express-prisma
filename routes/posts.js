// Import required modules
const express = require ('express');
const router = express.Router();
const prisma = require('../prisma/client');
const isAuthenticated = require('../middleware/isAuthenticated');

// Display All Posts
router.get('/', isAuthenticated, async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            include: {
                author: true,
            },
        });
        res.render('posts', { title: 'Posts', posts: posts});
    } catch (e) {
        console.log(e);
        res.json('Server error');
    }
});

// Display the post creation form
router.get('/create', isAuthenticated, async (req, res) => {
    try {
        res.render('postForm', { title: 'Create a post' });
    } catch (e) {
        console.log(e);
        res.json('Server error');
    }
});

// Creation a new post
router.post('/create', isAuthenticated, async (req, res) => {
    try {
        const { title, content } = req.body;
        const authorId = req.user.id;
        await prisma.post.create({
            data: {
                title,
                content,
                authorId
            },
        });
        res.redirect('/posts');
    } catch (e) {
        console.log(e);
        res.json('Server error');
    }
});

module.exports = router;