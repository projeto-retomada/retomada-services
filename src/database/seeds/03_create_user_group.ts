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
        {
            id_usergroup: '7', name: 'TURMA 7',
            class_schedule: '',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
            organization_id: '1'
        },
        {
            id_usergroup: '8', name: 'TURMA 8',
            class_schedule: '',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
            organization_id: '1'
        },
        {
            id_usergroup: '9', name: 'TURMA 9',
            class_schedule: '',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
            organization_id: '1'
        },
        {
            id_usergroup: '10', name: 'TURMA 10',
            class_schedule: '',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
            organization_id: '1'
        },
        {
            id_usergroup: '11', name: 'TURMA 11',
            class_schedule: '',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
            organization_id: '1'
        },
        {
            id_usergroup: '12', name: 'TURMA 12',
            class_schedule: '',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
            organization_id: '1'
        },
        {
            id_usergroup: '13', name: 'TURMA 13',
            class_schedule: '',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
            organization_id: '1'
        },
        {
            id_usergroup: '14', name: 'TURMA 14',
            class_schedule: '',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
            organization_id: '1'
        },
        
    ]);
}