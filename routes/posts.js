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
// router.get('/profile', isAuthenticated, async (req, res) => {
//     try {
//         const userId = req.user.id;
//         const user = await prisma.user.findUnique({
//             where: {
//                 id: userId,
//             },
//             include: {
//                 posts: true,
//             },
//         });
//         res.render('profile', { title: 'Posts', user: user});
//     } catch (e) {
//         console.log(e);
//         res.json('Server error');
//     }
// });

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

// Update a post
router.put('/update/:id', isAuthenticated, async (req, res) => {
    try {
        const { title, content } = req.body;
        const post = await prisma.post.findUnique({
            where: {
                id: req.params.id
            }
        })
        if(post.authorId === req.user.id){
            const post = await prisma.post.update({
                where: {
                    id: req.params.id,
                },
                data: {
                    title: req.body.title,
                    content: req.body.content,
                },
            });
        }
        res.redirect('/posts');
    } catch (e) {
        console.log(e);
        res.json('Server error');
    }
});

// Delete a post
router.delete('/delete/:id', isAuthenticated, async (req, res) => {
    try {
        const post = await prisma.post.findUnique({
            where: {
                id: req.params.id
            }
        })
        if(post.authorId === req.user.id){
        await prisma.post.delete({
            where: {
                id: req.params.id,
            },
        });
        }
        res.redirect('/posts');
    } catch (e) {
        console.log(e);
        res.json('Server error');
    }
});

// Display the post update form
router.get('/update/:id',isAuthenticated, async (req, res) => {
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
router.get('/:id', isAuthenticated, async (req, res) => {
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