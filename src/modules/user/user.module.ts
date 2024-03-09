import { Module } from '@nestjs/common'
import { PrismaModule } from 'nestjs-prisma'
import {
  IsUserExistConstraint,
  IsUsernameExistConstraint,
} from '@/modules/user/dtos/utils'

@Module({
  imports: [PrismaModule.forRoot()],
  providers: [IsUsernameExistConstraint, IsUserExistConstraint],
})
export class UserModule {}
