import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('usuario', table => {
        table.increments('id_usuario').primary();
        table.string('nome').notNullable();
        table.string('cpf_cnpj').notNullable();
        table.specificType('grupo_risco', 'char(1)').notNullable();
        table.specificType('imune', 'char(1)').notNullable();
        table.text('metadata').notNullable();
        table.string('tipo_usuario').notNullable();
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
    return knex.schema.dropTable('usuario');
}