import { AES, enc } from 'crypto-ts';
import bcrypt from 'bcrypt';
import * as jwt from '../authentication/jwt';
import { Response, Request, NextFunction } from 'express';
import HttpException from '../error/HttpException';
import { UsersRepo } from './../repositories/users/UsersRepo';
import { UserMapper } from '../mappers/UserMapper';
import UserModel from '../models/UserModel';

export default class LoginController {

    usersRepo: UsersRepo;
    userMapper: UserMapper;

    constructor(usersRepo: UsersRepo, userMapper: UserMapper) {
        this.usersRepo = usersRepo;
        this.userMapper = userMapper;
    }

    public login = async(request: Request, response: Response, next: NextFunction) => {

        const [, hash] = request.headers.authorization.split(' ');
        const [email, password] = Buffer.from(hash, 'base64').toString().split(":")
        
        console.log(email, password)

        try {
            
            const user = await this.usersRepo.getUserByCondition({"email": email})

            if(!user){
                return response.status(401).send("Unauthorized");
            }

            let passwordIsCorrect = await bcrypt.compare(password, user.password)

            if(!passwordIsCorrect){
                return response.status(401).send("Unauthorized");
            }

            const token = jwt.sign({user: user.id_user})

            // const verify = jwt.verify(token + "asd")
            // console.log(verify)
            return response.status(200).send({user, token})

        }catch(err){

            next(new HttpException(500, err.message || 'Unexpected error', ''));

        }
        
    }

}
