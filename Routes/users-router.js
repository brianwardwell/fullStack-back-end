const express = require("express");
const useHelp = require("../models/usersHelpers");
const router = express.Router();

//create user
router.post("/", (req, res) => {
  console.log("Req Body!", req.body);
  
  useHelp
    .addUser(req.body)
    .then((added) => {
      res.status(200).json(added);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

//retrieve list of users
router.get("/", (req, res) => {
  useHelp
    .findAllUsers()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({ message: "Couldn't retrieve users" });
    });
});

//get specific user
router.get("/:id", (req, res) => {
  console.log('HERE?')
  const { id } = req.params;
  console.log('ID', id)
  
  useHelp
    .findById(id)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.status(500).json({ message: "couldn't find that user" });
    });
});

module.exports = router;
