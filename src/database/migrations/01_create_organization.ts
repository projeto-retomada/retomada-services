import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('organization', table => {
        table.increments('id_organization').primary().unsigned();
        table.string('logo');
        table.string('email', 40).notNullable();
        table.string('name', 60).notNullable();
        table.dateTime('creation').notNullable();
        table.dateTime('last_update').notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('organization');
}