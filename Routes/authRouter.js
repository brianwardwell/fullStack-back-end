const express = require("express");
const router = express.Router();
const useHelp = require("../models/usersHelpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret = require("../api/secret");

//base endpoint is /api/users
//create user
router.post("/signIn", (req, res) => {  
  //create hash using bcrypt for registration
  const user = req.body;
  const rounds = 12;
  const hash = bcrypt.hashSync(user.password, rounds);
  user.password = hash;
  console.log("hash", user.password);

  useHelp
    .addUser(user)
    .then((added) => {
      console.log("USER", user);
      res.status(200).json({ message: `added user ${added}` });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  useHelp
    .findUser(username)
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: "Welcome: ", token });
      } else {
        res.status(401).json({ message: "Login doesn't match" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
