import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { CreateHoleDto } from '@/modules/post/dto/create.dto'
import { IUser } from '@/app'
import { createResponse } from '@/utils/create'
import { GetPostDetailQuery } from '@/modules/post/dto/get'
import {
  CreateCommentDto,
  CreateReplyDto,
  GetPostCommentQuery,
  GetRepliesQuery,
} from '@/modules/post/dto/comment'
import { isString } from '@/utils/is'
import { prismaPagination } from '@/utils/prisma'
import { GetHomePostListQuery } from '@/modules/post/dto/post'

@Injectable()
export class PostService {
  private get prismaPaginate() {
    return prismaPagination(this.prisma)
  }

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

  async getHomePostList(query: GetHomePostListQuery, reqUser: IUser) {
    const [data, meta] = await this.prismaPaginate.post
      .paginate({
        include: {
          userLikePosts: {
            where: {
              userId: reqUser.id,
            },
          },
          user: {
            select: {
              username: true,
              avatar: true,
              id: true,
            },
          },
        },
      })
      .withPages({
        limit: query.limit,
        page: query.page,
        includePageCount: true,
      })
      .then(async ([data, meta]) => {
        await Promise.all(
          data.map(async (item) => {
            type Item = typeof item & { isLiked: boolean }
            ;(item as Item).isLiked = Boolean(item.userLikePosts.length)
          }),
        )

        return [data, meta]
      })

    return createResponse('获取帖子列表成功', {
      data,
      meta,
    })
  }

  async getPostDetail(query: GetPostDetailQuery, reqUser: IUser) {
    const post = await this.prisma.post
      .findFirst({
        where: {
          id: query.id,
          isDeleted: false,
        },
        include: {
          userLikePosts: {
            where: {
              userId: reqUser.id,
            },
          },
          user: {
            select: {
              id: true,
              username: true,
              avatar: true,
            },
          },
        },
      })
      .then((data) => {
        type Data = typeof data & { isLiked: boolean }
        ;(data as Data).isLiked = Boolean(data!.userLikePosts.length)

        return data
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

  async getCommentList(query: GetPostCommentQuery, reqUser: IUser) {
    const [data, meta] = await this.prismaPaginate.comment
      .paginate({
        where: {
          postId: query.id,
        },
        include: {
          userLikeComments: {
            where: {
              userId: reqUser.id,
            },
          },
          replies: {
            include: {
              _count: true,
            },
            orderBy: {
              replies: {
                _count: 'desc',
              },
            },
          },
        },
      })
      .withPages({
        limit: query.limit,
        page: query.page,
        includePageCount: true,
      })
      .then(async ([data, meta]) => {
        await Promise.all(
          data.map(async (item) => {
            type Item = typeof item & { isLiked: boolean }
            ;(item as Item).isLiked = Boolean(item.userLikeComments.length)
          }),
        )

        return [data, meta]
      })

    return createResponse('获取评论列表成功！', {
      data,
      meta,
    })
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

  async getReplies(query: GetRepliesQuery, reqUser: IUser) {
    const [data, meta] = await this.prismaPaginate.reply
      .paginate({
        where: {
          commentId: query.commentId,
        },
        include: {
          userLikeReplies: {
            where: {
              userId: reqUser.id,
            },
          },
        },
      })
      .withPages({
        limit: query.limit,
        page: query.page,
        includePageCount: true,
      })
      .then(async ([data, meta]) => {
        await Promise.all(
          data.map(async (item) => {
            type Item = typeof item & { isLiked: boolean }
            ;(item as Item).isLiked = Boolean(item.userLikeReplies.length)
          }),
        )

        return [data, meta]
      })

    return createResponse('获取回复列表成功', {
      data,
      meta,
    })
  }
}
