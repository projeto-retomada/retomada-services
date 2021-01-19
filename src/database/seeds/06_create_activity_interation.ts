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
            activity_id: '7', user_id: '8',
        }, 
        {
            activity_id: '5', user_id: '6',
        }, 
        {
            activity_id: '4', user_id: '9',
        }, 
        {
            activity_id: '6', user_id: '13',
        }, 
        {
            activity_id: '6', user_id: '8',
        }, 
        {
            activity_id: '6', user_id: '11',
        }, 
    ]);
}