import { AES, enc } from 'crypto-ts';
import bcrypt from 'bcrypt';
import db from '../database/connection';
import * as jwt from '../authentication/jwt';
import { Response, Request, NextFunction } from 'express';
import HttpException from '../error/HttpException';
import { UsersRepo } from './../repositories/users/UsersRepo';
import { UserMapper } from '../mappers/UserMapper';
import UserModel from '../models/UserModel';

export default class UserController {

    usersRepo: UsersRepo;
    userMapper: UserMapper;

    constructor(usersRepo: UsersRepo, userMapper: UserMapper) {
        this.usersRepo = usersRepo;
        this.userMapper = userMapper;
    }

    public getAll = async(request: Request, response: Response, next: NextFunction) => {

        const { id } = request.params;
        
        if (id) {
            try {
                await this.usersRepo.getUserById(id).then((resp) => {
                    return response.status(200).json(resp).send(); 
                });
            } catch (err) {
                next(new HttpException(500, 'Unexpected error getting user', err.sqlMessage));
            }
        } else {
            try {
                await this.usersRepo.findAllUsers().then((resp) => {
                    const format: Array<UserModel> = resp.map((element) => {
                       return this.userMapper.toDTO(element);
                    });
                    return response.status(200).json(format).send(); 
                });
            } catch (err) {
                next(new HttpException(500, 'Unexpected error getting users', err.sqlMessage));
            }
        }
    }

    public create = async(request: Request, response: Response, next: NextFunction) => {

        const body = request.body;

        if (body) {

            try {
                let salt = await bcrypt.genSalt(10)
                body.password = await bcrypt.hash(body.password, salt)
                const user = await this.usersRepo.save(this.userMapper.toPersistence(body)).then((err) => {});
                return response.status(200).json(user).send(); 
            }catch (err) {
                next(new HttpException(500, err.message || 'Unexpected error creating user', ''));
            }
        }
    }

    public delete = async(request: Request, response: Response, next: NextFunction) => {

        const { id } = request.params;

        if (id) {
            try {
                const user = await this.usersRepo.delete(id);
                return response.status(204).send(); 
            }catch(err) {
                next(new HttpException(500, err.message || 'Unexpected error deleting user', ''));
            }
        } else {
            next(new HttpException(404, 'Method not found', ''));
        }
    }

    public update = async(request: Request, response: Response, next: NextFunction) => {

        const { id } = request.params;
        const body = request.body;

        if (body && id) {
            try {
                const user:any = await this.usersRepo.update(this.userMapper.toPersistence(body), id);
                return response.status(200).json(user);
            }catch(err) {
                next(new HttpException(500, err.message || 'Unexpected error updating user', ''));
            }
        } else {
            next(new HttpException(404, 'Method not found', ''));
        }
    }
}
