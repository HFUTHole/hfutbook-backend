import { Controller, Get } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { createResponse } from '@/utils/create'

@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('/')
  hello() {
    return createResponse('你干嘛，哎哟~')
  }

  // @Get('/register')
  // async register() {
  //   return this.prisma.user.create({
  //     data: {
  //       studentId: 1,
  //       username: 'Alice',
  //       password: '1',
  //       hfutPassword: '1',
  //       avatar: '',
  //       gender: Gender.MALE,
  //     },
  //   })
  // }
  //
  // @Get('/post')
  // async createPost() {
  //   return this.prisma.post.create({
  //     data: {
  //       body: 'Alice',
  //       user: {
  //         connect: {
  //           id: 1,
  //         },
  //       },
  //     },
  //   })
  // }
  //
  // @Get('/comment')
  // async createComment() {
  //   return this.prisma.comment.create({
  //     data: {
  //       body: 'Hi' + Date.now(),
  //       post: {
  //         connect: {
  //           id: 1,
  //         },
  //       },
  //       user: {
  //         connect: {
  //           id: 1,
  //         },
  //       },
  //     },
  //   })
  // }
  //
  // @Get('/show_comments')
  // async showComments() {
  //   return this.prisma.post.findFirst({
  //     where: {
  //       id: 1,
  //     },
  //     select: {
  //       comment: {
  //         take: 2,
  //         include: {
  //           user: true,
  //         },
  //       },
  //     },
  //   })
  // }
  //
  // @Get('/like')
  // async likePost() {
  //   return this.prisma.userLikePosts.create({
  //     data: {
  //       postId: 1,
  //       userId: 2,
  //     },
  //   })
  // }
  //
  // @Get('/queryLike')
  // async queryLike() {
  //   return this.prisma.post.findFirst({
  //     where: {
  //       id: 1,
  //     },
  //     include: {
  //       userLikePosts: {
  //         include: {
  //           user: true,
  //         },
  //       },
  //     },
  //   })
  // }
  //
  // @Get('/reply')
  // async reply() {
  //   return this.prisma.reply.create({
  //     data: {
  //       userId: 1,
  //       commentId: 'e6ca4194-e85b-48c2-811b-0ef34a16458d',
  //       body: '111111',
  //     },
  //   })
  // }
  //
  // @Get('/reply2reply')
  // async reply2reply() {
  //   return this.prisma.reply.create({
  //     data: {
  //       userId: 1,
  //       body: 'Hi',
  //       commentId: '02e0f0c7-dce0-4476-99a9-ff7ebdc7c659',
  //       parentReplyId: 'c4afe329-86b8-4550-a0ea-73880881e34d',
  //     },
  //   })
  // }
  //
  // @Get('/show_replies')
  // async showReplies() {
  //   return this.prisma.comment.findFirst({
  //     where: {
  //       id: '02e0f0c7-dce0-4476-99a9-ff7ebdc7c659',
  //     },
  //     include: {
  //       replies: true,
  //     },
  //   })
  // }
  //
  // @Get('/show_reply2reply')
  // async showReply2Replies() {
  //   return this.prisma.reply.findFirst({
  //     where: {
  //       id: 'c4afe329-86b8-4550-a0ea-73880881e34d',
  //     },
  //     include: {
  //       replies: true,
  //     },
  //   })
  // }
}
