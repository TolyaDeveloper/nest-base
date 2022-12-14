import { IsString, IsNumber, Max, Min } from 'class-validator'

export class CreateReviewDto {
  @IsString()
  public name: string

  @IsString()
  public title: string

  @IsString()
  public description: string

  @Max(5)
  @Min(1)
  @IsNumber()
  public rating: number

  @IsString()
  public productId: string
}
