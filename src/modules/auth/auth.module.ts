import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { LocalStrategy } from '@/modules/auth/guards/local.strategy'
import { LocalAuthGuard } from '@/modules/auth/guards/lcoal-auth.guard'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from '@/modules/auth/guards/jwt.strategy'
import { AppConfig } from '@/app.config'
import { JwtModuleOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface'

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory(config: AppConfig): JwtModuleOptions {
        return {
          secret: config.jwt.token,
          signOptions: {
            expiresIn: config.jwt.expired,
          },
        }
      },
      inject: [AppConfig],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, LocalAuthGuard, JwtStrategy],
})
export class AuthModule {}
