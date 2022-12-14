import { IsString, MinLength } from 'class-validator'

export class AuthDto {
  @IsString()
  public login: string

  // @MinLength(8)
  @IsString()
  public password: string
}
