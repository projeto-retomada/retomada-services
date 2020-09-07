import express, { response } from 'express';
import UsuarioController from './controllers/UsuarioController';
import InstituicaoController from './controllers/InstituicaoController';
import LocalController from './controllers/LocalController';
import CriterioSanitarioController from './controllers/CriterioSanitarioController';

const routes = express.Router();
const usuarioController = new UsuarioController();
const instituicaoController = new InstituicaoController();
const localCOontroller = new LocalController();
const criterioSanitarioController = new CriterioSanitarioController();

routes.get('/', (request, response) => {
    return response.send('200: OK');
});

//Rotas da entidade Usuário
routes.get('/usuarios', usuarioController.getAll);
routes.post('/usuarios', usuarioController.create);
routes.delete('/usuarios/:id', usuarioController.delete);
routes.put('/usuarios/:id', usuarioController.edit);

routes.post('/create-institutions', instituicaoController.create);
routes.get('/list-institutions', instituicaoController.index);
routes.delete('/delete-institutions', instituicaoController.delete);
routes.put('/edit-institutions', instituicaoController.edit);

routes.post('/create-locations', localCOontroller.create);
routes.get('/list-locations', localCOontroller.index);
routes.delete('/delete-locations', localCOontroller.delete);
routes.put('/edit-locations', localCOontroller.edit);

routes.post('/create-health-criterion', criterioSanitarioController.create);
routes.get('/list-health-criterion', criterioSanitarioController.index);
routes.delete('/delete-health-criterion', criterioSanitarioController.delete);
routes.put('/edit-health-criterion', criterioSanitarioController.edit);


export default routes;