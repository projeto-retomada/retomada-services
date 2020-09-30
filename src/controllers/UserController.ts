import { Response, Request } from 'express';
import { SHA256 } from 'crypto-ts';
import db from '../database/connection';

export default class UserController {

    async login(request: Request, response: Response) {
        var {
            email,
            senha
        } = request.body;

        if (!email || !senha){
            return response.status(500).json({
                error: 'Parâmetros requeridos não informados'
            }); 
        }

        senha = SHA256(senha);

        try {
            await db('usuario').select('*')
            .where('email', email)
            .andWhere('senha', senha).then(user => {
                if(user[0].id_usuario) {
                    return response.status(201).json(user[0]);
                }
            });
        } catch (err) {
            return response.status(500).json({
                error: 'Unexpected error getting user',
                sqlMessage: err.sqlMessage,
                sqlState: err.sqlState
            });
        }

    }

    async getAll(request: Request, response: Response) {

        const { id } = request.params;
        var users: any;

        if (id) {
            try {
                users = await db('usuario').select('*').where('id_usuario', id);
            } catch (err) {
                return response.status(500).json({
                    error: 'Unexpected error getting user',
                    sqlMessage: err.sqlMessage,
                    sqlState: err.sqlState
                });
            }
        } else {
            try {
                users = await db('usuario').select('*');
            }catch(err) {
                return response.status(500).json({
                    error: 'Unexpected error getting user',
                    sqlMessage: err.sqlMessage,
                    sqlState: err.sqlState
                }); 
            }
        }
        return response.json(users);
    }

    async create(request: Request, response: Response) {
        var {
            nome,
            cpf_cnpj,
            grupo_risco,
            imune,
            metadata,
            tipo_usuario,
            email,
            senha,
            id_instituicao
        } = request.body;

        senha = SHA256(senha);

        try {
            await db('usuario').insert({
                nome,
                cpf_cnpj,
                grupo_risco,
                imune,
                metadata,
                tipo_usuario,
                email,
                senha,
                id_instituicao
            }).then(async (user) => {
                await db('usuario').where('id_usuario', user[0])
                    .then(recoveredUser =>{
                    return response.status(201).json(recoveredUser);
                });
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
                return response.status(200).json({
                    message: 'User deleted successfully'
                });
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
                }).then(async(usuario) => {
                    await db('usuario')
                        .where('id_usuario', id)
                        .then((recovedUser) => {
                            return response.status(200).json(recovedUser);
                        });
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
