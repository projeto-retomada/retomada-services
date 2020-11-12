import { User } from './../models/User';
import { Mapper } from './Mapper';


export class UserMapper implements Mapper<User> {

    constructor() {}

    toPersistence(user: User) {
        return {
            username: user.username,
            email: user.email,
            picture: user.picture,
            password: user.password,
            group_risk: user.group_risk,
            metadata: user.metadata,
        }
    }

    toDTO(user: User) {
        return {
            id_user: user.id_user,
            username: user.username,
            email: user.email,
            picture: user.picture,
            password: user.password,
            group_risk: user.group_risk,
            metadata: user.metadata,
            last_update: user.last_update
        }
    }

}