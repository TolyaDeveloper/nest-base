import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { hash, compare } from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'

import { AuthDto } from './dto/auth.dto'
import { UserModel, AuthDocument } from './user.model'
import { USER_NOT_FOUND, WRONG_PASSWORD_ERROR } from './auth.constants'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel.name)
    private readonly userModel: Model<AuthDocument>,
    private readonly jwtService: JwtService
  ) {}

  async createUser(dto: AuthDto): Promise<UserModel> {
    const salt = 10
    const passwordHash = await hash(dto.login, salt)

    const newUser = new this.userModel({
      email: dto.login,
      passwordHash
    })

    return newUser.save()
  }

  async findUser(email: string): Promise<UserModel | null> {
    return this.userModel.findOne({ email }).lean().exec()
  }

  async validateUser(
    email: string,
    password: string
  ): Promise<Pick<UserModel, 'email'>> {
    const user = await this.findUser(email)

    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND)
    }

    const isCorrectPassword = await compare(password, user.passwordHash)

    if (!isCorrectPassword) {
      throw new UnauthorizedException(WRONG_PASSWORD_ERROR)
    }

    return { email: user.email }
  }

  async login(email: string) {
    const payload = { email }

    return {
      accessToken: await this.jwtService.signAsync(payload)
    }
  }
}
