import { Body, Controller, Delete, Get, Post, Put, UsePipes, ValidationPipe, ParseIntPipe, Param, Request } from "@nestjs/common";
import { BlogService } from "../services/blog.service";
import { CreateBlogDto } from "../dto/CreateBlog.dto"
import { Blog } from "../entities/blog.entity";
import { DeleteResult, UpdateResult } from "typeorm";


@Controller('blog')
export class BlogController {
    constructor(private readonly blogService: BlogService) { }

    @Post('/')
    @UsePipes(ValidationPipe)

    async createBlog(@Body() blogData: CreateBlogDto, @Request() req): Promise<Blog> {
        // console.log("blog: ", blogData)
        const { sub: userId } = req.user
        return await this.blogService.createBlog(blogData, userId)
    }

    @Get('/all')
    async getBlogs():Promise<Blog[]>{
        return await this.blogService.getBlogs()
    }

    @Get('/')
    async getAllBlogs(@Request() req): Promise<Blog[]> {

        const { sub: userId } = req.user
        return await this.blogService.getAllBlogs(userId)
    }

    @Get('/:id')
    async blogDetail(@Param('id', ParseIntPipe) id: number, @Request() req): Promise<Blog[]> {
        // const { sub: userId } = req.user
        return await this.blogService.blogDetail(id) //, userId
    }

    @Put('/:id')
    async updateBlog(@Param('id', ParseIntPipe) id: number, @Body('body') updatedBody: string, @Request() req): Promise<UpdateResult> {
        const { sub: userId } = req.user
        return await this.blogService.updateBlog(id, updatedBody, userId)
    }

    @Delete('/:id')
    async deleteBlog(@Param('id', ParseIntPipe) id: number, @Request() req): Promise<DeleteResult> {
        const { sub: userId } = req.user
        return await this.blogService.deleteBlog(id, userId)
    }


    //===============================
    @Get('comment/:id')
    async blogDetailByComment(@Param('id', ParseIntPipe) id: number, @Request() req): Promise<Blog[]> {
    // const { sub: userId } = req.user;
    return await this.blogService.blogDetail (id);
    }

    //
}