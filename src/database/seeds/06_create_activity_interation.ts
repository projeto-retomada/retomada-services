import Knex from 'knex';

export async function seed(knex: Knex) {
    await knex('activity_interaction').insert([
        {
            activity_id: '1', user_id: '1',
        },
        {
            activity_id: '2', user_id: '1',
        }, 
        {
            activity_id: '3', user_id: '1',
        }, 
        {
            activity_id: '1', user_id: '2',
        },
        {
            activity_id: '2', user_id: '3',
        }, 
        {
            activity_id: '3', user_id: '4',
        }, 
        {
            activity_id: '2', user_id: '5',
        }, 
        {
            activity_id: '3', user_id: '5',
        }, 
    ]);
}