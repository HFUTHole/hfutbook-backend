import { Module } from '@nestjs/common'
import { WinstonModule } from 'nest-winston'
import { format, transports } from 'winston'
import DailyRotateFile = require('winston-daily-rotate-file')
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import { HttpExceptionFilter } from '@/common/filters/http-exception.filter'
import { LoggerInterceptor } from '@/common/interceptors/logger.interceptor'
import { ThrottlerGuard } from '@nestjs/throttler'
import { JwtAuthGuard } from '@/modules/auth/guards/jwt.guard'
import { RolesGuard } from '@/common/guard/roles.guard'

@Module({
  imports: [
    WinstonModule.forRootAsync({
      useFactory: () => {
        const myFormat = format.printf(({ level, message, timestamp }) => {
          return `${timestamp} [${level.toUpperCase()}]: ${message}`
        })

        return {
          level: 'info',
          format: format.combine(
            format.timestamp(),
            myFormat,
            format.colorize(),
          ),
          transports: [
            new DailyRotateFile({
              filename: 'logs/%DATE%.log',
              datePattern: 'YYYY-MM-DD',
              maxSize: '30m',
              level: 'info',
            }),
            new DailyRotateFile({
              filename: 'logs/%DATE%.error',
              datePattern: 'YYYY-MM-DD',
              maxSize: '30m',
              level: 'error',
            }),
            new transports.Stream({
              stream: process.stderr,
              level: 'debug',
            }),
          ],
        }
      },
    }),
  ],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: LoggerInterceptor },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class CommonModule {}
