import { IsString, MaxLength, IsNumber} from 'class-validator';

export class ActivityInput {

    @IsString()
    @MaxLength(255, {
        message:'Name too long'
    })
    public name: string;

    @IsString()
    public end_date: string;

    @IsString()
    public start_date: string;

    @IsString()
    public description: string;

}

export default ActivityInput; 