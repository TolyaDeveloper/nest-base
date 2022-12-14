import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

@Schema({ timestamps: true, collection: 'User' })
export class UserModel {
  @Prop({ required: true, unique: true })
  public email: string

  @Prop({ required: true })
  public passwordHash: string
}

export type AuthDocument = HydratedDocument<UserModel>

export const AuthSchema = SchemaFactory.createForClass(UserModel)
