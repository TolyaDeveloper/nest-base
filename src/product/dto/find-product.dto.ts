import { IsString, IsNumber } from 'class-validator'

export class FindProductDto {
  @IsString()
  public category: string

  @IsNumber()
  public limit: number
}
