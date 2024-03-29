import {
  ArrayMaxSize,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  Validate,
  ValidateNested,
} from 'class-validator'
import { Limit } from '@/constants/limit'
// import { IsValidPostImgs } from '@/modules/hole/dto/utils.dto'
// import { VoteType } from '@/entity/hole/vote.entity'
// import { ArticleCategoryEnum } from '@/common/enums/article_category/category'
// import { HoleClassification } from '@/common/enums/hole/category'

class Vote {
  @ArrayMaxSize(Limit.holeVoteMaxLength, {
    message: `最多只能创建${Limit.holeVoteMaxLength}个选项哦`,
  })
  @MaxLength(Limit.holeVoteOptionLength, {
    each: true,
    message: `每个选项最长只能是${Limit.holeVoteOptionLength}个字符哦`,
  })
  @IsArray()
  items: string[] = []
}

export class CreateHoleDto {
  @MaxLength(Limit.holeBodyMaxLength, {
    message: `最多只能有${Limit.holeBodyMaxLength}个字哦`,
  })
  @IsString()
  body: string

  @IsString()
  category: string

  // @IsValidPostImgs()
  @ArrayMaxSize(Limit.holeMaxImgLength, {
    message: `最多只能上传${Limit.holeMaxImgLength}张图片哦`,
  })
  @IsArray()
  @IsOptional()
  imgs?: string[] = []

  @MaxLength(Limit.hole.titleMaxLength, {
    message: `标题最长只能有${Limit.hole.titleMaxLength}个字哦`,
  })
  @IsString()
  @IsOptional()
  title?: string

  // TODO 开一个爬虫去验证是否正确
  @Validate((value: string) => value.startsWith('BV'), {
    message: 'BV号格式不正确',
  })
  @Length(12, 12, { message: '请输入正确的B站的BV视频号哦' })
  @IsString()
  @IsOptional()
  bilibili?: string

  @ValidateNested()
  @IsOptional()
  vote?: Vote
}
