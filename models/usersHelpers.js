const knex = require("knex");
const config = require("../knexfile");
const db = knex(config.development);

module.exports = {
  findUser,
  findAllUsers,
  addUser,
};

function findUser (username) {
    return db('users').where({username}).first();
}

function findAllUsers () {
    return db('users')
}
