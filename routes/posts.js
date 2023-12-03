const express = require("express");
const router = express.Router();

const prisma = require("../prisma");

router.get("/", async (req, res) => {
  try {
    const allPosts = await prisma.post.findMany();
    res.render("home", { title: "All the Posts", posts: allPosts });
  } catch (error) {
    res.json("Server Error");
  }
});
router.post("/", async (req, res) => {
  try {
    const { title, content, published } = req.body;
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        published,
      },
    });
    res.json(newPost);
  } catch (error) {
    res.json("Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const postID = await prisma.post.findUnique({
      where: {
        id: req.params.id,
      },
    });
    res.render("post", { title: postID.title, posts: postID });
  } catch (error) {
    res.json("Server Error");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { title, content, published } = req.body;
    const editPost = await prisma.post.update({
      where: {
        id: req.params.id,
      },
      data: {
        title,
        content,
        published,
      },
    });
    res.json(editPost);
  } catch (error) {
    res.json("Server Error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletePost = await prisma.post.delete({
      where: {
        id: req.params.id,
      },
    });
    res.json(deletePost);
  } catch (error) {
    res.json("Server Error");
  }
});
module.exports = router;
