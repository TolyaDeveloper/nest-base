import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { AuthController } from './auth.controller'
import { AuthModel, AuthSchema } from './auth.model'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: AuthModel.name,
        schema: AuthSchema
      }
    ])
  ],
  controllers: [AuthController]
})
export class AuthModule {}
