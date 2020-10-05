import { Response, Request } from 'express';

import db from '../database/connection';

export default class ActivityNoteController {

    async getAll(request: Request, response: Response) {

        const {
            idUsuario,
        } = request.params;

        var activityNotes: any;

        try {
            activityNotes = await db('apontamento_atividade').select('*').where('id_usuario',idUsuario)
                .join('usuario', 'apontamento_atividade.usuario_id', '=', 'usuario.id_usuario')
                .join('atividade', 'apontamento_atividade.atividade_id', '=','atividade.id_atividade');
        }catch(err) {
            return response.status(500).json({
                error: 'Unexpected error getting user',
                sqlMessage: err.sqlMessage,
                sqlState: err.sqlState
            });
        }

        return response.json(activityNotes);
    }

    async create(request: Request, response: Response) {

        const { atividade_id } = request.body;
        const { idUsuario } = request.params;

        const usuario_id = idUsuario;

        try {
            await db('apontamento_atividade').insert({
                usuario_id,
                atividade_id,
            }).then(async (note) => {
                await db('apontamento_atividade').where('id_apontamento_atividade', note[0])
                    .then(recoveredNote =>{
                    return response.status(201).json(recoveredNote);
                });
            });
        } catch (err) {
            return response.status(500).json({
                error: 'Unexpected error creating Activity Note',
                sqlMessage: err.sqlMessage,
                sqlState: err.sqlState
            });
        }
    }

    async delete(request: Request, response: Response) {

        const { id } = request.params;
        try {
            await db('apontamento_atividade').where('id_apontamento_atividade', id).del().then(() => {
                return response.status(200).json({
                    message: 'Activity Note deleted successfully'
                });
            });
        } catch (err) {
            return response.status(500).json({
                error: 'Unexpected error deleting Activity Note',
                sqlMessage: err.sqlMessage,
                sqlState: err.sqlState
            });
        }
    }
}