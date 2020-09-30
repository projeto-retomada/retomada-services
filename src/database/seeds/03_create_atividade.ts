import Knex from 'knex';

export async function seed(knex: Knex) {
    await knex('atividade').insert([
        {
            id_atividade: '1', criacao: '2020-10-10 10:01:10',
            ultima_atualizacao: '2020-10-10 10:01:10',
            data_inicio: '2020-10-10 10:01:10',
            data_encerramento: '2020-10-10 11:00:10',
            descricao: 'Aula de Banco de Dados',
            metadata: '',
            id_criterio_sanitario: '2',
            id_local: '1'
        },
        {
            id_atividade: '2', criacao: '2020-10-10 10:01:10',
            ultima_atualizacao: '2020-10-10 10:01:10',
            data_inicio: '2020-10-10 10:01:10',
            data_encerramento: '2020-10-10 11:00:10',
            descricao: 'Empreendedorismo aplicado à computação',
            metadata: '',
            id_criterio_sanitario: '3',
            id_local: '2'
        }
    ]);
}