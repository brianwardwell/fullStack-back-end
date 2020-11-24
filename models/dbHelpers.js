const knex = require('knex')
const config = require('../knexfile')
const db = knex(config.development)

module.exports = {
    add,
    find,
    // remove,
    findById
};

async function add (note) {
    //db('notes') specifies which database ('db') and which table ('notes')
    const [id] = await db('notes').insert(note)
    return id
}
function find() {
    return db('notes')
}

function findById(id) {
    return db('notes').where({id})
    .first()
}

// function remove(id) {
//     const [id] = id;
//     db('notes').where({id}).del()
// }

