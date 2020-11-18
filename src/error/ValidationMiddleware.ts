import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import * as express from 'express';
import HttpException from './/HttpException';
import * as jwt from  '../authentication/jwt';
import {UsersRepo} from '../repositories/users/UsersRepo';

const userRepo = new UsersRepo()

export const authenticateMiddleware = async (req, res, next) => {
  const [, token] = req.headers.authorization.split(' ');
  try {
    const payload = await jwt.verify(token);
    const user = await userRepo.getUserByCondition({id_user: payload.user});

    if(!user){
      next(new HttpException(401, "Unauthorized",''));
    }
    req.auth = user;
    next()
  }catch(error) {
    next(new HttpException(401, error,''));
  }
}

export function validationMiddleware<T> (type: any): express.RequestHandler {
  return async (req, res, next) => {
    validate(plainToClass(type, req.body))
      .then( async(errors: ValidationError[]) => {
        if (errors.length > 0) {
          const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
          next(new HttpException(400, message,''));
        } else {
          next();
        }
    });
  };
}


