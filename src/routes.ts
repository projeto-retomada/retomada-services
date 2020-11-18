import { UserMapper } from './mappers/UserMapper';
import express from 'express';
import LoginController from './controllers/LoginController';
import UserController from './controllers/UserController';
import { UsersRepo } from './repositories/users/UsersRepo';
import {authenticateMiddleware, validationMiddleware} from './error/ValidationMiddleware';
import UserDTO from './models/UserInput';


const routes = express.Router();

const userController = new UserController(new UsersRepo(),new UserMapper());
const loginController = new LoginController(new UsersRepo(),new UserMapper());


routes.get('/', (request, response) => {
    return response.send('200: OK');
});

routes.get('/users', authenticateMiddleware, userController.getAll);
routes.get('/users/:id', authenticateMiddleware, userController.getAll);
routes.post('/users', authenticateMiddleware, validationMiddleware(UserDTO), userController.create);
routes.put('/users/:id', authenticateMiddleware, validationMiddleware(UserDTO), userController.update);
routes.delete('/users/:id', authenticateMiddleware, userController.delete);

routes.get('/login', loginController.login);


export default routes;