exports.up = function (knex) {
  return knex.schema.createTable("users", (tbl) => {
    tbl.increments();
    tbl.text("username").notNullable().unique();
    tbl.text("password").notNullable();
    tbl.timestamps(true, true);
  })
  .createTable("notes", (tbl) => {
    tbl.increments();
    tbl.text("title");
    tbl.text("content");
    tbl.timestamps();
    tbl
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("notes")
  .dropTableIfExists("users");
};
