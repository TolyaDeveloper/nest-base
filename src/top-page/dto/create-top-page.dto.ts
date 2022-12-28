import { Type } from 'class-transformer'
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested
} from 'class-validator'

import { TopLevelCategory } from '../top-page.model'

export class HhDataDto {
  @IsNumber()
  public count: number

  @IsNumber()
  public juniorSalary: number

  @IsNumber()
  public middleSalary: number

  @IsNumber()
  public seniorSalary: number
}

export class TopPageAdvantageDto {
  @IsString()
  public title: string

  @IsString()
  public description: string
}

export class CreateTopPageDto {
  @IsEnum(TopLevelCategory)
  public firstCategory: TopLevelCategory

  @IsString()
  public secondCategory: string

  @IsString()
  public alias: string

  @IsString()
  public title: string

  @IsString()
  public category: string

  @IsOptional()
  @IsObject()
  @Type(() => HhDataDto)
  @ValidateNested()
  public hh?: HhDataDto

  @IsArray()
  @Type(() => TopPageAdvantageDto)
  @ValidateNested()
  public advantages: TopPageAdvantageDto[]

  @IsString()
  public seoText: string

  @IsString()
  public tagsTitle: string

  @IsString({ each: true })
  @IsArray()
  public tags: string[]
}
