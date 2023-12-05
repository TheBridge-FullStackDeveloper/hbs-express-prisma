const express = require("express");
const router = express.Router();

const prisma = require("../prisma");

router.get("/", async (req, res) => {
  try {
    const allPosts = await prisma.post.findMany();
    allPosts.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB - dateA;
    });
    res.render("home", { title: "All the Posts", posts: allPosts });
  } catch (error) {
    res.json("Server Error");
  }
});

router.get("/create", async (req, res) => {
  res.render("newPost", {title: "Create new post"})
})
router.post("/create", async (req, res) => {
  try {
    const { title, content, published } = req.body;
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        published: !!published,
      },
    });
    res.redirect("/posts");
  } catch (error) {
    res.json("Server Error");
  }
});

router.get("/edit/:id", async (req, res) => {
  const editID = await prisma.post.findUnique({
    where: {
      id: req.params.id,
    },
  });
  res.render("editPost", {title: editID.title, posts: editID})
})

router.put("/edit/:id", async (req, res) => {
  try {
    const { title, content, published } = req.body;
    const editPost = await prisma.post.update({
      where: {
        id: req.params.id,
      },
      data: {
        title,
        content,
        published: !!published,
      },
    });
    res.redirect(`/posts/${editPost.id}`);
  } catch (error) {
    res.json("Server Error");
  }
});

router.get("/delete/:id", async (req, res) => {
  const deleteID = await prisma.post.findUnique({
    where: {
      id: req.params.id,
    },
  });
  res.render("deletePost", {title: deleteID.title, posts: deleteID})
})

router.delete("/delete/:id", async (req, res) => {
  try {
    const deletePost = await prisma.post.delete({
      where: {
        id: req.params.id,
      },
    });
    res.redirect("/");
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


module.exports = router;
