import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Blog } from "../entities/blog.entity";
import { Repository } from "typeorm";
import { CreateBlogDto } from "../dto/CreateBlog.dto";
import { User } from "src/modules/user/entities/user.entity";

@Injectable()

export class BlogService {
    constructor(@InjectRepository(Blog) private blogRepository: Repository<Blog>) { }

    async createBlog(blog: CreateBlogDto, userId: number) {
        const newBlog = new Blog()
        newBlog.userId = userId;
        newBlog.title = blog.title;
        newBlog.description = blog.description;
        newBlog.body = blog.body;

        return await this.blogRepository.save(newBlog)
    }
    async getAllBlogs(userId: number) {
        return await this.blogRepository.find({ where: { userId: userId } })
    }
    async blogDetail(id: number, userId: number) {
        return await this.blogRepository.find({ where: { id: id, userId: userId } })
    }
    updateBlog(id: number, updatedBody: string, userId: number) {
        return this.blogRepository.update({ id, userId }, { body: updatedBody })
    }
    deleteBlog(id: number, userId: number) {
        return this.blogRepository.delete({ id, userId })
    }
}