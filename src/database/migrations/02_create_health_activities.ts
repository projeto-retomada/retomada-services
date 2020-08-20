import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('health_activities', table => {
        table.increments('id_health_activities').primary();
        table.dateTime('data').notNullable();
        table.specificType('temperatura', 'int(2)').notNullable();
        table.specificType('coriza', 'char(1)').notNullable();
        table.specificType('dificuldade_respiracao', 'char(1)').notNullable();
        table.specificType('tosse', 'char(1)').notNullable();
        table.specificType('cansaco', 'char(1)').notNullable();
        table.specificType('febre', 'char(1)').notNullable();
        table.specificType('contato_com_exposto', 'char(1)').notNullable();
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
    return knex.schema.dropTable('health_activities');
}