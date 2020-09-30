import Knex from 'knex';

export async function seed (knex: Knex) {
   await knex('instituicao').insert([
        {id_instituicao: '2', emblema: 'https://www.ifsp.edu.br/images/Marca_IFSP_2015031.png', 
        cnpj: '10882594000165', nome: 'IFSP', 
        nome_normalizado: 'IFSP',metadata: '{}'}
    ]);
}