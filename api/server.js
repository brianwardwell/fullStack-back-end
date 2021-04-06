//server.js should ONLY be concerned with setting up the server
const express = require("express");
var cors = require('cors')
const mainRouter = require('../Routes/mainRouter')
const authRouter = require('../Routes/authRouter')
const authMidware = require('../Routes/auth-midware')

var dd_options = {
    'response_code':true,
    'tags': ['app:my_app']
      }
  
  var connect_datadog = require('connect-datadog')(dd_options);
  
  // Add the datadog-middleware before your router
// Create instance of express  app
const server = express();

server.use(connect_datadog);

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


