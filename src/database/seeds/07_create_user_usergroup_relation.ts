import Knex from 'knex';

export async function seed(knex: Knex) {
    await knex('user_usergroup_relation').insert([
        {
            usergroup_id: '6',
            user_id: '6',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
        },
        {
            usergroup_id: '7',
            user_id: '7',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
        },
        {
            usergroup_id: '8',
            user_id: '8',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
        },
        {
            usergroup_id: '9',
            user_id: '9',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
        },
        {
            usergroup_id: '10',
            user_id: '10',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
        },
        {
            usergroup_id: '11',
            user_id: '11',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
        },
        {
            usergroup_id: '12',
            user_id: '12',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
        },
        {
            usergroup_id: '13',
            user_id: '13',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
        },
        {
            usergroup_id: '14',
            user_id: '14',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
        },
     
    ]);
}