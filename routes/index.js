const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// http://localhost:3000/test-navigation
// Crear un partial de navegación para navegar entre las vistas
router.get('/test-navigation', async (req, res) => {
  try {
    const posts = await prisma.post.findMany(); 
    res.render('posts', { 
      posts: posts
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});



// Crear la vista para crear y actualizar un post, con un formulario
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
  







// Ruta para mostrar el formulario de creación de un post http://localhost:3000/create-posts
router.get('/create-posts', (req, res) => {
  res.render('createPost');
});


//POST - /posts - Crear la ruta para crear un post
router.post('/create-posts', async (req, res) => {
  try {
    const { title, content, published } = req.body;
    const newPost = await prisma.post.create({
      data: {
        title, 
        content, 
        published: published || false 
      },
    });
    
    res.redirect('/postes');
  } catch (error) {
    res.status(500).send('Error al crear el post: ' + error.message);
  }
});


// ruta post id http://localhost:3000/poste/d47ce709-4e72-44ee-b5eb-76742753b996
// mas id por que si los borras luego no se ven e409851c-677e-46ce-90b0-840fbb8fa8c3,73c5f2b7-34d6-4c12-8b93-d63da7991531


router.get('/poste/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });
    if (!post) {
    
      res.status(404).render('notFound', { message: 'Post no encontrado' });
    } else {
   
      res.render('postDetails', { post });
    }
  } catch (error) {
    res.status(500).send('Error al obtener el post: ' + error.message);
  }
});


// ruta delete  http://localhost:3000/poste/d47ce709-4e72-44ee-b5eb-76742753b996
// varios id 0627252a-1041-4bde-af58-8d645aa5bef2,db1474c8-29de-46bb-8140-82d80e356d91
router.delete('/posta/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.post.delete({
      where: {
        id: id,
      },
    });
  
    res.redirect('/postes');
  } catch (error) {
  
    res.status(500).send('Error al eliminar el post: ' + error.message);
  }
});






//handlebars post http://localhost:3000/hbs
//Crear la vista para mostrar todos los posts

router.get('/hbs', async (req, res) => {
    try {
      const posts = await prisma.post.findMany();
      res.render('posts', { posts }); 
    } catch (error) {
      res.status(500).send('Error al obtener los posts: ' + error.message);
    }
  });


//post id  http://localhost:3000/posts-alt/73c5f2b7-34d6-4c12-8b93-d63da7991531
//Crear la vista para mostrar un post
router.get('/posts-alt/:id', async (req, res) => {
    try {
     
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


//GET - /posts - Crear la ruta para obtener todos los posts
//http://localhost:3000/postes
  router.get('/postes', async (req, res) => {
    try {
      const posts = await prisma.post.findMany();
      res.render('postes', { posts }); 
    } catch (error) {
      res.status(500).send('Error al obtener los posts: ' + error.message);
    }
  });
  



module.exports = router;
