import express, { response, Router } from 'express';
import InstituicaoController from './controllers/InstituicaoController';
import LocalController from './controllers/LocalController';
import CertificateController from './controllers/CertificateController';
import HealthActivitiesController from './controllers/HealthActivitiesController';
import UserController from './controllers/UserController';

const routes = express.Router();
const userController = new UserController();
const instituicaoController = new InstituicaoController();
const localCOontroller = new LocalController();
const certificateController = new CertificateController();
const healthActivitiesController = new HealthActivitiesController();

routes.get('/', (request, response) => {
    return response.send('200: OK');
});

//Rotas da entidade Usuário
routes.get('/usuarios', userController.getAll);
routes.get('/usuarios/:id', userController.getAll);
routes.post('/usuarios', userController.create);
routes.delete('/usuarios/:id', userController.delete);
routes.put('/usuarios/:id', userController.edit);

routes.post('/create-institutions', instituicaoController.create);
routes.get('/list-institutions', instituicaoController.index);
routes.delete('/delete-institutions', instituicaoController.delete);
routes.put('/edit-institutions', instituicaoController.edit);

routes.post('/create-locations', localCOontroller.create);
routes.get('/list-locations', localCOontroller.index);
routes.delete('/delete-locations', localCOontroller.delete);
routes.put('/edit-locations', localCOontroller.edit);

routes.get('/certificates', certificateController.getAll);
routes.post('/certificates', certificateController.create);
routes.delete('/certificates/:id', certificateController.delete);
routes.put('/certificates/:id', certificateController.edit);

routes.get('/health-activities', healthActivitiesController.getAll);
routes.get('/health-activities/:id', healthActivitiesController.getAll);
routes.post('/health-activities', healthActivitiesController.create);
routes.get('/health-activities/count', healthActivitiesController.count);
routes.get('/health-activities/count/:id', healthActivitiesController.count);
routes.delete('/health-activities/:id', healthActivitiesController.delete);
routes.put('/health-activities/:id', healthActivitiesController.edit);

export default routes;