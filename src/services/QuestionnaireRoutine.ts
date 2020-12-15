import { Response, Request, NextFunction } from 'express';
import moment from 'moment';
import HttpException from '../error/HttpException';
import { QuestionnaireMapper } from '../mappers/QuestionnaireMapper';
import { QuestionnaireRepo } from '../repositories/questionnaire/QuestionnaireRepo';
import { UsersRepo } from '../repositories/users/UsersRepo';

export default class QuestionnaireRoutine {

    questionnaireRepo: QuestionnaireRepo;
    questionnaireMapper: QuestionnaireMapper;

    constructor(QuestionnaireRepo: QuestionnaireRepo, QuestionnaireMapper: QuestionnaireMapper) {
        this.questionnaireRepo = QuestionnaireRepo;
        this.questionnaireMapper = QuestionnaireMapper;
    }

    public executeRoutine = async() => {
        let userRepo = new UsersRepo();
        let users = await userRepo.findAllUsers()
        let dataToInsert = []

        if(!users){
            console.log("Erro ao retornar os usuarios")
            return
        }

        for(let user of users) {
            dataToInsert.push(this.questionnaireMapper.toPersistence({answer: "", user_id: user.id_user}))
        }

        if (dataToInsert.length > 0) {

            try {
                const questionnaire = await this.questionnaireRepo.insertMultiples(dataToInsert)
                console.log(" =========== Results ============ ")
                console.log("       " +questionnaire.length + " Questionários Inseridos")
                console.log(" =========== ======= ============ ")

            }catch (err) {
                console.log(err.message || 'Unexpected error executing routine', '')
            }
        }
    }

}