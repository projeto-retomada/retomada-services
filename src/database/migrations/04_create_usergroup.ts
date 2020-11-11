import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('usergroup', table => {
        table.increments('id_usergroup').primary();
        table.string('name').notNullable();
        table.text('class_schedule').notNullable();
        table.timestamp('creation').notNullable();
        table.timestamp('last_update').notNullable();
        table.integer('organization_id')
            .references('id_organization')
            .inTable('organization')
            .notNullable()
            .unsigned()
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('usergroup');
}