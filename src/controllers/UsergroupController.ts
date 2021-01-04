import { UsergroupRepo } from './../repositories/usergroup/UsergroupRepo';
import { Response, Request, NextFunction } from 'express';
import HttpException from '../error/HttpException';

export class UsergroupController {

    usergroupRepo: UsergroupRepo;

    constructor(usergroupRepo: UsergroupRepo) {
        this.usergroupRepo = usergroupRepo;
    }

    public get = async(request: Request, response: Response, next: NextFunction) => {

        const { idOrganization, idUsergroup } = request.params;

        if ( idOrganization && idUsergroup) {
            try {
                await this.usergroupRepo.getUsergroupById(idOrganization, idUsergroup).then((resp) => {
                    return response.status(200).json(resp).send(); 
                });
            } catch(err) {
                next(new HttpException(err.status || 500 , err.message || 'Unexpected error getting usergroup', err.detail));
            }
        } else {
            try {
                await this.usergroupRepo.findAllUsergroups(idOrganization).then((resp) => {
                    return response.status(200).json(resp).send(); 
                });
            } catch(err) {
                next(new HttpException(err.status || 500 , err.message || 'Unexpected error getting usergroups', err.detail));
            }
        }

    }

    public create = async(request: Request, response: Response, next: NextFunction) => {

        const body = request.body;
        const { idOrganization } = request.params;

        if (body) {

            try {
                const usergroup = await this.usergroupRepo.saveUsergroup(idOrganization, body);
                return response.status(201).json(usergroup).send(); 
            }catch (err) {
                next(new HttpException(err.status || 500, err.message || 'Unexpected error saving usergroup', err.detail));
            }
        }
    }

    public update = async(request: Request, response: Response, next: NextFunction) => {

        const { idOrganization, idUsergroup } = request.params;
        const body = request.body;

        if (body && idUsergroup && idOrganization) {
            try {
                const usergroup:any = await this.usergroupRepo.updateUsergroup(idOrganization, idUsergroup, body);
                return response.status(200).json(usergroup);
            }catch(err) {
                next(new HttpException( err.status ||500, err.message || 'Unexpected error updating usergroup', ''));
            }
        } else {
            next(new HttpException(404, 'Method not found', ''));
        }
    }
}