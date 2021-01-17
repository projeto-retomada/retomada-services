import User from "../../models/User";
import db from '../../database/connection';
import { UsersIRepo } from "./UsersIRepo";
import HttpException from "../../error/HttpException";
import moment from 'moment';

export class UsersRepo implements UsersIRepo {

    public async getUserById(idUser: string): Promise<User> {
        const user = await db('user').select('*').where({ id_user: idUser }).catch((err) => {
            throw new Error(err.detail);
        });
        return user[0];
    }

    public async getUserByCondition(condition: Object) {
        const user = await db('user').select('*').where(condition).catch((err) => {
            throw new Error(err.detail);
        });
        return user[0];
    }
    
    public async findAllUsers(): Promise<User[]> {
        const users = await db('user').select('*').catch((err) => {
            throw new Error(err.detail);
        });
        return users;
    }

    exists(t: User): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    public async delete(id: String): Promise<any> {
        const user = await db('user').select('*').where({id_user: id}).del().catch((err) => {
            throw new Error(err.detail);
        });
        return user;
    }

    public async save(t: User): Promise<any> {
        console.log(t);
        const user = await db('user').insert({
            username: t.username,
            password: t.password,
            name: t.name,
            role: t.role,
            email: t.email,
            picture: t.picture,
            metadata: t.metadata,
            group_risk: t.group_risk,
            creation: new Date().toLocaleString(),
            last_update: new Date().toLocaleString(),
            organization_id: t.organization_id,
        }).returning('id_user').then(async (id_user) => {
            await db('user_usergroup_relation').insert({
                user_id: id_user[0],
                usergroup_id: t.class,
                creation: moment().format(),
                last_update: moment().format()
            }).catch((err) => {
                throw new HttpException(500,err.detail,'');
            });
        }).catch((err) => {
            throw new HttpException(400,err.detail,'');
        });

        return user;
    }

    public async update(t: User, id: string): Promise<any> {
        const user = await db('user').where({id_user: id}).update({
            username: t.username,
            password: t.password,
            email: t.email,
            role: t.role,
            picture: t.picture,
            metadata: t.metadata,
            group_risk: t.group_risk,
            creation: t.creation,
            last_update: new Date().toLocaleString(),
            organization_id: t.organization_id
        }).then(async (resp) => {
            const user = await db('user').select('*').where({ id_user: id }).catch((err) => {
                throw new Error(err.detail);
            });
            return user[0];
        }).catch((err) => {
            throw new Error(err.detail);
        });
    }

    async getUserActivities(username: string, size: number): Promise<any> {
        const activities = await db('user')
            .join('activity_interaction', 'user.id_user', '=', 'activity_interaction.user_id')
            .join('activity', 'activity.id_activity', '=', 'activity_interaction.activity_id')
            .select('activity.name','activity.creation', 'activity.last_update', 'activity.start_date', 'activity.end_date', 'activity.description')
            .where('username', username)
            .catch((err) => {
                throw new Error(err.detail);
        });
        if (size < activities.length) {
            return activities.slice(0,size);
        } else {
            return activities;
        }
    }

    async getUserLastPlacesPassed(username: string, size: number): Promise<any> {
        const activities = await db('user')
            .join('activity_interaction', 'user.id_user', '=', 'activity_interaction.user_id')
            .join('activity', 'activity.id_activity', '=', 'activity_interaction.activity_id')
            .join('place', 'place.id_place', '=', 'activity.place_id')
            .select('place.id_place','place.name', 'place.maximum_capacity', 'place.open_area', 'activity_interaction.creation as date')
            .where('username', username)
            .catch((err) => {
                throw new Error(err.detail);
        });
        
        if (size < activities.length) {
            return activities.slice(0,size);
        } else {
            return activities;
        }
    }
}