import { Response, Request} from  'express';

import db from '../database/connection';
import LogsController from './LogsController';

export default class localController {

    logsController = new LogsController();
    tiposLog = {
        EDITLOG: 'EDITAR-LOCAL',
        CREATELOG: 'CRIAR-LOCAL',
        EXCLUDELOG: 'EXCLUIR-LOCAL',
        LISTLOG: 'LISTAR-LOCAL'
    }

    async create(request: Request, response: Response) {

        var {
            descricao,
            lotacao_maxima,
            aberto_fechado,
            metadata,
            id_instituicao,
            id_usuario
        } = request.body;

        if (!metadata) 
            metadata = {};

        if (!aberto_fechado || !descricao || !id_instituicao || !id_usuario) 
            return response.status(500).json({
                error: 'Parâmetros requeridos não foram informados'
            });

        var descricao_normalizada = descricao;
        descricao_normalizada = descricao_normalizada.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        descricao_normalizada = descricao_normalizada.replace(' ','_');
        descricao_normalizada = descricao_normalizada.toLocaleUpperCase();

        try {
            await db('local').insert({
                criacao: db.fn.now(),
                ultima_atualizacao: db.fn.now(),
                descricao,
                descricao_normalizada,
                lotacao_maxima,
                aberto_fechado,
                metadata,
                id_instituicao
            }).then(() => { 
                response.status(200).json ({
                    message: 'Local cadastrado com sucesso'
                });
          });

          //gerando log de criação de instituição 
          var conteudoEdicao = {
            descricao,
            lotacao_maxima,
            aberto_fechado,
            metadata,
            id_instituicao
          };
          this.logsController.create(id_usuario as string, conteudoEdicao, this.tiposLog.CREATELOG);

        } catch(err) {
            return response.status(500).json({
                error: 'Erro ao inserir nova instituição',
                sqlMessage: err.sqlMessage,
                sqlState: err.sqlState
            });
        } finally {
            db.destroy();
        }
    }

    async index(request: Request, response: Response) {
        const stringFilters = request.query.filters as string;
        const filters = JSON.parse(stringFilters);

        if (!filters.id_usuario) {
            return response.status(500).json({
                error: 'O nome do usuário que realizou a ação não foi informado'
            });
        }
        
        if(filters.descricao) {
            filters.descricao = filters.descricao.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            filters.descricao = filters.descricao.replace(' ','_');
            filters.descricao = filters.descricao.toLocaleUpperCase();
        }

        try {
            var query = await db('local').select('*').where(function() {
                if(filters.cnpj)
                    this.where('aberto_fechado', filters.aberto_fechado);
                if(filters.id_instituicao)
                    this.where('id_instituicao', filters.id_instituicao);
                if(filters.nome)
                    this.where('descricao_normalizada', 'LIKE', '%' + filters.descricao + '%');
                if(filters.id_local)
                    this.where('id_local', filters.id_local);
            }); 
            
            //gerando log de criação de instituição 
            var conteudoListagem = {
                aberto_fechado: filters.aberto_fechado,
                descricao: filters.descricao,
                id_local: filters.id_local,
                id_instituicao: filters.id_instituicao
            };
            this.logsController.create(filters.id_usuario as string, conteudoListagem, this.tiposLog.LISTLOG);
            
            return response.status(200).json(query);
        } catch (err) {
            return response.status(500).json({
                error: 'Erro ao consultar locais',
                sqlMessage: err.sqlMessage,
                sqlState: err.sqlState
            });
        } finally {
            db.destroy();
        }
    }

    async delete(request: Request, response: Response) {
        const stringFilters = request.query.filters as string;
        const filters = JSON.parse(stringFilters);

        if(!filters || !filters.id_usuario || (!filters.id_local && !filters.id_instituicao)) {
            response.status(500).json({
                error: 'Nenhum filtro de deleção foi informado'
            });
        }

        try {
            var query = await db('local').where(function() {
                if(filters && filters.cnpj)
                    this.whereIn('id_local', filters.id_local);
                if(filters && filters.id_instituicao)
                    this.whereIn('id_instituicao', filters.id_instituicao);
            }).del().then(function(){
                response.status(200).json ({
                    message: 'Locais deletados com sucesso'
                });
            }); 
            var conteudoExclusao = {
                id_local: filters.id_local,
                id_instituicao: filters.id_instituicao,
            };
            this.logsController.create(filters.id_usuario as string, conteudoExclusao, this.tiposLog.EXCLUDELOG);
        } catch (err) {
            return response.status(500).json({
                error: 'Erro ao deletar instituições',
                sqlMessage: err.sqlMessage,
                sqlState: err.sqlState
            });
        } finally {
            db.destroy();
        }
    }

    async edit(request: Request, response: Response) {
        const stringFilters = request.query.filters as string;
        const filters = JSON.parse(stringFilters);
        var {
            descricao,
            lotacao_maxima,
            aberto_fechado,
            metadata,
            id_instituicao,
            id_usuario
        } = request.body;

        if(!filters || !filters.id_usuario || (!filters.id_local && !filters.id_instituicao)) {
            response.status(500).json({
                error: 'Nenhum filtro de deleção foi informado'
            });
        }

        var descricao_normalizada = descricao;
        descricao_normalizada = descricao_normalizada.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        descricao_normalizada = descricao_normalizada.replace(' ','_');
        descricao_normalizada = descricao_normalizada.toLocaleUpperCase();

        var columns:any = {};
        columns.ultima_atualizacao = db.fn.now();
        if (metadata)
            columns.metadata = metadata; 
        if (lotacao_maxima)
            columns.lotacao_maxima = lotacao_maxima; 
        if (aberto_fechado)
            columns.aberto_fechado = aberto_fechado; 
        if (id_instituicao)
            columns.id_instituicao = id_instituicao;
        if (descricao) {
            columns.descricao = descricao;
            columns.descricao_normalizada = descricao_normalizada;
        }

        try {
            var query = await db('local')
            .where(function() {
                if(filters && filters.cnpj)
                    this.whereIn('id_local', filters.id_local);
                if(filters && filters.id_instituicao)
                    this.whereIn('id_instituicao', filters.id_instituicao);
            })
            .update(columns)
            .then(function(){
                response.status(200).json ({
                    message: 'Locais editados com sucesso'
                });
            }); 
            this.logsController.create(filters.id_usuario as string, columns, this.tiposLog.EDITLOG);
        } catch (err) {
            return response.status(500).json({
                error: 'Erro ao editar locais',
                sqlMessage: err.sqlMessage,
                sqlState: err.sqlState
            });
        } finally {
            db.destroy();
        }
    }
}
