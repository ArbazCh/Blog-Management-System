import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { BlogModule } from './modules/blog/blog.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ApiTokenCheckMiddleware } from './middleware/token-check.middleware';
import { BlogController } from './modules/blog/controllers/blog.controller';
import { CommentController } from './modules/blog/controllers/comment.controller';
@Module({
  imports: [BlogModule, UserModule, AuthModule, TypeOrmModule.forRoot(typeOrmConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ApiTokenCheckMiddleware)
      .exclude(
        {path:'blog/all', method:RequestMethod.GET},
        {path:'blog/:id', method:RequestMethod.GET})
      .forRoutes(BlogController, CommentController) // Controller name only { path: '/blog', method: RequestMethod.ALL }
  }
}
