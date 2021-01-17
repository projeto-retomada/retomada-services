import User from "../../models/User";
import db from '../../database/connection';
import { UsersIRepo } from "./UsersIRepo";
import HttpException from "../../error/HttpException";
import { UserUsergroupRelationRepo } from "../userUsergroupRelation/UserUsergroupRelationRepo";
import bcrypt from 'bcrypt';

export class UsersRepo implements UsersIRepo {

    userUsergroupRelationRepo: UserUsergroupRelationRepo

    constructor(userUsergroupRelationRepo: UserUsergroupRelationRepo) {
        this.userUsergroupRelationRepo = userUsergroupRelationRepo;
    }

    public async getUserById(idUser: string): Promise<User> {
        const user = await db('user').select('*').where({ id_user: idUser })
        .leftOuterJoin('user_usergroup_relation', 'user.id_user', '=', 'user_usergroup_relation.user_id').catch((err) => {
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
    
    public async findAllUsers(): Promise<any[]> {
        const users = await db('user').select('*')
        .leftOuterJoin('user_usergroup_relation', 'user.id_user', '=', 'user_usergroup_relation.user_id')
        .catch((err) => {
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
            const user  = await this.userUsergroupRelationRepo.activeRelation(id_user[0], t.class.toString()).then(
                async (data) => {
                    const userInserted = await this.getUserById(id_user[0]);
                    return userInserted;
                }
            );
            return user;
        }).catch((err) => {
            throw new HttpException(400,err.detail,'');
        });
        return user;
    }

    public async update(t: User, id: string): Promise<any> {
        let salt = await bcrypt.genSalt(10)
        t.password = await bcrypt.hash(t.password, salt)
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
            const user  = await this.userUsergroupRelationRepo.editRelation(id, t.class.toString()).then(
                async (data) => {
                    const user = await db('user').select('*').where({ id_user: id })
                    .leftOuterJoin('user_usergroup_relation', 'user.id_user', '=', 'user_usergroup_relation.user_id')
                    .catch((err) => {
                        throw new Error(err.detail);
                    });
                    return user[0];
                }
            );
            return user;
        }).catch((err) => {
            throw new Error(err.detail);
        });
        return user;
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