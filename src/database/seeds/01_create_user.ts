import Knex from 'knex';
import { AES } from 'crypto-ts';

export async function seed(knex: Knex) {
    await knex('user').insert([
        {
            username: 'miriele',
            email: 'miriele@gmail.com', picture: '',
            group_risk: 'S', metadata: '{}',
            password: AES.encrypt('123', 'retomadaKey').toString(),organization_id: '1',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00'
        },
        {
            username: 'gonzalez',
            email: 'gonzalez@gmail.com', picture: '',
            group_risk: 'N', metadata: '{}',
            password: AES.encrypt('123', 'retomadaKey').toString(),organization_id: '1',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00'
        },
        {
            username: 'campos',
            email: 'campos@gmail.com', picture: '',
            group_risk: 'N', metadata: '{}',
            password: AES.encrypt('123', 'retomadaKey').toString(),organization_id: '1',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00'
        },
        {
            username: 'mateus',
            email: 'mateus@gmail.com', picture: '',
            group_risk: 'N', metadata: '{}',
            password: AES.encrypt('123', 'retomadaKey').toString(),organization_id: '1',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00'
        },
        {
            username: 'luis',
            email: 'luis@gmail.com', picture: '',
            group_risk: 'N', metadata: '{}',
            password: AES.encrypt('123', 'retomadaKey').toString(),organization_id: '1',
            creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00'
        }
    ]);
}