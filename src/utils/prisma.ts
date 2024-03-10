import { pagination } from 'prisma-extension-pagination'
import { PrismaService } from 'nestjs-prisma'

export const prismaPagination = (service: PrismaService) =>
  service.$extends(pagination())
