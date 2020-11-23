const express = require("express");

const server = express();

server.use(express.json())

const port = 5000;

server.listen(port, () => console.log(`Server started on port ${port}`));

server.get("/api/notes", (req, res) => {
  const notes = [
    {
      title: "Brian",
      content: "get better at coding",
      id: 1,
    },
    {
      title: "Maddox",
      content: "be a good boy",
      id: 2,
    },
    {
      title: "Finley",
      content: "be a sweet lil angel",
      id: 3,
    },
    {
      title: "Taryn",
      content: "be a nurse",
      id: 4,
    },
    {
      title: "Gary",
      content: "watch the three stooges",
      id: 5
    }
  ];
  res.json(notes)
});


