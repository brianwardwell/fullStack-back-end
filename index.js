//index.js needs 1.) access to the server file, 2.) a defined port, 3.) listen function
const server = require("./API/server")
const port = 5000;

server.listen(port, () => console.log(`Server started on port ${port}`));

// server.get("/api/users", (req, res) => {
//     res.json({message: "Users endpdoint functional"})
// });