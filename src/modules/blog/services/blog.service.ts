import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Blog } from "../entities/blog.entity";
import { Repository } from "typeorm";
import { CreateBlogDto } from "../dto/CreateBlog.dto";

@Injectable()

export class BlogService {
    constructor(@InjectRepository(Blog) private blogRepository: Repository<Blog>) { }

    async createBlog(blog: CreateBlogDto) {
        return await this.blogRepository.save(blog)
    }
    async getAllBlogs() {
        return await this.blogRepository.find()
    }
    async blogDetail(id: number) {
        return await this.blogRepository.find({ where: { id: id } })
    }
    updateBlog(id: number, updatedBody: string) {
        return this.blogRepository.update(id, { body: updatedBody })
    }
    deleteBlog(id: number) {
        return this.blogRepository.delete(id)
    }
}