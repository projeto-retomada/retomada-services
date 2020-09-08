import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('criterio_sanitario', table => {
        table.increments('id_criterio_sanitario').primary();
        table.dateTime('criacao').notNullable();
        table.dateTime('ultima_atualizacao').notNullable();
        table.integer('lotacao_maxima').notNullable();
        table.string('descricao').notNullable();
        table.string('uso_mascara').notNullable();
        table.integer('distanciamento_minimo').notNullable();
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
    return knex.schema.dropTable('criterio_sanitario');
}