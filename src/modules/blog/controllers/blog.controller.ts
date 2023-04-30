// Users must be able to create new blog posts.
// Users must be able to retrieve a list of all blog posts.
// Users must be able to retrieve the details of a specific blog post.
// Users must be able to update their own blog posts.
// Users must be able to delete their own blog posts.

import { Controller, Delete, Get, Post, Put } from "@nestjs/common";


@Controller('blog')
export class BlogController {

    @Post('/create')
    createBlog() {
        return "1. New Blog Post Created"
    }

    @Get('/')
    getAllBlogs() {
        return "2. All Blogs are here"
    }

    @Get('/detail/:id')
    blogDetail() {
        return "Here is the complete of detail of the blog"
    }

    @Put('/update/:id')
    updateBlog() {
        return "Blog Updated"
    }

    @Delete('/delete/:id')
    deleteBlog() {
        return "Blog Deleted"
    }

}