import { Response, Request} from  'express';

import db from '../database/connection';

export default class UsuarioController {

    async getAll(request: Request, response: Response) {
        const filters = request.query;
        console.log(filters);
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
            tipo_usuario
        } = request.body;

        try {
            await db('usuario').insert({
                nome,
                cpf_cnpj,
                grupo_risco,
                imune,
                metadata,
                tipo_usuario
            });

            return response.status(201);
        } catch(err) {
            return response.status(400).json({
                error: 'Unexpected error while creating new class'
            });
        }
    }
}
