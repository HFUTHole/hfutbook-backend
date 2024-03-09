import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common'
import { PostService } from '@/modules/post/post.service'
import { CreateHoleDto } from '@/modules/post/dto/create.dto'
import { User } from '@/common/decorator/user.decorator'
import { IUser } from '@/app'
import { GetPostDetailQuery } from '@/modules/post/dto/get'
import { CreateCommentDto } from '@/modules/post/dto/comment'

@Controller('post')
export class PostController {
  @Inject()
  private readonly postService: PostService

  @Post('/create')
  create(@Body() dto: CreateHoleDto, @User() user: IUser) {
    return this.postService.create(dto, user)
  }

  @Get('/detail')
  getPostDetail(@Query() query: GetPostDetailQuery) {
    return this.postService.getPostDetail(query)
  }

  @Post('/comment')
  comment(@Body() dto: CreateCommentDto, @User() user: IUser) {
    return this.postService.comment(dto, user)
  }
}
