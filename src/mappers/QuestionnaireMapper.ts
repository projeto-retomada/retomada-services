import moment from 'moment';
import Questionnaire from '../models/Questionnaire';
import QuestionnaireInput from '../models/QuestionnaireInput';
import { Mapper } from './Mapper';

export class QuestionnaireMapper implements Mapper<Questionnaire, QuestionnaireInput> {
    
    toDTO(t: Questionnaire): any{
        const questionnaireModel  = {
            id_health_quest: t.id_health_quest,
            answer: t.answer,
            user_id: t.user_id
        };
        return questionnaireModel;
    }

    toPersistence(i: QuestionnaireInput): Questionnaire {
        const questionnaire: Questionnaire = new Questionnaire();
        questionnaire.answer = i.answer;
        questionnaire.user_id = i.user_id;
        questionnaire.creation = moment().format();
        questionnaire.last_update = moment().format();
        return questionnaire;
    }

}