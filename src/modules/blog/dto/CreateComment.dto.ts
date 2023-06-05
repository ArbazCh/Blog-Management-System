import { IsNotEmpty } from "class-validator";


export class CreateCommentDto{
    content:string;
    blogId:number;
    userName:number;
}