import { Body, Controller, Inject, Post } from '@nestjs/common'
import { PostService } from '@/modules/post/post.service'
import { CreateHoleDto } from '@/modules/post/dto/create.dto'
import { User } from '@/common/decorator/user.decorator'
import { IUser } from '@/app'

@Controller('post')
export class PostController {
  @Inject()
  private readonly postService: PostService

  @Post('/create')
  create(@Body() dto: CreateHoleDto, @User() user: IUser) {
    return this.postService.create(dto, user)
  }
}
