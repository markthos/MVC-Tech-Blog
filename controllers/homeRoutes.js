const router = require('express').Router();
const { BlogPost, User, Comments } = require('../models');
// const withAuth = require('../utils/auth');
const Sequelize = require('sequelize');
const dayjs = require('dayjs');

// Takes you to the landing page
router.get("/", async (req, res) => {
    try {
      res.render("landingpage", {
        user_name: req.session.user_name,
        logged_in: req.session.logged_in,
        last_logged: req.session.last_logged,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("Fly you fools. Server Error");
    }
  });


// Takes you to the login page
router.get("/login", async (req, res) => {
    try {
      res.render("login");
    } catch (error) {
      console.log(error);
      res.status(500).send("Fly you fools. Server Error");
    }
  });

  // Takes you to the signup page
router.get("/signup", async (req, res) => {
    try {
      res.render("signup");
    } catch (error) {
      console.log(error);
      res.status(500).send("Fly you fools. Server Error");
    }
  });

// Takes you to the homepage
router.get("/homepage", async (req, res) => {
    try {
      const blogData = await BlogPost.findAll({
        include: [
          {
            model: User,
            attributes: ["first_name", "last_name"],
          },
        ],
      });
      const blogs = blogData.map((blog) => blog.get({ plain: true }));
      res.render("homepage", {
        blogs,
        user_name: req.session.user_name,
        logged_in: req.session.logged_in,
        last_logged: req.session.last_logged,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("Fly you fools. Server Error");
    }
  });

  module.exports = router;