const express = require("express");
const router = express.Router();
const prisma = require("../prisma");

// GET - /posts - Crear la ruta para obtener todos los posts

router.get("/", async (req, res) => {
  try {
    const posts = await prisma.post.findMany();
    res.render("allPosts", { title: "Cristina", posts: posts });
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});

// POST - /posts - Crear la ruta para crear un post

router.get("/create", async (req, res) => {
  try {
    res.render("postFormCreate", { title: "Create a new post" });
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});

router.post("/create", async (req, res) => {
  try {
    const { title, content, published } = req.body;
    const isPublished = published === "on" ? true : false;
    await prisma.post.create({
      data: {
        title,
        content,
        published: isPublished,
      },
    });
    res.redirect("/posts");
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});

// GET - /posts/:id - Crear la ruta para obtener un post por su id

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const postById = await prisma.post.findUnique({
      where: {
        id,
      },
    });
    res.render("singlePost", { title: postById.title, post: postById });
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});

//PUT - /posts/:id - Crear la ruta para actualizar un post por su id

router.get("/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const postById = await prisma.post.findUnique({
      where: {
        id,
      },
    });
    res.render("postFormUpdate", { title: "Update a post", post: postById });
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const { title, content, published } = req.body;
    const isPublished = published === "on" ? true : false;
    await prisma.post.update({
      where: { id: req.params.id },
      data: {
        title,
        content,
        published: isPublished,
      },
    });
    res.redirect("/posts");
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});

//DELETE - /posts/:id - Crear la ruta para eliminar un post por su id

router.delete("/delete/:id", async (req, res) => {
  try {
    await prisma.post.delete({
      where: { id: req.params.id },
    });
    res.redirect("/posts");
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});

module.exports = router;
