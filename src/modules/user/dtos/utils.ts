import { ValidatorConstraint } from 'class-validator'
import { Injectable, NotFoundException } from '@nestjs/common'
import { createClassValidator } from '@/utils/create'
import { PrismaService } from 'nestjs-prisma'

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUserExistConstraint {
  constructor(private readonly prisma: PrismaService) {}

  async validate(studentId: number) {
    const user = await this.prisma.user.findFirst({
      where: {
        studentId,
      },
    })

    if (!user) {
      throw new NotFoundException('该用户不存在')
    }

    return true
  }
}

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUsernameExistConstraint {
  constructor(private readonly prisma: PrismaService) {}
  async validate(username: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        username,
      },
    })

    if (user) {
      throw new NotFoundException('嗨嗨嗨，这个用户名已经被注册了，换个名字吧')
    }

    return true
  }
}

export const IsUserExist = createClassValidator(IsUserExistConstraint)

export const IsUsernameExist = createClassValidator(IsUsernameExistConstraint)
