import { Response, Request } from 'express';

import db from '../database/connection';

export default class UsuarioController {

    async getAll(request: Request, response: Response) {
        const filters = request.query;
        const usuarios = await db('usuario').select('*');
        return response.json(usuarios);
    }

    async create(request: Request, response: Response) {
        const {
            nome,
            cpf_cnpj,
            grupo_risco,
            imune,
            metadata,
            tipo_usuario,
            id_instituicao
        } = request.body;

        try {
            await db('usuario').insert({
                nome,
                cpf_cnpj,
                grupo_risco,
                imune,
                metadata,
                tipo_usuario,
                id_instituicao
            });
            return response.status(201);
        } catch (err) {
            return response.status(400).json({
                error: 'Erro inesperado na criação do usuário',
                sqlMessage: err.sqlMessage,
                sqlState: err.sqlState
            });
        }
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;
        try {
            await db('usuario').where('id_usuario', id).del();
            return response.status(200);
        } catch (err) {
            return response.status(400).json({
                error: 'Erro inesperado na criação do usuário',
                sqlMessage: err.sqlMessage,
                sqlState: err.sqlState
            });
        }
    }

    async edit(request: Request, response: Response) {
        const { id } = request.params;

        const {
            nome,
            cpf_cnpj,
            grupo_risco,
            imune,
            metadata,
            tipo_usuario,
            id_instituicao
        } = request.body;

        try {
            await db('usuario')
                .where('id_usuario', id)
                .update({
                    nome,
                    cpf_cnpj,
                    grupo_risco,
                    imune,
                    metadata,
                    tipo_usuario,
                    id_instituicao
                });
            return response.status(200);
        } catch (err) {
            return response.status(400).json({
                error: 'Erro inesperado na criação do usuário',
                sqlMessage: err.sqlMessage,
                sqlState: err.sqlState
            });
        }
    }
}
