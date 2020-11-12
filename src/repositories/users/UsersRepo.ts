import { User } from "../../models/User";
import { UserIRepo } from "./UsersIRepo";
import db from '../../database/connection';

export class UsersRepo implements UserIRepo {

    constructor() {}

    getUserById(idUser: string): Promise<User> {
        throw new Error("Method not implemented.");
    }

    public async findAllUsers(): Promise<User[]> {
        const users = await db('user').select('*');
        return users;
    }

    exists(t: User): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    delete(t: User): Promise<any> {
        throw new Error("Method not implemented.");
    }
    save(t: User): Promise<any> {
        throw new Error("Method not implemented.");
    }

}