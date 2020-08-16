import express, { response } from 'express';
import UsuarioController from './controllers/UsuarioController';
import InstituicaoController from './controllers/InstituicaoController';

const routes = express.Router();
const usuarioController = new UsuarioController();
const instituicaoController = new InstituicaoController();

routes.get('/', (request, response) => {
    return response.send('200: OK');
});
routes.get('/usuarios', usuarioController.getAll);
routes.post('/usuarios', usuarioController.create);

routes.post('/create-institutions', instituicaoController.create);
routes.get('/list-institutions', instituicaoController.index);
routes.delete('/delete-institutions', instituicaoController.delete);
routes.put('/edit-institutions', instituicaoController.edit);


export default routes;