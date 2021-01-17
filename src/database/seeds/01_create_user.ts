import Knex from 'knex';
import { AES } from 'crypto-ts';

export async function seed(knex: Knex) {
    await knex('user').insert([
        {
            username: 'miriele',
            email: 'miriele@gmail.com', picture: '',
            name: 'Miriele', role: 'ADM',
            group_risk: 'S', metadata: '{}',
            password: '$2b$10$7IZoPrGSAM1k6TeFDyaHK.fKpx./lU/3Ur3G8fMYMvJHY1KlhjnTm',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00'
        },
        {
            username: 'gonzalez',
            email: 'gonzalez@gmail.com', picture: '',
            name: 'Gonzalez', role: 'ADM',
            group_risk: 'N', metadata: '{}',
            password: '$2b$10$7IZoPrGSAM1k6TeFDyaHK.fKpx./lU/3Ur3G8fMYMvJHY1KlhjnTm',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00'
        },
        {
            username: 'campos',
            email: 'campos@gmail.com', picture: '',
            name: 'Campos', role: 'ADM',
            group_risk: 'N', metadata: '{}',
            password: '$2b$10$7IZoPrGSAM1k6TeFDyaHK.fKpx./lU/3Ur3G8fMYMvJHY1KlhjnTm',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00'
        },
        {
            username: 'mateus',
            email: 'mateus@gmail.com', picture: '',
            name: 'Mateus', role: 'ADM',
            group_risk: 'N', metadata: '{}',
            password: '$2b$10$7IZoPrGSAM1k6TeFDyaHK.fKpx./lU/3Ur3G8fMYMvJHY1KlhjnTm',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00'
        },
        {
            username: 'luis',
            email: 'luis@gmail.com', picture: '',
            name: 'Luis', role: 'ADM',
            group_risk: 'N', metadata: '{}',
            password: '$2b$10$7IZoPrGSAM1k6TeFDyaHK.fKpx./lU/3Ur3G8fMYMvJHY1KlhjnTm',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00'
        }
    ]);
}