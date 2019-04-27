
exports.up = function(knex, Promise) {
    return knex.schema.createTable('caregivers', function (table) {
        table.increments('id').primary();
        table.string('name');
        table.string('email');
        table.string('password');
        table.string('phone_number');
        
    })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('caregivers');
};




