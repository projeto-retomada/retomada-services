import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('atividade', table => {
        table.increments('id_atividade').primary();
        table.dateTime('criacao').notNullable();
        table.dateTime('ultima_atualizacao').notNullable();
        table.dateTime('data_inicio').notNullable();
        table.dateTime('data_encerramento').notNullable();
        table.string('descricao').notNullable();
        table.text('metadata').notNullable();
        table.integer('id_criterio_sanitario')
            .references('id_criterio_sanitario')
            .inTable('criterio_sanitario')
            .notNullable()
            .unsigned()
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table.integer('id_local')
            .references('id_local')
            .inTable('local')
            .notNullable()
            .unsigned()
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('atividade');
}