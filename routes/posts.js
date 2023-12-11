const express = require("express");
const router = express.Router();

const prisma = require("../prisma");

router.get("/", async (req, res) => {
  const allPosts = await prisma.post.findMany({});

  res.render("posts", { title: "posts", posts: allPosts });
});

router.get("/create", async (req, res) => {
  res.render("createForm", { title: "Create a post" });
});

router.post("/create", async (req, res) => {
  const { title, content } = req.body;
   await prisma.post.create({
    data: {
      title,
      content,
    },
  });
  res.redirect("/posts");
});


router.get("/update/:id", async (req, res) => {
  const { id } = req.params;
   const updateId = await prisma.post.findUnique({
    where: {
      id,
    },
  });

  res.render("editForm", { title: updateId.title, post: updateId });
});

router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
    await prisma.post.update({
    where: {
      id,
    },
    data: {
      ...req.body,
    },
  });
  res.redirect("/posts");
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

  res.render('postID', { title: findPost.title, post: findPost})
});

 


module.exports = router;
