import express, { response } from 'express';
import UsuarioController from './controllers/UsuarioController';

const routes = express.Router();
const usuarioController = new UsuarioController();

routes.get('/', (request, response) => {
    return response.send('200: OK');
});
routes.get('/usuarios', usuarioController.getAll);
routes.post('/usuarios', usuarioController.create);

export default routes;