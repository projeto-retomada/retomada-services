import Knex from 'knex';

export async function seed(knex: Knex) {
    await knex('usuario').insert([
        {
            id_usuario: '1', nome: 'Miriele dos Santos Silvério',
            cpf_cnpj: '10882594000161', grupo_risco: 'N',
            imune: 'S', metadata: '{}', tipo_usuario: '1', id_instituicao: '2'
        },
        {
            id_usuario: '2', nome: 'Luis Otavio Bernardo de Andrade',
            cpf_cnpj: '10882594000121', grupo_risco: 'S',
            imune: 'S', metadata: '{}', tipo_usuario: '1', id_instituicao: '2'
        }
    ]);
}