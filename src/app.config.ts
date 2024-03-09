import { ValidationPipeOptions } from '@nestjs/common'

export class AppConfig {
  validations!: ValidationPipeOptions

  jwt!: {
    token: string
    expired: string
  }

  hole!: {
    oneDayLimitCreateCount: number
  }

  server!: {
    port: number
  }

  throttle!: {
    ttl: number
    limit: number
  }

  hfut!: {
    url: string
  }
}
