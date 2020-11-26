import User from "../../models/User";

export interface UsersIRepo extends Repo<User> {
    getUserById(idUser: string): Promise<User>;
    getUserActivities(username: string, size: number): Promise<any>;
    getUserLastPlacesPassed(username: string, size:number): Promise<any>;
    findAllUsers(): Promise<User[]>;
}