import { Module } from '@nestjs/common'
import { PrismaModule } from 'nestjs-prisma'
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [PrismaModule.forRoot()],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
