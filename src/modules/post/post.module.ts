import { Module } from '@nestjs/common'
import { PostController } from './post.controller'
import { PostService } from './post.service'
import {
  IsCommentExistConstraint,
  IsPostExistConstraint,
  IsReplyExistConstraint,
} from '@/modules/post/dto/utils'
import { PostLikeService } from '@/modules/post/post-like.service'

@Module({
  controllers: [PostController],
  providers: [
    PostService,
    IsPostExistConstraint,
    IsCommentExistConstraint,
    IsReplyExistConstraint,
    PostLikeService,
  ],
})
export class PostModule {}
