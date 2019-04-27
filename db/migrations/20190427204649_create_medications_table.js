
exports.up = function(knex, Promise) {
    return knex.schema.createTable('medications', function (table) {
        table.increments('id').primary();
        table.string('medication_name');
      });
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('medications');
  
};
