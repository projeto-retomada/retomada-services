import Knex from 'knex';

export async function seed(knex: Knex) {
    await knex('activity_interaction').insert([
        {
            activity_id: '1', user_id: '1',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00'
        },
        {
            activity_id: '2', user_id: '1',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00'
        }, 
        {
            activity_id: '3', user_id: '1',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00'
        }, 
    ]);
}