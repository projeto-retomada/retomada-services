import Activity from "../../models/Activity";
import db from '../../database/connection';
import { ActivityIRepo } from "./ActivityIRepo";

export class ActivityRepo implements ActivityIRepo {
    exists(t: Activity): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    public async getActivities(condition: any) {
        console.log(condition);
        const quest = await db('activity')
        .select('activity.*','place.name as place')
        .join('place', 'activity.place_id', 'place.id_place')
        .where(function() {
            if(condition.id)
                this.where('id_activity', condition.id);
            if(condition.id_in)
                this.whereIn('id_activity', condition.id_in);
            if(condition.usergroup_id)
                this.where('usergroup_id', condition.usergroup_id);
            if(condition.usergroup_id_in)
                this.whereIn('usergroup_id', condition.usergroup_id_in);
            if(condition.organization_id)
                this.where('activity.organization_id', condition.organization_id);
            if(condition.organization_id_in)
                this.whereIn('activity.organization_id', condition.organization_id_in);
            if(condition.place_id)
                this.where('place_id', condition.place_id);
            if(condition.place_id_in)
                this.whereIn('place_id', condition.place_id_in);
            if(condition.creation_after)
                this.where('creation', '>=', condition.creation_after);
            if(condition.creation_before)
                this.where('creation', '<=', condition.creation_before);
        }).catch((err) => {
            throw new Error(err.detail);
        });
        return quest;
    }

    public async delete(id: number): Promise<any> {
        const activity = await db('activity').select('*').where({id_activity: id}).del().catch((err) => {
            throw new Error(err.detail);
        });
        return activity;
    }

    public async save(t: Activity): Promise<any> {
        const quest = await db('activity').insert({
            creation: new Date().toLocaleString(),
            last_update: new Date().toLocaleString(),
            name: t.name,
            description: t.description,
            start_date: t.start_date,
            end_date: t.end_date,
            organization_id: t.organization_id,
            place_id: t.place_id,
            usergroup_id: t.usergroup_id
        }).then((resp) => {
            return resp;
        }).catch((err) => {
            throw new Error(err.detail);
        });

        return quest;
    }

    public async update(t: Activity, id: number): Promise<any> {
        const quest = await db('activity').where({id_activity: id}).update({
            creation: t.creation,
            last_update: new Date().toLocaleString(),
            name: t.name,
            description: t.description,
            start_date: new Date(t.start_date),
            end_date: new Date(t.end_date),
            organization_id: t.organization_id,
            place_id: t.place_id,
            usergroup_id: t.usergroup_id
        }).then(async (resp) => {
            const quest = await db('activity').select('*').where({ id_activity: id }).catch((err) => {
                throw new Error(err.detail);
            });
            return quest[0];
        }).catch((err) => {
            throw new Error(err.detail);
        });
    }
}