
exports.up = function(knex,Promise) {
    return knex.schema.createTable('pacientes', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('cpf').notNull().unique()
        table.string('age').notNull()
        table.string('weight').notNull()
        table.string('sex').notNull()
        table.string('info',10000)
        table.string('imageUrl',1000)
    })
};

exports.down = function(knex,Promise) {
    return knex.schema.dropTable('pacientes')
};
