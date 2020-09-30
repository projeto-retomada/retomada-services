import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('atestado', table => {
        table.increments('id_atestado').primary();
        table.string('motivo').notNullable();
        table.specificType('covid', 'char(1)').notNullable();
        table.specificType('doenca_respiratoria', 'char(1)').notNullable();
        table.string('file').notNullable();
        table.integer('usuario_id')
            .references('id_usuario')
            .inTable('usuario')
            .notNullable()
            .unsigned()
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('atestado');
}