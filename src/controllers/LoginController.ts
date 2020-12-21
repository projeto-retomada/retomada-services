import { OrganizationRepo } from './../repositories/organization/OrganizationRepo';
import bcrypt from 'bcrypt';
import * as jwt from '../authentication/jwt';
import { Response, Request, NextFunction } from 'express';
import HttpException from '../error/HttpException';
import { UsersRepo } from './../repositories/users/UsersRepo';
import { UserMapper } from '../mappers/UserMapper';

export default class LoginController {

    usersRepo: UsersRepo;
    userMapper: UserMapper;
    organizationRepo: OrganizationRepo;

    constructor(usersRepo: UsersRepo, userMapper: UserMapper,organizationRepo: OrganizationRepo) {
        this.usersRepo = usersRepo;
        this.userMapper = userMapper;
        this.organizationRepo = organizationRepo;
    }

    public login = async(request: Request, response: Response, next: NextFunction) => {

        const [, hash] = request.headers.authorization.split(' ');
        const [email, password] = Buffer.from(hash, 'base64').toString().split(":")

        if(email === undefined || password === undefined) {
            return response.status(401).send("Unauthorized");
        }

        try {
            
            const user = await this.usersRepo.getUserByCondition({"email": email})

            if(!user){
                return response.status(401).send("Unauthorized");
            }

            let passwordIsCorrect = await bcrypt.compare(password, user.password)

            if(!passwordIsCorrect){
                return response.status(401).send("Unauthorized");
            }

            const token = await jwt.sign({user: user.id_user});
            let organization:any;
            await this.organizationRepo.getOrganizationById(user.organization_id).then((resp) => {
                organization = resp;
            });
            return response.status(200).send({user, token, organization})

        }catch(err){

            next(new HttpException(500, err.message || 'Unexpected error', ''));

        }
        
    }

}
