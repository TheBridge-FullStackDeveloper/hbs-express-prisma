
const express = require('express');
const router = express.Router();
const prisma = require('../prisma/client');

router.get('/posts', async (req, res) => {
    const posts = await prisma.post.findMany();
    return res.render('posts/index', { posts });
});

router.post('/posts', async (req, res) => {
    const { title, content } = req.body;
    await prisma.post.create({
      data: { title, content, published: true }
    });
    res.redirect('/posts');
  });

router.get('/posts/:id', async (req, res) => {
    const post = await prisma.post.findUnique({
      where: { id: req.params.id }
    });
    res.render('posts/show', { post });
  });

router.put('/posts/:id', async (req, res) => {
    const { title, content } = req.body;
    await prisma.post.update({
      where: { id: req.params.id },
      data: { title, content }
    });
    res.redirect(`/posts/${req.params.id}`);
  });

router.delete('/posts/:id', async (req, res) => {
    await prisma.post.delete({
      where: { id: req.params.id }
    });
    res.redirect('/posts');
  });
  

module.exports = router;