import Quest from "../../models/Questionnaire";

export interface QuestIRepo extends Repo<Quest> {
    getQuestionnaireById(idQuest: string): Promise<Quest>;
    findAllQuest(): Promise<Quest[]>;
}