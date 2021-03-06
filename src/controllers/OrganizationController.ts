import { Response, Request, NextFunction } from 'express';
import HttpException from '../error/HttpException';
import { OrganizationMapper } from '../mappers/OrganizationMapper';
import { OrganizationRepo } from './../repositories/organization/OrganizationRepo';

export default class OrganizationController {

    organizationRepo: OrganizationRepo;
    organizationMapper: OrganizationMapper;

    constructor(organizationRepo: OrganizationRepo, organizationMapper: OrganizationMapper) {
        this.organizationRepo = organizationRepo;
        this.organizationMapper = organizationMapper;
    }

    public getAll = async(request: Request, response: Response, next: NextFunction) => {

        const { id } = request.params;
        
        if (id) {
            try {
                await this.organizationRepo.getOrganizationById(id).then((resp) => {
                    return response.status(200).json(resp).send(); 
                });
            } catch (err) {
                next(new HttpException(500, 'Unexpected error getting organization', err.sqlMessage));
            }
        } else {
            try {
                await this.organizationRepo.findAllOrganizations().then((resp) => {
                    const format: Array<any> = resp.map((element) => {
                       return this.organizationMapper.toDTO(element);
                    });
                    return response.status(200).json(format).send(); 
                });
            } catch (err) {
                next(new HttpException(500, 'Unexpected error getting organizations', err.detail));
            }
        }
    }

    public create = async(request: Request, response: Response, next: NextFunction) => {

        const body = request.body;

        if (body) {

            try {
                const organization = await this.organizationRepo.save(this.organizationMapper.toPersistence(body)).then((err) => {});
                return response.status(201).json(organization).send(); 
            }catch (err) {
                next(new HttpException(500, err.message || 'Unexpected error creating organization', ''));
            }
        }
    }

    public delete = async(request: Request, response: Response, next: NextFunction) => {

        const { id } = request.params;

        if (id) {
            try {
                const user = await this.organizationRepo.delete(id);
                return response.status(204).send(); 
            }catch(err) {
                next(new HttpException(500, err.message || 'Unexpected error deleting organization', ''));
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
                const user:any = await this.organizationRepo.update(this.organizationMapper.toPersistence(body), id);
                return response.status(200).json(user);
            }catch(err) {
                next(new HttpException(500, err.message || 'Unexpected error updating organization', ''));
            }
        } else {
            next(new HttpException(404, 'Method not found', ''));
        }
    }
}