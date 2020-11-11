import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('user', table => {
        table.increments('id_user').primary();
        table.string('username', 25).notNullable();
        table.string('email', 40).notNullable().unique();
        table.string('picture').notNullable();
        table.specificType('group_risk', 'char(1)').notNullable();
        table.string('password').notNullable();
        table.text('metadata').notNullable();
        table.dateTime('creation').notNullable();
        table.dateTime('last_update').notNullable();
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
    return knex.schema.dropTable('user');
}