import { Response, Request, NextFunction } from 'express';
import HttpException from '../error/HttpException';
import { QuestionnaireMapper } from '../mappers/QuestionnaireMapper';
import { QuestionnaireRepo } from '../repositories/questionnaire/QuestionnaireRepo';

export default class QuestionnaireController {

    questionnaireRepo: QuestionnaireRepo;
    questionnaireMapper: QuestionnaireMapper;

    constructor(QuestionnaireRepo: QuestionnaireRepo, QuestionnaireMapper: QuestionnaireMapper) {
        this.questionnaireRepo = QuestionnaireRepo;
        this.questionnaireMapper = QuestionnaireMapper;
    }

    public getAll = async(request: Request, response: Response, next: NextFunction) => {

        const { id } = request.params;
        
        if (id) {
            try {
                await this.questionnaireRepo.getQuestionnaireById(id).then((resp) => {
                    return response.status(200).json(resp).send(); 
                });
            } catch (err) {
                next(new HttpException(500, 'Unexpected error getting organization', err.sqlMessage));
            }
        } else {
            try {
                await this.questionnaireRepo.findAllQuest().then((resp) => {
                    const format: Array<any> = resp.map((element) => {
                       return this.questionnaireMapper.toDTO(element);
                    });
                    return response.status(200).json(format).send(); 
                });
            } catch (err) {
                next(new HttpException(500, 'Unexpected error getting questionnaire', err.detail));
            }
        }
    }

    public create = async(request: Request, response: Response, next: NextFunction) => {

        const body = request.body;

        if (body) {

            try {
                const questionnaire = await this.questionnaireRepo.save(this.questionnaireMapper.toPersistence(body)).then((err) => {});
                return response.status(201).json(questionnaire).send(); 
            }catch (err) {
                next(new HttpException(500, err.message || 'Unexpected error creating organization', ''));
            }
        }
    }

    public delete = async(request: Request, response: Response, next: NextFunction) => {

        const { id } = request.params;

        if (id) {
            try {
                const questionnaire = await this.questionnaireRepo.delete(id);
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
                const questionnaire:any = await this.questionnaireRepo.update(this.questionnaireMapper.toPersistence(body), id);
                return response.status(200).json(questionnaire);
            }catch(err) {
                next(new HttpException(500, err.message || 'Unexpected error updating organization', ''));
            }
        } else {
            next(new HttpException(404, 'Method not found', ''));
        }
    }
}