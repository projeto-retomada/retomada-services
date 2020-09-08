import Knex from 'knex';

export async function seed(knex: Knex) {
    await knex('local').insert([
        {
            id_local: '1', criacao: '2020-10-10 10:01:10',
            ultima_atualizacao: '2020-10-10 10:01:10',
            descricao: 'Sala 1', descricao_normalizada: 'SALA 1',
            lotacao_maxima: 40, aberto_fechado: 'A', metadata: '',
            id_instituicao: '2'
        },
        {
            id_local: '2', criacao: '2020-10-10 10:01:10',
            ultima_atualizacao: '2020-10-10 10:01:10',
            descricao: 'Sala 2', descricao_normalizada: 'SALA 2',
            lotacao_maxima: 40, aberto_fechado: 'A', metadata: '',
            id_instituicao: '2'
        },
        {
            id_local: '3', criacao: '2020-10-10 10:01:10',
            ultima_atualizacao: '2020-10-10 10:01:10',
            descricao: 'Sala 3', descricao_normalizada: 'SALA 3',
            lotacao_maxima: 40, aberto_fechado: 'A', metadata: '',
            id_instituicao: '2'
        },
        {
            id_local: '4', criacao: '2020-10-10 10:01:10',
            ultima_atualizacao: '2020-10-10 10:01:10',
            descricao: 'Sala 4', descricao_normalizada: 'SALA 4',
            lotacao_maxima: 30, aberto_fechado: 'A', metadata: '',
            id_instituicao: '2'
        },
        {
            id_local: '5', criacao: '2020-10-10 10:01:10',
            ultima_atualizacao: '2020-10-10 10:01:10',
            descricao: 'Sala 5', descricao_normalizada: 'SALA 5',
            lotacao_maxima: 40, aberto_fechado: 'A', metadata: '',
            id_instituicao: '2'
        },
        {
            id_local: '6', criacao: '2020-10-10 10:01:10',
            ultima_atualizacao: '2020-10-10 10:01:10',
            descricao: 'Laboratório', descricao_normalizada: 'LABORATORIO',
            lotacao_maxima: 40, aberto_fechado: 'A', metadata: '',
            id_instituicao: '2'
        },
        {
            id_local: '7', criacao: '2020-10-10 10:01:10',
            ultima_atualizacao: '2020-10-10 10:01:10',
            descricao: 'Auditório', descricao_normalizada: 'AUDITORIO',
            lotacao_maxima: 120, aberto_fechado: 'A', metadata: '',
            id_instituicao: '2'
        },
        {
            id_local: '8', criacao: '2020-10-10 10:01:10',
            ultima_atualizacao: '2020-10-10 10:01:10',
            descricao: 'Sala Dos Professores', descricao_normalizada: 'SALA DOS PROFESSORES',
            lotacao_maxima: 6, aberto_fechado: 'A', metadata: '',
            id_instituicao: '2'
        },
        {
            id_local: '9', criacao: '2020-10-10 10:01:10',
            ultima_atualizacao: '2020-10-10 10:01:10',
            descricao: 'Refeitório', descricao_normalizada: 'REFEITORIO',
            lotacao_maxima: 7, aberto_fechado: 'A', metadata: '',
            id_instituicao: '2'
        },
        {
            id_local: '10', criacao: '2020-10-10 10:01:10',
            ultima_atualizacao: '2020-10-10 10:01:10',
            descricao: 'Coordenadoria de Extensão', descricao_normalizada: 'COORDENADORIA DE EXTENSAO',
            lotacao_maxima: 4, aberto_fechado: 'A', metadata: '',
            id_instituicao: '2'
        },
        {
            id_local: '11', criacao: '2020-10-10 10:01:10',
            ultima_atualizacao: '2020-10-10 10:01:10',
            descricao: 'Biblioteca', descricao_normalizada: 'BIBLIOTECA',
            lotacao_maxima: 20, aberto_fechado: 'A', metadata: '',
            id_instituicao: '2'
        },
        {
            id_local: '12', criacao: '2020-10-10 10:01:10',
            ultima_atualizacao: '2020-10-10 10:01:10',
            descricao: 'Sala de Estudos', descricao_normalizada: 'SALA DE ESTUDOS',
            lotacao_maxima: 20, aberto_fechado: 'A', metadata: '',
            id_instituicao: '2'
        }
    ]);

}