//index.js needs 1.) access to the server file, 2.) a defined port, 3.) listen function
const server = require("./api/server")
const port = process.env.PORT || 5000;


server.listen(port, () => console.log(`Server started on port ${port}`));
