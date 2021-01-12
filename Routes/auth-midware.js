const jwt = require('jsonwebtoken')
const secrets = require('../api/secret')

//jwt = require will be used here and in auth router
//here, jwt is used using the .verify method
//in auth router, the .sign method is used to create signature

//This will verify that the user is logged in

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    const secret = secrets.jwtSecret;
    console.log("SECRET YOOO", secret)
    token ? jwt.verify(token, secret, (error, decodedToken) => {
        error ? res.status(401).json({message: "Wrong Password", error})
        : req.decodedToken = decodedToken;
        next()
    }) : res.status(500).json({message: "You can't get in"})
};