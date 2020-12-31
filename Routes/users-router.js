const express = require("express");
const useHelp = require("../models/usersHelpers");
const helpers = require("../models/notesHelpers");
const router = express.Router();

/********************* USERS ROUTING *********************/



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
  // When trying to get a user ID that doesn't exist, it responds with a "1" for some reason.  User is undefined in that scenario so the if statement below was used.
  useHelp
    .findById(id)
    .then((user) => {
      console.log('USER', user)
      if (user != undefined)
      {res.status(200).json(user);}
      else {
        res.status(400).json({message: "Couldn't find that user"})
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error" });
    });
}); 



/********************* NOTES ROUTING *********************/



//Basic routing structure:
//server.METHOD(PATH, HANDLER)
//server is an instance of Express
//Method is an http request
//Path is a path on the server
//Handler is the function executed when the route is matched

router.get("/:id/notes", (req, res) => {
  const { id } = req.params;
  helpers
    .findByUser(id)
    .then((notes) => {
      res.json(notes);
    })
    .catch((err) => {
      res.status(500).json({ error: "couldn't retrieve notes" });
    });
  // res.json(notes)
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  helpers
    .findById(id)
    .then((found) => {
      if (found !== undefined) {
        res.status(200).json(found);
      } else res.status(500).json({ message: "ID doesn't exist" });
    })
    .catch(() => {
      res.status(500).json({ message: "couldnt find that ID" });
    });
});

router.post("/:id/notes", (req, res) => {
  const { id } = req.params;
  console.log("req.params", id)
  console.log('what about  here', req.body)
  helpers
    .add(req.body)
    .then((note) => {
      res.status(200).json(note);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to create the note" });
    });
    
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  helpers
    .update(id, changes)
    .then((updated) => {
      res
        .status(200)
        .json({ message: `Successfully update note # ${updated}` });
    })
    .catch(() => {
      res.status(500).json({ message: "Couldn't update note" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  helpers
    .remove(id)
    .then((count) => {
      if (count > 0) {
        res
          .status(200)
          .json({ message: `successfully deleted note # ${count}` });
      } else {
        res.status(404).json({ message: "Unable to find that record" });
      }
    })
    .catch(() => {
      res.status(500).json({ message: "Server error" });
    });
});

router.delete("/", (req, res) => {
  helpers
    .removeAll()
    .then((count) => {
      if (count > 0) {
        res
          .status(200)
          .json({ message: `successfully deleted note # ${count}` });
      } else {
        res.status(404).json({ message: "Unable to find that record" });
      }
    })
    .catch(() => {
      res.status(500).json({ message: "Server error" });
    });
});

module.exports = router;
