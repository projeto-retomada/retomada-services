import UserInput from '../models/UserInput';
import User from './../models/User';
import UserModel from './../models/UserModel';
import { Mapper } from './Mapper';

export class UserMapper implements Mapper<User, UserInput, UserModel> {

    constructor() {}

    toDTO(user: User): UserModel {
        const userModel = new UserModel();
        userModel.username = user.username;
        userModel.email = user.email;
        userModel.picture = user.picture;
        userModel.password = user.password;
        userModel.group_risk = user.group_risk;
        userModel.metadata = user.metadata;
        return userModel;
    }

    toPersistence(userInput: UserInput): User {
        const user = new User();
        user.username = userInput.username;
        user.email = userInput.email;
        user.picture = userInput.picture;
        user.password = userInput.password;
        user.group_risk = userInput.group_risk;
        user.metadata = userInput.metadata;
        user.organization_id = userInput.organization_id;
        return user;
    }

}