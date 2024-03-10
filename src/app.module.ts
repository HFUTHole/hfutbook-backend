import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaModule } from 'nestjs-prisma'
import { fileLoader, TypedConfigModule } from 'nest-typed-config'
import { AppConfig } from './app.config'
import { schemeValidator } from '@/utils/schemaValidator'
import { ThrottlerModule } from '@nestjs/throttler'
import { ScheduleModule } from '@nestjs/schedule'
import { CommonModule } from './common/common.module'
import { AuthModule } from '@/modules/auth/auth.module'
import { UserModule } from './modules/user/user.module'
import { PostModule } from './modules/post/post.module'

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    TypedConfigModule.forRoot({
      schema: AppConfig,
      load: fileLoader(),
      validate: schemeValidator,
    }),
    ThrottlerModule.forRootAsync({
      useFactory({ throttle }: AppConfig) {
        return {
          throttlers: [throttle],
        }
      },
      inject: [AppConfig],
    }),
    ScheduleModule.forRoot(),
    CommonModule,
    AuthModule,
    UserModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
