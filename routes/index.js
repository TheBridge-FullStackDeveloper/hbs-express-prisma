const express = require("express");
const router = express.Router();

const postsRoutes = require("./posts");
router.use("/posts", postsRoutes);

module.exports = router;
