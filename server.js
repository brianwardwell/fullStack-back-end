const express = require("express");
const helpers = require("./models/dbHelpers");

const server = express();

server.use(express.json());

const port = 5000;

server.listen(port, () => console.log(`Server started on port ${port}`));

server.get("/api/notes", (req, res) => {
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

server.get("/api/notes/:id", (req, res) => {
  const { id } = req.params;

  helpers.findById(id)
    .then((found) => {
      if (found !== undefined) {
        res.status(200).json(found);
      } else res.status(500).json({ message: "ID doesn't exist" });
    })
    .catch(() => {
      res.status(500).json({ message: "couldnt find that ID" });
    });
});

server.post("/api/notes", (req, res) => {
  helpers
    .add(req.body)
    .then((note) => {
      res.status(200).json(note);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to create the note" });
    });
});
 

server.delete('/api/notes/:id', (req, res) => {
  const {id} = req.params;
  helpers.remove(id)
  .then(count => {
    if (count > 0) {
      res.status(200).json({message: `successfully deleted note # ${count}`})
    } else {
      res.status(404).json({message: "Nothing to delete"})
    }
  })
  .catch(() => {
    res.status(500).json({ message: "unable to delete"})
  })
})
