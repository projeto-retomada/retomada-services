import { Response, Request} from  'express';

import db from '../database/connection';

export default class activityController {

    async create(request: Request, response: Response) {

        var {
            data_inicio,
            data_encerramento,
            descricao,
            id_criterio_sanitario,
            id_local,
            metadata
        } = request.body;

        if (!id_criterio_sanitario || !id_local || !data_inicio || !data_encerramento || !descricao) 
            return response.status(500).json({
                error: 'Parâmetros requeridos não foram informados'
            });
        
        if(!metadata) 
            metadata = '{}'

        try {
            await db('atividade').insert({
                criacao: db.fn.now(),
                ultima_atualizacao: db.fn.now(),
                data_inicio,
                data_encerramento,
                descricao,
                id_criterio_sanitario,
                id_local,
                metadata
            }).then(() => { 
                response.status(200).json ({
                    message: 'Atividade cadastrada com sucesso'
                });
          });

        } catch(err) {
            return response.status(500).json({
                error: 'Erro ao inserir nova atividade',
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

        try {
            var query = await db('atividade').select('*').where(function() {
                if(filters.id_atividade)
                    this.whereIn('id_atividade', filters.id_atividade);
                if(filters.id_local)
                    this.whereIn('id_local', filters.id_local);
                if(filters.id_criterio_sanitario)
                    this.whereIn('id_criterio_sanitario', filters.id_criterio_sanitario);
                if(filters.data_inicio)
                    this.where('data_inicio', '>=', filters.data_inicio);
                if(filters.data_encerramento)
                    this.where('data_encerramento', '<=', filters.data_encerramento);
            }); 
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

        if(!filters && !filters.id_atividade && !filters.id_local && !filters.id_criterio_sanitario) {
            response.status(500).json({
                error: 'Nenhum filtro de deleção foi informado'
            });
        }

        try {
            var query = await db('atividade').where(function() {
                if(filters && filters.id_atividade)
                    this.whereIn('id_atividade', filters.id_atividade);
                if(filters && filters.id_local)
                    this.whereIn('id_local', filters.id_local);
                if(filters && filters.id_criterio_sanitario)
                    this.whereIn('id_criterio_sanitario', filters.id_criterio_sanitario);
            }).del().then(function(){
                response.status(200).json ({
                    message: 'Atividades deletadas com sucesso'
                });
            }); 
        } catch (err) {
            return response.status(500).json({
                error: 'Erro ao deletar atividades',
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
            data_inicio,
            data_encerramento,
            descricao,
            id_criterio_sanitario,
            id_local,
            metadata
        } = request.body;

        if(!filters && !filters.id_atividade && !filters.id_local && !filters.id_criterio_sanitario) {
            response.status(500).json({
                error: 'Nenhum filtro foi informado'
            });
        }

        var columns:any = {};
        columns.ultima_atualizacao = db.fn.now();
        if (data_inicio)
            columns.data_inicio = data_inicio; 
        if (data_encerramento)
            columns.data_encerramento = data_encerramento; 
        if (descricao)
            columns.descricao = descricao; 
        if (id_criterio_sanitario)
            columns.id_criterio_sanitario = id_criterio_sanitario;
        if (id_local)
            columns.id_local = id_local;
        if (metadata)
            columns.metadata = metadata;

        try {
            var query = await db('atividade')
            .where(function() {
                if(filters && filters.id_atividade)
                    this.whereIn('id_atividade', filters.id_atividade);
                if(filters && filters.id_local)
                    this.whereIn('id_local', filters.id_local);
                if(filters && filters.id_criterio_sanitario)
                    this.whereIn('id_criterio_sanitario', filters.id_criterio_sanitario);
            })
            .update(columns)
            .then(function(){
                response.status(200).json ({
                    message: 'Atividades editadas com sucesso'
                });
            }); 
        } catch (err) {
            return response.status(500).json({
                error: 'Erro ao editar atividades',
                sqlMessage: err.sqlMessage,
                sqlState: err.sqlState
            });
        } finally {
            db.destroy();
        }
    }
}