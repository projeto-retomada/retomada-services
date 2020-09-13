import Knex from 'knex';

export async function seed(knex: Knex) {
    await knex('criterio_sanitario').insert([
        {
            id_criterio_sanitario: '1', criacao: '2020-10-10 10:01:10',
            ultima_atualizacao: '2020-10-10 10:01:10',
            lotacao_maxima: 5, uso_mascara: 'S', distanciamento_minimo: 3,
            descricao: 'vermelho',
            id_instituicao: '2'
        },
        {
            id_criterio_sanitario: '2', criacao: '2020-10-10 10:01:10',
            ultima_atualizacao: '2020-10-10 10:01:10',
            lotacao_maxima: 30, uso_mascara: 'S', distanciamento_minimo: 2,
            descricao: 'laranja',
            id_instituicao: '2'
        },
        {
            id_criterio_sanitario: '3', criacao: '2020-10-10 10:01:10',
            ultima_atualizacao: '2020-10-10 10:01:10',
            lotacao_maxima: 40, uso_mascara: 'S', distanciamento_minimo: 2,
            descricao: 'amarelo',
            id_instituicao: '2'
        },
        {
            id_criterio_sanitario: '4', criacao: '2020-10-10 10:01:10',
            ultima_atualizacao: '2020-10-10 10:01:10',
            lotacao_maxima: 70, uso_mascara: 'S', distanciamento_minimo: 1,
            descricao: 'azul',
            id_instituicao: '2'
        },
        {
            id_criterio_sanitario: '5', criacao: '2020-10-10 10:01:10',
            ultima_atualizacao: '2020-10-10 10:01:10',
            lotacao_maxima: 100, uso_mascara: 'N', distanciamento_minimo: 1,
            descricao: 'verde',
            id_instituicao: '2'
        }
    ]);
}