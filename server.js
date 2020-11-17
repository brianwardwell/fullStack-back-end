const express = require("express");

const app = express();

app.get("/api/notes", (req, res) => {
  const notes = [
    {
      title: "Brian",
      content: "get some coffee",
      id: 1,
    },
    {
      title: "Maddox",
      content: "get some beer",
      id: 2,
    },
    {
      title: "Finley",
      content: "get some food",
      id: 3,
    },
    {
      title: "Taryn",
      content: "get some clothes",
      id: 4,
    },
    {
      title: "Gary",
      content: "get some new shirts",
      id: 5
    }
  ];
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
