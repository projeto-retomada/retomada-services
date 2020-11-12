import { UserMapper } from './mappers/UserMapper';
import express from 'express';
import UserController from './controllers/UserController';
import { UsersRepo } from './repositories/users/UsersRepo';


const routes = express.Router();

const userController = new UserController(new UsersRepo(),new UserMapper());

routes.get('/', (request, response) => {
    return response.send('200: OK');
});

routes.get('/users', userController.getAll);
routes.post('/users', userController.create);


export default routes;