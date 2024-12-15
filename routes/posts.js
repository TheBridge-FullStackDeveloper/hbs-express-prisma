const express = require('express');
const router = express.Router();
const prisma = require("../prisma"); // Make sure Prisma client is correctly set up

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await prisma.post.findMany();
    res.render('posts', { posts }); // Render all posts in a 'posts' view
  } catch (error) {
    console.log(error);
    res.status(500).send('Error fetching posts');
  }
});

// Get a single post by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const post = await prisma.post.findUnique({ where: { id } });
    if (post) {
      res.render('post', { post }); // Render a single post in a 'post' view
    } else {
      res.status(404).send('Post not found');
    }
  } catch (error) {
    res.status(500).send('Error fetching the post');
  }
});

// Create a new post
router.post('/', async (req, res) => {
  const { title, content } = req.body;
  try {
    const newPost = await prisma.post.create({
      data: { title, content },
    });
    res.redirect('/posts'); // Redirect to the posts page after creation
  } catch (error) {
    console.log(error);
    res.status(500).send('Error creating the post');
  }
});

// Update a post
router.put('/:id', async (req, res) => {
  const { id } = req.params; 
  const { title, content } = req.body;
  try {
    const updatedPost = await prisma.post.update({
      where: { id },
      data: { title, content },
    });
    res.redirect(`/posts/${id}`); // Redirect to the updated post's page
  } catch (error) {
    res.status(500).send('Error updating the post');
  }
});

// Delete a post
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.post.delete({ where: { id } });
    res.redirect('/posts'); // Redirect to the posts page after deletion
  } catch (error) {
    res.status(500).send('Error deleting the post');
  }
});

//Faker
const { faker } = require('@faker-js/faker');

// Randomly generate a new post
router.get('/faker', async (req,res) => { 
  const fakePost = {
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraph(),
    published: faker.datatype.boolean(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  };
  res.json(fakePost); // Return the generated post as JSON
})

module.exports = router;


