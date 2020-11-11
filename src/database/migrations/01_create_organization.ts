import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('organization', table => {
        table.increments('id_organization').primary().unsigned();
        table.string('logo');
        table.string('email').notNullable();
        table.string('name').notNullable();
        table.timestamp('creation').notNullable();
        table.timestamp('last_update').notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('organization');
}