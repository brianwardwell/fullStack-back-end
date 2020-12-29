//server.js should ONLY be concerned with setting up the server
const express = require("express");
const usersRouter = require('../Routes/users-router')

const server = express();

//Teach server to parse json
server.use(express.json());

//set up basic home route to make sure server is up and running
server.get('/api', (req, res) => {
    res.json({message: "Server is working!!"})
});

//Tell server when to use the various routers (in this case, usersRouter) when the proper endpoint is hit
server.use('/api/users', usersRouter)

module.exports = server;




