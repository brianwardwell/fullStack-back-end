//server.js should ONLY be concerned with setting up the server
const express = require("express");
const notesRouter = require('../Routes/notes-router')

const server = express();

//Teach server to parse json
server.use(express.json());

//set up basic home route to make sure server is up and running
server.get('/', (req, res) => {
    res.json({message: "Server is working!!"})
});

//Tell server when to use the various routers (in this case, notesRouter) when the proper endpoint is hit
server.use('/api/notes', notesRouter);

module.exports = server;




