const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



router.get('/test-navigation', async (req, res) => {
  try {
    const posts = await prisma.post.findMany(); // Replace 'post' with your actual model name
    res.render('posts', { // 'posts.hbs' should be the name of your view that lists posts
      posts: posts
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});




router.get('/postforms/new', (req, res) => {
    console.log("entro")
    res.render('postforms', {
      pageTitle: 'Crear un nuevo post',
      formAction: '/posts', 
      post: {} 
    });
  });

  router.post('/posts', (req, res) => {
    
    const newPost = {
      title: req.body.title,
      content: req.body.content
    };

    res.redirect('/posts'); 
  });
  




// Ruta para obtener todos los posts
router.get('/posts', async (req, res) => {
  try {
    const posts = await prisma.post.findMany(); 
    res.json(posts);
  } catch (error) {
    res.status(500).send('Error al obtener los posts: ' + error.message);
  }
});


//ruta post 

router.post('/create-posts', async (req, res) => {
    try {
      const { title, content, published } = req.body;
      const newPost = await prisma.post.create({
        data: {
            "title": "Título del Post",
            "content": "Contenido del Post",
            "published": true
          },
          
      });
      res.json(newPost);
    } catch (error) {
      res.status(500).send('Error al crear el post: ' + error.message);
    }
  });

// ruta post id http://localhost:3000/poste/f11d057a-a223-4f17-9ccd-06744766a179

router.get('/poste/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const post = await prisma.post.findUnique({
        where: {
          id: id,
        },
      });
      if (!post) {
        res.status(404).json({ message: 'Post no encontrado' });
      } else {
        res.json(post);
      }
    } catch (error) {
      res.status(500).send('Error al obtener el post: ' + error.message);
    }
  });

// ruta delete  http://localhost:3000/posta/9c41b9ee-5f2a-47ed-b7ab-154b2a32da8b
  router.delete('/posta/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const deletedPost = await prisma.post.delete({
        where: {
          id: id,
        },
      });
      if (!deletedPost) {
        res.status(404).json({ message: 'Post no encontrado' });
      } else {
        res.json({ message: 'Post eliminado correctamente' });
      }
    } catch (error) {
      res.status(500).send('Error al eliminar el post: ' + error.message);
    }
  });

//handlebars post http://localhost:3000/hbss

router.get('/hbs', async (req, res) => {
    try {
      const posts = await prisma.post.findMany();
      res.render('posts', { posts }); 
    } catch (error) {
      res.status(500).send('Error al obtener los posts: ' + error.message);
    }
  });


//post id  http://localhost:3000/posts-alt/73c5f2b7-34d6-4c12-8b93-d63da7991531
router.get('/posts-alt/:id', async (req, res) => {
    try {
      // Aquí debes obtener el post con el ID proporcionado desde la base de datos
      const postId = req.params.id;
      const post = await prisma.post.findUnique({
        where: {
          id: postId,
        },
      });

      if (!post) {
        // Manejo de error si el post no se encuentra
        return res.status(404).send('Post no encontrado');
      }

      res.render('postid', { post });
    } catch (error) {
      res.status(500).send('Error al obtener el post: ' + error.message);
    }
  });





module.exports = router;
