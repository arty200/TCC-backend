
exports.up = function(knex, Promise) {
    return knex.schema.createTable('pesagem', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('date').notNull()
        table.string('weight').notNull()
        table.integer('pacientesId').references('id').inTable('pacientes').notNull()
    })
};

exports.down = function(knex , Promise) {
    return knex.schema.dropTable('pesagem')
};