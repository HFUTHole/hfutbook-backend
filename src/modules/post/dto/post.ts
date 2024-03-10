import { PaginateQuery } from '@/common/dtos/paginate.dto'
import { HomePostListMode } from '@/constants/enum'
import { IsNumber, IsEnum, IsString } from 'class-validator'
import {
  IsCommentExist,
  IsPostExist,
  IsReplyExist,
} from '@/modules/post/dto/utils'

export class GetHomePostListQuery extends PaginateQuery {
  @IsEnum(HomePostListMode)
  mode = HomePostListMode.latest
}

export class IsPostExistDto {
  @IsPostExist()
  @IsNumber()
  id: number
}

export class IsCommentExistDto {
  @IsCommentExist()
  @IsString()
  id: string
}

export class IsReplyExistDto {
  @IsReplyExist()
  @IsString()
  id: string
}

export class LikePostDto extends IsPostExistDto {}

export class LikeCommentDto extends IsCommentExistDto {}

export class LikeReplyDto extends IsReplyExistDto {}
