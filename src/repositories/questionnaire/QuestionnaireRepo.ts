import Quest from "../../models/Questionnaire";
import db from '../../database/connection';
import { QuestIRepo } from "./QuestionnaireIRepo";

export class QuestionnaireRepo implements QuestIRepo {

    public async getQuestionnaireById(idQuest: string): Promise<Quest> {
        const quest = await db('health_questionnaire').select('*').where({ id_health_quest: idQuest }).catch((err) => {
            throw new Error(err.detail);
        });
        return quest[0];
    }

    public async getQuestByCondition(condition: Object) {
        const quest = await db('health_questionnaire').select('*').where(condition).catch((err) => {
            throw new Error(err.detail);
        });
        return quest[0];
    }
    
    public async findAllQuest(): Promise<Quest[]> {
        const quest = await db('health_questionnaire').select('*').catch((err) => {
            throw new Error(err.detail);
        });
        return quest;
    }

    exists(t: Quest): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    public async delete(id: String): Promise<any> {
        const quest = await db('health_questionnaire').select('*').where({id_health_quest: id}).del().catch((err) => {
            throw new Error(err.detail);
        });
        return quest;
    }

    public async save(t: Quest): Promise<any> {
        const quest = await db('health_questionnaire').insert({
            creation: new Date().toLocaleString(),
            last_update: new Date().toLocaleString(),
            answer: t.answer,
            user_id: t.user_id,
        }).then((resp) => {
            return resp;
        }).catch((err) => {
            throw new Error(err.detail);
        });

        return quest;
    }

    public async insertMultiples(t: Object): Promise<any> {
        const quest = await db('health_questionnaire').returning('*').insert(t).then((resp) => {
            return resp;
        }).catch((err) => {
            throw new Error(err.detail);
        });

        return quest;
    }

    public async update(t: Quest, id: string): Promise<any> {
        const quest = await db('health_questionnaire').where({id_health_quest: id}).update({
            creation: t.creation,
            last_update: new Date().toLocaleString(),
            answer: t.answer,
            user_id: t.user_id
        }).then(async (resp) => {
            const quest = await db('health_questionnaire').select('*').where({ id_health_quest: id }).catch((err) => {
                throw new Error(err.detail);
            });
            return quest[0];
        }).catch((err) => {
            throw new Error(err.detail);
        });
    }
}