const express = require("express");

// Adjust the path to your User model
const BlogPost = require("../../models").BlogPost;

const router = express.Router();

// get all users
router.get("/", async (req, res) => {
  try {
    const blogPostData = await BlogPost.findAll();
    res.status(200).json(blogPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get user by id
router.get("/:id", async (req, res) => {
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id);
    if (!blogPostData) {
      res.status(404).json({ message: "No blog posts with this id!" });
      return;
    }
    res.status(200).json(blogPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;