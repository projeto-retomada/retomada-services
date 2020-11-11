import express from 'express';
import UserController from './controllers/UserController';


const routes = express.Router();

const userController = new UserController();

routes.get('/', (request, response) => {
    return response.send('200: OK');
});

routes.post('/login', userController.login);

routes.get('/users', userController.getAll);
routes.get('/users/:id', userController.getAll);
routes.post('/users', userController.create);
routes.delete('/users/:id', userController.delete);
routes.put('/users/:id', userController.edit);

export default routes;