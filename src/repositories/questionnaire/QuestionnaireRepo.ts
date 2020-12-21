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

    public async getQuestByCondition(condition: any) {
        console.log(condition);
        const quest = await db('health_questionnaire').select('*').where(function() {
            if(condition.id)
                this.where('id_health_quest', condition.id);
            if(condition.id_in)
                this.whereIn('id_health_quest', condition.id_in);
            if(condition.user_id)
                this.where('user_id', condition.user_id);
            if(condition.user_id_in)
                this.whereIn('user_id', condition.user_id_in);
            if(condition.creation_after)
                this.where('creation', '>=', condition.creation_after);
            if(condition.creation_before)
                this.where('creation', '<=', condition.creation_before);
        }).catch((err) => {
            throw new Error(err.detail);
        });
        return quest;
    }

    public async getAllQuestsByRole(idOrganization: number, role: string): Promise<Quest[]> {
        const quests = await db('health_questionnaire')
        .select('health_questionnaire.*')
        .join('user', 'user.id_user', 'health_questionnaire.user_id')
        .where('user.role', role)
        .where('user.organization_id', idOrganization)
        .orderBy('health_questionnaire.creation', 'desc')
        .catch((err) => {
            throw new Error(err.detail);
        });
        return quests;
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