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
        }, 
        {
            id_activity: '4', name: 'AULA 4',
            description: '',organization_id: '1',
            start_date: '2020-10-10 10:00:00',end_date: '2020-10-10 10:00:00',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
            usergroup_id: '1', place_id: '1'
        },
        {
            id_activity: '5', name: 'AULA 5',
            description: '',organization_id: '1',
            start_date: '2020-10-10 10:00:00',end_date: '2020-10-10 10:00:00',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
            usergroup_id: '1', place_id: '1'
        },
        {
            id_activity: '6', name: 'AULA 6',
            description: '',organization_id: '1',
            start_date: '2020-10-10 10:00:00',end_date: '2020-10-10 10:00:00',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
            usergroup_id: '1', place_id: '1'
        },
        {
            id_activity: '7', name: 'AULA 7',
            description: '',organization_id: '1',
            start_date: '2020-10-10 10:00:00',end_date: '2020-10-10 10:00:00',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
            usergroup_id: '1', place_id: '1'
        }, 
        {
            id_activity: '8', name: 'AULA 8',
            description: '',organization_id: '1',
            start_date: '2020-10-10 10:00:00',end_date: '2020-10-10 10:00:00',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
            usergroup_id: '1', place_id: '1'
        },     
        {
            id_activity: '9', name: 'AULA 9',
            description: '',organization_id: '1',
            start_date: '2020-10-10 10:00:00',end_date: '2020-10-10 10:00:00',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
            usergroup_id: '1', place_id: '1'
        },
        {
            id_activity: '10', name: 'AULA 10',
            description: '',organization_id: '1',
            start_date: '2020-10-10 10:00:00',end_date: '2020-10-10 10:00:00',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
            usergroup_id: '1', place_id: '1'
        }        
    ]);
}