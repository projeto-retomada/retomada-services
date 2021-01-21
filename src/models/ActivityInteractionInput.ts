import { IsString, MaxLength, IsNumber } from 'class-validator';

export class ActivityInteractionInput {

    @IsNumber()
    public user_id: number;

    @IsNumber()
    public activity_id: number;
}

export default ActivityInteractionInput;