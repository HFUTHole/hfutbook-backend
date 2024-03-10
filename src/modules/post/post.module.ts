import { Module } from '@nestjs/common'
import { PrismaModule } from 'nestjs-prisma'
import { PostController } from './post.controller'
import { PostService } from './post.service'
import {
  IsCommentExistConstraint,
  IsPostExistConstraint,
  IsReplyExistConstraint,
} from '@/modules/post/dto/utils'

@Module({
  imports: [PrismaModule.forRoot()],
  controllers: [PostController],
  providers: [
    PostService,
    IsPostExistConstraint,
    IsCommentExistConstraint,
    IsReplyExistConstraint,
  ],
})
export class PostModule {}
