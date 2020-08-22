import { Response, Request, json} from  'express';

import db from '../database/connection';

export default class logsController {

    create(id_usuario: string, conteudo: object, tipo: string ) {

        var conteudoText = JSON.stringify(conteudo);

        try {
            db('metrica_log').insert({criacao: db.fn.now(), tipo, id_usuario, conteudo: conteudoText});
        }
        finally {
            db.destroy();
        }
    }
}
