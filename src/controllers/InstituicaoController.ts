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

        try {
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
                error: 'Erro ao inserir nova instituição'
            });
        } finally {
            db.destroy();
        }
    }

    async index(request: Request, response: Response) {
        const stringFilters = request.query.filters as string;
        const filters = JSON.parse(stringFilters);
        
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
                error: 'Erro ao consultar instituições'
            });
        } finally {
            db.destroy();
        }
    }
}
