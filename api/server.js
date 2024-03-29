//server.js should ONLY be concerned with setting up the server
const tracer = require('dd-trace').init();
const express = require("express");
var cors = require('cors')
const mainRouter = require('../Routes/mainRouter')
const authRouter = require('../Routes/authRouter')
const authMidware = require('../Routes/auth-midware')

// Create instance of express  app
const server = express();

//server.use(connect_datadog);

//Global middlewhere (not route-specific)
server.use(cors());
server.use(express.json());

//set up basic home route to make sure server is up and running
server.get('/', (req, res) => {
    res.json({message: "Server is working!!"})
});

//Tell server when to use the various routers when the proper endpoint is hit
//Route-specific middleware
server.use('/api/users', authMidware, mainRouter)
server.use('/api/auth',  authRouter)

module.exports = server;


