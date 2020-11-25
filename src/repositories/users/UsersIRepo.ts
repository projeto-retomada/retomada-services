import User from "../../models/User";

export interface UsersIRepo extends Repo<User> {
    getUserById(idUser: string): Promise<User>;
    getUserActivities(idUser: string, size: number): Promise<any>;
    findAllUsers(): Promise<User[]>;
}