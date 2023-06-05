import { Body, Controller, Param, Post, Request, UsePipes, ValidationPipe, } from "@nestjs/common";
import { CommentService } from "../services/comment.service";
import { CreateCommentDto } from "../dto/CreateComment.dto";
import { BlogService } from "../services/blog.service";
import { UserService } from "src/modules/user/services/user.service";



@Controller('comment')
export class CommentController{

    constructor(private commentService:CommentService, private blogService:BlogService, private userService:UserService ){}

    @Post(':blogId')
    // @UsePipes(ValidationPipe)

    async saveCommentToPost(
        @Body() commentData:CreateCommentDto, 
        @Request() req,
        @Param('blogId') blogId: number): Promise<any> 
        {

        const { sub: userId } = req.user

        const blog= await this.blogService.blogDetail(blogId);

        const user=await this.userService.getUserById(userId);

        const comment= await this.commentService.createCommet(commentData,blog[0],user)

        return await {comment}
        }
}




    // @Post('/:blogId')
    // async createComment(@Body() comment:CreateCommentDto, @Request() req, @Param('blogId') blogId: number): Promise<Comment>{
       
    //     const { sub: userId } = req.user
    //     return await this.commentService.createCommet(userId,blogId,comment)
    // }