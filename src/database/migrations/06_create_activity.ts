import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('activity', table => {
        table.increments('id_activity').primary();
        table.timestamp('start_date').notNullable();
        table.timestamp('end_date').notNullable();
        table.string('name').notNullable();
        table.text('description').notNullable();
        table.timestamp('creation').notNullable();
        table.timestamp('last_update').notNullable();
        table.integer('organization_id')
            .references('id_organization')
            .inTable('organization')
            .notNullable()
            .unsigned()
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table.integer('usergroup_id')
            .references('id_usergroup')
            .inTable('usergroup')
            .notNullable()
            .unsigned()
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table.integer('place_id')
            .references('id_place')
            .inTable('place')
            .notNullable()
            .unsigned()
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('activity');
}