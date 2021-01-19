import { ActivityRepo } from '../repositories/activity/ActivityRepo';
import { Response, Request, NextFunction } from 'express';
import HttpException from '../error/HttpException';
import { ActivityMapper } from '../mappers/ActivityMapper';


export class ActivityController {

    activityRepo: ActivityRepo;
    activityMapper: ActivityMapper;


    constructor(activityRepo: ActivityRepo, activityMapper: ActivityMapper) {
        this.activityRepo = activityRepo;
        this.activityMapper = activityMapper;
    }

    public get = async(request: Request, response: Response, next: NextFunction) => {
        var stringFilters = request.query.filters as string;
        stringFilters = stringFilters || '{}';
        const filters = JSON.parse(stringFilters);

        if (filters) {
            try {
                await this.activityRepo.getActivities(filters).then((resp) => {
                    return response.status(200).json(resp).send(); 
                });
            } catch (err) {
                next(new HttpException(500, 'Unexpected error getting activity', err.sqlMessage));
            }
        } else {
            next(new HttpException(500, 'Unexpected error getting activity', ''));
        }
    }

    public create = async(request: Request, response: Response, next: NextFunction) => {

        const body = request.body;

        if (body) {
            try {
                const activity = await this.activityRepo.save(this.activityMapper.toPersistence(body)).then((err) => {});
                return response.status(201).json(activity).send(); 
            }catch (err) {
                next(new HttpException(500, err.message || 'Unexpected error creating Activity', ''));
            }
        }
    }

    public update = async(request: Request, response: Response, next: NextFunction) => {

        const { id } = request.params;
        const body = request.body;

        if (body && id) {
            try {
                const questionnaire:any = await this.activityRepo.update(this.activityMapper.toPersistence(body), parseInt(id));
                return response.status(200).json(questionnaire);
            }catch(err) {
                next(new HttpException(500, err.message || 'Unexpected error updating Activity', ''));
            }
        } else {
            next(new HttpException(404, 'Method not found', ''));
        }
    }

    public delete = async(request: Request, response: Response, next: NextFunction) => {

        const { id } = request.params;

        if (id) {
            try {
                const questionnaire = await this.activityRepo.delete(parseInt(id));
                return response.status(204).send(); 
            }catch(err) {
                next(new HttpException(500, err.message || 'Unexpected error deleting organization', ''));
            }
        } else {
            next(new HttpException(404, 'Method not found', ''));
        }
    }
}