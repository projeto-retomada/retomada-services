import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('metrica_log', table => {
        table.increments('id_log').primary();
        table.dateTime('criacao').notNullable();
        table.string('tipo').notNullable();
        table.string('id_usuario').notNullable();
        table.text('conteudo');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('metrica_log');
}