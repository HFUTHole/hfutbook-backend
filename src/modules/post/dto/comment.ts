import {
  ArrayMaxSize,
  IsArray,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator'
import { Limit } from '@/constants/limit'
import {
  IsCommentExist,
  IsPostExist,
  IsReplyExist,
} from '@/modules/post/dto/utils'
import { PaginateQuery } from '@/common/dtos/paginate.dto'

export class CreateCommentDto {
  @IsPostExist()
  @IsPositive()
  @IsNumber()
  id: number

  @Length(Limit.holeCommentBodyMinLength, Limit.holeCommentBodyMaxLength, {
    message: `评论字数限制在${Limit.holeCommentBodyMinLength}-${Limit.holeCommentBodyMaxLength}字`,
  })
  @IsString()
  body: string

  @ArrayMaxSize(Limit.commentMaxImgLength, {
    message: `最多只能上传${Limit.commentMaxImgLength}张图片哦`,
  })
  @IsArray()
  @IsOptional()
  imgs?: string[] = []
}

export class CreateReplyDto {
  @IsCommentExist()
  @IsString()
  @IsOptional()
  commentId?: string

  @Length(1, 1000, { message: '评论字数限制在1-1000字' })
  @IsString()
  body: string

  @IsReplyExist()
  @IsOptional()
  replyId?: string

  @ArrayMaxSize(Limit.holeMaxImgLength, {
    message: `最多只能上传${Limit.holeMaxImgLength}张图片哦`,
  })
  @IsArray()
  @IsOptional()
  imgs?: string[] = []
}

export class GetPostCommentQuery extends PaginateQuery {
  @IsPostExist()
  @IsPositive()
  @IsNumber()
  id: number

  @IsCommentExist()
  @IsOptional()
  commentId?: string
}

export class GetRepliesQuery extends PaginateQuery {
  @IsCommentExist()
  commentId: string
}
