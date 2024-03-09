import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { CreateHoleDto } from '@/modules/post/dto/create.dto'
import { IUser } from '@/app'
import { createResponse } from '@/utils/create'

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateHoleDto, reqUser: IUser) {
    const post = await this.prisma.post.create({
      data: {
        title: dto.title,
        body: dto.body,
        imgs: dto.imgs,
        user: {
          connect: {
            id: reqUser.id,
          },
        },
        category: {
          connect: {
            id: dto.category,
          },
        },
      },
    })

    return createResponse('帖子发布成功', post)
  }
}
