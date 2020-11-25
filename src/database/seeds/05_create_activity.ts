import Knex from 'knex';

export async function seed(knex: Knex) {
    await knex('activity').insert([
        {
            id_activity: '1', name: 'AULA 1',
            description: '',organization_id: '1',
            start_date: '2020-10-10 10:00:00',end_date: '2020-10-10 10:00:00',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
            usergroup_id: '1', place_id: '1'
        }, 
        {
            id_activity: '2', name: 'AULA 2',
            description: '',organization_id: '1',
            start_date: '2020-10-10 10:00:00',end_date: '2020-10-10 10:00:00',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
            usergroup_id: '1', place_id: '1'
        }, 
        {
            id_activity: '3', name: 'AULA 3',
            description: '',organization_id: '1',
            start_date: '2020-10-10 10:00:00',end_date: '2020-10-10 10:00:00',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
            usergroup_id: '1', place_id: '1'
        }     
    ]);
}