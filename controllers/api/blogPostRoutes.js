const express = require("express");
const { Comments } = require("../../models");
const dayjs = require("dayjs");

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
    const blogPostData = await BlogPost.findByPk(req.params.id,
        {
            include: [{model: Comments}],
        }
    );
    if (!blogPostData) {
      res.status(404).json({ message: "No blog posts with this id!" });
      return;
    }
    res.status(200).json(blogPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new blog post
router.post("/", async (req, res) => {
  try {
    const now = dayjs();
    const blogPostData = await BlogPost.create({
      ...req.body,
      owner_id: req.session.user_id,
      date_created: now,
    });
    res.status(200).json(blogPostData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update blog post by id
router.put("/:id", async (req, res) => {
  console.log("update blog post by id")
  try {
    const blogPostData = await BlogPost.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!blogPostData) {
      res.status(404).json({ message: "No blog posts with this id!" });
      return;
    }
    res.status(200).json(blogPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete blog post by id
router.delete("/:id", async (req, res) => {
  try {
    const blogPostData = await BlogPost.destroy({
      where: {
        id: req.params.id,
      },
    });
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