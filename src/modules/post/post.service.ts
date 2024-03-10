import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { CreateHoleDto } from '@/modules/post/dto/create.dto'
import { IUser } from '@/app'
import { createResponse } from '@/utils/create'
import { GetPostDetailQuery } from '@/modules/post/dto/get'
import { CreateCommentDto, CreateReplyDto } from '@/modules/post/dto/comment'
import { isString } from '@/utils/is'

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
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
      },
    })

    return createResponse('帖子发布成功', post)
  }

  async getList() {}

  async getPostDetail(query: GetPostDetailQuery) {
    const post = await this.prisma.post.findFirst({
      where: {
        id: query.id,
        isDeleted: false,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
      },
    })

    return createResponse('获取帖子详情成功', post)
  }

  async comment(dto: CreateCommentDto, reqUser: IUser) {
    await this.prisma.comment.create({
      data: {
        body: dto.body,
        imgs: dto.imgs,
        user: {
          connect: {
            id: reqUser.id,
          },
        },
        post: {
          connect: {
            id: dto.id,
          },
        },
      },
    })

    return createResponse('评论成功')
  }

  async reply(dto: CreateReplyDto, reqUser: IUser) {
    await this.prisma.reply.create({
      data: {
        body: dto.body,
        user: {
          connect: {
            id: reqUser.id,
          },
        },
        comment: {
          connect: {
            id: dto.commentId,
          },
        },
        ...(isString(dto.replyId) && {
          parentReply: {
            connect: {
              id: dto.replyId,
            },
          },
        }),
      },
    })

    return createResponse('回复成功')
  }
}
