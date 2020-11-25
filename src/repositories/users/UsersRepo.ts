import User from "../../models/User";
import db from '../../database/connection';
import { UsersIRepo } from "./UsersIRepo";

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
        const user = await db('user').insert({
            username: t.username,
            password: t.password,
            email: t.email,
            picture: t.picture,
            metadata: t.metadata,
            group_risk: t.group_risk,
            creation: new Date().toLocaleString(),
            last_update: new Date().toLocaleString(),
            id_user: t.id_user,
            organization_id: t.organization_id,
        }).then((resp) => {
            return resp;
        }).catch((err) => {
            throw new Error(err.detail);
        });

        return user;
    }

    public async update(t: User, id: string): Promise<any> {
        const user = await db('user').where({id_user: id}).update({
            username: t.username,
            password: t.password,
            email: t.email,
            picture: t.picture,
            metadata: t.metadata,
            group_risk: t.group_risk,
            creation: t.creation,
            last_update: new Date().toLocaleString(),
            id_user: t.id_user,
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

    async getUserActivities(idUser: string, size: number): Promise<any> {
        const user = await db('activity').select('*').where({ id_activity: idUser }).catch((err) => {
            throw new Error(err.detail);
        });
        return user[0];
    }

}