import { UsersRepo } from './../repositories/users/UsersRepo';
import { Response, Request, NextFunction } from 'express';
import db from '../database/connection';
import HttpException from '../error/HttpException';
import { UserMapper } from '../mappers/UserMapper';
import { UsersIRepo } from '../repositories/users/UsersIRepo';
import { injectable, inject } from 'tsyringe';

export default class UserController {
    usersRepo: UsersRepo;
    userMapper: UserMapper;

    constructor(usersRepo: UsersRepo, userMapper: UserMapper) {
        this.usersRepo = usersRepo;
        this.userMapper = userMapper;
    }

    public async getAll(request: Request, response: Response, next: NextFunction): Promise<any> {
        try {
            const users = await this.usersRepo.findAllUsers();
            return response.status(200).json(users); 
        } catch (err) {
            next(new HttpException(500, 'Unexpected error getting user', err.sqlMessage));
        }
    }

    public create = async(request: Request, response: Response, next: NextFunction) => {
        const body = request.body;
        if (body) {
            console.log(body);
            console.log(this.userMapper.toDTO(body));
        }
    }
}
