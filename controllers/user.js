const express = require("express");
const router = express.Router();
const post = require("../models/post.js");
const user = require("../models/user.js");
const session = require("express-session");
const bcrypt = require("bcrypt");

router.get("/json", (req, res) => {
  user.find((err, router) => {
    res.send(router);
  });
});

router.get("/seed", (req, res) => {
  user.create(
    {
      username: "PocklePickle",
      posts: [],
      subs: []
    },
    (error, data) => {
      res.redirect("/");
    }
  );
});

router.get("/", (req, res) => {
  user.find({}, (error, allusers) => {
    res.render("indexUser.ejs", {
      currentUser: req.session.currentUser,
      users: allusers
    });
  });
});
router.get("/new", (req, res) => {
  res.render("users/new.ejs", {
    currentUser: req.session.currentUser
  });
});

router.get("/:id", (req, res) => {
  user.findById(req.params.id, (err, selectedUser) => {
    res.render("showUser.ejs", {
      currentUser: req.session.currentUser,
      sUser: selectedUser,
      post: post
    });
  });
});

router.get("/:id", (req, res) => {
  user
    .findById(req.params.id)
    .populate("posts")
    .exec((err, selectedUser) => {
      res.render("showUser.ejs", {
        currentUser: req.session.currentUser,
        user: selectedUser //pass in selected post
      });
    });
});

router.post("/", (req, res) => {
  //overwrite the user password with the hashed password, then pass that in to our database
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  user.create(req.body, (err, createdUser) => {
    res.redirect("/");
  });
});

module.exports = router;
