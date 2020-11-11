import Knex from 'knex';

export async function seed (knex: Knex) {
   await knex('organization').insert([
        {id_organization: '1', logo: 'https://www.ifsp.edu.br/images/Marca_IFSP_2015031.png', 
        email: 'ifsp@email.com', name: 'IFSP', 
        creation: '2020-10-10 10:00:00',last_update: '2020-10-10 10:00:00'}
    ]);
}