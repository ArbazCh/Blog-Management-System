import { Module } from '@nestjs/common';
import { Blog } from "./entities/blog.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogService } from "./services/blog.service";
import { BlogController } from "./controllers/blog.controller";
import { CommentService } from './services/comment.service';
import { CommentController } from './controllers/comment.controller';
import { Comment } from './entities/comment.entity';
import { UserModule } from '../user/user.module';

@Module({
    imports: [TypeOrmModule.forFeature([Blog,Comment]), UserModule],
    providers: [BlogService, CommentService],
    controllers: [BlogController, CommentController],
})
export class BlogModule { }
