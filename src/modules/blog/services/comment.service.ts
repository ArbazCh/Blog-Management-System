import { Injectable } from "@nestjs/common/decorators";
import { Comment } from "../entities/comment.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { NumericType, Repository } from "typeorm";
import { CreateCommentDto } from "../dto/CreateComment.dto";
import { UserService } from "src/modules/user/services/user.service";
import { BlogService } from "./blog.service";
import { Blog } from "../entities/blog.entity";
import { User } from "src/modules/user/entities/user.entity";


@Injectable()

export class CommentService{

    constructor(
    @InjectRepository(Comment) 
    private commentRepository:Repository<Comment>,
    private userService: UserService,
    private blogService: BlogService,){}

   

    async createCommet(commentData:CreateCommentDto,blog:Blog,user:User){

        const newComment=await this.commentRepository.save({
            content:commentData.content,
            blogId: blog.id,
            userName: user.name,
        })

        blog.comments=[...blog.comments, newComment ]

        await blog.save()

        return newComment
    }
}


 // async createCommet
    // (userId:number,
    // blogId:number,
    // commentData:CreateCommentDto
    // ):Promise<Comment>
    // {

    // const user = await this.userService.getUserById(userId);
    // const blog = await this.blogService.blogDetail(userId,blogId);
    // const comment = new Comment();
    // comment.content = commentData.content;
    // comment.user = user;
    // comment.blog = blog[0];
    
    // return await this.commentRepository.save(comment);
    // }