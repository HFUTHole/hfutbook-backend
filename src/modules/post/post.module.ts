import { Module } from '@nestjs/common'
import { PrismaModule } from 'nestjs-prisma'
import { PostController } from './post.controller'
import { PostService } from './post.service'
import { IsPostExistConstraint } from '@/modules/post/dto/utils'

@Module({
  imports: [PrismaModule.forRoot()],
  controllers: [PostController],
  providers: [PostService, IsPostExistConstraint],
})
export class PostModule {}
