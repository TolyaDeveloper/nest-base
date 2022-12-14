import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { AuthController } from './auth.controller'
import { UserModel, AuthSchema } from './user.model'
import { AuthService } from './auth.service'
import { getJWTConfig } from 'src/configs/jwt.config'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserModel.name,
        schema: AuthSchema
      }
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
