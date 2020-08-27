import { Response, Request } from 'express';

import db from '../database/connection';

export default class CertificateController {

    async getAll(request: Request, response: Response) {

        var certificates: any;

        try {
            certificates = await db('atestado')
                .join('usuario', 'atestado.usuario_id', '=', 'usuario.id_usuario');
        }catch(err) {
            return response.status(500).json({
                error: 'Unexpected error getting user',
                sqlMessage: err.sqlMessage,
                sqlState: err.sqlState
            });
        }

        return response.json(certificates);
    }

    async create(request: Request, response: Response) {
        const {
            motivo,
            covid,
            doenca_respiratoria,
            file,
            usuario_id
        } = request.body;

        try {
            await db('atestado').insert({
                motivo,
                covid,
                doenca_respiratoria,
                file,
                usuario_id,
            }).then(async (certificate) => {
                await db('atestado').where('id_atestado', certificate[0])
                    .then(recoveredCertificate =>{
                    return response.status(201).json(recoveredCertificate);
                });
            });
        } catch (err) {
            return response.status(500).json({
                error: 'Unexpected error creating Certificate',
                sqlMessage: err.sqlMessage,
                sqlState: err.sqlState
            });
        }
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;
        try {
            await db('atestado').where('id_atestado', id).del().then(() => {
                return response.status(200).json({
                    message: 'Certificate deleted successfully'
                });
            });
        } catch (err) {
            return response.status(500).json({
                error: 'Unexpected error deleting Certificate',
                sqlMessage: err.sqlMessage,
                sqlState: err.sqlState
            });
        }
    }

    async edit(request: Request, response: Response) {
        const { id } = request.params;

        const {
            motivo,
            covid,
            doenca_respiratoria,
            file,
            usuario_id
        } = request.body;

        try {
            await db('atestado')
                .where('id_atestado', id)
                .update({
                    motivo,
                    covid,
                    doenca_respiratoria,
                    file,
                    usuario_id
                }).then(async() => {
                    await db('atestado')
                    .where('id_atestado', id)
                    .then((recovedCertificate) => {
                        return response.status(200).json(recovedCertificate);
                    });
                });
        } catch (err) {
            return response.status(500).json({
                error: 'Unexpected error updating Certificate',
                sqlMessage: err.sqlMessage,
                sqlState: err.sqlState
            });
        }
    }

}