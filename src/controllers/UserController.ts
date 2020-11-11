import { Response, Request } from 'express';
import { AES, enc } from 'crypto-ts';
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

        senha = AES.encrypt(senha, 'retomadaKey');

        try {
            await db('user').select('*')
            .where('email', email)
            .then(user => {
                if (user[0]) {
                    var bytes  = AES.decrypt(senha.toString(), 'retomadaKey');
                    var senhaParametros = bytes.toString(enc.Utf8);

                    var senhaBanco = user[0].senha;
                    bytes  = AES.decrypt(senhaBanco.toString(), 'retomadaKey');
                    senhaBanco = bytes.toString(enc.Utf8);

                    if (senhaBanco == senhaParametros) {
                        return response.status(200).json(user);
                    }
                    else {
                        return response.status(500).json({
                            error: 'Senha Inválida'
                        }); 
                    }
                }
                else {
                    return response.status(500).json({
                        error: 'Email inválido'
                    }); 
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
                users = await db('user').select('*').where('id_user', id);
            } catch (err) {
                return response.status(500).json({
                    error: 'Unexpected error getting user',
                    sqlMessage: err.sqlMessage,
                    sqlState: err.sqlState
                });
            }
        } else {
            try {
                users = await db('user').select('*');
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
            tipo_user,
            email,
            senha,
            id_instituicao
        } = request.body;

        senha = AES.encrypt(senha, 'retomadaKey').toString();

        try {
            await db('user').insert({
                nome,
                cpf_cnpj,
                grupo_risco,
                imune,
                metadata,
                tipo_user,
                email,
                senha,
                id_instituicao
            }).then(async (user) => {
                await db('user').where('id_user', user[0])
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
            await db('user').where('id_user', id).del().then(() => {
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
            tipo_user,
            id_instituicao
        } = request.body;

        try {
            await db('user')
                .where('id_user', id)
                .update({
                    nome,
                    cpf_cnpj,
                    grupo_risco,
                    imune,
                    metadata,
                    tipo_user,
                    id_instituicao
                }).then(async(user) => {
                    await db('user')
                        .where('id_user', id)
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
