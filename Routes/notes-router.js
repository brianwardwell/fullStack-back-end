const express = require('express')
const helpers = require("../models/notesHelpers");

const router = express.Router()

//Basic routing structure:
//server.METHOD(PATH, HANDLER)
//server is an instance of Express
//Method is an http request
//Path is a path on the server
//Handler is the function executed when the route is matched

router.get("/", (req, res) => {
    helpers
      .find()
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
  
  router.post("/", (req, res) => {
    helpers
      .add(req.body)
      .then((note) => {
        res.status(200).json(note);
      })
      .catch((err) => {
        res.status(500).json({ message: "Failed to create the note" });
      });
      console.log('res', req)
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

  module.exports = router;