
exports.up = function(knex, Promise) {
    return knex.schema.createTable('prescriptions', function (table) {
        table.increments('id').primary();
        table.integer('patient_id').unsigned();
        table.foreign('patient_id');
        table.integer('medication_id').unsigned();
        table.foreign('medication_id');
        table.string('rx_number');
        table.text('dosage');
        table.integer('total_number_pills');
        table.integer('number_pills_to_take');
        table.timestamp('start_time');
        table.integer('interval');
        
    })  
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('prescriptions');
};
