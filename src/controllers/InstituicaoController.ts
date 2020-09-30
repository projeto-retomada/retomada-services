import { Response, Request} from  'express';

import db from '../database/connection';

export default class instituicaoController {
    async create(request: Request, response: Response) {

        var nome_normalizado = request.body.nome;
        nome_normalizado = nome_normalizado.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        nome_normalizado = nome_normalizado.replace(' ','_');
        nome_normalizado = nome_normalizado.toLocaleUpperCase();

        const {
            emblema,
            cnpj,
            nome,
            metadata
        } = request.body;

        if (!cnpj || !nome) 
            return response.status(500).json({
                error: 'Parâmetros requeridos não foram informados'
            });

        try {
            db('metrica_log').insert(
                {emblema,
                cnpj,
                nome,
                metadata});
            await db('instituicao').insert({
                emblema,
                cnpj,
                nome,
                nome_normalizado,
                metadata
            }).then(() => { 
                response.status(200).json ({
                    message: 'Instituição cadastrada com sucesso'
                });
          });
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
                error: 'O nome do usuário qu realizou a ação não foi informado'
            });
        }
        
        if(filters.nome) {
            filters.nome = filters.nome.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            filters.nome = filters.nome.replace(' ','_');
            filters.nome = filters.nome.toLocaleUpperCase();

            console.log(filters.nome);
        }

        try {
            var query = await db('instituicao').select('*').where(function() {
                if(filters.cnpj)
                    this.where('cnpj', filters.cnpj);
                if(filters.id_instituicao)
                    this.where('id_instituicao', filters.id_instituicao);
                if(filters.nome)
                    this.where('nome_normalizado', 'LIKE', '%' + filters.nome + '%');
            }); 
            
            return response.status(200).json(query);
        } catch (err) {
            return response.status(500).json({
                error: 'Erro ao consultar instituições',
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

        if(!filters || !filters.id_usuario || (!filters.cnpj && !filters.id_instituicao)) {
            response.status(500).json({
                error: 'Nenhum filtro de deleção foi informado'
            });
        }

        try {
            var query = await db('instituicao').where(function() {
                //podemos excluir uma lista de cnpjs e/ou uma lista de ids
                if(filters && filters.cnpj)
                    this.whereIn('cnpj', filters.cnpj);
                if(filters && filters.id_instituicao)
                    this.whereIn('id_instituicao', filters.id_instituicao);
            }).del().then(function(){
                response.status(200).json ({
                    message: 'Instituições deletadas com sucesso'
                });
            }); 
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
        const {
            emblema,
            cnpj,
            nome,
            metadata
        } = request.body;

        if(!filters || (!filters.cnpj && !filters.id_instituicao)) {
            response.status(500).json({
                error: 'Nenhum filtro de edição foi informado'
            });
        }

        var columns:any = {};
        if (request.body.emblema)
            columns.emblema = request.body.emblema; 
        if (request.body.cnpj)
            columns.cnpj = request.body.cnpj; 
        if (request.body.nome)
            columns.nome = request.body.nome; 
        if (request.body.metadata)
            columns.nome = request.body.metadata;     

        try {
            var query = await db('instituicao')
            .where(function() {
                if(filters && filters.cnpj)
                    this.whereIn('cnpj', filters.cnpj);
                if(filters && filters.id_instituicao)
                    this.whereIn('id_instituicao', filters.id_instituicao);
            })
            .update(columns)
            .then(function(){
                response.status(200).json ({
                    message: 'Instituições editadas com sucesso'
                });
            }); 
        } catch (err) {
            return response.status(500).json({
                error: 'Erro ao editar instituições',
                sqlMessage: err.sqlMessage,
                sqlState: err.sqlState
            });
        } finally {
            db.destroy();
        }
    }
}
