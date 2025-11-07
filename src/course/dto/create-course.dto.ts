import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCourseDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsNumber()
    duration: number; // duration in hours

    @IsString()
    level: 'beginner' | 'intermediate' | 'advanced';

    @IsNotEmpty()
    @IsNumber()
    price: number;
}
