// Users must be able to create new blog posts.
// Users must be able to retrieve a list of all blog posts.
// Users must be able to retrieve the details of a specific blog post.
// Users must be able to update their own blog posts.
// Users must be able to delete their own blog posts.

import { Body, Controller, Delete, Get, Post, Put, UsePipes, ValidationPipe, ParseIntPipe, Param, Request } from "@nestjs/common";
import { BlogService } from "../services/blog.service";
import { CreateBlogDto } from "../dto/CreateBlog.dto"


@Controller('blog')
export class BlogController {
    constructor(private readonly blogService: BlogService) { }

    @Post('/create')
    @UsePipes(ValidationPipe)

    async createBlog(@Body() blogData: CreateBlogDto, @Request() req) {
        const { sub: userId } = req.user
        return await this.blogService.createBlog(blogData, userId)
    }

    @Get('/')
    async getAllBlogs(@Request() req) {
        return await this.blogService.getAllBlogs()
    }

    @Get('/detail/:id')
    async blogDetail(@Param('id', ParseIntPipe) id: number, @Request() req) {
        return await this.blogService.blogDetail(id)
    }

    @Put('/update/:id')
    async updateBlog(@Param('id', ParseIntPipe) id: number, @Body('body') updatedBody: string, @Request() req) {
        return await this.blogService.updateBlog(id, updatedBody)
    }

    @Delete('/delete/:id')
    async deleteBlog(@Param('id', ParseIntPipe) id: number, @Request() req) {
        return await this.blogService.deleteBlog(id)
    }

}