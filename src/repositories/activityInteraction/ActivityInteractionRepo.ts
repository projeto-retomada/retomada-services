import Activity from "../../models/Activity";
import db from '../../database/connection';
import { ActivityInteractionIRepo } from "./ActivityInteractionIRepo";
import ActivityInteracion from "../../models/ActivityInteraction";

export class ActivityInteractionRepo implements ActivityInteractionIRepo {
    exists(t: ActivityInteracion): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    public async getActivitiesInteractions(id: string) {
        console.log(id);
        const quest = await db('activity_interaction')
            .select('activity_interaction.*', 'user.name as user')
            .join('user', 'activity_interaction.user_id', 'user.id_user')
            .where(function () {
                if (id)
                    this.where('activity_id', id);
            }).catch((err) => {
                throw new Error(err.detail);
            });
        return quest;
    }

    public async delete(id: number): Promise<any> {
        const activity = await db('activity_interaction').select('*').where({ id: id }).del().catch((err) => {
            throw new Error(err.detail);
        });
        return activity;
    }

    public async save(t: ActivityInteracion): Promise<any> {
        const quest = await db('activity_interaction').insert({
            user_id: t.user_id,
            activity_id: t.activity_id,
            creation: new Date().toLocaleString(),
            last_update: new Date().toLocaleString(),
        }).then((resp) => {
            return resp;
        }).catch((err) => {
            console.log(err);
            throw new Error(err.detail);
        });

        return quest;
    }

    public async update(t: ActivityInteracion, id: number): Promise<any> {
        const quest = await db('activity_interaction').where({ id: id }).update({
            creation: t.creation,
            user_id: t.user_id,
            activity_id: t.activity_id,
            last_update: new Date().toLocaleString(),
        }).then(async (resp) => {
            const quest = await db('activity_interaction').select('*').where({ id: id }).catch((err) => {
                throw new Error(err.detail);
            });
            return quest[0];
        }).catch((err) => {
            throw new Error(err.detail);
        });
    }
}