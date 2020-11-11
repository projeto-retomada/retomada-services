import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('activity_interaction', table => {
        table.increments('user_id').primary()
            .unsigned()
            .references('id_user')
            .inTable('user')
            .notNullable()
            .unsigned()
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table.integer('activity_id')
            .references('id_activity')
            .inTable('activity')
            .notNullable()
            .unsigned()
            .unique()
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table.timestamp('creation').notNullable();
        table.timestamp('last_update').notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('activity_interaction');
}