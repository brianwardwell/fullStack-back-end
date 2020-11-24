exports.up = function (knex) {
  return knex.schema.createTable("notes", (table) => {
    table.increments();
    table.text("title", 128).notNullable();
    table.text("content").notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("notes");
};
