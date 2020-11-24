import { IsString, MaxLength, IsNotEmpty, IsEmail} from 'class-validator';

class OrganizationInput {

    @IsString()
    @MaxLength(255, {
        message:'Logo too long'
    })
    logo: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty({message: 'Email cannot be empty string'})
    @MaxLength(70, {
        message:'Email too long'
    })
    email: string;

    @IsString()
    @MaxLength(255, {
        message:'Name too long'
    })
    @IsNotEmpty({message: 'Name cannot be empty string'})
    name: string;
}

export default OrganizationInput; 