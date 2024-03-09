import { IsNumber, IsPositive } from 'class-validator'
import { IsPostExist } from '@/modules/post/dto/utils'

export class GetPostDetailQuery {
  @IsPostExist()
  @IsPositive()
  @IsNumber()
  id: number
}
