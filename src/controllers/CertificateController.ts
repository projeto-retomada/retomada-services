import { Response, Request } from 'express';

import db from '../database/connection';

export default class CertificateController {

    async getAll(request: Request, response: Response) {
        const atestados = await db('atestado').select('*');
        return response.json(atestados);
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
            }).then((atestado) => {
                return response.status(201).json({ id: atestado });
            });
        } catch (err) {
            return response.status(400).json({
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
                return response.status(200).json();
            });
        } catch (err) {
            return response.status(400).json({
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
                }).then(() => {
                    return response.status(200).json();
                });
        } catch (err) {
            return response.status(400).json({
                error: 'Unexpected error updating Certificate',
                sqlMessage: err.sqlMessage,
                sqlState: err.sqlState
            });
        }
    }

}