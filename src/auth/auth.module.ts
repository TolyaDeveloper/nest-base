import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'

import { AuthController } from './auth.controller'
import { UserModel, AuthSchema } from './user.model'
import { AuthService } from './auth.service'
import { getJWTConfig } from '../configs/jwt.config'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserModel.name,
        schema: AuthSchema
      }
    ]),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig
    }),
    PassportModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
