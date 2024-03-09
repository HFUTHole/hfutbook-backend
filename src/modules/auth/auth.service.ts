import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import {
  ForgetPasswordDto,
  LoginDto,
  RegisterDto,
} from '@/modules/auth/dto/auth.dto'
import { JwtService } from '@nestjs/jwt'
import { encryptPassword, verifyPassword } from '@/modules/auth/auth.utils'
import { AppConfig } from '@/app.config'
import axios from 'axios'
import { createResponse } from '@/utils/create'
import { PrismaService } from 'nestjs-prisma'
import { Gender } from '@prisma/client'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly appConfig: AppConfig,
    private readonly prisma: PrismaService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: { studentId: dto.studentId },
    })

    const isVerified = await verifyPassword(user.password, dto.password)

    if (!isVerified) {
      throw new BadRequestException('账号或密码错误')
    }

    const token = this.signToken({
      id: user.id,
      studentId: user.studentId,
    })

    return createResponse('登录成功', { token })
  }

  async register(dto: RegisterDto) {
    const isStudentIdExist = await this.prisma.user.findFirst({
      where: {
        studentId: dto.studentId,
      },
    })

    if (isStudentIdExist) {
      throw new BadRequestException('该用户已注册')
    }

    const isUsernameExist = await this.prisma.user.findFirst({
      where: {
        username: dto.username,
      },
    })

    if (isUsernameExist) {
      throw new BadRequestException('换个名字吧， 已经被注册了~')
    }

    const isHFUTPasswordVerified = await this.verifyHFUTPassword(
      dto.studentId,
      dto.hfutPassword,
    )

    if (!isHFUTPasswordVerified) {
      throw new BadRequestException('信息门户密码错误')
    }

    const password = await encryptPassword(dto.password)
    const hfutPassword = await encryptPassword(dto.hfutPassword)

    const user = await this.prisma.user.create({
      data: {
        ...dto,
        hfutPassword,
        password,
        gender: Gender.MALE,
        avatar: '',
      },
    })

    const token = this.signToken({
      id: user.id,
      studentId: user.studentId,
    })

    return createResponse('注册成功', { token })
  }

  async forget(dto: ForgetPasswordDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        studentId: dto.studentId,
      },
    })

    if (!user) {
      throw new NotFoundException('用户不存在')
    }

    const isHfutPasswordCorrect = await this.verifyHFUTPassword(
      dto.studentId,
      dto.hfutPassword,
    )

    if (!isHfutPasswordCorrect) {
      throw new BadRequestException('信息门户密码错误')
    }
    const hfutPassword = await encryptPassword(dto.hfutPassword)
    const password = await encryptPassword(dto.password)
    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password,
        hfutPassword,
      },
    })
    const token = this.signToken(user)

    return createResponse('修改密码成功', {
      token,
    })
  }

  async verifyHFUTPassword(studentId: number, password: string) {
    const url = `${this.appConfig.hfut.url}/login/verify`

    try {
      await axios({
        method: 'GET',
        url,
        params: {
          username: studentId,
          password,
        },
      })
    } catch (error) {
      // if (studentId.toString().startsWith('2023')) {
      //   throw new BadRequestException(
      //     '新生还没有开放信息门户哦，等导员通知吧！',
      //   )
      // }
      throw new BadRequestException('信息门户密码错误')
    }

    return {
      gender: Gender.MALE,
    }
  }

  signToken(params: { studentId: number; id: number }) {
    return this.jwtService.sign(params)
  }
}
