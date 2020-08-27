import { Response, Request, response } from 'express';

import db from '../database/connection';

export default class HealthActivitiesController {

    async getAll(request: Request, response: Response) {

        var activities;

        try {
            activities = await db('health_activities')
                .select('*');
        }catch(err) {
            return response.status(500).json({
                error: 'Unexpected error',
                sqlMessage: err.sqlMessage,
                sqlState: err.sqlState
            });
        }

        return response.json(activities);
    }

    async count(request: Request, response: Response) {

        const { id } = request.params;
        var number_of_activities;

        if(id) {
            try {
                number_of_activities = await db('health_activities')
                    .count()
                    .where('usuario_id', id);
            }catch (err) {
                return response.status(500).json({
                    error: 'Unexpected error',
                    sqlMessage: err.sqlMessage,
                    sqlState: err.sqlState
                });
            }
        } else {
            try {
                number_of_activities = await db('health_activities').count();
            }catch (err) {
                return response.status(500).json({
                    error: 'Unexpected error',
                    sqlMessage: err.sqlMessage,
                    sqlState: err.sqlState
                });
            }
        }
        return response.json(number_of_activities);
    }

    async create(request: Request, response: Response) {
        const {
            data,
            temperatura,
            coriza,
            dificuldade_respiracao,
            tosse,
            cansaco,
            febre,
            contato_com_exposto,
            usuario_id
        } = request.body;

        try {
            await db('health_activities').insert({
                data,
                temperatura,
                coriza,
                dificuldade_respiracao,
                tosse,
                cansaco,
                febre,
                contato_com_exposto,
                usuario_id
            }).then(async(healthActivity) => {
                await db('health_activities')
                    .where('id_health_activities', healthActivity[0])
                    .then((recoverdActivity) => {
                        return response.status(201).json(recoverdActivity);
                    });
            });
        } catch (err) {
            return response.status(500).json({
                error: 'Unexpected error creating Health Activity',
                sqlMessage: err.sqlMessage,
                sqlState: err.sqlState
            });
        }
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;
        try {
            await db('health_activities').where('id_health_activities', id).del().then(() => {
                return response.status(200).json({
                    message: 'Health Activity deleted successfully'
                });
            });
        } catch (err) {
            return response.status(500).json({
                error: 'Unexpected error deleting Health Activity',
                sqlMessage: err.sqlMessage,
                sqlState: err.sqlState
            });
        }
    }

    async edit(request: Request, response: Response) {
        const { id } = request.params;

        const {
            data,
            temperatura,
            coriza,
            dificuldade_respiracao,
            tosse,
            cansaco,
            febre,
            contato_com_exposto,
            usuario_id
        } = request.body;

        try {
            await db('health_activities')
                .where('id_health_activities', id)
                .update({
                    data,
                    temperatura,
                    coriza,
                    dificuldade_respiracao,
                    tosse,
                    cansaco,
                    febre,
                    contato_com_exposto,
                    usuario_id
                }).then(async() => {
                    await db('health_activities')
                        .where('id_health_activities', id)
                        .then((recoveredActivity) => {
                            return response.status(200).json(recoveredActivity);
                        });
                });
        } catch (err) {
            return response.status(500).json({
                error: 'Unexpected error updating Health Activity',
                sqlMessage: err.sqlMessage,
                sqlState: err.sqlState
            });
        }
    }
}