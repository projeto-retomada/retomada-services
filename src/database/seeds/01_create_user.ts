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
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
            organization_id: 1
        },
        {
            username: 'gonzalez',
            email: 'gonzalez@gmail.com', picture: '',
            name: 'Gonzalez', role: 'ADM',
            group_risk: 'N', metadata: '{}',
            password: '$2b$10$7IZoPrGSAM1k6TeFDyaHK.fKpx./lU/3Ur3G8fMYMvJHY1KlhjnTm',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
            organization_id: 1
        },
        {
            username: 'campos',
            email: 'campos@gmail.com', picture: '',
            name: 'Campos', role: 'ADM',
            group_risk: 'N', metadata: '{}',
            password: '$2b$10$7IZoPrGSAM1k6TeFDyaHK.fKpx./lU/3Ur3G8fMYMvJHY1KlhjnTm',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
            organization_id: 1
        },
        {
            username: 'mateus',
            email: 'mateus@gmail.com', picture: '',
            name: 'Mateus', role: 'ADM',
            group_risk: 'N', metadata: '{}',
            password: '$2b$10$7IZoPrGSAM1k6TeFDyaHK.fKpx./lU/3Ur3G8fMYMvJHY1KlhjnTm',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
            organization_id: 1
        },
        {
            username: 'luis',
            email: 'luis@gmail.com', picture: '',
            name: 'Luis', role: 'ADM',
            group_risk: 'N', metadata: '{}',
            password: '$2b$10$7IZoPrGSAM1k6TeFDyaHK.fKpx./lU/3Ur3G8fMYMvJHY1KlhjnTm',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
            organization_id: 1
        },
        {
            username: 'gabriel',
            email: 'gabriel@gmail.com', picture: '',
            name: 'Gabriel', role: 'ADM',
            group_risk: 'S', metadata: '{}',
            password: '$2b$10$7IZoPrGSAM1k6TeFDyaHK.fKpx./lU/3Ur3G8fMYMvJHY1KlhjnTm',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
            organization_id: 1
        },
        {
            username: 'julia',
            email: 'julia@gmail.com', picture: '',
            name: 'Julia', role: 'ADM',
            group_risk: 'S', metadata: '{}',
            password: '$2b$10$7IZoPrGSAM1k6TeFDyaHK.fKpx./lU/3Ur3G8fMYMvJHY1KlhjnTm',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
            organization_id: 1
        },
        {
            username: 'jair messias',
            email: 'jairmessias@gmail.com', picture: '',
            name: 'jair messias', role: 'ADM',
            group_risk: 'S', metadata: '{}',
            password: '$2b$10$7IZoPrGSAM1k6TeFDyaHK.fKpx./lU/3Ur3G8fMYMvJHY1KlhjnTm',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
            organization_id: 1
        },
        {
            username: 'Vana',
            email: 'vana@gmail.com', picture: '',
            name: 'Vana', role: 'ADM',
            group_risk: 'S', metadata: '{}',
            password: '$2b$10$7IZoPrGSAM1k6TeFDyaHK.fKpx./lU/3Ur3G8fMYMvJHY1KlhjnTm',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
            organization_id: 1
        },
        {
            username: 'João Agripino',
            email: 'agripino@gmail.com', picture: '',
            name: 'Agripino', role: 'ADM',
            group_risk: 'S', metadata: '{}',
            password: '$2b$10$7IZoPrGSAM1k6TeFDyaHK.fKpx./lU/3Ur3G8fMYMvJHY1KlhjnTm',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
            organization_id: 1
        },
        {
            username: 'Inácio',
            email: 'inacio@gmail.com', picture: '',
            name: 'Inácio', role: 'ADM',
            group_risk: 'S', metadata: '{}',
            password: '$2b$10$7IZoPrGSAM1k6TeFDyaHK.fKpx./lU/3Ur3G8fMYMvJHY1KlhjnTm',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
            organization_id: 1
        },
        {
            username: 'Guilherme',
            email: 'guilherme@gmail.com', picture: '',
            name: 'Guilherme', role: 'ADM',
            group_risk: 'S', metadata: '{}',
            password: '$2b$10$7IZoPrGSAM1k6TeFDyaHK.fKpx./lU/3Ur3G8fMYMvJHY1KlhjnTm',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
            organization_id: 1
        },
        {
            username: 'Donald',
            email: 'donald@gmail.com', picture: '',
            name: 'Donald', role: 'ADM',
            group_risk: 'S', metadata: '{}',
            password: '$2b$10$7IZoPrGSAM1k6TeFDyaHK.fKpx./lU/3Ur3G8fMYMvJHY1KlhjnTm',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
            organization_id: 1
        },
        {
            username: 'Michael',
            email: 'michael@gmail.com', picture: '',
            name: 'Michael', role: 'ADM',
            group_risk: 'S', metadata: '{}',
            password: '$2b$10$7IZoPrGSAM1k6TeFDyaHK.fKpx./lU/3Ur3G8fMYMvJHY1KlhjnTm',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
            organization_id: 1
        },
        {
            username: 'Clovis',
            email: 'clovisb@gmail.com', picture: '',
            name: 'Clovis', role: 'ADM',
            group_risk: 'S', metadata: '{}',
            password: '$2b$10$7IZoPrGSAM1k6TeFDyaHK.fKpx./lU/3Ur3G8fMYMvJHY1KlhjnTm',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00',
            organization_id: 1
        },
    ]);
}