//server.js should ONLY be concerned with setting up the server
const express = require("express");
var cors = require('cors')
const usersRouter = require('../Routes/users-router')
const authRouter = require('../Routes/authRouter')
const authMidware = require('../Routes/auth-midware')

const server = express();

//Teach server to parse json
server.use(cors());
server.use(express.json());

//set up basic home route to make sure server is up and running
server.get('/api', (req, res) => {
    res.json({message: "Server is working!!"})
});

//Tell server when to use the various routers (in this case, usersRouter) when the proper endpoint is hit
server.use('/api/users', authMidware, usersRouter)
server.use('/api/auth',  authRouter)

module.exports = server;




