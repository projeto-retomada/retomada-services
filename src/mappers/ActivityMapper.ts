import moment from 'moment';
import Activity from '../models/Activity';
import ActivityInput from '../models/ActivityInput';
import { Mapper } from './Mapper';

export class ActivityMapper implements Mapper<Activity, ActivityInput> {
    
    toDTO(t: Activity): any{
        const activityModel  = {
            id_activity: t.id_activity,
            name: t.name,
            description: t.description,
            creation: t.creation,
            last_update: t.last_update,
            start_date: t.start_date,
            end_date: t.end_date,
            organization_id: t.organization_id,
            place_id: t.place_id,
            usergroup_id: t.usergroup_id
        };
        return activityModel;
    }

    toPersistence(i: ActivityInput): Activity {
        const activity: Activity = new Activity();
        activity.name = i.name;
        activity.description = i.description;
        activity.end_date = i.end_date;
        activity.start_date = i.start_date;
        activity.usergroup_id = i.usergroup_id;
        activity.place_id = i.place_id;
        activity.organization_id = i.organization_id;
        activity.creation = moment().format();
        activity.last_update = moment().format();
        return activity;
    }

}