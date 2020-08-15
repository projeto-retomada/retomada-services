import express, { response } from 'express';
import UsuarioController from './controllers/UsuarioController';

const routes = express.Router();
const usuarioController = new UsuarioController();

routes.get('/', (request, response) => {
    return response.send('200: OK');
});

//Rotas da entidade Usuário
routes.get('/usuarios', usuarioController.getAll);
routes.post('/usuarios', usuarioController.create);
routes.delete('/usuarios/:id', usuarioController.delete);
routes.put('/usuarios/:id', usuarioController.edit);

export default routes;