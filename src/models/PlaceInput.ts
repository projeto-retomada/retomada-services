import { IsString, MaxLength, IsNotEmpty, IsEmail, IsNumber, Max} from 'class-validator';

export class PlaceInput {

    @IsString()
    @MaxLength(255, {
        message:'Name too long'
    })
    public name: string;

    @IsNumber()
    @Max(99999)
    public maximum_capacity: number;

    @IsString()
    @MaxLength(1, {
        message:'open_area too long'
    })
    public open_area: string;
}