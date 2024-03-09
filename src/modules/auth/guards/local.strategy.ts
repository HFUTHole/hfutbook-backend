import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common'
import { isString } from 'class-validator'
import { PrismaService } from 'nestjs-prisma'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      usernameField: 'studentId',
      passwordField: 'password',
    })
  }

  // 验证是否是第一次登录
  async validate(studentId: number) {
    if (isString(studentId)) {
      throw new NotAcceptableException('学号格式错误')
    }

    const user = await this.prisma.user.findFirst({
      where: { studentId },
    })

    if (!user) {
      throw new NotFoundException('用户不存在')
    }

    return true
  }
}
