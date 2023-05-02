import { Module } from '@nestjs/common';
import { Blog } from "./entities/blog.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogService } from "./services/blog.service";
import { BlogController } from "./controllers/blog.controller";




@Module({
    imports: [TypeOrmModule.forFeature([Blog])],
    providers: [BlogService],
    controllers: [BlogController],
})
export class BlogModule { }
