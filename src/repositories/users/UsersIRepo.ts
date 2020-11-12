import { User } from '../../models/User';

export interface UsersIRepo extends Repo<User> {
    getUserById(idUser: string): Promise<User>;
    findAllUsers(): Promise<User[]>;
}