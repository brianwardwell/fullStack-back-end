const express = require("express");
const helpers = require('./models/dbHelpers');

const server = express();

server.use(express.json())

const port = 5000;

server.listen(port, () => console.log(`Server started on port ${port}`));

server.get("/api/notes", (req, res) => {
  
  helpers.find()
  .then(notes => {
    res.json(notes)
  })
  .catch(err => {
    res.status(500).json({error: "couldn't retrieve notes"})
  })
  // res.json(notes)
});

server.get('/api/notes/:id', (req, res) => {
  const { id } = req.params

  helpers.findById(id)
  .then(found => {
    res.status(200).json(found)
    console.log("FOUND", found)
  })
  .catch(() => {
    res.status(500).json({ message: 'couldnt find that ID'})
  })
})
  

server.post('/api/notes', (req, res) => {
  console.log('params!', req)
  helpers.add(req.body).then(note => {
    res.status(200).json(note)
  }) 
  .catch(err => {
    res.status(500).json({message: 'Failed to create the note'});
  })
})

server.delete('/api/notes/:id', (req, res) => {
  helpers.remove(req.body.id)
  .then(item => {
    res.json({ removed: item})
  }).catch(err => {
    res.status(500).json({message: 'couldnt delete item'})
  })
})


