// Import required modules
const express = require ('express');
const router = express.Router();
const prisma = require('../prisma/client');
const isAuthenticated = require('../middleware/isAuthenticated');

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
        res.render('profile', { title: 'Posts', user: user});
    } catch (e) {        console.log(e);
        res.json('Server error');
    }
});
router.get('/update', isAuthenticated, async (req, res) => {
    try {
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

router.put('/update', isAuthenticated, async (req, res) => {
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



module.exports = router;