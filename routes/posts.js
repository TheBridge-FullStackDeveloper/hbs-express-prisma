const express = require ('express');
const router = express.Router();

const prisma = require('../prisma/client');

router.get('/', async (req, res) => {
    const posts = await prisma.post.findMany();
    res.render('posts', {title: 'Posts', post: posts});
});

router.get('/create', async (req, res) => {
    res.render('postForm', {title: 'Create a post'})
})

router.post('/create', async (req, res) => {
    const {title, content} = req.body;
    await prisma.post.create({
        data: {
            title,
            content,
        }
    })
    res.redirect('/posts')
})

router.get('/:id', async (req, res) => {
    const post = await prisma.post.findUnique({
        where: {
            id: req.params.id,
        }
    })
    res.render('post',  {ttile: 'Post',post: post})
})

module.exports = router;