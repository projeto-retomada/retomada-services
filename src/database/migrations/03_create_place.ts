import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('place', table => {
        table.increments('id_place').primary();
        table.string('name', 30).notNullable();
        table.integer('maximum_capacity', 5);
        table.specificType('open_area', 'char(1)').notNullable();
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
    return knex.schema.dropTable('local');
}