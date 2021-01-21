import { ActivityInteractionRepo } from '../repositories/activityInteraction/ActivityInteractionRepo';
import { Response, Request, NextFunction } from 'express';
import HttpException from '../error/HttpException';
import { ActivityInteractionMapper } from '../mappers/ActivityInteractionMapper';


export class ActivityInteractionController {

    activityInteractionRepo: ActivityInteractionRepo;
    activityInteractionMapper: ActivityInteractionMapper;


    constructor(activityInteractionRepo: ActivityInteractionRepo, activityInteractionMapper: ActivityInteractionMapper) {
        this.activityInteractionRepo = activityInteractionRepo;
        this.activityInteractionMapper = activityInteractionMapper;
    }

    public get = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;

        if (id) {
            try {
                await this.activityInteractionRepo.getActivitiesInteractions(id).then((resp) => {
                    return response.status(200).json(resp).send();
                });
            } catch (err) {
                next(new HttpException(500, 'Unexpected error getting activity', err.sqlMessage));
            }
        } else {
            next(new HttpException(500, 'Unexpected error getting activity', ''));
        }
    }

    public create = async (request: Request, response: Response, next: NextFunction) => {

        const body = request.body;

        if (body) {
            try {
                const activity = await this.activityInteractionRepo.save(this.activityInteractionMapper.toPersistence(body)).then((err) => { });
                return response.status(201).json(activity).send();
            } catch (err) {
                next(new HttpException(500, err.message || 'Unexpected error creating Activity', ''));
            }
        }
    }

    public update = async (request: Request, response: Response, next: NextFunction) => {

        const { id } = request.params;
        const body = request.body;

        if (body && id) {
            try {
                const questionnaire: any = await this.activityInteractionRepo.update(this.activityInteractionMapper.toPersistence(body), parseInt(id));
                return response.status(200).json(questionnaire);
            } catch (err) {
                next(new HttpException(500, err.message || 'Unexpected error updating Activity', ''));
            }
        } else {
            next(new HttpException(404, 'Method not found', ''));
        }
    }

    public delete = async (request: Request, response: Response, next: NextFunction) => {

        const { id } = request.params;

        if (id) {
            try {
                const questionnaire = await this.activityInteractionRepo.delete(parseInt(id));
                return response.status(204).send();
            } catch (err) {
                next(new HttpException(500, err.message || 'Unexpected error deleting organization', ''));
            }
        } else {
            next(new HttpException(404, 'Method not found', ''));
        }
    }
}