
exports.up = function(knex, Promise) {
    return knex.schema.createTable('patients', function (table) {
        table.increments('id').primary();
        table.integer('caregiver_id').unsigned();
        table.foreign('caregiver_id');
        table.string('password');
        table.string('email');
        table.string('name');
        table.string('doctor_name');
        table.string('pharmacy_number');
        table.string('phone_number');
      });
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('patients');
  
};
