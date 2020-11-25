import Knex from 'knex';

export async function seed(knex: Knex) {
    await knex('usergroup').insert([
        {
            id_usergroup: '1', name: 'TURMA 1',
            class_schedule: '',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
            organization_id: '1'
        },
        {
            id_usergroup: '2', name: 'TURMA 2',
            class_schedule: '',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
            organization_id: '1'
        },
        {
            id_usergroup: '3', name: 'TURMA 3',
            class_schedule: '',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
            organization_id: '1'
        },
        {
            id_usergroup: '4', name: 'TURMA 4',
            class_schedule: '',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
            organization_id: '1'
        },
        {
            id_usergroup: '5', name: 'TURMA 5',
            class_schedule: '',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
            organization_id: '1'
        },
        {
            id_usergroup: '6', name: 'TURMA 6',
            class_schedule: '',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
            organization_id: '1'
        },
        
    ]);
}