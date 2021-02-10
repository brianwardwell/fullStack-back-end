const knex = require("knex");
const config = require("../knexfile");
const db = knex(config.development);

module.exports = {
  findUser,
  findAllUsers,
  addUser,
  findById,
  deleteAllUsers
};

function findUser (username) {
    return db('users').where({username}).first();
}

function findAllUsers () {
    return db('users')
}

async function addUser (user) {
  const [id] = await db('users').insert(user);
  return id;
}

function findById(id) {
  return db("users").where({ id }).first();
}

function deleteAllUsers() {
  return db('users').del()
}
