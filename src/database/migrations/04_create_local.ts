import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('local', table => {
        table.increments('id_local').primary();
        table.dateTime('criacao').notNullable();
        table.dateTime('ultima_atualizacao').notNullable();
        table.string('descricao').notNullable();
        table.string('descricao_normalizada').notNullable();
        table.integer('lotacao_maxima');
        table.string('aberto_fechado').notNullable();
        table.text('metadata').notNullable();
        table.integer('id_instituicao')
            .references('id_instituicao')
            .inTable('instituicao')
            .notNullable()
            .unsigned()
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('local');
}