import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  Delete,
} from '@nestjs/common'
import { PostService } from '@/modules/post/post.service'
import { CreateHoleDto } from '@/modules/post/dto/create.dto'
import { User } from '@/common/decorator/user.decorator'
import { IUser } from '@/app'
import { GetPostDetailQuery } from '@/modules/post/dto/get'
import {
  CreateCommentDto,
  CreateReplyDto,
  GetPostCommentQuery,
  GetRepliesQuery,
} from '@/modules/post/dto/comment'
import {
  GetHomePostListQuery,
  LikeCommentDto,
  LikePostDto,
  LikeReplyDto,
} from '@/modules/post/dto/post'
import { PostLikeService } from '@/modules/post/post-like.service'

@Controller('post')
export class PostController {
  @Inject()
  private readonly postService: PostService

  @Inject()
  private readonly postLikeService: PostLikeService

  @Post('/create')
  create(@Body() dto: CreateHoleDto, @User() user: IUser) {
    return this.postService.create(dto, user)
  }

  @Get('/list')
  getHomePostList(@Query() query: GetHomePostListQuery, @User() user: IUser) {
    return this.postService.getHomePostList(query, user)
  }

  @Get('/detail')
  getPostDetail(@Query() query: GetPostDetailQuery, @User() user: IUser) {
    return this.postService.getPostDetail(query, user)
  }

  @Post('/like')
  likePost(@Body() dto: LikePostDto, @User() user: IUser) {
    return this.postLikeService.likePost(dto, user)
  }

  @Delete('/like')
  deletePostLike(@Body() dto: LikePostDto, @User() user: IUser) {
    return this.postLikeService.deletePostLike(dto, user)
  }

  @Post('/comment/like')
  likeComment(@Body() dto: LikeCommentDto, @User() user: IUser) {
    return this.postLikeService.likeComment(dto, user)
  }

  @Delete('/comment/like')
  deleteCommentLike(@Body() dto: LikeCommentDto, @User() user: IUser) {
    return this.postLikeService.deleteReplyLike(dto, user)
  }

  @Post('/reply/like')
  likeReply(@Body() dto: LikeReplyDto, @User() user: IUser) {
    return this.postLikeService.likeReply(dto, user)
  }

  @Delete('/reply/like')
  deleteReplyLike(@Body() dto: LikeReplyDto, @User() user: IUser) {
    return this.postLikeService.deleteReplyLike(dto, user)
  }

  @Post('/comment')
  comment(@Body() dto: CreateCommentDto, @User() user: IUser) {
    return this.postService.comment(dto, user)
  }

  @Get('/comment/list')
  getCommentList(@Query() query: GetPostCommentQuery, @User() user: IUser) {
    return this.postService.getCommentList(query, user)
  }

  @Post('/reply')
  reply(@Body() dto: CreateReplyDto, @User() user: IUser) {
    return this.postService.reply(dto, user)
  }

  @Get('/reply/list')
  getReplies(@Query() query: GetRepliesQuery, @User() user: IUser) {
    return this.postService.getReplies(query, user)
  }
}
