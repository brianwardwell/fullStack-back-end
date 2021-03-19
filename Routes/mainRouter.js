const express = require("express");
const useHelp = require("../models/usersHelpers");
const helpers = require("../models/notesHelpers");
const router = express.Router();
var StatsD = require('hot-shots');
var dogstatsd = new StatsD();



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

//Make sure to delete this before deployment!!!!!!!!!!!!!!!!
router.delete("/", (req, res) => {
  useHelp.deleteAllUsers().then((count) => {
    count
      ? res.status(200).json({ message: "Successfully deleted users" })
      : res.status(500).json({ message: "Couldn't delete users" });
  });
});

/********************* NOTES ROUTING *********************/

//Basic routing structure:
//server.METHOD(PATH, HANDLER)
//server is an instance of Express
//Method is an http request
//Path is a path on the server
//Handler is the function executed when the route is matched

// router.get("/notes", (req, res) => {
//   console.log("What's in Req", req)
//   helpers
//     .findAllByUserId()
//     .then((notes) => {
//       res.json(notes);
//     })
//     .catch((err) => {
//       res.status(500).json({ message: err });
//     });
// });

router.get("/notes", (req, res) => {
  console.log('REQ DECODED', req.decodedToken)
  const { userId } = req.decodedToken;
  helpers
    .findByUser(userId)
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

router.post("/notes", (req, res) => {
  /**** not sure if i need to specify user id code below?  I removed :id from the endpoint so probably not? */
  // const { id } = req.params;
  // console.log("req.params", id);
  helpers
    .add({...req.body, user_id: req.decodedToken.userId})
    .then((note) => {
      res.status(200).json(note);
      console.log("NOTE", note)
    })
    .catch((err) => {
      console.log("POST ERROR", err)
      res.status(500).json({ message: "Failed to create the note" });
    });
    // Increment a counter.
dogstatsd.increment('notes.new');
});

router.put("/notes/:id", (req, res) => {
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

//Extract ID from decodedToken to delete note if userId matches note user ID
router.delete("/notes/:id", (req, res) => {
  const { id } = req.params;
  console.log("WHAT is ID", id)
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

//Deletes all notes... extract ID to delete for specific user
//Delete below conflicts with delete above. Keeping it as an option to delete all for dev purposes.

// router.delete("/notes", (req, res) => {
//   console.log("Are We Here???")
//   helpers
//     .removeAll()
//     .then((count) => {
//       if (count > 0) {
//         res
//           .status(200)
//           .json({ message: `successfully deleted note # ${count}` });
//       } else {
//         res.status(404).json({ message: "Delete Failed" });
//       }
//     })
//     .catch(() => {
//       res.status(500).json({ message: "Server error" });
//     });
// });

module.exports = router;
