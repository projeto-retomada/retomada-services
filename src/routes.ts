import express, { response, Router } from 'express';
import InstituicaoController from './controllers/InstituicaoController';
import LocalController from './controllers/LocalController';
import CertificateController from './controllers/CertificateController';
import HealthActivitiesController from './controllers/HealthActivitiesController';
import UserController from './controllers/UserController';
import ActivityNoteController from './controllers/ActivityNoteController';
import ActivityController from './controllers/ActivityController';

const routes = express.Router();

const userController = new UserController();
const instituicaoController = new InstituicaoController();
const localCOontroller = new LocalController();
const certificateController = new CertificateController();
const healthActivitiesController = new HealthActivitiesController();
const activityNoteController = new ActivityNoteController();
const activityController = new ActivityController();

routes.get('/', (request, response) => {
    return response.send('200: OK');
});

routes.post('/login', userController.login);

routes.get('/users', userController.getAll);
routes.get('/users/:id', userController.getAll);
routes.post('/users', userController.create);
routes.delete('/users/:id', userController.delete);
routes.put('/users/:id', userController.edit);

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

routes.get('/user/:idUsuario/activity-note', activityNoteController.getAll);
routes.post('/user/:idUsuario/activity-note', activityNoteController.create);
routes.delete('/user/:idUsuario/activity-note/:id', activityNoteController.delete);

routes.post('/activity', activityController.create);
routes.get('/:idLocal/activity', activityController.index);
routes.delete('/:idLocal/activity/:idAtividade', activityController.delete);
routes.put('/:idLocal/activity/:idAtividade', activityController.edit);

export default routes;