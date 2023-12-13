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

// Display All Posts from User
router.get('/profile', isAuthenticated, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                posts: true,
            },
        });
        res.render('home', { title: 'Posts', user: user});
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
router.post('/create', async (req, res) => {
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

// Update a post
router.put('/update/:id', isAuthenticated, async (req, res) => {
    try {
        const { title, content } = req.body;
        const post = await prisma.post.update({
            where: {
                id: req.params.id,
            },
            data: {
                title: req.body.title,
                content: req.body.content,
            },
        });
        res.render('update', { title: 'Update', post: post });
        res.redirect('/posts');
    } catch (e) {
        console.log(e);
        res.json('Server error');
    }
});

// Delete a post
router.delete('/delete/:id', async (req, res) => {
    try {
        await prisma.post.delete({
            where: {
                id: req.params.id,
            },
        });
        res.redirect('/posts');
    } catch (e) {
        console.log(e);
        res.json('Server error');
    }
});

// Display the post update form
router.get('/update/:id', async (req, res) => {
    try {
        const post = await prisma.post.findUnique({
            where: {
                id: req.params.id,
            },
        });
        res.render('updateForm', { title: 'Update', post: post });
    } catch (e) {
        console.log(e);
        res.json('Server error');
    }
});

// Display a single post
router.get('/:id', async (req, res) => {
    try {
        const post = await prisma.post.findUnique({
            where: {
                id: req.params.id,
            },
        });
        res.render('post', { title: 'Post', post: post });
    } catch (e) {
        console.log(e);
        res.json('Server error');
    }
});


module.exports = router;