import { IsString, IsNumber, MaxLength, IsNotEmpty, IsEmail} from 'class-validator';

class QuestionnaireInput {

    @IsString()
    public answer: string;

    creation: string;
    last_update: string;

    @IsNumber()
    @IsNotEmpty()
    user_id: number;
}

export default QuestionnaireInput;