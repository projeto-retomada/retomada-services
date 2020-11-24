import express from 'express';
import LoginController from './controllers/LoginController';
import {authenticateMiddleware, validationMiddleware} from './error/ValidationMiddleware';

import UserController from './controllers/UserController';
import { UsersRepo } from './repositories/users/UsersRepo';
import UserInput from './models/UserInput';
import { UserMapper } from './mappers/UserMapper';

import OrganizationController from './controllers/OrganizationController';
import { OrganizationRepo } from './repositories/organization/OrganizationRepo';
import { OrganizationMapper } from './mappers/OrganizationMapper';
import OrganizationInput from './models/OrganizationInput';

const routes = express.Router();

const userController = new UserController(new UsersRepo(),new UserMapper());
const loginController = new LoginController(new UsersRepo(),new UserMapper());
const organizarionController = new OrganizationController(new OrganizationRepo(), new OrganizationMapper());


routes.get('/', (request, response) => {
    return response.send('200: OK');
});

routes.get('/users', authenticateMiddleware, userController.getAll);
routes.get('/users/:id', authenticateMiddleware, userController.getAll);
routes.post('/users', authenticateMiddleware, validationMiddleware(UserInput), userController.create);
routes.put('/users/:id', authenticateMiddleware, validationMiddleware(UserInput), userController.update);
routes.delete('/users/:id', authenticateMiddleware, userController.delete);

routes.get('/login', loginController.login);

routes.get('/organizations', organizarionController.getAll);
routes.get('/organizations/:id', organizarionController.getAll);
routes.post('/organizations', validationMiddleware(OrganizationInput), organizarionController.create);


export default routes;