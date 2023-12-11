const express = require('express');
const router = express.Router();

const prisma = require ('../prisma');



router.get('/', async (req, res) => {
        const allPost = await prisma.post.findMany({});

        res.render('home', {title: 'post', post: allPost});
});

router.get('/create', async (req, res) => {
res.render('create', {title: 'Create a Post'})
});

router.post('/create', async (req, res) => {
    const { title, content} = req.body;
        await prisma.post.create({
            data: {
    title, 
    content,
    
            },
        });
        res.redirect('/posts');
    });

router.get('/update/:id', async (req, res) => {
const { id } = req.params;
const updatedPost = await prisma.post.findUnique({
    where: {
        id,
    },
});
res.render('updateid', {title: updatedPost?.title, post: updatedPost });
});

router.put('/update/:id', async (req, res) => {
    const {id} = req.params;

    await prisma.post.update ({
        where: {
            id,
        },
        data: {
            ...req.body,
        },
}); 
res.redirect('/posts');
});

router.delete('/delete/:id', async(req, res) => {
    const {id} = req.params;

    await prisma.post.delete({
        where: {
            id,
        },
    });
    res.redirect('/posts');
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const findPost = await prisma.post.findUnique({
        where: {
            id,
        },
    });

    res.render('idpost', { title: findPost?.title, post: findPost})
});







module.exports = router;