import { IsString, MaxLength, IsNotEmpty, IsEmail} from 'class-validator';

class UsergroupInput {

    @IsString()
    @IsNotEmpty({message: 'Name cannot be empty string'})
    name: string;

    @IsString()
    @IsNotEmpty({message: 'Class_schedule cannot be empty string'})
    class_schedule: string;
}

export default UsergroupInput; 