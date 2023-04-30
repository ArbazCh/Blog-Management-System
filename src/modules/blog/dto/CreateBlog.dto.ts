import { IsNotEmpty, Length } from "class-validator";

export class CreatBlogDto {

    @IsNotEmpty()
    @Length(3, 255)
    title: string;

    @IsNotEmpty()
    @Length(3, 255)
    description: string;

    @IsNotEmpty()
    @Length(3, 255)
    body: string;
}