
const express = require('express');
const router = express.Router();
const prisma = require('../prisma/client');

router.get('/', (req, res) => {
  res.send('Este es el inicio de la página');

})

router.get('/posts', async (req, res) => {
    const posts = await prisma.post.findMany();
    return res.render('posts/index', { posts });
});



router.route('/posts/create')
  .get((req, res) => {

    res.render('posts/create');
  })
  .post(async (req, res) => {
    try {
      const { title, content, published } = req.body;

      await prisma.post.create({
        data: { title, content, published: published === 'on' },
      });

      res.redirect('/posts');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al crear el post');
    }
  });

  

router.get('/posts/:id', async (req, res) => {
    const post = await prisma.post.findUnique({
      where: { id: req.params.id }
    });
    res.render('posts/show', { post });
  });

router.put('/posts/:id', async (req, res) => {
    const { title, content } = req.body;
    const updatedPost = await prisma.post.update({
      where: { id: req.params.id },
      data: { title, content }
    });
    res.render('posts/show', { post: updatedPost });
  });

router.delete('/posts/:id', async (req, res) => {
    await prisma.post.delete({
      where: { id: req.params.id }
    });
    res.redirect('/posts');
  });
  

module.exports = router;