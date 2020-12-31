const express = require("express");
const router = express.Router();
const useHelp = require("../models/usersHelpers");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

const secret = require('../api/secret')


//create user
router.post("/signIn", (req, res) => {
    const user = req.body;
    const rounds = 12;
    const hash = bcrypt.hashSync(user.password, rounds)
    user.password = hash
    console.log('hash', user.password)

    useHelp
      .addUser(user)
      .then((added) => {
        console.log('USER', user)
        res.status(200).json({message: `added user ${added}`});
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  });

  module.exports = router