import { IsString, IsNumber, MaxLength, IsNotEmpty, IsEmail} from 'class-validator';

class UserInput {
    
    @IsString()
    @IsNotEmpty({message: 'Username cannot be empty string'}) 
    @MaxLength(255, {
        message:'Username too long'
    })
    public username: string;

    @IsString()
    @IsNotEmpty({message: 'Name cannot be empty string'}) 
    @MaxLength(255, {
        message:'Name too long'
    })
    public name: string;

    @IsString()
    @IsNotEmpty({message: 'Role cannot be empty string'}) 
    @MaxLength(255, {
        message:'Role too long'
    })
    public role: string;

    @IsString()
    @IsNotEmpty({message: 'Email cannot be empty string'}) 
    @IsEmail()
    public email: string;

    @IsString()
    public picture: string;

    @IsString()
    @IsNotEmpty({message: 'Group risk cannot be empty string'})
    @MaxLength(1, {
        message: "Group risk is too long"
    })
    public group_risk: string;

    @IsString()
    @IsNotEmpty({message: 'Password cannot be empty string'})
    public password: string;

    @IsString()
    public metadata: string;

    creation: string;
    last_update: string;

    @IsNumber()
    @IsNotEmpty()
    organization_id: number;
}

export default UserInput;