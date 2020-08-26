import { Response, Request } from 'express';

import db from '../database/connection';

export default class UserController {

    async getAll(request: Request, response: Response) {

        const { id } = request.params;
        var usuarios;

        if (id) {
            try {
                usuarios = await db('usuario').select('*').where('id_usuario', id);
            } catch (err) {
                return response.status(500).json({
                    error: 'Unexpected error creating user',
                    sqlMessage: err.sqlMessage,
                    sqlState: err.sqlState
                });
            }
        } else {
            try {
                usuarios = await db('usuario').select('*');
            }catch(err) {
                return response.status(500).json({
                    error: 'Unexpected error creating user',
                    sqlMessage: err.sqlMessage,
                    sqlState: err.sqlState
                }); 
            }
        }
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
            }).then((usuario) => {
                return response.status(201).json({ id: usuario });
            });
        } catch (err) {
            return response.status(500).json({
                error: 'Unexpected error creating user',
                sqlMessage: err.sqlMessage,
                sqlState: err.sqlState
            });
        }
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;
        try {
            await db('usuario').where('id_usuario', id).del().then(() => {
                return response.status(200).json();
            });
        } catch (err) {
            return response.status(400).json({
                error: 'Unexpected error deleting user',
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
                }).then(() => {
                    return response.status(200).json();
                });
        } catch (err) {
            return response.status(400).json({
                error: 'Unexpected error updating user',
                sqlMessage: err.sqlMessage,
                sqlState: err.sqlState
            });
        }
    }
}
