import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('activity_interaction', table => {
        table.increments('id').primary();
        table.integer('user_id') .unsigned()
            .references('id_user')
            .inTable('user')
            .notNullable()
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table.integer('activity_id')
            .references('id_activity')
            .inTable('activity')
            .notNullable()
            .unsigned()
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
            table.timestamp('creation').defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('activity_interaction');
}