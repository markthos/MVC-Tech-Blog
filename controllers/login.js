const express = require("express");
const bcrypt = require("bcrypt");
const dayjs = require("dayjs");

// Adjust the path to your User model
const User = require("../models").User;

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    console.log(error);
    res.status(500).send("Fly you fools. Server Error");
  }
});

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ where: { email: email } });
    console.log(user);

    const id = user.dataValues.id;

    console.log("id " + id);
    const now = dayjs();

    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.save(() => {
        req.session.user_id = id;
        req.session.logged_in = true;
        req.session.user_name = user.first_name;
        req.session.last_logged = now;
        console.log("user id " + req.session.user_id + " logged in " + req.session.logged_in + " user name " + req.session.user_name);
        res.redirect(`/homepage`); // Redirect to associated page
      });// Store user ID in session
      console.log("user id " + req.session.user_id + " logged in " + req.session.logged_in + " user name " + req.session.user_name);
      

    } else {
      res.render("login", { error: "Invalid credentials" }); // Display error message
    }
  } catch (error) {
    res.render("login", { error: "An error occurred" }); // Display error message

  }
});


//to signup
router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
    });
    console.log(userData);
    // Set up sessions with a 'loggedIn' variable set to `true`
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.user_name = userData.first_name;
      res.redirect(`/homepage`); // Redirect to associated page
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// to logout
router.post('/logout', (req, res) => {
  console.log("is the logout route working?")
  if (req.session.logged_in) {
    // Remove the session variables
    req.session.destroy(() => {
      res.redirect('/homepage'); // Redirect to homepage
    });
  } else {
    res.status(404).end();
  }
});


module.exports = router;