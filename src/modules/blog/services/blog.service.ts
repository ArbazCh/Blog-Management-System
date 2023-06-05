import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Blog } from "../entities/blog.entity";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { CreateBlogDto } from "../dto/CreateBlog.dto";

@Injectable()

export class BlogService {
    constructor(@InjectRepository(Blog) private blogRepository: Repository<Blog>) { }

    async createBlog(blog: CreateBlogDto, userId: number) {
        const newBlog = new Blog()
        newBlog.userId = userId;
        newBlog.title = blog.title; 
        newBlog.description = blog.description;
        newBlog.body = blog.body;
        //??create typeorm
        return await this.blogRepository.save(newBlog)
    }

    async getBlogs():Promise<Blog[]>{
        return await this.blogRepository.find({relations:['comments']})
    }

    async getAllBlogs(userId: number): Promise<Blog[]> {
        return await this.blogRepository.find({ where: { userId: userId } })
    }
    async blogDetail(id: number): Promise<Blog[]> { //, userId: numbe
        return await this.blogRepository.find({ where: { id: id }, relations: ['comments'] }) //, userId: userId
    }
    updateBlog(id: number, updatedBody: string, userId: number): Promise<UpdateResult> {
        return this.blogRepository.update({ id, userId }, { body: updatedBody })
    }
    deleteBlog(id: number, userId: number): Promise<DeleteResult> {
        return this.blogRepository.delete({ id, userId })
    }

    //========================================
    // async blogDetailByComment(id: number): Promise<Blog[]> {
    //     const res= await this.blogRepository.find({ where: { id: id },relations: ['comments']});
    //     return await res
    //   }
}