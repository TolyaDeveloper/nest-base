import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  ValidateNested
} from 'class-validator'
import { Type } from 'class-transformer'

class ProductCharacteristicDto {
  @IsString()
  public name: string

  @IsString()
  public value: string
}

export class CreateProductDto {
  @IsString()
  public image: string

  @IsString()
  public title: string

  @IsNumber()
  public price: number

  @IsOptional()
  @IsNumber()
  public oldPrice?: number

  @IsNumber()
  public credit: number

  @IsString()
  public description: string

  @IsString()
  public advantages: string

  @IsString()
  public disadvantages: string

  @IsString({ each: true })
  @IsArray()
  public categories: string[]

  @IsString({ each: true })
  @IsArray()
  public tags: string[]

  @IsArray()
  @ValidateNested()
  @Type(() => ProductCharacteristicDto)
  public characteristics: ProductCharacteristicDto[]
}
