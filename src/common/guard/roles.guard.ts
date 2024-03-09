import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ROLES_KEY } from '@/common/decorator/roles.decorator'
import { IS_PUBLIC_KEY } from '@/common/decorator/public.decorator'
import { PrismaService } from 'nestjs-prisma'
import { Role } from '@prisma/client'
import type { Request } from 'express'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (!requiredRoles || isPublic) {
      return true
    }

    const { user: reqUser } = context.switchToHttp().getRequest() as Request

    const user = await this.prisma.user.findFirst({
      where: { studentId: reqUser.studentId },
      select: { role: true },
    })

    if (!user) {
      throw new NotFoundException('该用户不存在')
    }

    if (user.role === Role.User) {
      return true
    }

    if (!requiredRoles.includes(Role.Banned) && user.role === Role.Banned) {
      throw new BadRequestException('你已被关进小黑屋，什么都不能干了哦')
    }

    const hasRole = requiredRoles.some((role) => user.role === role)

    if (!hasRole) {
      throw new BadRequestException('权限不足')
    }

    return true
  }
}
