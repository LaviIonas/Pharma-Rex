
exports.up = function(knex, Promise) {
    return knex.schema.createTable('notifications', function (table) {
        table.increments('id').primary();
        table.integer('prescription_id').unsigned();
        table.foreign('prescription_id');
        table.timestamp('time_send_notification');
        
    })  
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('notifications');
  
};



