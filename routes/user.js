// Import required modules
const express = require ('express');
const router = express.Router();
const prisma = require('../prisma/client');
const isAuthenticated = require('../middleware/isAuthenticated');

// Display Posts from User
router.get('/', isAuthenticated, async (req, res) => {
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
        res.render('profile', { title: 'Profile', user: user});
    } catch (e) {
        console.log(e);
        res.json('Server error');
    }
});
// Display updateProfileForm 
router.get('/updateProfile', isAuthenticated, async (req, res) => {
    try {
        console.log(req.user.id)
        const user = await prisma.user.findUnique({
            where: {
                id: req.user.id,
            },
        });
        res.render('updateUserForm', { title: 'Update Profile', user: user });
    } catch (e) {
        console.log(e);
        res.json('Server error');
    }
});

// Update Profile
router.put('/updateProfile', isAuthenticated, async (req, res) => {
    try {
        const { email } = req.body;
        await prisma.user.update({
            where: {
                id: req.user.id,
            },
            data: {
                email: req.body.email,
            },
        });
        res.redirect('/posts');
    } catch (e) {
        console.log(e);
        res.json('Server error');
    }
});
// Display one post
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

// Display updateForm for Posts
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

// Update posts
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

// Delete posts
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

//  Delete Profile
router.delete('/delete', isAuthenticated, async (req, res) => {
    try{
        await prisma.user.delete({
            where: {
                id: req.user.id
            }
        })
        res.redirect('/auth/login');
    } catch (e) {
        console.log(e);
        res.json('Server error');
    }

})
module.exports = router;