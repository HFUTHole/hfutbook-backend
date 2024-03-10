import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'
import { createClassValidator } from '@/utils/create'
import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'

@ValidatorConstraint({ async: true })
@Injectable()
export class IsPostExistConstraint implements ValidatorConstraintInterface {
  constructor(private readonly prisma: PrismaService) {}

  async validate(id: number) {
    const post = await this.prisma.post.findFirst({
      where: { id },
    })

    console.log(post)
    if (!post) {
      throw new NotFoundException('帖子不存在哦')
    }

    return true
  }
}

@ValidatorConstraint({ async: true })
@Injectable()
export class IsCommentExistConstraint implements ValidatorConstraintInterface {
  constructor(private readonly prisma: PrismaService) {}

  async validate(id: string) {
    const hole = await this.prisma.comment.findFirst({
      where: {
        id,
      },
    })

    if (!hole) {
      throw new NotFoundException('评论不存在')
    }

    return true
  }
}
//
// @ValidatorConstraint({ async: true })
// @Injectable()
// export class IsVoteExistConstraint implements ValidatorConstraintInterface {
//   @InjectRepository(Vote)
//   private readonly voteRepo: Repository<Vote>
//
//   async validate(id: string) {
//     const hole = await this.voteRepo.findOne({
//       where: {
//         id,
//       },
//     })
//
//     if (!hole) {
//       throw new NotFoundException('投票不存在')
//     }
//
//     return true
//   }
// }
//
@ValidatorConstraint({ async: true })
@Injectable()
export class IsReplyExistConstraint {
  constructor(private readonly prisma: PrismaService) {}

  async validate(id: string) {
    const reply = await this.prisma.reply.findFirst({ where: { id } })

    if (!reply) {
      throw new NotFoundException('回复不存在')
    }

    return true
  }
}
//
// @ValidatorConstraint({ async: true })
// @Injectable()
// export class IsVoteItemExistConstraint {
//   @InjectRepository(VoteItem)
//   private readonly voteItemRepo: Repository<VoteItem>
//
//   async validate(id: string) {
//     const reply = await this.voteItemRepo.findOne({ where: { id } })
//
//     if (!reply) {
//       throw new NotFoundException('投票不存在')
//     }
//
//     return true
//   }
// }
//
// @ValidatorConstraint({ async: true })
// @Injectable()
// export class IsCorrectSubCategoryExistConstraint {
//   @InjectRepository(HoleCategoryEntity)
//   private readonly holeCategoryRepo: Repository<HoleCategoryEntity>
//
//   async validate(name: string, validationArguments: ValidationArguments) {
//     const categoryName = (validationArguments.object as GetHoleListQuery)[
//       'classification'
//     ]
//
//     const category = await this.holeCategoryRepo.findOne({
//       relations: {
//         children: true,
//       },
//       where: {
//         name: categoryName,
//       },
//     })
//
//     if (!category.children.map((item) => item.name).includes(name)) {
//       throw new NotFoundException('子分区错误了哦')
//     }
//
//     return true
//   }
// }

export const IsPostExist = createClassValidator(IsPostExistConstraint)

// export const IsVoteExist = createClassValidator(IsVoteExistConstraint)
//
// export const IsVoteItemExist = createClassValidator(IsVoteItemExistConstraint)
//
//
//
export const IsCommentExist = createClassValidator(IsCommentExistConstraint)

export const IsReplyExist = createClassValidator(IsReplyExistConstraint)
//
// export const IsCorrectSubCategory = createClassValidator(
//   IsCorrectSubCategoryExistConstraint,
// )
