import Knex from 'knex';

export async function seed(knex: Knex) {
    await knex('place').insert([
        {
            id_place: '1', name: 'SALA 1',
            maximum_capacity: 40, open_area: 'S',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
            organization_id: '1'
        },
        {
            id_place: '2', name: 'SALA 2',
            maximum_capacity: 40, open_area: 'S',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
            organization_id: '1'
        },
        {
            id_place: '3', name: 'SALA 3',
            maximum_capacity: 40, open_area: 'S',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
            organization_id: '1'
        },
        {
            id_place: '4', name: 'SALA 4',
            maximum_capacity: 40, open_area: 'S',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
            organization_id: '1'
        },
        {
            id_place: '5', name: 'SALA 5',
            maximum_capacity: 40, open_area: 'S',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
            organization_id: '1'
        },
        {
            id_place: '6', name: 'SALA 6',
            maximum_capacity: 20, open_area: 'N',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
            organization_id: '1'
        },
        {
            id_place: '7', name: 'SALA 7',
            maximum_capacity: 20, open_area: 'N',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
            organization_id: '1'
        },
        {
            id_place: '8', name: 'SALA 8',
            maximum_capacity: 20, open_area: 'N',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
            organization_id: '1'
        },
        {
            id_place: '9', name: 'SALA 9',
            maximum_capacity: 40, open_area: 'S',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
            organization_id: '1'
        },
        {
            id_place: '10', name: 'SALA 10',
            maximum_capacity: 20, open_area: 'N',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
            organization_id: '1'
        },

        
    ]);
}