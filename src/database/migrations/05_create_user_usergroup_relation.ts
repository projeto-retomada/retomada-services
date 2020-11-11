import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('user_usergroup_relation', table => {
        table.dateTime('creation').notNullable();
        table.dateTime('last_update').notNullable();
        table.integer('user_id')
            .references('id_user')
            .inTable('user')
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
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('usergroup');
}