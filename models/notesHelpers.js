const knex = require("knex");
const config = require("../knexfile");
const db = knex(config.development);

module.exports = {
  add,
  findByUser,
  remove,
  findById,
  update,
  removeAll, 
  findAll
};

async function add(note) {
  //db('notes') specifies which database ('db') and which table ('notes')
  console.log("note in helpers", note)
  const [id] = await db("notes").insert(note);
  return findById(id)
  // return id;
}

function findByUser(id) {
  return db("notes").where('user_id', id).orderBy('created_at', 'desc');
}

function findAll() {
  return db("notes")
}

function findById(id) {
  return db("notes").where({ id }).first();
}

function remove(id) {
  return db("notes").where({ id }).del();
}

function removeAll() {
  return db("notes").del();
}

function update(id, changes) {
  return db('notes').where({id}).update(changes)
}
