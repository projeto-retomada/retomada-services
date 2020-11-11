import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('health_questionnaire', table => {
        table.increments('id_health_quest').primary();
        table.dateTime('creation').notNullable();
        table.dateTime('last_update').notNullable();
        table.text('answer').notNullable();
        table.integer('user_id')
            .references('id_user')
            .inTable('user')
            .notNullable()
            .unsigned()
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('health_questionnaire');
}