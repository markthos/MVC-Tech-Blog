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

// Takes you to the homepage.handlebars which renders all the current blog posts that have been made

router.get("/homepage", async (req, res) => {
    try {
      const blogData = await BlogPost.findAll({
        include: [
          {
            model: User,
            attributes: ["first_name", "last_name"],
          },
          {
            model: Comments,
            include: [
              {
                model: User,
                attributes: ["first_name", "last_name"],
              },
            ],
          }
        ],
        order: [["date_created", "DESC"]],
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

// Takes you to the dashboard.handlebars which renders all the blog posts that the user has made

router.get("/dashboard", async (req, res) => {
    try {
      const blogData = await BlogPost.findAll({
        where: {
          owner_id: req.session.user_id,
        },
        include: [
          {
            model: User,
            attributes: ["first_name", "last_name"],
          },
        ],
        order: [["date_created", "DESC"]],
      });
      const blogs = blogData.map((blog) => blog.get({ plain: true }));
      res.render("dashboard", {
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