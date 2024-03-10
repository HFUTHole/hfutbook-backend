import { Module } from '@nestjs/common'
import {
  IsUserExistConstraint,
  IsUsernameExistConstraint,
} from '@/modules/user/dtos/utils'

@Module({
  providers: [IsUsernameExistConstraint, IsUserExistConstraint],
})
export class UserModule {}
