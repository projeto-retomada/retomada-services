import moment from 'moment';
import ActivityInteracion from '../models/ActivityInteraction';
import ActivityInteracionInput from '../models/ActivityInteractionInput';
import { Mapper } from './Mapper';

export class ActivityInteractionMapper implements Mapper<ActivityInteracion, ActivityInteracionInput> {

    toDTO(t: ActivityInteracion): any {
        const activityModel = {
            id: t.id,
            user_id: t.user_id,
            activity_id: t.activity_id,
            creation: t.creation
        };
        return activityModel;
    }

    toPersistence(i: ActivityInteracionInput): ActivityInteracion {
        const activityInteracion: ActivityInteracion = new ActivityInteracion();
        activityInteracion.user_id = i.user_id;
        activityInteracion.activity_id = i.activity_id;
        activityInteracion.creation = moment().format();
        activityInteracion.last_update = moment().format();
        return activityInteracion;
    }

}