const express = require("express");
const router = express.Router();

// tus rutas aqui
const prisma = require("../prisma");

//GET - /posts - Crear la ruta para obtener todos los posts
//Crear la vista para mostrar todos los posts

router.get("/posts", async (req, res) => {
  try {
    const posts = await prisma.post.findMany();
    //res.json(posts);
    res.render('home', { title: 'Posts', posts: posts});
    console.log("Getting all posts");
    console.log(posts);
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});

//POST - /posts - Crear la ruta para crear un post

router.post("/posts", async (req, res) => {
  try {
    const newPost = await prisma.post.create({
      data: {
        title: req.body.title,
        content: req.body.content,
        published: req.body.published,
      },
    });
    res.json(newPost);
    console.log("Creating one post");
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});

//GET - /posts/:id - Crear la ruta para obtener un post por su id
//Crear la vista para mostrar un post

router.get("/posts/:id", async (req, res) => {
  try {
    const postById = await prisma.post.findUnique({
      where: {
        id: req.params.id,
      },
    });
    res.json(postById);
    console.log("Getting one post by ID");
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});

//PUT - /posts/:id - Crear la ruta para actualizar un post por su id

router.put("/posts/:id", async (req, res) => {
  try {
    const updatedPost = await prisma.post.update({
      where: { id: req.params.id },
      data: { title: req.body.title },
    });
    res.json(updatedPost);
    console.log("Updating one post by ID");
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});

//DELETE - /posts/:id - Crear la ruta para eliminar un post por su id

router.delete("/posts/:id", async (req, res) => {
  try {
    const deletedPost = await prisma.post.delete({
      where: { id: req.params.id },
    });
    res.json(deletedPost);
    console.log("Deleting one post by ID");
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});

module.exports = router;
