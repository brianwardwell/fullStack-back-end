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
router
  .get("/", (req, res) => {
    useHelp.findAllUsers().then((users) => {
      res.json(users);
    })
    .catch((err) => {
        res.status(500).json({ message: "Couldn't retrieve users" });
  })
  
  });

//add note for a specific user

router.post('/:userId/notes', (req, res) => {
  
})

module.exports = router;
