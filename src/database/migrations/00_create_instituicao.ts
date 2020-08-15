import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('instituicao', table => {
        table.increments('id_instituicao').primary().unsigned();
        table.string('emblema');
        table.string('cnpj').notNullable();
        table.string('nome').notNullable();
        table.string('nome_normalizado').notNullable();
        table.text('metadata').notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('instituicao');
}