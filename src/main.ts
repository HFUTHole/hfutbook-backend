import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { AppConfig } from '@/app.config'
import { ValidationPipe } from '@nestjs/common'
import { useContainer } from 'class-validator'
import 'reflect-metadata'
import { PrismaClient } from '@prisma/client'

async function initPostCategories() {
  const prisma = new PrismaClient()

  const categories = await prisma.category.findMany()

  if (categories.length > 0) {
    return
  }

  await prisma.category.createMany({
    data: [
      {
        avatar: '',
        name: '1',
        backgroundImg: '1',
        description: '1',
      },
    ],
  })
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config: AppConfig = app.get<AppConfig>(AppConfig)

  useContainer(app.select(AppModule), { fallbackOnErrors: true })

  app.useGlobalPipes(new ValidationPipe(config.validations))

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })

  await initPostCategories()

  await app.listen(config.server.port)
}

bootstrap()
