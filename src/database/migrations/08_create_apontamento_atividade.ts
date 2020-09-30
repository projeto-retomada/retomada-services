import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('apontamento_atividade', table => {
        table.increments('id_apontamento_atividade').primary();
        table.integer('usuario_id')
            .references('id_usuario')
            .inTable('usuario')
            .notNullable()
            .unsigned()
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table.integer('atividade_id')
            .references('id_atividade')
            .inTable('atividade')
            .notNullable()
            .unsigned()
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('apontamento_atividade');
}